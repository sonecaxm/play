//document.getElementById = faz "caçar" a id que voce quer manipular
//innerText = comando que permite vc acessar o texto dentro da div
//querySelector: faz voce buscar oq vc tem na classe.
//let: muda os valores, true or false
// `${barwidth}%` : pega o valor da varivel e tranforma em texto
const songName = document.getElementById('music-name');
const bandname = document.getElementById('band-name');
const cover = document.getElementById('cover');
const song = document.getElementById('pardal');
const play = document.getElementById('play');
const next = document.getElementById('next');
const likeButton = document.getElementById('like');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const timeSong = document.getElementById('current-song');
const totalSong = document.getElementById('total-song');

// Variáveis de estado
let isPlaying = false;
let currentSong = 0;
let isShuffle = false;
let repeat = false;

// --- DADOS DA PLAYLIST ---
const kingofkings = {
    name: 'King of Kings',
    artist: 'Hillsong Worship',
    file: 'king_of_kings',
    liked:false
};

const whoyou = {
    name: 'Who You Say I Am',
    artist: 'Hillsong Worship',
    file: 'whosay',
    liked:false
};

const celebration = {
    name: 'Celebration',
    artist: 'Forrest Frank',
    file: 'celebration',
    liked: false
};

const pedro = {
    name: 'Pedro',
    artist: 'Salvaon',
    file: 'pedro',
    liked: false
}

const grato = {
    name: 'Grato',
    artist: 'Get Worship',
    file: 'grato',
    liked: false
}


const playlist = [kingofkings, whoyou, celebration, pedro, grato];
let shuffledPlaylist = [...playlist]; // Cria uma cópia da playlist original para embaralhar

// --- FUNÇÕES ---

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function PauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializesong() {
    // Carrega a imagem e as informações da música atual
    cover.src = `img/${shuffledPlaylist[currentSong].file}.png`;
    song.src = `audio/${shuffledPlaylist[currentSong].file}.mp3`;
    songName.innerText = shuffledPlaylist[currentSong].name;
    bandname.innerText = shuffledPlaylist[currentSong].artist;
   
    likeButtonRender();
    
}

function nextSong() {
    if (currentSong === shuffledPlaylist.length - 1) {
        currentSong = 0;
    } else {
        currentSong += 1;
    }
    initializesong();
    playSong();
}

function previousSong() {
    if (currentSong === 0) {
        currentSong = shuffledPlaylist.length - 1;
    } else {
        currentSong--;
    }
    initializesong();
    playSong();
}

function uptadeProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100; // cálculo para barra de progresso //
    currentProgress.style.setProperty('--progress', `${barWidth}%`); //acessa a propriedade do css para ser manipulada// 
    // //${barWidth}%: pega o valor da varivel e tranforma em texto//
    timeSong.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event){
  const width = progressContainer.clientWidth; // largura total da barra de progresso //
  const clickPosition = event.offsetX;  // posição da onde eu  cliquei na barra de progresso //
  const jumpToTime = (clickPosition / width) * song.duration; //calculo para descobrir o tempo da música que corresponde a posição do clique//
  song.currentTime = jumpToTime;
}

function shuffleArray(array) {
   const size = array.length; //tamanho do array//
   let currentIndex = size - 1; //começa pelo último elemento do array//
   while (currentIndex > 0) { //enquanto não chegar no primeiro elemento do array, continua embaralhando//
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));  //gera um número aleatório entre 0 e o índice atual//  
      const aux = array[currentIndex];
      array[currentIndex] = array[randomIndex]; //troca o elemento atual com um elemento aleatório do array//
      array[randomIndex] = aux;
      currentIndex -= 1; //vai para o próximo elemento indo para trás//
   }
}


function shuffleButtonClicked() { //função que é chamada quando o botão de shuffle é clicado//
    if (isShuffle === false) {
        isShuffle = true;
        shuffleArray(shuffledPlaylist);
        currentSong = 0; //volta para a primeira música da playlist embaralhada//
        initializesong();
        shuffleButton.classList.add('button-active'); //adiciona a classe "button-active" ao botão de shuffle para indicar que está ativo//
    } else {
        isShuffle = false;
        shuffledPlaylist = [...playlist]; //volta a ordem original da playlist//
        currentSong = 0; //volta para a primeira música da playlist//
        initializesong();
        shuffleButton.classList.remove('button-active'); //remove a classe "button-active" do botão de shuffle para indicar que não está mais ativo//
    }
}

function repeatButtonClicked(){
    if(repeat === false){
        repeat = true;
        repeatButton.classList.add('button-active'); //adiciona a classe "button-active" ao botão de repeat para indicar que está ativo//
    } else {
        repeat = false;
        repeatButton.classList.remove('button-active'); //remove a classe "button-active" do botão de repeat para indicar que não está mais ativo//
    }
}

function nextOrRepeat(){
    if (repeat ===false) {
        nextSong(); //vai para a próxima música da playlist//
    } else {
      playSong(); //reproduz a mesma música novamente//  
    }
}

    function toHHMMSS(originalNumber) {
    const hours = Math.floor(originalNumber / 3600);
    const min = Math.floor((originalNumber - hours * 3600) / 60);
    const sec = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}
    

 function updateTotalTime(){
        totalSong.innerText = toHHMMSS(song.duration);
    }


    function likeButtonRender(){
     if (shuffledPlaylist[currentSong].liked === true) {
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
  } else {
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');
  }
}

function likeButtonClicked() {
   if (shuffledPlaylist[currentSong].liked === false) {
    shuffledPlaylist[currentSong].liked = true;
  }else{
    shuffledPlaylist[currentSong].liked = false;
  }
    likeButtonRender();
}

initializesong();

// 2. Ouvintes de eventos
play.addEventListener('click', PauseDecider);
next.addEventListener('click', nextSong);
previous.addEventListener('click', previousSong);
song.addEventListener('timeupdate',uptadeProgressBar); //timeuptade: tempo de atualização da música//
song.addEventListener('ended', nextOrRepeat); //ended: evento que é disparado quando a música termina, nextOrRepeat: função que decide se vai para a próxima música ou repete a atual dependendo do estado do repeat/
song.addEventListener('loadedmetadata', updateTotalTime); //loadedmetadata: evento que é disparado quando os metadados da música são carregados, updateTotalTime: função que atualiza o tempo total da música na interface//
progressContainer.addEventListener('click', jumpTo); //click: evento de clique, jumpTo: função que faz a música pular para o tempo correspondente a posição do clique//
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click',repeatButtonClicked);
likeButton.addEventListener('click',likeButtonClicked);
