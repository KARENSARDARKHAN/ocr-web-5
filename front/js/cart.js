function htmlArticle(product, quantity) {
  return `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>Nom du produit</h2>
                    <p>Vert</p>
                    <p>42,00 €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
}

let sectionCartItems = document.getElementById("cart__items");

let cart = JSON.parse(localStorage.getItem("cart") || "{}");
async function init() {
  let cartPromise = Object.entries(cart).map(async function (cartItem) {
    let [cartId, quantity] = cartItem;
    let [id, color] = cartId.split(":");

    let product = await fetch(`http://localhost:3000/api/products/${id}`);
    product = await product.json();
    console.log(cartId, id, color, quantity);
    return htmlArticle(product, quantity);
  });
  let cartHtml = await Promise.all(cartPromise);
  sectionCartItems.innerHTML = cartHtml.join("");
}

init();
