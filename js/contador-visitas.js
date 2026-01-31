(function () {
  const namespace = "libreriamusicalfolkpa";
  const key = "visitas_totales";

  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(r => r.json())
    .then(data => {
      const el = document.getElementById("contador-visitas");
      if (el) el.textContent = data.value.toLocaleString("es-PA");
    })
    .catch(() => {
      const el = document.getElementById("contador-visitas");
      if (el) el.textContent = "—";
    });
})();
