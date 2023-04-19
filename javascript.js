const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');
const startPauseButton = document.getElementById('start-pause-button');
const timeInput = document.getElementById('time-input');
const changeTimeButton = document.getElementById('change-time-button');

let timeInSeconds = getTimeInSeconds(timeInput.value);
let timerInterval;

function updateTimeDisplay() {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  timerDisplay.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!timerInterval) {
    if (timeInSeconds === 0) {
      timeInSeconds = getTimeInSeconds(timeInput.value);
    }
    timerInterval = setInterval(() => {
      timeInSeconds--;
      updateTimeDisplay();
      if (timeInSeconds <= 0) {
        clearInterval(timerInterval);
        startPauseButton.innerText = 'Start';
        timeInput.disabled = false;
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeInSeconds = getTimeInSeconds(timeInput.value);
  updateTimeDisplay();
  startPauseButton.innerText = 'Start';
  timeInput.disabled = false;
}

function changeTime() {
  timeInSeconds = getTimeInSeconds(timeInput.value);
  updateTimeDisplay();
  resetTimer();
}

function getTimeInSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

resetButton.addEventListener('click', resetTimer);
startPauseButton.addEventListener('click', () => {
  if (timerInterval) {
    pauseTimer();
    startPauseButton.innerText = 'Start';
    timeInput.disabled = false;
  } else {
    startTimer();
    startPauseButton.innerText = 'Pause';
    timeInput.disabled = true;
  }
});
changeTimeButton.addEventListener('click', changeTime);

updateTimeDisplay();