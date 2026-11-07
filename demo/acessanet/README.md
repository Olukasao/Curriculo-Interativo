# AcessaNet: prévias do site e do app Android

Duas builds estáticas embutidas no portfólio em `public/apps/`:

- `acessanet-site/`: repositório Site_Acessa_Net, branch `feat/contratacao-online` (rotas por hash, base `/apps/acessanet-site/`).
- `acessanet-app/`: repositório AcessaNet-App-Android (a Central do Assinante), que importa o código do site via alias `@site`.

Nenhum dado real: a Central tem um modo demonstração embutido (CPF 123.456.789-09) que responde tudo no navegador,
e a API é apontada para `api.demo.invalid` nas duas builds. O app abre no login (`?logout`) com CPF/senha preenchidos, ou já logado com `?auto`. `app.demo-extra.js` (vai em `app/src/demo-extra.js`) acrescenta faturas, chamados e avisos fictícios à Central.

## Refazer
```bash
git clone https://github.com/Olukasao/Site_Acessa_Net.git acessanet-lab && cd acessanet-lab
git checkout feat/contratacao-online && npm ci
cp ../curriculo-site/demo/acessanet/site.vite.demo.config.js vite.demo.config.js
npx vite build --config vite.demo.config.js && rm -rf dist-demo/docs
cd .. && git clone https://github.com/Olukasao/AcessaNet-App-Android.git app && cd app && npm ci
cp ../curriculo-site/demo/acessanet/app.vite.demo.config.js vite.demo.config.js
npx vite build --config vite.demo.config.js
# copie os dist-demo para curriculo-site/public/apps/acessanet-site e acessanet-app
```
(O app precisa do site clonado ao lado, em `../acessanet-lab`.)
