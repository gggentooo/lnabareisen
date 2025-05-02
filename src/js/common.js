/*
common.js
gggentooo, 250416

functions used in all pages
*/

function toggleDark() {
    let isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('dark');
    }
});

function langOpenClose(target_lang) {
    var target_elems = document.getElementsByClassName(target_lang);
    for (var i = 0; i < target_elems.length; i++) {
        target_elems[i].classList.toggle("hide");
    }
}


