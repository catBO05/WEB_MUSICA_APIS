
function buscar() {
    const artista = document.getElementById("artista").value.trim();
    const resultadosDiv = document.getElementById("resultados");
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&entity=song&limit=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            resultadosDiv.innerHTML = "";

            if (data.results.length === 0) {
                resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
                return;
            }

            data.results.forEach(cancion => {
                const div = document.createElement("div");
                div.className = "item";

                div.innerHTML = `
                    <img src="${cancion.artworkUrl100}" alt="Portada">
                    <div>
                        <strong>${cancion.trackName}</strong><br>
                        Artista: ${cancion.artistName}<br>
                        Álbum: ${cancion.collectionName}<br>
                        <audio controls src="${cancion.previewUrl}"></audio>
                    </div>
                `;

                resultadosDiv.appendChild(div);
            });
        })
}