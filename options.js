let phraseTextArea = document.getElementById("phraseTextarea");
let scramblerWordInput = document.getElementById("scramblerWordInput");
let saveButton = document.getElementById("saveButton");
let resetButton = document.getElementById("resetButton");

let selectedPhrases = ['Phrase one', 'Phrase two', 'Phrase three'];
let phraseText = '';

async function loadPhrases() {
	chrome.storage.sync.get("phrases", async ({phrases}) => {
		selectedPhrases = phrases;
		console.log(selectedPhrases);
		phraseText = selectedPhrases.join('\n');
		console.log(phraseText);
		phraseTextArea.value = phraseText;
	})
}

phraseTextarea.addEventListener("input", (event) => {
	phraseText = event.target.value;
})

function parsePhraseText(text) {
	return text.split(/\r?\n/);
}

let scramblerWord = '';

async function loadScramblerWord() {
	chrome.storage.sync.get("scrambler", async ({scrambler}) => {
		scramblerWord = scrambler;
		console.log(scramblerWord);
		scramblerWordInput.value = scramblerWord;
	})
}

scramblerWordInput.addEventListener("input", (event) => {
	scramblerWord = event.target.value;
})

saveButton.addEventListener("click", async () => {
	chrome.storage.sync.set({phrases: parsePhraseText(phraseText), scrambler: scramblerWord});
	await loadPhrases();
	await loadScramblerWord();
})

resetButton.addEventListener("click", async () => {
	await loadPhrases();
	await loadScramblerWord();
})

loadPhrases();
loadScramblerWord();