//-----------------------------------------------------------------------
// Generation du Catalogue en partant du fichier Json : catalogue.json
//-----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    fetch('../catalogue.json')
        .then(response => response.json())
        .then(data => {
            const catalogueSection = document.querySelector('.catalogue');
            data.forEach((article, index) => {
                const articleId = `article-${index + 1}`;
                const quantityId = `quantity-article-${index + 1}`;

                const item = document.createElement('div');
                item.className = 'item';

                item.innerHTML = `
                    <img src="../image/Catalogue/${article.image}" alt="${article.titre}">
                    <h3>${article.titre}</h3>
                    <p>${article.prix}</p>
                    ${article.description ? `<p>${article.description}</p>` : ''}
                    <div class="quantity-selector">
                        <button class="quantity-btn"
                            onclick="changeQuantity('${quantityId}', -1, '${articleId}', '${article.titre}', ${parseFloat(article.prix.replace(',', '.'))})">-</button>
                        <input type="number" id="${quantityId}" name="quantity" value="0" min="0" readonly>
                        <button class="quantity-btn"
                            onclick="changeQuantity('${quantityId}', 1, '${articleId}', '${article.titre}', ${parseFloat(article.prix.replace(',', '.'))})">+</button>
                    </div>
                `;

                catalogueSection.appendChild(item);
            });
        })
        .catch(error => console.error('Erreur lors du chargement du catalogue:', error));
});
