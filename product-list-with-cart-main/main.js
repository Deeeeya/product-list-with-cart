const desserts = [
  {
    id: 1,
    title: "Waffle",
    name: "Waffle with Berries",
    price: 6.5,
    quantity: 1,
    imgUrl:
      "/product-list-with-cart-main/assets/images/image-waffle-desktop.jpg",
  },
  {
    id: 2,
    title: "Crème Brûlée",
    name: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    quantity: 1,
    imgUrl:
      "/product-list-with-cart-main/assets/images/image-creme-brulee-desktop.jpg",
  },
  {
    id: 3,
    title: "Macaron",
    name: "Macaron Mix of Five",
    price: 8.0,
    quantity: 1,
    imgUrl:
      "/product-list-with-cart-main/assets/images/image-macaron-desktop.jpg",
  },
  {
    id: 4,
    title: "Tiramisu",
    name: "Classic Tiramisu",
    price: 5.5,
    quantity: 1,
    imgUrl:
      "/product-list-with-cart-main/assets/images/image-tiramisu-desktop.jpg",
  },
  {
    id: 5,
    title: "Baklava",
    name: "Pistachio Baklava",
    price: 4.0,
    quantity: 1,
    imgUrl:
      "/product-list-with-cart-main/assets/images/image-baklava-desktop.jpg",
  },
  {
    id: 6,
    title: "Pie",
    name: "Lemon Meringue Pie",
    price: 5.0,
    quantity: 1,
    imgUrl:
      "/product-list-with-cart-main/assets/images/image-meringue-desktop.jpg",
  },
  {
    id: 7,
    title: "Cake",
    name: "Rev Velvet Cake",
    price: 4.5,
    quantity: 1,
    imgUrl: "/product-list-with-cart-main/assets/images/image-cake-desktop.jpg",
  },
  {
    id: 8,
    title: "Brownie",
    name: "Salted Caramel Brownie",
    price: 5.5,
    quantity: 1,
    imgUrl:
      "/product-list-with-cart-main/assets/images/image-brownie-desktop.jpg",
  },
  {
    id: 9,
    title: "Panna Cotta",
    name: "Vanilla Panna Cotta",
    price: 6.5,
    quantity: 1,
    imgUrl:
      "/product-list-with-cart-main/assets/images/image-panna-cotta-desktop.jpg",
  },
];

const dessertsHTML = desserts.map(
  (dessert) => `
  <div class="foodItem">
          <div class="imagePlusCart">
            <img
              class="itemPic"
              src="${dessert.imgUrl}"
              alt=""
            />
            <button class="addCart" id="${dessert.id}">
              <img
                src="/product-list-with-cart-main/assets/images/icon-add-to-cart.svg"
                alt="cart"
              />Add to Cart
            </button>
          </div>
          <div class="foodInfo">
            <p class="title">${dessert.title}</p>
            <p class="foodName">${dessert.name}</p>
            <p class="price">${dessert.price}</p>
          </div>
  </div>
`
);

let cart = [];
totalPrice = item.price * item.quantity;

function addToCart(dessertId) {
  const dessert = desserts.find((item) => item.id === dessertId);
  const itemExists = cart.find((item) => item.id === dessertId);
  if (itemExists) {
    itemExists.quantity += 1;
  } else {
    cart.push({ ...dessert, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartContainer = getElementById("cartTable");
  cartContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cartItem";
    cartItem.innerHTML = `
    <p>${item.name}</p>
    <p>${item.quantity} @<span>${item.price}</span> <span>${totalPrice}</span>
    `;
    cartContainer.appendChild(cartItem);
  });
}

document.querySelectorAll(".addButton").forEach((button) => {
  button.addEventListener("click", (e) => {
    const dessertId = parseInt(e.target.closest(".addButton").id);
    addToCart(dessertId);
  });
});

updateCart();
