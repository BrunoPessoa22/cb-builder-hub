# cb-builder-hub

Landing + chatbot de aplicação + admin pra Builders Locais Cultura Builder.

**Live:** https://builder.brunopessoa.com

## Stack

- Next.js 15 + React 19 (standalone output)
- Tailwind CSS 3 + Geist Sans/Mono
- Storage: JSON files em `data/` (volume persistente no container)
- Basic auth no admin via env vars

## Dev

```bash
npm install
npm run dev   # localhost:3001
```

## Páginas

- `/` — landing
- `/aplicar` — chatbot de aplicação como builder local (~5 min, save incremental)
- `/contribuir` — submissão de conteúdo (Aulas vs Redes Sociais, remunerado)
- `/admin` — dashboard (basic auth via `ADMIN_USER` + `ADMIN_PASSWORD`)

## Storage

Arquivos JSON em `/app/data/` no container (volume Docker persistente):

- `applications.json` — aplicações de builder
- `contributions.json` — contribuições de conteúdo

Se quiser zerar: deletar os arquivos (admin recria vazio).

## Deploy (Coolify)

1. New Project → conecta este repo (`BrunoPessoa22/cb-builder-hub`)
2. Build pack: `Dockerfile`
3. Port: `3001`
4. Persistent storage: monta volume em `/app/data`
5. Env vars:
   - `ADMIN_USER=bruno`
   - `ADMIN_PASSWORD=<senha forte>`
6. Domain: `builder.brunopessoa.com` (DNS já aponta via wildcard `*.brunopessoa.com → 13.49.198.195`)
