let boton25 = document.getElementById("boton25")
let boton20 = document.getElementById("boton20")
let seccionPomodoro20 = document.getElementById("pomodoro20")
let seccionPomodoro25 = document.getElementById("pomodoro25")


boton25.addEventListener("click",function(){
    seccionPomodoro25.style.display="block";
    seccionPomodoro20.style.display="none";
})


boton20.addEventListener("click",function(){
    seccionPomodoro20.style.display="block";
    seccionPomodoro25.style.display="none";
})

//******************************************************* */
let pomodoro25 = {
    workMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    currentInterval: 0,
    intervals: [25, 5, 25, 5, 25, 15],
    minutes: 25,
    seconds: 0,
    isPaused: true,
    interval: null,

    startTimer: function() {
        if (this.isPaused) {
            this.isPaused = false;
            this.interval = setInterval(this.updateTimer.bind(this), 1000);
            changeBackgroundColor('#4c0027'); // Rojo oscuro para trabajo
        }
    },

    pauseTimer: function() {
        this.isPaused = true;
        clearInterval(this.interval);
    },

    resetTimer: function() {
        this.isPaused = true;
        clearInterval(this.interval);
        this.currentInterval = 0;
        this.minutes = this.intervals[this.currentInterval];
        this.seconds = 0;
        this.updateDisplay();
        changeBackgroundColor('#4c0027'); // Rojo oscuro para trabajo
    },

    skipSegment: function() {
        this.pauseTimer();
        this.currentInterval++;
        if (this.currentInterval >= this.intervals.length) {
            this.currentInterval = 0;
        }
        this.minutes = this.intervals[this.currentInterval];
        this.seconds = 0;
        this.updateDisplay();
        this.startTimer();
        if (this.currentInterval % 2 === 0) {
            changeBackgroundColor('#4c0027'); // Rojo oscuro para trabajo
        } else {
            changeBackgroundColor('#082032'); // Azul oscuro para descanso
        }
        playSound(); // Reproducir sonido al cambiar de segmento
        updateTitle(this.minutes, this.seconds); // Actualizar el título de la pestaña
    },

    updateTimer: function() {
        if (this.minutes === 0 && this.seconds === 0) {
            this.skipSegment();
        } else if (this.seconds === 0) {
            this.minutes--;
            this.seconds = 59;
        } else {
            this.seconds--;
        }
        this.updateDisplay();
        updateTitle(this.minutes, this.seconds); // Actualizar el título de la pestaña
    },

    updateDisplay: function() {
        let displayMinutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        let displaySeconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
        document.getElementById("timer1").textContent = displayMinutes + ":" + displaySeconds;
    }
};

let pomodoro20 = {
    workMinutes: 20,
    shortBreakMinutes: 5,
    currentInterval: 0,
    intervals: [20, 5, 20, 5],
    minutes: 20,
    seconds: 0,
    isPaused: true,
    interval: null,

    startTimer: function() {
        if (this.isPaused) {
            this.isPaused = false;
            this.interval = setInterval(this.updateTimer.bind(this), 1000);
            changeBackgroundColor('#4c0027'); // Rojo oscuro para trabajo
        }
    },

    pauseTimer: function() {
        this.isPaused = true;
        clearInterval(this.interval);
    },

    resetTimer: function() {
        this.isPaused = true;
        clearInterval(this.interval);
        this.currentInterval = 0;
        this.minutes = this.intervals[this.currentInterval];
        this.seconds = 0;
        this.updateDisplay();
        changeBackgroundColor('#4c0027'); // Rojo oscuro para trabajo
    },

    skipSegment: function() {
        this.pauseTimer();
        this.currentInterval++;
        if (this.currentInterval >= this.intervals.length) {
            this.currentInterval = 0;
        }
        this.minutes = this.intervals[this.currentInterval];
        this.seconds = 0;
        this.updateDisplay();
        this.startTimer();
        if (this.currentInterval % 2 === 0) {
            changeBackgroundColor('#4c0027'); // Rojo oscuro para trabajo
        } else {
            changeBackgroundColor('#082032'); // Azul oscuro para descanso
        }
        playSound(); // Reproducir sonido al cambiar de segmento
        updateTitle(this.minutes, this.seconds); // Actualizar el título de la pestaña
    },

    updateTimer: function() {
        if (this.minutes === 0 && this.seconds === 0) {
            this.skipSegment();
        } else if (this.seconds === 0) {
            this.minutes--;
            this.seconds = 59;
        } else {
            this.seconds--;
        }
        this.updateDisplay();
        updateTitle(this.minutes, this.seconds); // Actualizar el título de la pestaña
    },

    updateDisplay: function() {
        let displayMinutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        let displaySeconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
        document.getElementById("timer2").textContent = displayMinutes + ":" + displaySeconds;
    }
};

// Función para actualizar el título de la pestaña con el tiempo restante del temporizador
function updateTitle(minutes, seconds) {
    document.title = `${minutes}:${seconds} - Pomodoro Timer`;
}

function playSound() {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.type = 'triangle'; // Tipo de onda (puedes cambiarlo si lo deseas)
    oscillator.start();

    // Detener el sonido después de un tiempo (1 segundo en este caso)
    setTimeout(function() {
        oscillator.stop();
    }, 1000);
}

function changeBackgroundColor(color) {
    document.getElementById("main").style.backgroundColor = color;
}


