const hh = document.getElementById('prevRaceTimeHH');
const mm = document.getElementById('prevRaceTimeMM');
const ss = document.getElementById('prevRaceTimeSS');
const msg = document.getElementById('messageBox');
const btnCalc = document.getElementById('btnCalc');
const btnReset = document.getElementById('btnReset');
const fullForm = document.getElementById('previousTime');

let hours = hh.value;
let minutes = mm.value;
let seconds = ss.value;
let timeInSeconds = 0;

btnCalc.addEventListener('click', calculate);
btnReset.addEventListener('click', clear);

function calculate() {
  if (checkTimeInputs()) {
    convertToSeconds();
    msg.textContent = '';
    addMessage(`Your time in seconds is ${timeInSeconds}`);
  }
}

function checkTimeInputs() {
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

  if (hh.value > 0 && hh.value < 25 && mm.value < 60 && mm.value > 0 && ss.value > 0 && ss.value < 60) {
    return true;
  } else {
    return false;
  }
}

function convertToSeconds() {
  timeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
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