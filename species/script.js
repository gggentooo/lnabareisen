// Function to populate the tree
const populateTree = (data) => {
    const root = document.querySelector(".tree-container .tree > li > ul");

    const phyla = [...new Set(data.map(entry => entry.scientific.phylum))];
    phyla.forEach(phylum => {
        const phylumNode = document.createElement('li');
        phylumNode.innerHTML = `
            <span class="label">Phylum:<br></span>
            <span class="toggle">${phylum}</span><ul class="nested"></ul>`;
        
        const classesInPhylum = data.filter(entry => entry.scientific.phylum === phylum);

        classesInPhylum.forEach(entry => {
            const classNode = findOrCreateBranch(phylumNode, 'Class', entry.scientific.class);
            const orderNode = findOrCreateBranch(classNode, 'Order', entry.scientific.order);
            const familyNode = findOrCreateBranch(orderNode, 'Family', entry.scientific.family);
            const genusNode = findOrCreateBranch(familyNode, 'Genus', entry.scientific.genus);
            const speciesNode = findOrCreateBranch(genusNode, 'Species', entry.scientific.species, true);

            // Add species details (common name and characters)
            if (!speciesNode.dataset.populated) {
                speciesNode.dataset.populated = true; // To avoid duplicating entries for the same species
                const speciesDetails = document.createElement('ul');
                speciesDetails.classList.add('nested');
                speciesDetails.innerHTML = `
                    <li><span class="info">Common Name:<br>${entry.common}</span></li>
                    <li><span class="info">Characters:<br>${data
                        .filter(e => e.scientific.species === entry.scientific.species)
                        .map(e => e.character)
                        .join('<br>')}</span></li>
                `;
                speciesNode.appendChild(speciesDetails);
            }
        });

        root.appendChild(phylumNode);
    });

    // Add toggle functionality
    document.querySelectorAll('.toggle').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const nested = this.nextElementSibling;
            if (nested) {
                nested.classList.toggle('active');  // Toggle the 'active' class on click
            }
        });
    });
};

// Helper function to find or create a branch with label
const findOrCreateBranch = (parentNode, label, text, isFinalBranch = false) => {
    let existingBranch = Array.from(parentNode.querySelectorAll(':scope > ul > li')).find(li => li.querySelector('.toggle').textContent === text);
    if (!existingBranch) {
        existingBranch = document.createElement('li');
        existingBranch.innerHTML = `
            <span class="label">${label}:<br></span>
            <span class="toggle">${text}</span>`;
        
        if (!isFinalBranch) {
            existingBranch.innerHTML += `<ul class="nested"></ul>`;
        }
        const parentList = parentNode.querySelector(':scope > ul') || document.createElement('ul');
        parentList.classList.add('nested');
        parentList.appendChild(existingBranch);
        parentNode.appendChild(parentList);
    }
    return existingBranch;
};

// Fetch data from species.json and populate the tree
const loadTreeData = async () => {
    try {
        const response = await fetch('species.json');
        const data = await response.json();
        populateTree(data);
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
};

// Load the data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    loadTreeData();
});


// Function to open all branches
const openAll = () => {
    document.querySelectorAll('.nested').forEach(branch => {
        branch.classList.add('active');  // Make all branches visible
    });
};

// Function to close all branches
const closeAll = () => {
    document.querySelectorAll('.nested').forEach(branch => {
        branch.classList.remove('active');  // Hide all branches
    });
};

// Load the data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    loadTreeData();

    // Attach event listeners to Open/Close All buttons
    document.getElementById('open-all').addEventListener('click', openAll);
    document.getElementById('close-all').addEventListener('click', closeAll);
});
