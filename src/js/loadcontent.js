/*
loadcontent.js
gggentooo, 250709

functions for dynamically loading content list and page from json index & md files
*/

async function populateMenu(what) {
    const filepath = "../_idx/" + what + ".json";
    const response = await fetch(filepath);
    const raw = await response.json();
    let out = ``;

    for (var i = 0; i < raw.length; i++) {
        const entry = raw[i];
    }

    return out;
}
