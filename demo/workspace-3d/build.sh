#!/usr/bin/env bash
# Workspace 3D: versão que roda 100% no navegador (sem servidor), para public/apps/workspace-3d.
# O app real (repositório à parte, branch static-demo) tem um "servidor" embutido em src/demo: as respostas vêm de capturas da API
# real e a vida do escritório (bots andando, conversando, tomando café) é simulada no próprio navegador, em 2D e em 3D.
#
#   bash demo/workspace-3d/build.sh [caminho-do-Workspace-3d]
set -euo pipefail
SRC="${1:-../Workspace-3d}"
HERE="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$HERE/public/apps/workspace-3d"
export MSYS_NO_PATHCONV=1
cd "$SRC"
VITE_STATIC_DEMO=1 VITE_BASE=/apps/workspace-3d/ npx vite build --outDir dist-static
node tools/static-demo/finalize.mjs dist-static /apps/workspace-3d
rm -rf "$OUT" && mkdir -p "$OUT"
cp -r dist-static/. "$OUT/"
du -sh "$OUT"
