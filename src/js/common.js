/*
common.js
gggentooo, 250416

functions used in all pages
*/

function toggleDark() {
    let isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('dark');
    }

    document.getElementsByTagName('header')[0].innerHTML = `
        <span class="pagetitle" onclick="location.href='https://lnaba.reisen/'">lnaba.reisen</span>
        <button class="darkmode" onclick="toggleDark()">Toggle Dark Mode</button>
        <nav>
            <a href="https://lnaba.reisen/">Main</a>
            <a href="https://lnaba.reisen/now">Now</a>
            <a href="https://lnaba.reisen/thoughts">Thoughts</a>
            <a href="https://lnaba.reisen/things">Things</a>
        </nav>`;
        
    document.getElementsByTagName('footer')[0].innerHTML = `<a href="mailto:d@lnaba.reisen">Made and Written by D</a>`;
});

function langOpenClose(target_lang) {
    var target_elems = document.getElementsByClassName(target_lang);
    for (var i = 0; i < target_elems.length; i++) {
        target_elems[i].classList.toggle("hide");
    }
}
