const hh = document.getElementById('prevRaceTimeHH');
const mm = document.getElementById('prevRaceTimeMM');
const ss = document.getElementById('prevRaceTimeSS');
const msg = document.getElementById('messageBox');
const btnCalc = document.getElementById('btnCalc');
const btnReset = document.getElementById('btnReset');
const fullForm = document.getElementById('previousTime');

let hours;
let minutes;
let seconds;

btnCalc.addEventListener('click', calculate);
btnReset.addEventListener('click', clear);

function calculate() {
  printValue();
}

function clear() {
  clearMessage();
  fullForm.reset();
}

function printValue() {
  hours = hh.value > 0 ? hh.value : '00';

  if (mm.value > 10) minutes = mm.value;
  else if (mm.value > 0) minutes = '0' + mm.value;
  else if (mm.value === 0 || mm.value === '') minutes = '00';

  if (ss.value > 10) seconds = ss.value;
  else if (ss.value > 0) seconds = '0' + ss.value;
  else if (ss.value === 0 || ss.value === '') seconds = '00';

  msg.innerHTML = 'Yes';
  msg.classList.remove('hidden');
  console.log(hours + ':' + minutes + ":" + seconds);
}

function checkHourInputs() {
  if (hh.value < 0) {
    changeMessage(`${hh.value} hours? Please show me your time machine!`)
  } else if (hh.value > 23) {
    changeMessage(`${hh.value} hours? I can't compute races that take longer than a day.`)
  } else if (hh.value === 0 || (hh.value >= 0 && hh.value < 24)) {
    clearMessage();
  }
}

function addMessage(message) {
  msg.textContent += message;
  msg.classList.remove('hidden');
}

function clearMessage() {
  msg.textContent = '';
  msg.classList.add('hidden');
}