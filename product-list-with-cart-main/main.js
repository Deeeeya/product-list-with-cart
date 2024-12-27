const cartItemsContainer = document.getElementById("cart-items");
const dessertItemsContainer = document.getElementById("products-items");

let cartItems = [];

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

const dessertElements = desserts
  .map(
    (item) =>
      `
  <div class="foodItem">
          <div class="imagePlusCart">
            <img
              class="itemPic"
              src="${item.imgUrl}"
              alt="${item.name}"
            />
            <button onclick="addProductToCard(${item.id})" class="addCartButton" id="addButton">
              <img
                src="/product-list-with-cart-main/assets/images/icon-add-to-cart.svg"
                alt="cart"
              />Add to Cart
            </button>
          </div>
          <div class="foodInfo">
            <p class="title">${item.title}</p>
            <p class="foodName">${item.name}</p>
            <p class="price">${item.price}</p>
          </div>
  </div>
  `
  )
  .join("");

dessertItemsContainer.innerHTML = dessertElements;

const addToCartButton = document.getElementById("addButton");

const addProductToCard = (id) => {
  const dessert = desserts.find((dessert) => dessert.id === id);
  const existingCartItem = cartItems.find((item) => item.id === id);

  if (!!existingCartItem) {
    cartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    cartItems.push({
      ...dessert,
      quantity: 1,
    });
  }

  const cartItemElements = cartItems
    .map(
      (item) =>
        ` 
      <div class="cartItem">
        <p class="itemName">${item.name}</p> 
        <p class="itemInfo">${item.quantity}x <span class="itemPrice">@ $${
          item.price
        }</span> <span class="totalPriceInfo">$${
          item.price * item.quantity
        }</span></p> 
        <hr />
      </div>
  `
    )
    .join("");

  cartItemsContainer.innerHTML = cartItemElements;
};
