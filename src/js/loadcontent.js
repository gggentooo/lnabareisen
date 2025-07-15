/*
loadcontent.js
gggentooo, 250709

functions for dynamically loading content list and page from json index & md files
*/

async function populateMenu(fp) {
    const response = await fetch(fp);
    const raw = await response.json();
    var out = ``;

    for (var i = 0; i < raw.length; i++) {
        const category_entry = raw[i];
        const category_list = category_entry["list"];
        out += `<h2>` + category_entry["category"] + `</h2><ul>`;
        for (var j = 0; j < category_list.length; j++) {
            const list_entry = category_list[j];
            const datestring = list_entry["year"] + `-` + list_entry["month"] + `-` + list_entry["day"];
            out += `<li><span class="datestamp">` + datestring + `</span><a href="./p/?id=` + list_entry["id"] + `">` + list_entry["title"] + `</a>`;
        }
        out += `</ul>`;
    }

    return out;
}

async function loadPageContent(id) {
    var out = ``;

    const filepath = "../_src/" + id + ".html";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filepath, false);
    xmlhttp.send();
    out += xmlhttp.responseText;

    if (out[1] === "!") { return -1; }

    return out;
}
