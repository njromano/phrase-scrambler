let toggleActive = document.getElementById("toggleActive");
let extActive = false;
function setupButton() {
	toggleActive.innerText = extActive ? "ON" : "OFF";
	toggleActive.classList = [extActive ? 'active' : 'inactive'];
}
chrome.storage.sync.get("active", ({active}) => {
	extActive = active;
	setupButton();
})
toggleActive.addEventListener("click", async () => {
	extActive = !extActive;
	chrome.storage.sync.set({active: extActive});
	setupButton();
})

let optionsLink = document.getElementById("optionsLink");
optionsLink.addEventListener("click", () => {
	chrome.runtime.openOptionsPage(() => {});
});

let replacedPhraseCount = 0;
let scrambleCount = document.getElementById("scrambleCount");
chrome.storage.sync.get('replaceCount', async ({replaceCount}) => {
	replacedPhraseCount = replaceCount;
	scrambleCount.innerText = replacedPhraseCount;
	console.log(replacedPhraseCount);
});