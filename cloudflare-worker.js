// ============================================================
// TINO — Proxy do Gemini (Cloudflare Worker)
// A chave do Gemini fica em SEGREDO aqui no Worker (variável GEMINI_KEY),
// nunca no site. O site (GitHub Pages) chama este Worker, e o Worker
// repassa para o Gemini adicionando a chave.
//
// Robustez: tenta o modelo principal e, se o Gemini responder 503/429
// (sobrecarga), tenta de novo e cai para um modelo alternativo.
// ============================================================

const MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"]; // principal + fallback

// Quem pode chamar este Worker (evita que estranhos usem sua cota no navegador).
const ALLOWED_ORIGINS = [
  "https://mmarcatoricardo.github.io", // site publicado
  "http://localhost:8000",             // teste local com servidor
  "null"                               // teste local por duplo clique (file://)
];

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

async function callGemini(body, env) {
  let last = null;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      let res;
      try {
        res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_KEY}`,
          { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
        );
      } catch {
        continue; // erro de rede: tenta o próximo
      }
      // 503 = sobrecarregado, 429 = limite momentâneo -> vale a pena tentar de novo / outro modelo
      if (res.status !== 503 && res.status !== 429) return res;
      last = res;
      await new Promise(r => setTimeout(r, 700));
    }
  }
  return last;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = cors(origin);

    if (request.method === "OPTIONS") return new Response(null, { headers });
    if (request.method !== "POST")
      return new Response("Use POST.", { status: 405, headers });

    let body;
    try { body = await request.json(); }
    catch { return reply({ error: { message: "JSON inválido." } }, 400, headers); }

    const res = await callGemini(body, env);
    if (!res)
      return reply({ error: { message: "Gemini indisponível no momento. Tente novamente." } }, 502, headers);

    const text = await res.text();
    return new Response(text, {
      status: res.status,
      headers: { ...headers, "Content-Type": "application/json" }
    });
  }
};

function reply(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, "Content-Type": "application/json" }
  });
}
