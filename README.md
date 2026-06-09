# TINO — Site (Órbita Tech)

Chat de inteligência comercial do TINO. É um site **estático** (HTML/CSS/JS) que chama a **API do Google Gemini direto do navegador** — então hospeda no **GitHub Pages** de graça, sem backend.

## Arquivos
- `index.html` — o site inteiro (interface + lógica + system prompt embutido).
- `system_prompt_tino.md` — o System Prompt do TINO documentado (entregável da Etapa 2).

---

## 1) Chave do Gemini
A chave **já está embutida** no `index.html` (constante `EMBEDDED_KEY`), então o site **funciona direto** ao abrir o link — ninguém precisa colar nada. Qualquer pessoa também pode usar a própria chave clicando no ⚙ (fica salva só no navegador dela).

> Para gerar/trocar a chave: **https://aistudio.google.com/apikey**.

## 2) Testar no seu PC (antes de publicar)
Basta dar **duplo clique no `index.html`** que ele abre no navegador e já conversa.

## 3) Publicar no GitHub Pages
1. Crie um repositório no GitHub (ex.: `tino-orbita`), **público**.
2. Suba os arquivos desta pasta (`index.html` e os `.md`). Pelo site do GitHub: **Add file → Upload files → arraste tudo → Commit**.
3. No repositório: **Settings → Pages**.
4. Em **Source**, escolha **Deploy from a branch**; em **Branch** selecione `main` e a pasta `/ (root)`; clique **Save**.
5. Aguarde ~1 min. O link aparece no topo dessa mesma página: `https://SEU-USUARIO.github.io/tino-orbita/`.
6. Pronto — esse link é o que os colegas usam para testar. Cada pessoa cola a própria chave Gemini (ou você apresenta com a sua).

---

## Recursos do site
- 🛰️ Identidade Órbita Tech / TINO (tema "órbita").
- 🎭 **Seletor de persona** (Dono, Gerente, SDR/Closer, Marketing) — o TINO adapta o tom em tempo real.
- 📎 **Upload de CSV/TXT** do funil — o TINO analisa os dados enviados.
- 💬 Chips de sugestão, "digitando…", markdown nas respostas (tabelas inclusive).
- ⬇️ **Exportar conversa** em `.txt` (útil para anexar evidência na entrega).
- 📱 Responsivo (funciona no celular dos colegas).

## Configuração rápida
No `index.html`, no início do `<script>`:
- `MODEL` — modelo Gemini (padrão `gemini-2.5-flash`; pode usar `gemini-2.0-flash`).
- `SYSTEM_PROMPT` — o cérebro do TINO (igual ao `system_prompt_tino.md`).
- `PERSONAS` — textos de adaptação por persona.

---

## ⚠️ Sobre segurança da chave
Como o site é 100% no navegador, a chave que **você** usa fica no **seu** navegador (não no repositório). Se algum dia você colocar a chave fixa dentro do código e subir para um repo público, ela ficaria exposta — então **não faça isso**. Para reforçar, dá para restringir a chave por site no Google Cloud Console (APIs & Services → Credentials → restrição por *HTTP referrer*). Para um trabalho acadêmico com chave do plano gratuito, o risco é baixo.
