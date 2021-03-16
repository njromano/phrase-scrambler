chrome.storage.sync.get("active", async ({active}) => {
    if (!active) return;
    await chrome.storage.sync.get(['phrases', 'scrambler'], async ({phrases, scrambler}) => {
        let replaceCount = 0
        for(let phrase of phrases) {
            var regex = new RegExp(phrase, "g");
            if (document.body.innerHTML.match(regex)){
                let words = phrase.split(/\W/);
                let newPhrase = words.join(` ${scrambler} `);
                replaceCount++;
                document.body.innerHTML = document.body.innerHTML.replace(new RegExp(phrase, "g"), newPhrase);
            }
        }
        console.log(`Replaced ${replaceCount} phrases in this page`)
        chrome.storage.sync.set({replaceCount});
    });
})