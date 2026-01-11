// // API 1
// function buscar() {
//     const artista = document.getElementById("artista").value.trim();
//     const resultadosDiv = document.getElementById("resultados");
//     const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&entity=song&limit=10`;

//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         resultadosDiv.innerHTML = "";

//         if (data.results.length === 0) {
//             resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
//             return;
//         }

//         data.results.forEach(cancion => {
//             const div = document.createElement("div");
//             div.className = "item";

//             div.innerHTML = `
//                 <img src="${cancion.artworkUrl100}" alt="Portada">
//                 <div>
//                     <strong>${cancion.trackName}</strong><br>
//                     Artista: ${cancion.artistName}<br>
//                     Álbum: ${cancion.collectionName}<br>
//                     <audio controls src="${cancion.previewUrl}"></audio>
//                 </div>
//             `;

//             resultadosDiv.appendChild(div);
//         });
//     })
// }

async function buscar() {
    const artista = document.getElementById("artista").value.trim();
    const resultadosDiv = document.getElementById("resultados");
    const loading = document.getElementById("loading");

    if (!artista) return;

    loading.style.display = "block";
    resultadosDiv.innerHTML = "";

    const urlCanciones = `https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&entity=song&limit=6`;
    const urlAlbumes = `https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&entity=album&limit=4`;

    try {
        // LLAMADOS
        const [respCanciones, respAlbumes] = await Promise.all([
            fetch(urlCanciones),
            fetch(urlAlbumes)
        ]);

        const dataCanciones = await respCanciones.json();
        const dataAlbumes = await respAlbumes.json();

        loading.style.display = "none";

        if (dataCanciones.results.length === 0 && dataAlbumes.results.length === 0) {
            resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        // CANCIONES
        const seccionCanciones = document.createElement("div");
        seccionCanciones.innerHTML = "<h2>Canciones</h2>";
        
        dataCanciones.results.forEach(cancion => {
            const div = document.createElement("div");
            div.className = "item song-item";
            div.innerHTML = `
                <img src="${cancion.artworkUrl100}" alt="Portada">
                <div>
                    <strong>${cancion.trackName}</strong><br>
                    <span>${cancion.artistName}</span><br>
                    <audio controls src="${cancion.previewUrl}" class="audio-player"></audio>
                </div>
            `;
            seccionCanciones.appendChild(div);
        });

        // ALBUMES
        const seccionAlbumes = document.createElement("div");
        seccionAlbumes.innerHTML = "<h2>Álbumes Relacionados</h2>";
        seccionAlbumes.className = "seccion-albumes";

        dataAlbumes.results.forEach(album => {
            const div = document.createElement("div");
            div.className = "item album-item";
            div.innerHTML = `
                <img src="${album.artworkUrl100}" alt="Portada Álbum">
                <div>
                    <strong>${album.collectionName}</strong><br>
                    <span>Género: ${album.primaryGenreName}</span><br>
                    <span>Fecha: ${new Date(album.releaseDate).getFullYear()}</span>
                </div>
            `;
            seccionAlbumes.appendChild(div);
        });

        resultadosDiv.appendChild(seccionCanciones);
        resultadosDiv.appendChild(seccionAlbumes);

    } catch (error) {
        console.error("Error al obtener datos:", error);
        loading.style.display = "none";
        resultadosDiv.innerHTML = "<p>Hubo un error en la búsqueda.</p>";
    }
}

document.addEventListener('play', function(e) {
    const todosLosAudios = document.getElementsByTagName('audio');
    
    for (let i = 0; i < todosLosAudios.length; i++) {
        if (todosLosAudios[i] !== e.target) {
            todosLosAudios[i].pause();
        }
    }
}, true);



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