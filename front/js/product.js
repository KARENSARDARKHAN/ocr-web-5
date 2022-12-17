let cart = JSON.parse(localStorage.getItem("cart") || "{}");

let url = new URLSearchParams(window.location.search);
console.log(url);

let id = url.get("id");
console.log(id);

async function init() {
  let product = await fetch(`http://localhost:3000/api/products/${id}`);
  product = await product.json();
  console.log(product);

  let spanProductPageTitle = document.getElementsByTagName("title");
  spanProductPageTitle.innerHTML = product.name;

  let image = document.querySelector(".item__img");
  image.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  let spanName = document.getElementById("title");
  spanName.innerHTML = product.name;

  let spanPrice = document.getElementById("price");
  spanPrice.innerHTML = product.price;

  let spanDescription = document.getElementById("description");
  spanDescription.innerHTML = product.description;

  let colorSelection = document.getElementById("colors");
  let colorSelectionArray = product.colors.map(function (color) {
    return `<option value="${color}">${color}</option>`;
  });
  colorSelection.innerHTML = colorSelectionArray.join("");

  let addToCartButton = document.getElementById("addToCart");
  addToCartButton.addEventListener("click", () => {
    let inputQuantity = document.getElementById("quantity");
    let cartId = `${id}:${colorSelection.value}`;
    if (+inputQuantity.value > 0) {
      if (!cart[cartId]) {
        cart[cartId] = 0;
      }
      cart[cartId] = cart[cartId] + +inputQuantity.value;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  });
}

init();
