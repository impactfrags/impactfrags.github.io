fetch('catalogue.json')
    .then(response => response.json())
    .then(data => {
        const catalogueSection = document.querySelector('.catalogue');
        data.forEach(article => {
            const item = document.createElement('div');
            item.className = 'item';

            item.innerHTML = `
                    <img src="../image/Catalogue/${article.image}" alt="${article.titre}">
                    <h3>${article.titre}</h3>
                    <p>${article.prix}</p>
                    ${article.description ? `<p>${article.description}</p>` : ''}
                `;

            catalogueSection.appendChild(item);
        });
    })
    .catch(error => console.error('Erreur lors du chargement du catalogue:', error));
