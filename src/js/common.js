/*
common.js
gggentooo, 250416

functions used in all pages
*/

function switch_themes() {
    document.getElementById('theme_toggle').onclick(() => {
        document.documentElement.toggleAttribute("dark");
    })
}


