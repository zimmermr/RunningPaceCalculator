const hh = document.getElementById('prevRaceTimeHH');
const mm = document.getElementById('prevRaceTimeMM');
const ss = document.getElementById('prevRaceTimeSS');
const msg = document.getElementById('messageBox');
const btnCalc = document.getElementById('btnCalc');
const btnReset = document.getElementById('btnReset');
const fullForm = document.getElementById('previousTime');

let timeInSeconds = 0;

btnCalc.addEventListener('click', calculate);
btnReset.addEventListener('click', clear);

function calculate() {
  if (checkTimeInputs()) {
    convertToSeconds(hh.value, mm.value, ss.value);
    msg.textContent = '';
    addMessage(`Your time in seconds is ${timeInSeconds}`);
    addMessage(`Converted to time format: ${convertToTimeFormat(convertToSeconds(hh.value, mm.value, ss.value))}`)
  }
}

function checkTimeInputs() {
  if (hh.value > 0 && hh.value < 25 && mm.value < 60 && mm.value > 0 && ss.value > 0 && ss.value < 60) {
    return true;
  } else {
    clearMessage();
    if (hh.value < 0) {
      addMessage(`${hh.value} hours? Please show me your time machine!\n`)
    }

    if (hh.value > 23) {
      addMessage(`${hh.value} hours? I can't compute races that take longer than a day.`)
    }

    if (mm.value > 59 || mm.value < 0) {
      addMessage(`${mm.value} minutes? That ain't right. Enter a number from 0 to 59.`)
    }

    if (ss.value > 59 || ss.value < 0) {
      addMessage(`${ss.value} seconds? Impossible! Enter a number from 0 to 59.`)
    }
    return false;
  }
}

// FIX THIS
function convertToSeconds(hours, minutes, seconds) {
  if (hours === null || hours < 1) {
    timeInSeconds = (minutes * 60) + seconds;
  } else if (minutes === null) {
    addMessage('Minutes required.');
    return false;
  } else {
    timeInSeconds = (hours * 3600) + (minutes * 60) + (seconds * 1);
    return timeInSeconds;
  }

}

// FIX THIS
function convertToTimeFormat(totalSeconds) {
  if (totalSeconds >= 3600) {
    timeFormat = `${Math.trunc(totalSeconds / 3600)}:${Math.trunc((totalSeconds % 3600) / 60)}:${Math.trunc((totalSeconds % 3600) % 60)}`;
  } else if (totalSeconds >= 60) {
    timeFormat = `${Math.trunc(totalSeconds / 60)}:${totalSeconds % 60}}`;
  } else {
    timeFormat = `00:${totalSeconds}`;
  }
  return timeFormat;
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