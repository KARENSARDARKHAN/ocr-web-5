let url = new URLSearchParams(window.location.search);
console.log(url);

let id = url.get("id");
console.log(id);

async function init() {
  let product = await fetch(`http://localhost:3000/api/products/${id}`);
  product = await product.json();
  console.log(product);

  let spanPrice = document.getElementById("price");
  spanPrice.innerHTML = product.price;

  let spanDescription = document.getElementById("description");
  spanDescription.innerHTML = product.description;

  let spanName = document.getElementById("title");
  spanName.innerHTML = product.name;

  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
}

init();

//let htmlProduct = `<a href="./product.html?id=${product._id}">
//<article>
// <img src="${product.imageUrl}" alt='${product.altTxt}'>
//<h3 class="productName">${product.name}</h3>

//document
// .getElementsByClassName("item__img")
//.setAttribute("src", "${product.imageUrl}");

//document
//.getElementsByClassName("item__img")
//.setAttribute("src", "${product.imageUrl}");
//spanImageUrl.innerHTML = product.imageUrl;
