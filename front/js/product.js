/**Récuperation du contenu du localStorage dans la variable cart dans le cadre d'un panier vide*/
let cart = JSON.parse(localStorage.getItem("cart") || "{}");

/**Récuperation des informations des produits via l'api 
 et stockage des données collectées daans la variable product*/
let url = new URLSearchParams(window.location.search);
let id = url.get("id");
let response = await fetch(`http://localhost:3000/api/products/${id}`);
let product = await response.json();

/**Répartition dans le dom des données d'information sur les produits provenant de l'API */
let domPageTitle = document.getElementsByTagName("title");
domPageTitle.innerHTML = product.name;

let domProductImage = document.querySelector(".item__img");
domProductImage.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

let domProductName = document.getElementById("title");
domProductName.innerHTML = product.name;

let domProductPrice = document.getElementById("price");
domProductPrice.innerHTML = product.price;

let domProductDescription = document.getElementById("description");
domProductDescription.innerHTML = product.description;

let domColorInputSelect = document.getElementById("colors");
let arrayHtmlOptions = product.colors.map(function (color) {
  return `<option value="${color}">${color}</option>`;
});
domColorInputSelect.innerHTML = arrayHtmlOptions.join("");

/**Pour gérer l'ajout des produits au panier: création d'une interraction 
 avec le bouton addtToCart avec la fonction addEventListener*/
let domAddToCartButton = document.getElementById("addToCart");
domAddToCartButton.addEventListener("click", function () {

  /**Récuperation de la quantité grâce à l'input du dom #quantity et
  conversion en number grace à la fonction javascript Number*/
  let domQuantityInput = document.getElementById("quantity");
  let quantity = Number(domQuantityInput.value);

  /** Pour une quantité supérieure à 0, l'élément est ajouté au panier*/
  if (quantity > 0) {
    let cartId = `${id}#${domColorInputSelect.value}`;

    /** Si le panier ne contient aucune entrée pour cette id et cette color,
    l'entrée id#selectedColor sera initialisée à 0*/
    if (!cart[cartId]) {
      cart[cartId] = 0;
    }

    /**Si l'entrée id#selectedColor existe, la quantité sera ajoutée à l'entrée correspondante*/
    cart[cartId] = cart[cartId] + quantity;

    /**Dès la mise à jour de la variable cart avec les bonnes quantités,
     tout le panier est sauvegardé dans le localStorage*/
    localStorage.setItem("cart", JSON.stringify(cart));

    /**Affichage d'un message d'avertissement si la quantité est égale à zéro*/
  } else {
    /** On averti l'utilisateur si il a mis une quantité égale à zéro*/
    alert("Vous devez choisir une quantité superieure à 0");
  }
});
