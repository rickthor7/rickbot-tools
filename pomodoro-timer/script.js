const timerLabel = document.getElementById('timer-label');
const timeDisplay = document.getElementById('time');
const startPauseButton = document.getElementById('start-pause-button');
const resetButton = document.getElementById('reset-button');
const alarmSound = document.getElementById('alarm-sound');

let isWorkSession = true;
let isRunning = false;
let timeRemaining = 25 * 60; // 25 minutes in seconds
let timerInterval;

// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Update timer display
function updateDisplay() {
    timeDisplay.textContent = formatTime(timeRemaining);
}

// Start or pause the timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Start';
    } else {
        startPauseButton.textContent = 'Pause';
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                updateDisplay();
            } else {
                alarmSound.play();
                switchSession();
            }
        }, 1000);
    }
    isRunning = !isRunning;
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseButton.textContent = 'Start';
    timeRemaining = isWorkSession ? 25 * 60 : 5 * 60;
    updateDisplay();
}

// Switch between work and break sessions
function switchSession() {
    isWorkSession = !isWorkSession;
    timerLabel.textContent = isWorkSession ? 'Work Session' : 'Break Session';
    timeRemaining = isWorkSession ? 25 * 60 : 5 * 60;
    updateDisplay();
}

// Initialize timer display
updateDisplay();

// Add event listeners
startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
