function quiz(host, P) {
  let hechas = 0, buenas = 0;
  const marcador = document.createElement('p'); marcador.className = 'puntaje';
  const act = () => { marcador.textContent = 'Respondiste ' + hechas + ' de ' + P.length + '. Correctas: ' + buenas + '.'; };
  P.forEach((p, i) => {
    const q = document.createElement('div'); q.className = 'q';
    q.innerHTML = '<h3>' + (i + 1) + '. ' + p.q + '</h3>';
    const dev = document.createElement('p'); dev.className = 'dev'; dev.setAttribute('aria-live', 'polite');
    const bs = p.o.map((t, j) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'op'; b.textContent = t;
      b.onclick = () => {
        if (q.dataset.hecho) return; q.dataset.hecho = 1; hechas++;
        const bien = j === p.ok; if (bien) buenas++;
        bs.forEach((x, k) => { x.disabled = true; if (k === p.ok) x.classList.add('bien'); else if (k === j) x.classList.add('mal'); });
        dev.textContent = (bien ? 'Correcto. ' : 'No es esa. ') + p.e; act();
      };
      q.appendChild(b); return b;
    });
    q.appendChild(dev); host.appendChild(q);
  });
  const r = document.createElement('button'); r.type = 'button'; r.className = 'boton'; r.textContent = 'Volver a empezar';
  r.onclick = () => { host.innerHTML = ''; quiz(host, P); };
  host.append(marcador, r); act();
}
