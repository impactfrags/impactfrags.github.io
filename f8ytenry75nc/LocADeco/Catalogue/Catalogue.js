//-----------------------------------------------------------------------
// Generation du Catalogue en partant du fichier Json : catalogue.json
//-----------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    fetch('../catalogue.json')
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
});

//-----------------------------------------------------------------------
// Affiche la bulle lorsque l'utilisateur défile vers le bas
//-----------------------------------------------------------------------

window.addEventListener('scroll', function () {
    const scrollButton = document.getElementById('scrollToTop');
    if (window.scrollY > 200) { // Affiche la bulle après avoir défilé de 200px
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Ajoute un effet de défilement
    });
}

//--------------------------------------------------------------------------------
// Affiche la case "Je fais mon devis" lorsque l'utilisateur défile vers le bas
//--------------------------------------------------------------------------------

window.addEventListener('DOMContentLoaded', (event) => {
    const stickyDevis = document.getElementById('stickyDevis');
    // Initial settings
    stickyDevis.style.opacity = '0';
    stickyDevis.style.pointerEvents = 'none'; // non usable

    // Function to toggle button visibility
    function toggleButtonVisibility() {
        if (window.pageYOffset > 500) {
            stickyDevis.style.display = 'block'; // Display
            stickyDevis.style.opacity = '1';
            stickyDevis.style.pointerEvents = 'auto'; // Enable pointer events
        } else {
            stickyDevis.style.opacity = '0';
            stickyDevis.style.pointerEvents = 'none'; // Disable display
            setTimeout(() => {
                if (parseFloat(stickyDevis.style.opacity) === 0) {
                    stickyDevis.style.display = 'none';
                }
            }, 300); //Hiding transition
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', toggleButtonVisibility);

    // Rediraction when pressed
    stickyDevis.addEventListener('click', function () {
        window.location.href = '../Devis/Devis.html';
    });
});

//-----------------------------------------------------------------------
// Redirection lors du clique sur le bannerDevisButton
//-----------------------------------------------------------------------

document.getElementById('bannerDevisButton').addEventListener('click', function () {
    window.location.href = '../Devis/Devis.html'; // rediraction
});