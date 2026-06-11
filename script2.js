/* CARROSSEL */

const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll("#dots span");

let currentSlide = 0;
let startX = 0;
let endX = 0;

function showSlide(index) {
  currentSlide = index;

  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));

  if (dots[currentSlide]) {
    dots[currentSlide].classList.add("active");
  }
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  } else {
    showSlide(0);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  } else {
    showSlide(slides.length - 1);
  }
}

/* Swipe celular */
carousel.addEventListener("touchstart", function(e) {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", function(e) {
  endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextSlide();
  }

  if (endX - startX > 50) {
    prevSlide();
  }
});

/* Arrastar no computador */
carousel.addEventListener("mousedown", function(e) {
  startX = e.clientX;
});

carousel.addEventListener("mouseup", function(e) {
  endX = e.clientX;

  if (startX - endX > 50) {
    nextSlide();
  }

  if (endX - startX > 50) {
    prevSlide();
  }
});

/* Bolinhas clicáveis */
dots.forEach((dot, index) => {
  dot.addEventListener("click", function() {
    showSlide(index);
  });
});

showSlide(0);


/* MÚSICA */

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const progress = document.getElementById("progress");
const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

const songs = [
  {
    title: "16. Assassinos de Saudade",
    artist: "BACO EXU DO BLUES",
    file: "musica1.mp3"
  },
  {
    title: "17. Nossa Música",
    artist: "PLAYLIST DO AMOR",
    file: "musica2.mp3"
  },
  {
    title: "18. Velhos Românticos",
    artist: "MARIA E LEONARDO",
    file: "musica3.mp3"
  }
];

let currentSong = 0;

function loadSong(index) {
  audio.src = songs[index].file;
  songTitle.textContent = songs[index].title;
  artistName.textContent = songs[index].artist;
  progress.value = 0;
  currentTimeText.textContent = "0:00";
  durationText.textContent = "0:00";
  playBtn.textContent = "▶";
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

function nextSong() {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";
}

function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸";
}

playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("loadedmetadata", function() {
  durationText.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", function() {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeText.textContent = formatTime(audio.currentTime);
  }
});

progress.addEventListener("input", function() {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", nextSong);

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

loadSong(currentSong);


/* CONTADOR DESDE 18 DE ABRIL DE 2025 */
function updateCounter() {

    const startDate = new Date("2025-04-18T00:00:00");
    const now = new Date();

    let diff = now - startDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    diff -= years * (1000 * 60 * 60 * 24 * 365.25);

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));

    diff -= months * (1000 * 60 * 60 * 24 * 30.44);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));

    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));

    diff -= minutes * (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);



let fotosSalvas = JSON.parse(localStorage.getItem("fotosMemorias")) || [];

function adicionarFoto() {
  const input = document.getElementById("fotoMemoria");
  const arquivo = input.files[0];

  if (!arquivo) {
    alert("Escolha uma foto primeiro ❤️");
    return;
  }

  const leitor = new FileReader();

  leitor.onload = function(e) {
    fotosSalvas.push(e.target.result);
    localStorage.setItem("fotosMemorias", JSON.stringify(fotosSalvas));
    mostrarFotos();
    input.value = "";
  };

  leitor.readAsDataURL(arquivo);
}

function mostrarFotos() {
  const galeria = document.getElementById("galeriaTrios");
  galeria.innerHTML = "";

  for (let i = 0; i < fotosSalvas.length; i += 3) {
    const trio = document.createElement("div");
    trio.className = "trio";

    const grupo = fotosSalvas.slice(i, i + 3);

    grupo.forEach(foto => {
      const img = document.createElement("img");
      img.src = foto;
      trio.appendChild(img);
    });

    galeria.appendChild(trio);
  }
}

mostrarFotos();


const toggleMessage =
document.getElementById("toggleMessage");

const messageContent =
document.getElementById("messageContent");

if(toggleMessage){

    toggleMessage.addEventListener("click", () => {

        messageContent.classList.toggle("expanded");

        if(
            messageContent.classList.contains("expanded")
        ){

            toggleMessage.innerHTML = "⌃";

        }else{

            toggleMessage.innerHTML = "⌄";

        }

    });

}