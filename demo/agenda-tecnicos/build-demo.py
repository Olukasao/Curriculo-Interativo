import re, shutil, os, sys
src = "public/index.html"
out = "../serve/apps/agenda-tecnicos"
shutil.rmtree(out, ignore_errors=True)
os.makedirs(out + "/imgs")
html = open(src, encoding="utf8").read()
html = html.replace('<script src="/socket.io/socket.io.js?v=2"></script>', '<script src="./demo-agenda.js"></script>')
for nome in ["Claudinei", "Késio", "Kesio", "kesiooliveira", "Jeferson Dias", "jefersondias"]:
    html = html.replace(f'"{nome}"', '"Oculto"')
# Responsáveis pelos serviços: nomes reais do código viram nomes fictícios (os mesmos do chat de demonstração).
html = html.replace('const RESPONSAVEIS_SERVICOS_OPCOES = ["Rafael", "Ed", "Alexandre", "Pedro", "Diego", "Carlinhos"];', 'const RESPONSAVEIS_SERVICOS_OPCOES = ["Marina", "Rafael", "Beatriz", "Diego", "Camila", "Paulo"];')
html = html.replace('''            rafael: ["rafa", "rafael"],
            ed: ["ed", "eduardo"],
            alexandre: ["alexandre"],
            pedro: ["pedro"],
            diego: ["diego"],
            carlinhos: ["carlinhos", "carlos"]''', '''            marina: ["marina"],
            rafael: ["rafael"],
            beatriz: ["beatriz"],
            diego: ["diego"],
            camila: ["camila"],
            paulo: ["paulo"]''')
html = html.replace("./imgs/logo.ico", "./imgs/logo.svg").replace("./imgs/logo.png", "./imgs/logo.svg").replace("imgs/logo.png", "imgs/logo.svg")
for a, b in [("acessanet.sgp.net.br", "sgp.demo.invalid"), ("acessanet.com.br", "nexa.example"), ("Acessanet Telecom", "Nexa Telecom"),
             ("AcessaNet", "Nexa Telecom"), ("@acessanet", "@workscape"), ("Acessanet", "Nexa"), ("ACESSANET", "NEXA"), ("Dias Gestão", "Nexa Telecom")]:
    html = html.replace(a, b)
open(out + "/index.html", "w", encoding="utf8").write(html)
shutil.copy("demo/demo-agenda.js", out + "/demo-agenda.js")
shutil.copy("../ws/src/demo/brand/logo.svg", out + "/imgs/logo.svg")
print("ok", len(html))
