"use client";

import { useState } from "react";
import { text } from "@/config";
import { FootstepsIcon, GoalIcon, CalendarIcon, StatusIcon, GiftIcon } from "./icons";

function formatDays(n) {
  return `${n} ${n === 1 ? text.daySingular : text.dayPlural}`;
}

// $50, $1,000, $12.50
function formatReward(amount) {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return (
    "$" +
    amount.toLocaleString("en-US", {
      minimumFractionDigits: hasCents ? 2 : 0,
      maximumFractionDigits: 2,
    })
  );
}

export default function Home() {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // the Enter key also submits this form
    if (loading) return;

    const id = employeeId.trim();
    setResult(null);
    setError("");
    if (!id) {
      setError(text.errors.empty);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: id }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.result) {
        setResult(data.result);
      } else {
        setError(text.errors[data.error] || text.errors.general);
      }
    } catch {
      setError(text.errors.general);
    } finally {
      setLoading(false);
    }
  }

  const achieved = result?.status === "achieved";

  return (
    <main className="page">
      <section className="card main-card">
        <header className="card-header">
          <div className="header-icon">
            <FootstepsIcon />
          </div>
          <h1 className="title">{text.title}</h1>
          <p className="intro">{text.intro}</p>
        </header>

        <div className="card-body">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <input
              className="input"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder={text.inputPlaceholder}
              aria-label={text.inputPlaceholder}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
            />
            <button className="button" type="submit" disabled={loading}>
              {loading ? text.buttonLoading : text.button}
            </button>
          </form>

          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}
        </div>
      </section>

      {result && (
        <section className="card result-card" aria-live="polite">
          <div className="row">
            <span className="label">
              <span className="row-icon icon-goal"><GoalIcon /></span>
              {text.labels.goal}
            </span>
            <span className="value">{result.goal}</span>
          </div>
          <div className="row">
            <span className="label">
              <span className="row-icon icon-days"><CalendarIcon /></span>
              {text.labels.days}
            </span>
            <span className="value">{formatDays(result.achievedDays)}</span>
          </div>
          <div className="row">
            <span className="label">
              <span className="row-icon icon-status"><StatusIcon /></span>
              {text.labels.status}
            </span>
            <span className={`badge ${achieved ? "badge-achieved" : "badge-not"}`}>
              {achieved ? text.statusAchieved : text.statusNotAchieved}
            </span>
          </div>
          <div className="row reward-row">
            <span className="label">
              <span className="row-icon icon-reward"><GiftIcon /></span>
              {text.labels.reward}
            </span>
            <span className="value reward">{formatReward(result.prize)}</span>
          </div>
        </section>
      )}
    </main>
  );
}
