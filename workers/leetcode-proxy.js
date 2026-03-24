/**
 * Cloudflare Worker — LeetCode GraphQL proxy
 *
 * Deploy steps:
 *  1. Go to https://workers.cloudflare.com  and create a free account
 *  2. Create a new Worker, paste this file, and click Deploy
 *  3. Copy the worker URL (e.g. https://leetcode-proxy.yourname.workers.dev)
 *  4. Paste it into WORKER_URL in src/components/Leetcode.tsx
 */

const ALLOWED_ORIGIN = "https://ankitdeshpande.github.io";

const CORS = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request) {
    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const body = await request.text();

    const upstream = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (compatible; portfolio-proxy/1.0)",
      },
      body,
    });

    const text = await upstream.text();

    return new Response(text, {
      status: upstream.status,
      headers: { "Content-Type": "application/json", ...CORS },
    });
  },
};
