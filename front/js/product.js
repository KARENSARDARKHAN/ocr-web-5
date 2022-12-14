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
}

init();
