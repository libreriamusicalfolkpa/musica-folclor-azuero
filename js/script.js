// --- script.js ---

// Cargar detalles del autor desde autores.json
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const autorNombre = params.get("autor");

  if (!autorNombre) return;

  fetch("autores.json")
    .then(res => res.json())
    .then(autores => {
      const autor = autores.find(a => a.nombre === autorNombre);
      if (!autor) return;

      document.getElementById("autor-nombre").textContent = autor.nombre;
      document.getElementById("autor-bio").textContent = autor.biografia;
      document.getElementById("autor-imagen").src = autor.imagen;
      
      // contador de visitas local
      let visitas = localStorage.getItem(`visitas_${autorNombre}`) || 0;
      visitas++;
      localStorage.setItem(`visitas_${autorNombre}`, visitas);
      document.getElementById("contador-visitas").textContent = visitas;

      // mostrar obras
      const lista = document.getElementById("lista-obras");
      autor.obras.forEach(obra => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${obra.titulo}</strong> — ${obra.genero}
          <div>
            <a href="${obra.pdf}" target="_blank">Ver partitura</a> |
            <a href="${obra.pdf}" download onclick="contarDescarga('${obra.titulo}')">Descargar</a>
            <span id="desc_${obra.titulo.replace(/\s/g, '')}">(descargas: 0)</span>
          </div>
        `;
        lista.appendChild(li);
      });
    });
});

// contador de descargas
function contarDescarga(titulo) {
  let key = `descargas_${titulo}`;
  let count = localStorage.getItem(key) || 0;
  count++;
  localStorage.setItem(key, count);
  document.getElementById(`desc_${titulo.replace(/\s/g, '')}`).textContent = `(descargas: ${count})`;
}

