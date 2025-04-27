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


