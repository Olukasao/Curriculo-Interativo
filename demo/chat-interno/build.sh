set -e
npx vite build --config vite.demo.config.js >/dev/null
mkdir -p dist-demo/design-system/brand && cp src/demo/brand/logo.svg dist-demo/design-system/brand/acessanet-logo.svg
rm -rf dist-demo/videos dist-demo/email-signatures dist-demo/aviso-app-intranet.js
grep -rl "192\.168\.1\.133" dist-demo | xargs -r sed -i 's/192\.168\.1\.133/servidor.demo.invalid/g'
rm -rf ../../serve/apps/chat-interno && cp -r dist-demo ../../serve/apps/chat-interno
rm -rf dist-demo/design-system/DESIGN.md dist-demo/design-system/brand
mkdir -p dist-demo/design-system/brand && cp src/demo/brand/logo.svg dist-demo/design-system/brand/acessanet-logo.svg
sed -i 's/AcessaNet/Nexa/g; s/Acessanet/Nexa/g; s/ACESSANET/NEXA/g' dist-demo/design-system/acessanet-ds.css
rm -rf ../../serve/apps/chat-interno && cp -r dist-demo ../../serve/apps/chat-interno
