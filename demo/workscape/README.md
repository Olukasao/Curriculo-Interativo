# Workscape — demonstração no navegador

O site publica o front-end real do [Workscape_Platform](https://github.com/Olukasao/Workscape_Platform)
em `public/apps/workscape/`, rodando contra um servidor **simulado** com dados fictícios
(nenhuma requisição sai do navegador, nada do ambiente real é usado).

## Como a demo é feita

- Marca de terceiros: o `vite.demo.config.ts` troca logos, mascotes e vídeos por placeholders neutros e reescreve os textos (AcessaNet → Nexa Telecom).
- `src-demo/` entra em `src/demo/` do Workscape: fixtures fictícias (`fixtures.ts`), adaptador do axios (`mock.ts`),
  um `socket.io-client` falso (`fakeIo.ts`) e origens inválidas no lugar das reais (`agendaDeployment.ts`).
- `vite.demo.config.ts` troca `socket.io-client` e `agendaDeployment` pelos arquivos acima e gera `dist-demo/`.
- `workscape-demo.patch` liga o adaptador em `services/api.ts`, preenche o login e dispensa avisos em `main.tsx`.

## Atualizar

```bash
git clone https://github.com/Olukasao/Workscape_Platform.git && cd Workscape_Platform
git apply ../curriculo-site/demo/workscape/workscape-demo.patch
cp -r ../curriculo-site/demo/workscape/src-demo src/demo
cp ../curriculo-site/demo/workscape/vite.demo.config.ts .
npm ci && npx vite build --config vite.demo.config.ts
# neutraliza o IP interno e remove o manifesto com nomes de arquivos
rm -f dist-demo/local-integration.json
grep -rl "192\.168\.1\.133" dist-demo | xargs sed -i 's/192\.168\.1\.133/servidor.demo.invalid/g'
rm -rf ../curriculo-site/public/apps/workscape && cp -r dist-demo ../curriculo-site/public/apps/workscape
```
