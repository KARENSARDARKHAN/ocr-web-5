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

  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  let spanName = document.getElementById("title");
  spanName.innerHTML = product.name;

  let spanPrice = document.getElementById("price");
  spanPrice.innerHTML = product.price;

  let spanDescription = document.getElementById("description");
  spanDescription.innerHTML = product.description;

  let Colors = document.getElementById("colors");
  Colors.innerHTML = product.colors.map(function (color) {
    `<option value="${color}">${color}</option>`;
  });
}

init();
