// Função para cadastrar uma música
function addMusic() {
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const genre = document.getElementById('genre').value;
    const duration = document.getElementById('duration').value;
    const link = document.getElementById('link').value;
    const imageLink = document.getElementById('imageLink').value;

    // Validação da duração
    if (duration <= 0) {
        alert("A duração deve ser um número positivo.");
        return;
    }

    const music = {
        title,
        artist,
        genre,
        duration,
        link,
        imageLink // Adiciona o link da imagem
    };

    let musicList = JSON.parse(localStorage.getItem('musicList')) || [];
    musicList.push(music);
    localStorage.setItem('musicList', JSON.stringify(musicList));

    // Limpa o formulário
    document.getElementById('musicForm').reset();

    // Exibe mensagem de feedback
    alert("Música cadastrada com sucesso!");

    displayMusics(); // Atualiza a lista após adicionar uma nova música
}

// Função para exibir músicas cadastradas
function displayMusics() {
    const musicList = JSON.parse(localStorage.getItem('musicList')) || [];
    const musicListElement = document.getElementById('musicList');
    musicListElement.innerHTML = '';

    musicList.forEach((music, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${music.title}</strong> - ${music.artist} | Gênero: ${music.genre} | Duração: ${music.duration} min
            <br>
            <a href="${music.link}" target="_blank">Ouvir Música</a>
            <button onclick="removeMusic(${index})">Remover</button>
            ${music.imageLink ? `<img src="${music.imageLink}" alt="${music.title}" style="width: 50px; margin-left: 10px;">` : ''}
        `;
        musicListElement.appendChild(li);
    });
}

// Função para remover uma música
function removeMusic(index) {
    let musicList = JSON.parse(localStorage.getItem('musicList')) || [];
    musicList.splice(index, 1); // Remove a música do array
    localStorage.setItem('musicList', JSON.stringify(musicList)); // Atualiza o localStorage
    displayMusics(); // Atualiza a lista na tela
}

// Chama a função de exibir músicas ao carregar a página inicial
if (window.location.pathname.endsWith('index.html')) {
    window.onload = displayMusics;
}

// Adiciona um event listener ao formulário de cadastro
if (document.getElementById('musicForm')) {
    document.getElementById('musicForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addMusic();
    });
}

// Adiciona o event listener ao botão de limpar músicas
document.getElementById('clearMusicBtn')?.addEventListener('click', function() {
    localStorage.removeItem('musicList');
    displayMusics(); // Atualiza a lista na tela
});

// Função para exibir músicas cadastradas
function displayMusics() {
    const musicList = JSON.parse(localStorage.getItem('musicList')) || [];
    const musicListElement = document.getElementById('musicList');
    musicListElement.innerHTML = '';

    musicList.forEach((music, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${music.title}</strong> - ${music.artist} | Gênero: ${music.genre} | Duração: ${music.duration} min
            <br>
            <a href="${music.link}" target="_blank">Ouvir Música</a>
            <button onclick="removeMusic(${index})">Remover</button>
            ${music.imageLink ? `<img src="${music.imageLink}" alt="${music.title}" style="width: 130px; margin-left: 90px;">` : ''} <!-- Aumentado para 130px -->
        `;
        musicListElement.appendChild(li);
    });
}
