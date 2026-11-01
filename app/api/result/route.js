// Server-only lookup. The Supabase key is used here and never sent to the browser.
// This code only READS data. It never creates, changes, or deletes anything.
import { db } from "@/config";
import { sampleRows } from "@/lib/sampleData";

export const dynamic = "force-dynamic";

const ID_PATTERN = /^[A-Za-z0-9]+$/;

function reply(status, body) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

// Turn a database row into a simple result for the screen
function toResult(row) {
  const c = db.columns;
  const rawStatus = String(row[c.status] ?? "").trim();
  let status;
  if (rawStatus === db.statusValues.achieved) status = "achieved";
  else if (rawStatus === db.statusValues.notAchieved) status = "notAchieved";
  else throw new Error(`Unknown status value: ${rawStatus}`);

  const days = Number(row[c.achievedDays]);
  const prize = Number(row[c.prize]);
  if (!Number.isFinite(days) || !Number.isFinite(prize)) {
    throw new Error("achieved_days or prize is not a number");
  }

  return { goal: String(row[c.goal] ?? ""), achievedDays: days, status, prize };
}

// Find rows from Supabase, ignoring upper/lower case (read-only)
async function findInSupabase(id, url, key) {
  const c = db.columns;
  const select = [c.employeeId, c.goal, c.achievedDays, c.status, c.prize].join(",");
  // The ID contains only letters and numbers, so "ilike" acts as an exact,
  // case-insensitive match (no wildcards possible).
  const query = new URLSearchParams({
    select,
    [c.employeeId]: `ilike.${id}`,
    limit: "2",
  });
  const endpoint = `${url.replace(/\/+$/, "")}/rest/v1/${encodeURIComponent(db.table)}?${query}`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function findInSample(id) {
  const lower = id.toLowerCase();
  return sampleRows.filter((r) => String(r[db.columns.employeeId]).toLowerCase() === lower);
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return reply(400, { error: "empty" });
    }

    const id = String(body?.employeeId ?? "").trim();
    if (!id) return reply(400, { error: "empty" });
    if (!ID_PATTERN.test(id)) return reply(404, { error: "notFound" });

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const isProduction = process.env.VERCEL_ENV === "production";

    let rows;
    if (url && key) {
      rows = await findInSupabase(id, url, key);
    } else if (isProduction) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on Production.");
      return reply(500, { error: "general" });
    } else {
      rows = findInSample(id);
    }

    if (!Array.isArray(rows) || rows.length === 0) return reply(404, { error: "notFound" });
    if (rows.length > 1) {
      console.error(`More than one row matches employee ID "${id}" (case-insensitive).`);
      return reply(409, { error: "general" });
    }

    return reply(200, { result: toResult(rows[0]) });
  } catch (err) {
    console.error(err);
    return reply(500, { error: "general" });
  }
}
