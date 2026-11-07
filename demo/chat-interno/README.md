# Chat interno: prévia no navegador

Build estática do front-end do [Corporate_Chat_Platform](https://github.com/Olukasao/Corporate_Chat_Platform) em `public/apps/chat-interno/`,
com servidor simulado e dados fictícios (nada sai do navegador; marca de terceiros trocada por placeholders).

```bash
git clone https://github.com/Olukasao/Corporate_Chat_Platform.git && cd Corporate_Chat_Platform/frontend
git apply ../../curriculo-site/demo/chat-interno/chat-demo.patch
cp -r ../../curriculo-site/demo/chat-interno/src-demo src/demo
cp ../../curriculo-site/demo/chat-interno/{vite.demo.config.js,build.sh} .
npm ci && bash build.sh    # ajuste o destino do cp final em build.sh
# copie dist-demo para curriculo-site/public/apps/chat-interno
```
O login abre automático com `?auto` (ex.: `index.html?auto#/chat`).
