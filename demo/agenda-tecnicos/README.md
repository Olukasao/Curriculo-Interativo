# Agenda de técnicos: prévia no navegador

O painel original (`Agenda-de-tecnicos/public/index.html`, repositório privado) roda como está, sem servidor.
`entry.ts` simula `io()` e `fetch('/api/...')` com dados fictícios (reusa fixtures de `demo/workscape/src-demo`).
`build-demo.py` gera `public/apps/agenda-tecnicos/`: troca o script do socket.io pelo simulador, substitui nomes reais
do código, logos e marca por neutros. Nenhum backend, banco ou credencial é copiado.

```bash
cp ../workscape/src-demo/{fixtures.ts,fixtures3.ts} .   # fixtures usadas por entry.ts
esbuild entry.ts --bundle --format=iife --minify --outfile=demo-agenda.js
python build-demo.py   # ajuste os caminhos (origem = repo da agenda; destino = public/apps/agenda-tecnicos)
```
