// Prévia no portfólio: dados extras para a Central do Assinante (modo demonstração), 100% fictícios.
try {
  if (location.search.includes("logout")) {
    for (const k of ["acessanet.customer.accessToken", "acessanet.customer.refreshToken"]) localStorage.removeItem(k);
  }
  // Conta de demonstração já com senha: o login pede só CPF e senha (sem código por e-mail).
  sessionStorage.setItem("acessanet.demo.passwordSet", "1");
} catch { /* sem armazenamento */ }

const iso = (days) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString(); };
const day = (days) => iso(days).slice(0, 10);

const invoice = (n, status, due, paid) => ({
  id: `demo-fatura-${n}`, number: String(n).padStart(6, "0"), status, amount: 99.9, dueDate: iso(due), ...(paid ? { paidAt: iso(paid) } : {}),
  barcode: "00190.00009 01234.567890 12345.678901 2 99990000009990",
  pixCopyPaste: "00020126580014br.gov.bcb.pix0136demo-pix-nao-e-real520400005303986540599.905802BR5909NEXA DEMO6009SAO PAULO62070503***6304ABCD",
  printUrl: "https://boleto.demo.invalid/fatura/" + n
});

const tickets = () => [
  {
    id: "demo-chamado-3", protocol: "20260711-1043", title: "Internet lenta", status: "IN_PROGRESS", statusInterno: "open", contractId: "demo-contrato-800",
    createdAt: iso(-2), openedAt: iso(-2), updatedAt: iso(-1), preferredPeriod: "MORNING",
    appointment: { date: day(1), windowStart: "08:00", windowEnd: "12:00" }
  },
  { id: "demo-chamado-2", protocol: "20260610-0877", title: "Troca de senha do roteador", status: "RESOLVED", statusInterno: "closed", contractId: "demo-contrato-800", createdAt: iso(-40), openedAt: iso(-40), updatedAt: iso(-39) },
  { id: "demo-chamado-1", protocol: "20260502-0412", title: "Sem internet", status: "RESOLVED", statusInterno: "closed", contractId: "demo-contrato-800", createdAt: iso(-98), openedAt: iso(-98), updatedAt: iso(-97) }
];

globalThis.__demoExtra = (method, fullPath) => {
  const path = fullPath.split("?")[0];
  if (method === "GET" && /^\/v1\/contracts\/[^/]+\/invoices$/.test(path)) {
    const id = path.split("/")[3];
    return {
      contractId: id,
      invoices: [invoice(8, "OPEN", 18), invoice(7, "PAID", -12, -13), invoice(6, "PAID", -42, -43), invoice(5, "PAID", -72, -72), invoice(4, "PAID", -102, -103), invoice(3, "PAID", -132, -133)],
      updatedAt: iso(0), source: "mock"
    };
  }
  if (method === "GET" && /^\/v1\/contracts\/[^/]+\/billing$/.test(path)) {
    return { contractId: path.split("/")[3], status: "OPEN", nextDueDate: iso(18), dueDay: 10, maxDaysLate: 0, updatedAt: iso(0), source: "mock" };
  }
  if (method === "GET" && path === "/v1/support/tickets") return tickets();
  if (method === "GET" && path === "/v1/notices/active") {
    return [
      { id: "aviso-1", type: "info", title: "Wi-Fi 6 na sua casa", message: "Peça a troca do seu roteador por um Wi-Fi 6 sem custo de instalação. Fale com o atendimento.", dismissible: true },
      { id: "aviso-2", type: "warning", title: "Manutenção programada", message: "Domingo, das 02h às 04h, haverá manutenção preventiva na rede da sua região.", dismissible: true }
    ];
  }
  return undefined;
};
