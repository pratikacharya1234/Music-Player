let songIndex = 0;
let audioStream = new Audio('lalkaree.mp3');
let masterplay = document.getElementById('masterplay');
let progress = document.getElementById('progressBar');
let gif = document.getElementById('giff');
let masterSongName = document.getElementById('masterSongName');
let searchInput = document.getElementById('searchInput');
let results = document.getElementById('results');

let songs = [
    {songName:"Lalkare", filepath:"lalkaree.mp3", coverPath:"lalkaree.jpg"},
    {songName:"Superman", filepath:"superman.mp3", coverPath:"superman.jpg"},
    {songName:"Nepali Anthem", filepath:"nepal.mp3", coverPath:"nepal.png"},
    {songName:"Wanna Be yours", filepath:"wana.mp3", coverPath:"wanna.jpg"},
    {songName:"Dandaleion", filepath:"dan.mp3", coverPath:"dan.jpg"},
    {songName:"Cheques", filepath:"cheques.mp3", coverPath:"cheq.jpg"},
    {songName:"Love story", filepath:"lover.mp3", coverPath:"lover.jpg"},
    {songName:"Starboy", filepath:"starboy.mp3", coverPath:"starboy.jpg"},
    {songName:"Moonlight", filepath:"moon.mp3", coverPath:"moon.jpg"},
    {songName:"Despacito", filepath:"de.mp3", coverPath:"des.jpg"},
    {songName:"Gassolina", filepath:"gas.mp3", coverPath:"gas.jpg"},
];

// Code to correctly set the songName and coverPath 
let songItems = Array.from(document.getElementsByClassName('songItem'));
songItems.forEach((element, i) => {
    let songName = element.querySelector(".songName");
    let img = element.querySelector("img");
    
    if (songName && img) {
        songName.innerText = songs[i].songName;
        img.src = songs[i].coverPath;
    }
})

// Play & pause song
masterplay.addEventListener('click', () => {
    if (audioStream.paused) {
        audioStream.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        // GIF
        gif.style.opacity = 1;
        console.log("Playing:", songs[songIndex].songName); // Log the currently playing song
    } else {
        audioStream.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        // GIF
        gif.style.opacity = 0;
        console.log("Paused:", songs[songIndex].songName); // Log the currently paused song
    }
})

// Progress bar
audioStream.addEventListener('timeupdate', () => {
    let progressbar = parseInt((audioStream.currentTime / audioStream.duration) * 100);
    progress.value = progressbar;
})

progress.addEventListener('change', () => {
    audioStream.currentTime = progress.value * audioStream.duration / 100;
})

// Function to toggle play/pause state of song items
const togglePlay = (clickedElement) => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        if (element === clickedElement) {
            if (element.classList.contains('fa-circle-play')) {
                element.classList.remove('fa-circle-play');
                element.classList.add('fa-circle-pause');
                audioStream.src = songs[parseInt(element.id)].filepath;
                audioStream.currentTime = 0;
                audioStream.play();
                masterplay.classList.remove('fa-circle-play');
                masterplay.classList.add('fa-circle-pause');
                masterSongName.innerText = songs[parseInt(element.id)].songName;
                gif.style.opacity = 1; // Show GIF
            } else {
                element.classList.remove('fa-circle-pause');
                element.classList.add('fa-circle-play');
                audioStream.pause();
                gif.style.opacity = 0; // Hide GIF
                masterSongName.innerText = songs[songIndex].songName;
            }
        } else {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    });
}

// Event listener for each song item
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        togglePlay(e.target);
        gif.style.opacity = 1;
    });
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 10) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioStream.src = songs[songIndex].filepath;
    audioStream.currentTime = 0;
    audioStream.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 10; // Set to the last song index when reaching the beginning
    } else {
        songIndex -= 1;
    }
    audioStream.src = songs[songIndex].filepath;
    audioStream.currentTime = 0;
    audioStream.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})


