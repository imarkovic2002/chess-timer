const speechSynthesis = window.speechSynthesis;

function speak(text) {
  if (speechSynthesis.speaking) {
    console.error("Govor je već u tijeku.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Definicija tajmera za oba igrača
let time1 = 300,
  time2 = 300; // 5 minuta za svakog igrača
let currentPlayer = 1; // Trenutni igrač koji ima potez
let interval;

function startTimer() {
  clearInterval(interval); // Osigurava da prethodni tajmeri budu zaustavljeni
  interval = setInterval(() => {
    if (currentPlayer === 1) {
      updateTime(1);
    } else {
      updateTime(2);
    }
  }, 1000);
}

function updateTime(player) {
  if (player === 1) {
    if (time1 <= 0) {
      clearInterval(interval);
      speak("Vrijeme igrača 2 je isteklo.");
      return;
    }
    // Govori preostalo vrijeme svakih 30 sekundi za igrača 1
    if (time1 % 30 === 0) {
      const minutes = Math.floor(time1 / 60);
      const seconds = time1 % 60;
      speak(
        `Igrač 2, preostalo vrijeme: ${minutes} minuta i ${
          seconds < 10 ? "0" : ""
        }${seconds} sekundi.`
      );
    }
    time1--;
    document.getElementById("timer2").textContent = formatTime(time1);
  } else if (player === 2) {
    if (time2 <= 0) {
      clearInterval(interval);
      speak("Vrijeme igrača 1 je isteklo.");
      return;
    }
    // Govori preostalo vrijeme svakih 30 sekundi za igrača 2
    if (time2 % 30 === 0) {
      const minutes = Math.floor(time2 / 60);
      const seconds = time2 % 60;
      speak(
        `Igrač 1, preostalo vrijeme: ${minutes} minuta i ${
          seconds < 10 ? "0" : ""
        }${seconds} sekundi.`
      );
    }
    time2--;
    document.getElementById("timer1").textContent = formatTime(time2);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes} minuta i ${seconds} sekundi`;
}

// Dodajemo događaje za klik na gumbove igrača
document.getElementById("player1-btn").addEventListener("click", () => {
  currentPlayer = 2; // Promijenimo na igrača 2
  startTimer();
});

document.getElementById("player2-btn").addEventListener("click", () => {
  currentPlayer = 1; // Promijenimo na igrača 1
  startTimer();
});
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("time-select")
    .addEventListener("change", function () {
      const selectedTime = parseInt(this.value, 10);
      // Postavi početno vrijeme za oba igrača na odabrano vrijeme
      time1 = time2 = selectedTime;
      // Ažuriraj prikaz vremena za oba igrača
      document.getElementById("timer1").textContent = formatTime(time1);
      document.getElementById("timer2").textContent = formatTime(time2);
    });
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    // Provjerava se je li već aktiviran tajmer igrača 1 kako bi se izbjeglo preklapanje
    if (currentPlayer !== 1) {
      currentPlayer = 1; // Postavi trenutnog igrača na igrača 1
      startTimer();
    }
    event.preventDefault(); // Sprečava defaultnu akciju za space (npr. skrolanje stranice)
  } else if (event.code === "Enter") {
    // Provjerava se je li već aktiviran tajmer igrača 2 kako bi se izbjeglo preklapanje
    if (currentPlayer !== 2) {
      currentPlayer = 2; // Postavi trenutnog igrača na igrača 2
      startTimer();
    }
    event.preventDefault(); // Sprečava defaultnu akciju za Enter
  }
});
