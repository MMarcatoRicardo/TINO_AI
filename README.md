# TINO

**Inteligência comercial 360° para pequenas empresas B2B.**

TINO é um assistente conversacional que analisa o funil de receita de ponta a ponta — marketing, vendas e pós-venda — e devolve diagnósticos e planos de ação. Diferente de um dashboard, ele conversa, faz perguntas e diz o que fazer.

Projeto desenvolvido pela **Órbita Tech** (empresa fictícia) para a disciplina de Engenharia de Prompt — Universidade Positivo.

![TINO](preview.png)

## Sobre o projeto

A maioria das pequenas empresas brasileiras opera vendas sem processo estruturado e fecha as portas em poucos anos. As ferramentas que poderiam ajudar ou são caras demais ou enxergam só um pedaço do funil. O TINO nasce para preencher essa lacuna: uma IA consultora acessível, em português, com visão integrada da operação comercial.

A interface é um site estático em HTML/CSS/JS hospedado no GitHub Pages. As chamadas ao modelo Gemini passam por um proxy leve (Cloudflare Worker) que mantém a chave da API em segredo, fora do código público.

## Funcionalidades

- **Seletor de persona** — dono, gerente comercial, SDR/closer ou marketing. O TINO ajusta o tom e a profundidade para cada perfil.
- **Análise de planilhas** — anexe um CSV do seu funil e peça um diagnóstico.
- **Diagnóstico prescritivo** — respostas terminam em próximos passos, não em teoria.
- **Exportar conversa** — salva o histórico em `.txt`.
- Funciona no celular.

## Como funciona

O comportamento do TINO é definido por um *system prompt* — um conjunto de instruções que estabelece personalidade, escopo e regras. A cada mensagem, o site envia ao Gemini essas instruções, a persona selecionada e o histórico da conversa. O modelo responde "no personagem".

Dá para inspecionar o prompt em uso clicando na engrenagem (⚙) no topo da interface.

| Item | Onde fica |
|------|-----------|
| System prompt | constante `SYSTEM_PROMPT` no `index.html` (documentado em `system_prompt_tino.md`) |
| Modelo | `gemini-2.5-flash` (constante `MODEL`) |
| Adaptação por persona | objeto `PERSONAS` |
| Proxy / chave | `cloudflare-worker.js`, com a chave guardada como secret no Worker |

## Proxy da API (Cloudflare Worker)

A chave do Gemini nunca fica no site. O arquivo `cloudflare-worker.js` é publicado como um Cloudflare Worker, que guarda a chave como variável secreta (`GEMINI_KEY`) e repassa as chamadas ao Gemini. O site aponta para a URL do Worker na constante `PROXY_URL` do `index.html`.

Resumo do deploy:
1. Em [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create Worker**, cole o conteúdo de `cloudflare-worker.js` e publique.
2. Em **Settings → Variables**, adicione um *secret* chamado `GEMINI_KEY` com a sua chave do Gemini.
3. Copie a URL do Worker e cole em `PROXY_URL` no `index.html`.

## Rodando localmente

Com o Worker já publicado, dê um duplo clique no `index.html`. As chamadas vão para o Worker, então funciona normalmente.

## Publicando no GitHub Pages

1. Crie um repositório público e envie o conteúdo desta pasta.
2. Em **Settings → Pages**, escolha a branch `main` / pasta `/ (root)` e salve.
3. Em ~1 minuto o site fica disponível em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

Depois de publicar, atualize a URL nas meta tags de preview (`og:image`, `og:url` e `twitter:image`) no topo do `index.html` para que a imagem de capa apareça ao compartilhar o link.

## Estrutura

```
index.html             interface + lógica + system prompt
system_prompt_tino.md  documentação do system prompt
preview.png            imagem de compartilhamento (Open Graph)
gerar_preview.py       script que gera a preview.png
```

## Equipe

Rafael Gustavo de França Lima · Felipe Antonelli Bueno · Ricardo Medeiros Marcato

---

> TINO é uma IA consultiva. As recomendações são orientativas e não substituem a análise de um profissional.
