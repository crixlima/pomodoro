document.addEventListener('DOMContentLoaded', function() {
    let minutesDisplay = document.getElementById('minutos');
    let secondsDisplay = document.getElementById('segundos');
    let startButton = document.getElementById('start');
    let resetButton = document.getElementById('reset');
    let pauseButton = document.getElementById('pause');
    let alarmSound = document.getElementById('alarmSound');

    let pomodoroDuration = 25 * 60; // 25 minutos em segundos
    let tempoRestante = pomodoroDuration;
    let isRunning = false;
    let intervalo;

    function startPomodoro() {
        if (isRunning) return; // Evita múltiplos timers simultâneos
        isRunning = true;

        intervalo = setInterval(() => { 
            if (tempoRestante <= 0) {
                clearInterval(intervalo);
                alarmSound.play();
                alert('O tempo acabou!');
                resetPomodoro();
            } else {
                tempoRestante--;
                updateDisplay(); 
            }
        }, 1000);
    }

    function pausePomodoro() {
        if (!isRunning) return; // Não faz nada se o timer não estiver rodando
        clearInterval(intervalo);
        isRunning = false;
    }

    function resetPomodoro() {
        clearInterval(intervalo);
        isRunning = false;
        tempoRestante = pomodoroDuration;
        updateDisplay();
    }

    function updateDisplay() {
        let minutes = Math.floor(tempoRestante / 60);
        let seconds = tempoRestante % 60;

        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    // Eventos para os botões
    startButton.addEventListener('click', startPomodoro);
    resetButton.addEventListener('click', resetPomodoro);
    pauseButton.addEventListener('click', pausePomodoro);
});


        