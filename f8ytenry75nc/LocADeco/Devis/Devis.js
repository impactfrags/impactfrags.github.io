//-----------------------------------------------------------------------
// Panier et Cart
//-----------------------------------------------------------------------

// Objet pour stocker le contenu du panier
let cart = {};

// Fonction pour ajuster la quantite et mettre à jour le panier
function changeQuantity(elementId, change, articleId, articleName, articlePrice) {
    const quantityInput = document.getElementById(elementId);
    let currentQuantity = parseInt(quantityInput.value);

    // Calculer la nouvelle quantite en fonction de l'utilisateur
    let newQuantity = currentQuantity + change;

    // Nouvelle quantité est au moins 0
    if (newQuantity >= 0) {
        quantityInput.value = newQuantity;

        // Si la nouvelle quantité est supérieure à 0, mettre à jour ou ajouter l'article dans le panier
        if (newQuantity > 0) {
            cart[articleId] = {
                name: articleName,
                price: articlePrice,
                quantity: newQuantity
            };
        } else {
            // Si la nouvelle quantité est 0, supprimer l'article du panier
            delete cart[articleId];
        }

        // Actualiser le panier
        displayCart();
    }
}

// Fonction pour afficher le contenu du panier
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Vider le contenu actuel du panier
    cartItems.innerHTML = '';
    let total = 0;

    // Parcourir le panier et afficher les articles
    for (let articleId in cart) {
        const article = cart[articleId];
        const listItem = document.createElement('li');
        listItem.textContent = `${article.name} - ${article.quantity} x ${article.price}€ = ${article.quantity * article.price}€`;
        cartItems.appendChild(listItem);

        // Calculer le total du panier
        total += article.quantity * article.price;
    }

    // Mettre à jour l'affichage du total
    cartTotal.textContent = `Total: ${total}€`;
}

//-----------------------------------------------------------------------
// Fonction pour générer un devis au format PDF
//-----------------------------------------------------------------------

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.addImage('https://www.portfoliomeryet.top/f8ytenry75nc/LocADeco/image/Accueil/Logo.png', 'PNG', 10, 10, 40, 0);

    doc.setFontSize(18);
    doc.text('Devis - Loc A Déco', 10, 50);

    // 4) Subtitle for items
    doc.setFontSize(12);
    doc.text('Articles dans le panier :', 10, 60);

    let y = 70; // Starting vertical position for listing items
    let total = 0;

    // 5) Add the cart items
    for (let articleId in cart) {
        const article = cart[articleId];
        doc.text(
            `${article.name} - ${article.quantity} x ${article.price}€ = ` +
            `${(article.quantity * article.price).toFixed(2)}€`,
            10,
            y
        );
        y += 10;
        total += article.quantity * article.price;
    }

    // 6) Add total
    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: ${total.toFixed(2)}€`, 10, y);

    // 7) Place phone & email at the bottom of the page
    doc.setFontSize(12);
    doc.text('Jérôme CARRET : 06-85-05-15-08', 125, 17);
    doc.text('Stéphanie CARRET : 06-81-47-25-73', 125, 24);
    doc.text('Email : Loc-a-deco@hotmail.com', 125, 31);

    // 8) Download the PDF
    doc.save('devis_loc_a_deco.pdf');
}


// Associer la fonction generatePDF au bouton Créer le PDF
document.getElementById('create-pdf').addEventListener('click', generatePDF);

//-----------------------------------------------------------------------
// Affiche la bulle lorsque l'utilisateur défile vers le bas
//-----------------------------------------------------------------------

// Affiche la bulle lorsque l'utilisateur défile vers le bas
window.addEventListener('scroll', function () {
    const scrollButton = document.getElementById('scrollToTop');
    if (window.scrollY > 200) { // Affiche la bulle après avoir défilé de 200px
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

// Redirection Devis.html
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Ajoute un effet de défilement fluide
    });
}
