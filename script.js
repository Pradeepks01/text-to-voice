const speakBtn = document.getElementById("speak-btn");
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const themeToggle = document.getElementById("theme-toggle");

const synth = window.speechSynthesis;

function populateVoices() {
  const voices = synth.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}
synth.onvoiceschanged = populateVoices;
populateVoices();

speakBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  const voices = synth.getVoices();
  const selectedVoice = voices[voiceSelect.value];
  if (text && selectedVoice) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    synth.speak(utterance);
  }
});

// 🌗 Theme toggle logic
const html = document.documentElement;

function setTheme(mode) {
  if (mode === "dark") {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "🌞";
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
}

themeToggle.addEventListener("click", () => {
  const current = html.classList.contains("dark") ? "dark" : "light";
  setTheme(current === "dark" ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") setTheme("dark");
else setTheme("light");
