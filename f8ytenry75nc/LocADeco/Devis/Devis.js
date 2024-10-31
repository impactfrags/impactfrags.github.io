// Objet pour stocker le contenu du panier
let cart = {};

// Fonction pour ajuster la quantité et mettre à jour le panier
function changeQuantity(elementId, change, articleId, articleName, articlePrice) {
    const quantityInput = document.getElementById(elementId);
    let currentQuantity = parseInt(quantityInput.value);

    // Calculer la nouvelle quantité en fonction de l'input utilisateur
    let newQuantity = currentQuantity + change;

    // S'assurer que la nouvelle quantité est au moins 0
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

// Fonction pour générer un devis au format PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Titre du devis
    doc.setFontSize(18);
    doc.text("Devis - Loc A Déco", 10, 10);

    // Ajouter une ligne vide
    doc.setFontSize(12);
    doc.text("Articles dans le panier :", 10, 20);

    let y = 30; // Position verticale initiale
    let total = 0;

    // Ajouter les articles du panier au PDF
    for (let articleId in cart) {
        const article = cart[articleId];
        doc.text(`${article.name} - ${article.quantity} x ${article.price}€ = ${article.quantity * article.price}€`, 10, y);
        y += 10;
        total += article.quantity * article.price;
    }

    // Ajouter le total
    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: ${total}€`, 10, y);

    // Télécharger le PDF
    doc.save("devis_loc_a_deco.pdf");
}

// Associer la fonction generatePDF au bouton Créer le PDF
document.getElementById('create-pdf').addEventListener('click', generatePDF);
