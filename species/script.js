// this is the most fucked up code I have ever written, alas I am too lazy to restructure the JSON
// by gggentooo, 24/09/06

const populateTree = (data) => {
    const root = document.querySelector(".tree-container .tree > li > ul");

    // Sort phyla alphabetically
    const phyla = [...new Set(data.map(entry => entry.scientific.phylum))].sort();
    phyla.forEach(phylum => {
        const phylumNode = document.createElement('li');
        phylumNode.innerHTML = `<span class="label">Phylum:<br></span><span class="toggle">${phylum}</span><ul class="nested"></ul>`;

        // Sort classes alphabetically within each phylum
        const classesInPhylum = [...new Set(data.filter(entry => entry.scientific.phylum === phylum)
            .map(entry => entry.scientific.class))].sort();

        classesInPhylum.forEach(className => {
            const classNode = findOrCreateBranch(phylumNode, className, 'Class');

            // Sort orders alphabetically within each class
            const ordersInClass = [...new Set(data.filter(entry => entry.scientific.class === className)
                .map(entry => entry.scientific.order))].sort();

            ordersInClass.forEach(orderName => {
                const orderNode = findOrCreateBranch(classNode, orderName, 'Order');

                // Sort families alphabetically within each order
                const familiesInOrder = [...new Set(data.filter(entry => entry.scientific.order === orderName)
                    .map(entry => entry.scientific.family))].sort();

                familiesInOrder.forEach(familyName => {
                    const familyNode = findOrCreateBranch(orderNode, familyName, 'Family');

                    // Sort genera alphabetically within each family
                    const generaInFamily = [...new Set(data.filter(entry => entry.scientific.family === familyName)
                        .map(entry => entry.scientific.genus))].sort();

                    generaInFamily.forEach(genusName => {
                        const genusNode = findOrCreateBranch(familyNode, genusName, 'Genus');

                        // Sort species alphabetically within each genus
                        const speciesInGenus = data.filter(entry => entry.scientific.genus === genusName)
                            .sort((a, b) => a.scientific.species.localeCompare(b.scientific.species));

                        speciesInGenus.forEach(entry => {
                            const speciesNode = findOrCreateBranch(genusNode, entry.scientific.species, 'Species', true);

                            // Add species details (common name and characters)
                            if (!speciesNode.dataset.populated) {
                                speciesNode.dataset.populated = true; // To avoid duplicating entries for the same species
                                const speciesDetails = document.createElement('ul');
                                speciesDetails.classList.add('nested');
                                speciesDetails.innerHTML = `
                                    <li><span class="info">Common Name:<br></span><span class="name">${entry.common}</span></li>
                                    <li><span class="info">Characters:<br></span><span class="name">${data
                                        .filter(e => e.scientific.species === entry.scientific.species)
                                        .map(e => e.character)
                                        .join('<br>')}</span></li>
                                `;
                                speciesNode.appendChild(speciesDetails);
                            }
                        });
                    });
                });
            });
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

// Helper function to find or create a branch
const findOrCreateBranch = (parentNode, text, level = '', isFinalBranch = false) => {
    let existingBranch = Array.from(parentNode.querySelectorAll(':scope > ul > li')).find(li => li.firstChild.textContent === text);
    
    if (!existingBranch) {
        existingBranch = document.createElement('li');
        
        // Add a class based on the taxonomy level for styling
        let className = '';
        if (level === 'Family' || level === 'Genus' || isFinalBranch) {
            className = level ? level.toLowerCase() : 'species';  // Add class like 'family', 'genus', 'species'
        }

        // Add a label for the taxonomy level (e.g., Class, Order, etc.)
        const label = level ? `<span class="label">${level}:<br></span>` : '';
        
        // Add the toggle span with the text for the branch, with a specific class
        existingBranch.innerHTML = `${label}<span class="toggle ${className}">${text}</span>`;
        
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

    // Attach event listeners to Open/Close All buttons
    document.getElementById('open-all').addEventListener('click', openAll);
    document.getElementById('close-all').addEventListener('click', closeAll);
});
