const audioPlayer = document.querySelector('.audio-player');
const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress-container');
const progressLine = document.querySelector('.progress-line');
const currentDesc = document.querySelector('.current-desc');
const currentCoverImg = document.querySelector('.cover-img');
const currentSong = document.querySelector('.current-song');
const currentPerformer = document.querySelector('.current-performer');
const buttonSwitcher = document.querySelector('.button-play-img');
const overlayImage = document.querySelector('.overlay-img');
const currentTimeSong = document.querySelector('.current-time');
const durationSong = document.querySelector('.duration');


const songs = ['Don\'t Hurt Yourself', 'Don\'t start now', 'The Brightside', 'After Dark'];// songs names
const performers = ['Beyonce', 'Dua Lipa', 'Lil Peep', 'Mr. Kitty'];
let songDef = 0; //default song

function prepareSong (song) {
    currentSong.innerHTML = song;
    currentPerformer.innerHTML = performers[songDef];
    audio.src = `./assets/audio/${song}.mp3`;
    currentCoverImg.src = `./assets/img/cover${songDef + 1}.png`;
    overlayImage.src = `./assets/img/cover${songDef + 1}.png`;
}
prepareSong(songs[songDef]);

function playSong () {
    audioPlayer.classList.add('play');
    currentCoverImg.classList.add('active');
    buttonSwitcher.src = `./assets/img/pause.png`;
    audio.play ();
}

function pauseSong () {
    audioPlayer.classList.remove('play');
    currentCoverImg.classList.remove('active');
    buttonSwitcher.src = `./assets/img/play.png`;
    audio.pause ();
}

playButton.addEventListener ('click', () => {
    const isSongPlay = audioPlayer.classList.contains('play');
    if (isSongPlay) {
        pauseSong ();
    } else {
        playSong ();
    }
});

function nextSong () {
    songDef++;
    if (songDef > songs.length - 1) {
        songDef = 0;
    }
    prepareSong(songs[songDef]);
    playSong ();
}
nextButton.addEventListener ('click', nextSong);

function prevSong () {
    songDef--;
    if (songDef < 0) {
        songDef = songs.length - 1;
    }
    prepareSong(songs[songDef]);
    playSong ();
}
prevButton.addEventListener ('click', prevSong);

function statusBar (e) {
    const {duration, currentTime} = e.srcElement;
    const statusPercent = (currentTime / duration) * 100;
    progressLine.style.width = `${statusPercent}%`;
    const songDur = parseInt(duration);
    const mins = parseInt(duration / 60);
    const secs = parseInt(duration % 60);
    durationSong.innerHTML = mins + ":" + secs;
    const songCurrTime = parseInt(currentTime);
    let minsCur = parseInt(currentTime / 60);
    let secsCur = parseInt(currentTime % 60);
    if (secsCur < 10) {
        secsCur = "0" + secsCur;
    }
    currentTimeSong.innerHTML = minsCur + ":" + secsCur;
}



audio.addEventListener('timeupdate', statusBar);

function rewindSong (e) {
    const lineWidt = this.clientWidth;
    const clickPlaceX = e.offsetX;
    const songDuration = audio.duration;
    
    audio.currentTime = (clickPlaceX / lineWidt) * songDuration;
}
progressContainer.addEventListener('click', rewindSong);


audio.addEventListener('ended', nextSong);
