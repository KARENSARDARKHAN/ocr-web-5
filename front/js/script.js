async function init() {
  let products = await fetch("http://localhost:3000/api/products");
  products = await products.json();
  //console.log(products);

  let sectionItems = document.getElementById("items");
  sectionItems.innerHTML = "";

  for (let index = 0; index < products.length; index++) {
    let product = products[index];
    let htmlProduct = `<a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt='${product.altTxt}'>
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
    // console.log(htmlProduct);
    sectionItems.innerHTML = sectionItems.innerHTML + htmlProduct;
  }
}

init();
