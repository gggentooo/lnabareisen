// Fetch JSON data and build the tree
fetch('taxonomy.json')  // Ensure the file is named 'taxonomy.json' in the same directory
    .then(response => response.json())
    .then(data => {
        const treeContainer = document.querySelector('.tree');
        const kingdomName = Object.keys(data['kingdom'])[0]; // Get the first kingdom key
        const kingdomData = data['kingdom'][kingdomName];
        
        // Dynamically create the kingdom level, with the 'nested' class already set to 'active'
        const kingdomListItem = createTaxonomyItem('Kingdom', kingdomName);
        treeContainer.appendChild(kingdomListItem);
        
        // Recursively build the tree for the child nodes under the kingdom
        buildTree(kingdomListItem.querySelector('ul'), kingdomData);
    });

// Recursively build the taxonomy tree
function buildTree(parentElement, node) {
    Object.keys(node).forEach(level => {
        if (typeof node[level] === 'object' && !Array.isArray(node[level])) {
            // Iterate over all children of the current level
            Object.keys(node[level]).forEach(childNode => {
                const childData = node[level][childNode];

                const listItem = createTaxonomyItem(capitalize(level), childNode);
                parentElement.appendChild(listItem);

                // Recursively call buildTree for the child node
                buildTree(listItem.querySelector('ul'), childData);
            });
        } else if (level === 'species_nerd') {
            // Handle species-specific information
            const commonName = node['species_normal'];
            const characters = node['characters'];

            const commonNameInfo = document.createElement('li');
            commonNameInfo.innerHTML = `<a class="taxlevel">Common name:<br></a> ${commonName}`;
            parentElement.appendChild(commonNameInfo);

            if (characters && Array.isArray(characters)) {
                const charItem = document.createElement('li');
                charItem.innerHTML = `<a class="taxlevel">Character(s):<br></a> ${characters.map(c => c.character).join('<br>')}`;
                parentElement.appendChild(charItem);
            }
        }
    });
}

// Create a taxonomy list item with label and name
function createTaxonomyItem(label, name) {
    const listItem = document.createElement('li');
    const toggle = document.createElement('span');
    
    toggle.className = `toggle ${label}`;
    toggle.innerHTML = `<a class="taxlevel ${label}">${label}<br></a> ${name}`;
    listItem.appendChild(toggle);

    // Create a nested ul to contain child elements
    const childList = document.createElement('ul');
    childList.classList.add('nested'); // Keep nested hidden by default
    listItem.appendChild(childList);

    // Add click event to toggle visibility of children
    toggle.addEventListener('click', function() {
        childList.classList.toggle('active');
    });

    return listItem;
}

// Helper function to capitalize taxonomic levels
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Open all branches
document.getElementById('open-all').addEventListener('click', function() {
    const nestedLists = document.querySelectorAll('.tree-container .nested');
    nestedLists.forEach(list => list.classList.add('active'));
});

// Close all branches
document.getElementById('close-all').addEventListener('click', function() {
    const nestedLists = document.querySelectorAll('.tree-container .nested');
    nestedLists.forEach(list => list.classList.remove('active'));
});
