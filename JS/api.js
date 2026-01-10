// API 1
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

// API 2
function buscar() {
    const artista = document.getElementById("artista").value.trim();
    const resultadosDiv = document.getElementById("resultados");
    const detalleDiv = document.getElementById("detalle");

    resultadosDiv.innerHTML = "";
    detalleDiv.innerHTML = "";

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&entity=song&limit=10`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.results.length === 0) {
            resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        data.results.forEach(cancion => {
            const div = document.createElement("div");
            div.style.border = "1px solid #ccc";
            div.style.margin = "10px";
            div.style.padding = "10px";

            div.innerHTML = `
                <img src="${cancion.artworkUrl100}" alt="Portada"><br>
                <strong>${cancion.trackName}</strong><br>
                Artista: ${cancion.artistName}<br>
                Álbum: ${cancion.collectionName}<br>
                <button onclick="verAlbum(${cancion.collectionId}, '${cancion.collectionName}')">
                    Ver álbum
                </button>
            `;

            resultadosDiv.appendChild(div);
        });
    });
}

function verAlbum(albumId, albumName) {
    const detalleDiv = document.getElementById("detalle");
    detalleDiv.innerHTML = `<h2>${albumName}</h2>`;

    const url = `https://itunes.apple.com/lookup?id=${albumId}&entity=song`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.results
            .filter(item => item.wrapperType === "track")
            .forEach(track => {
                const p = document.createElement("p");
                p.innerHTML = `
                    🎵 ${track.trackName}<br>
                    <audio controls src="${track.previewUrl}"></audio>
                `;
                detalleDiv.appendChild(p);
            });
    });
}



// VARIABLES DE LOS APIS
let allTracks = [];
let currentGenre = 'all';

async function buscar() {
    const artista = document.getElementById('artista').value.trim();
    if (!artista) {
        alert('Por favor, ingresa un artista o canción para buscar');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultados').innerHTML = '';

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&media=music&limit=50`);
        const data = await response.json();
        
        allTracks = data.results || [];
        mostrarResultados(allTracks);
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('resultados').innerHTML = `
            <div class="no-results">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>Error de conexión</h3>
                <p>No pudimos conectar con iTunes. Intenta nuevamente.</p>
            </div>
        `;
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

// MODIFICAR ESTILOS CSS
function mostrarResultados(tracks) {
    const resultadosDiv = document.getElementById('resultados');
    
    if (!tracks || tracks.length === 0) {
        resultadosDiv.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>No encontramos resultados</h3>
                <p>Intenta con otro artista o canción.</p>
            </div>
        `;
        return;
    }

    let html = '<div class="results-grid">';
    
    tracks.forEach(track => {
        const previewUrl = track.previewUrl;
        const trackTime = track.trackTimeMillis ? 
            Math.floor(track.trackTimeMillis / 60000) + ':' + 
            ('0' + Math.floor((track.trackTimeMillis % 60000) / 1000)).slice(-2) : '--:--';
        
        html += `
            <div class="track-card fade-in">
                <div class="album-art">
                    ${track.artworkUrl100 ? 
                        `<img src="${track.artworkUrl100.replace('100x100', '300x300')}" alt="${track.collectionName}" style="width: 100%; height: 100%; object-fit: cover;">` :
                        `<i class="fas fa-music"></i>`
                    }
                </div>
                <div class="track-info">
                    <div class="track-name" title="${track.trackName}">${track.trackName}</div>
                    <div class="artist-name" title="${track.artistName}">${track.artistName}</div>
                    <div class="album-name" title="${track.collectionName}">${track.collectionName}</div>
                    
                    <div class="track-meta">
                        <span>${track.primaryGenreName || 'Música'}</span>
                        <span>${trackTime}</span>
                    </div>
                    
                    ${previewUrl ? `
                        <audio controls preload="none" style="width: 100%; margin-top: 10px;">
                            <source src="${previewUrl}" type="audio/mpeg">
                            Tu navegador no soporta audio.
                        </audio>
                    ` : `
                        <button class="preview-btn" style="margin-top: 10px; opacity: 0.5;" disabled>
                            <i class="fas fa-play"></i> Sin vista previa
                        </button>
                    `}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    resultadosDiv.innerHTML = html;
}

function buscarEjemplo(artista) {
    document.getElementById('artista').value = artista;
    buscar();
}

function filtrarPorGenero(genero) {
    currentGenre = genero;
    
    document.querySelectorAll('.genre-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (genero === 'all') {
        mostrarResultados(allTracks);
    } else {
        const filtered = allTracks.filter(track => 
            track.primaryGenreName && 
            track.primaryGenreName.toLowerCase().includes(genero.toLowerCase())
        );
        mostrarResultados(filtered);
    }
}

// Permitir buscar con Enter
document.getElementById('artista').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscar();
    }
});

// Mostrar mensaje de bienvenida inicial
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resultados').innerHTML = `
        <div class="no-results">
            <i class="fas fa-headphones-alt" style="font-size: 3rem; margin-bottom: 20px; color: var(--primary);"></i>
            <h3>¡Bienvenido al Buscador de Música!</h3>
            <p>Comienza buscando tu artista o canción favorita.</p>
            <p style="font-size: 0.9rem; margin-top: 10px; color: var(--gray-dark);">
                Utiliza los ejemplos arriba o escribe tu propia búsqueda
            </p>
        </div>
    `;
});