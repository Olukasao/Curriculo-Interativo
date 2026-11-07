// Roda antes de todo o resto (primeiro import de main.tsx): estado inicial da demonstração.
try {
  // Dispensa avisos de novidade e convites de tour para abrir direto no produto.
  localStorage.setItem("workspace:novidade:telefone-zero:v1", "1");
  for (const tipo of ["visto", "convite"]) localStorage.setItem(`workspace-tour:ia-v1:${tipo}:1`, "1");
  // ?auto abre já logado (atalhos do portfólio levam direto a um módulo, ex.: #/chat).
  if (location.search.includes("auto")) sessionStorage.setItem("token", "demo-token");
} catch { /* sem armazenamento */ }
export {};
