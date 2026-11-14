# Workspace 3D: demonstração viva no navegador

O Workspace 3D (repositório à parte, `Olukasao/Workspace-3d`) precisa de servidor, banco e conexão ao vivo. Para rodar embutido
no site sem nada disso, a branch `static-demo` do projeto traz um "servidor" dentro do navegador (`src/demo/`):

- responde às chamadas `/api/*` com capturas da API real (`fixtures.json`) e trata as ações em memória (chat com respostas dos
  colegas, acesso remoto e impressão simulados, troca 2D/3D, avatar, movimento no 2D);
- roda a **vida autônoma** (`shared/life.ts`): cada pessoa trabalha, digita, atende ligações e, movida por necessidades, anda até
  a copa, a impressora, o sofá, a TV, a sala de reunião ou a mesa de um colega, e volta. No 3D os avatares ganharam caminhada.

```bash
bash demo/workspace-3d/build.sh [caminho-do-Workspace-3d]   # gera public/apps/workspace-3d
```

`?auto=3d` e `?auto=2d` entram direto como administradora no modo pedido (usado por `/work/workspace-3d/live`).
`record.mjs` regrava vídeos do app real (não usados mais na página).
