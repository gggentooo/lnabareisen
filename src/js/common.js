/*
common.js
gggentooo, 250416

functions used in all pages
*/

function toggleDark() {
    let isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
}

function sectionOpenClose(button) {
  const parent = button.parentElement;
  const isFolded = button.textContent === 'Fold';
  button.textContent = isFolded ? 'Open' : 'Fold';
  
  Array.from(parent.children).forEach(child => {
    if (child !== button && child.tagName.toLowerCase() !== 'h2') {
      child.classList.toggle('hide', isFolded);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('dark');
    }

    document.getElementsByTagName('header')[0].innerHTML = `
        <span class="pagetitle" onclick="location.href='https://lnaba.reisen/'">lnaba.reisen</span>
        <button class="darkmode" onclick="toggleDark()">Toggle Dark Mode</button>
        <nav>
            <a href="https://lnaba.reisen/">Home</a>
            <a href="https://lnaba.reisen/projects">Projects</a>
            <a href="https://lnaba.reisen/braindumps">Braindumps</a>
            <a href="https://lnaba.reisen/now">Now</a>
        </nav>`;
        
    document.getElementsByTagName('footer')[0].innerHTML = `<a href="mailto:d@lnaba.reisen">Made and Written by D</a>`;

    document.querySelectorAll('.foldable').forEach(section => {
        const button = document.createElement('button');
        button.className = 'fold_button';
        button.textContent = 'Fold';
        button.addEventListener('click', () => sectionOpenClose(button));
        section.appendChild(button);
        sectionOpenClose(button);
    });
});

function langOpenClose(target_lang) {
    var target_elems = document.getElementsByClassName(target_lang);
    for (var i = 0; i < target_elems.length; i++) {
        target_elems[i].classList.toggle("hide");
    }
}
