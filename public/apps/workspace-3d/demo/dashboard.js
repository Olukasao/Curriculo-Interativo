// Painel fictício para as TVs do modo demonstração. Nenhum dado real; nenhuma chamada de rede.
(function () {
  var kind = new URLSearchParams(location.search).get('painel') || 'rede';
  var panels = {
    rede: { title: 'Saúde da rede', tiles: [['Links ativos', '42 / 44', 'ok'], ['Latência média', '18 ms', 'ok'], ['Perda de pacotes', '0,4%', 'warn'], ['Alarmes abertos', '3', 'warn']] },
    chamados: { title: 'Fila de chamados', tiles: [['Em espera', '7', 'warn'], ['Em atendimento', '12', 'ok'], ['SLA hoje', '94%', 'ok'], ['Críticos', '1', 'bad']] },
  };
  var p = panels[kind] || panels.rede;
  document.getElementById('title').textContent = p.title + ' (demonstração)';
  var grid = document.getElementById('grid');
  p.tiles.forEach(function (t) {
    var d = document.createElement('div');
    d.className = 'tile';
    var s = document.createElement('small');
    s.textContent = t[0];
    var b = document.createElement('b');
    b.className = t[2];
    b.textContent = t[1];
    d.appendChild(s);
    d.appendChild(b);
    grid.appendChild(d);
  });
  var chart = document.createElement('div');
  chart.className = 'tile';
  chart.innerHTML = '<small>Últimas 12 horas</small>';
  var bars = document.createElement('div');
  bars.className = 'bars';
  for (var i = 0; i < 12; i++) {
    var bar = document.createElement('span');
    bar.style.height = 20 + ((i * 37) % 70) + '%';
    bars.appendChild(bar);
  }
  chart.appendChild(bars);
  grid.appendChild(chart);
  var clock = document.getElementById('clock');
  var tick = function () {
    clock.textContent = 'Atualizado às ' + new Date().toLocaleTimeString('pt-BR');
  };
  tick();
  setInterval(tick, 1000);
})();
