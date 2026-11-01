"use client";

import { useState } from "react";
import { text } from "@/config";

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
      <section className="card">
        <h1 className="title">{text.title}</h1>
        <p className="intro">{text.intro}</p>

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
      </section>

      {result && (
        <section className="card result-card" aria-live="polite">
          <div className="row">
            <span className="label">{text.labels.goal}</span>
            <span className="value">{result.goal}</span>
          </div>
          <div className="row">
            <span className="label">{text.labels.days}</span>
            <span className="value">{formatDays(result.achievedDays)}</span>
          </div>
          <div className="row">
            <span className="label">{text.labels.status}</span>
            <span className={`badge ${achieved ? "badge-achieved" : "badge-not"}`}>
              {achieved ? text.statusAchieved : text.statusNotAchieved}
            </span>
          </div>
          <div className="row">
            <span className="label">{text.labels.reward}</span>
            <span className="value reward">{formatReward(result.prize)}</span>
          </div>
        </section>
      )}
    </main>
  );
}
