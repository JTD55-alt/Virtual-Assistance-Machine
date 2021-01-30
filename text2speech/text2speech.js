const msg = new SpeechSynthesisUtterance();
let voices = [];
const voiceTone = document.querySelector('[name="voice"]');
const settings = document.querySelectorAll('[type="range"], [name="text"]');
const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="test"]');


function populateVoices() {
  voices = this.getVoices();
  voiceTone.innerHTML = voices
    .filter(voice => voice.lang.includes("en"))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join("");
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  stop();
}


function stop(starOver = true) {
  speechSynthesis.cancel();
  if (starOver){
    speechSynthesis.speak(msg);
  }
}

function setSettings() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  stop();
}


speechSynthesis.addEventListener('voiceschanged', populateVoices);
voiceTone.addEventListener('change', setVoice);
settings.forEach(settings => settings.addEventListener('change', setSettings));
playButton.addEventListener('click', stop);
stopButton.addEventListener('click', function() {
  stop(false);
});