const hh = document.getElementById('prevRaceTimeHH');
const mm = document.getElementById('prevRaceTimeMM');
const ss = document.getElementById('prevRaceTimeSS');
const msg = document.getElementById('messageBox');
const btnCalc = document.getElementById('btnCalc');
const btnReset = document.getElementById('btnReset');
const fullForm = document.getElementById('previousTime');

let timeInSeconds = 0;
let hours, minutes, seconds;

btnCalc.addEventListener('click', calculate);
btnReset.addEventListener('click', clear);

function calculate() {
  getNumbersFromInputs();
  if (checkTimeInputs()) {
    convertToSeconds(hours, minutes, seconds);
    msg.textContent = '';
    addMessage(`Your time in seconds is ${timeInSeconds}`);
    addMessage(`\nConverted to time format: ${convertToTimeFormat(convertToSeconds(hours, minutes, seconds))}`)
  }
}

function checkTimeInputs() {
  let validNumbers = hours > 0 && hours < 25 && minutes < 60 && minutes > 0 && seconds > 0 && seconds < 60;
  if (validNumbers || !hh.value) {
    return true;
  } else {
    clearMessage();
    if (hours < 0) {
      addMessage(`${hours} hours? Please show me your time machine!\n`)
    }

    if (hours > 23) {
      addMessage(`${hours} hours? I can't compute races that take longer than a day.`)
    }

    if (minutes > 59 || minutes < 0) {
      addMessage(`${minutes} minutes? That ain't right. Enter a number from 0 to 59.`)
    }

    if (seconds > 59 || seconds < 0) {
      addMessage(`${seconds} seconds? Impossible! Enter a number from 0 to 59.`)
    }
    return false;
  }
}

function convertToSeconds(h, m, s) {
  if (!h || hours < 1) {
    timeInSeconds = (m * 60) + s;
  } else if (!m) {
    addMessage('Minutes required.');
    return false;
  } else {
    timeInSeconds = (h * 3600) + (m * 60) + s;
    return timeInSeconds;
  }
}

// Add extra zeroes -- NUMBERS STILL AREN'T SHOWING UP CORRECTLY
function convertToTimeFormat(totalSeconds) {
  let hoursFromSec, minutesFromSec, secondsFromSec;

  if (totalSeconds >= 3600) {
    hoursFromSec = Math.trunc(totalSeconds / 3600);
    minutesFromSec = Math.trunc((totalSeconds % 3600) / 60);
    secondsFromSec = Math.trunc((totalSeconds % 3600) % 60);

    timeFormat = `${hoursFromSec}:` +
      `${minutesFromSec < 10 ? '0' + minutesFromSec : minutesFromSec}:` +
      `${secondsFromSec < 10 ? '0' + secondsFromSec : secondsFromSec}`;
  } else if (totalSeconds >= 60) {
    minutesFromSec = Math.trunc(totalSeconds / 60);
    secondsFromSec = totalSeconds % 60;

    timeFormat = `${minutesFromSec}:` +
      `${secondsFromSec < 10 ? '0' + secondsFromSec : secondsFromSec}`;
  } else {
    timeFormat = `00:${totalSeconds}`;
  }
  return timeFormat;
}

// Makes sure the inputs are converted to numbers
function getNumbersFromInputs() {
  hours = Number(hh.value);
  minutes = Number(mm.value);
  seconds = Number(ss.value);
}

function addMessage(message) {
  msg.textContent += message;
  msg.classList.remove('hidden');
}

function clearMessage() {
  msg.textContent = '';
  msg.classList.add('hidden');
}

function clear() {
  clearMessage();
  fullForm.reset();
}