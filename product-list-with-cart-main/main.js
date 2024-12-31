const cartItemsContainer = document.getElementById("cart-items");
const dessertItemsContainer = document.getElementById("products-items");
const confirmOrderButton = document.querySelector(".confirmOrder");
const deliveryType = document.querySelector(".disclaimer");
const orderPrice = document.querySelector(".totalContainer");
const emptyCake = document.querySelector(".emptyCake");
const emptyDescription = document.querySelector(".emptyDescription");
const originalCartButton = document.querySelector(".addCartButton");

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

const formatCurrency = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price ?? 0);
};

function renderDessertItems() {
  const dessertElements = desserts
    .map((item) => {
      const isItemInCart = cartItems.find((item) => item.id === id);
      return `
        <div class="foodItem">
                <div class="imagePlusCart" >
                  <img
                    class="itemPic"
                    id="itemPicID"
                    src="${item.imgUrl}"
                    alt="${item.name}"
                    style="${
                      !!isItemInCart
                        ? "border: 1px solid hsl(14, 86%, 42%);"
                        : ""
                    }"
                  />
                  ${
                    isItemInCart
                      ? `<div class="newAddCartButton">
                    <button class="decreaseButton" onclick={decreaseItem(${item.id})} id=${item.id}>
                      <img class="minusBtn" src="/product-list-with-cart-main/assets/images/icon-decrement-quantity.svg" alt="minus" />
                    </button>
                    <p class="quantityAmount">${item.quantity}</p>
                    <button class="increaseButton" onclick={increaseItem(${item.id})} id=${item.id}>
                      <img class="plusBtn" src="/product-list-with-cart-main/assets/images/icon-increment-quantity.svg" alt="plus" />
                      </button>
                  </div>`
                      : `<button onclick="addProductToCard(${item.id})" class="addCartButton" id=${item.id}>
                    <img
                      src="/product-list-with-cart-main/assets/images/icon-add-to-cart.svg"
                      alt="cart"
                    />Add to Cart
                  </button>`
                  }
                </div>
                <div class="foodInfo">
                  <p class="title">${item.title}</p>
                  <p class="foodName">${item.name}</p>
                  <p class="price">${formatCurrency(item.price)}</p>
                </div>
        </div>
        `;
    })
    .join("");
  dessertItemsContainer.innerHTML = dessertElements;
}

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
      inCart: true,
    });
  }

  const cartItemElements = cartItems
    .map(
      (item) =>
        ` 
      <div class="cartItem">
        <div>
          <p class="itemName">${item.name}</p> 
          <p class="itemInfo">${
            item.quantity
          }x <span class="itemPrice">@ ${formatCurrency(
          item.price
        )}</span> <span class="totalPriceInfo">${formatCurrency(
          item.price * item.quantity
        )}</span></p> 
        </div>
        <button onclick={deleteItem(${item.id})} id=${
          item.id
        } class="removeItem"><img src="/product-list-with-cart-main/assets/images/icon-remove-item.svg" alt="x"</button>
      </div>
      <hr />
      
  `
    )
    .join("");

  cartItemsContainer.innerHTML = cartItemElements;
  getTotal(cartItems);
  confirmOrderButton.style.display = "block";
  deliveryType.style.display = "block";
  orderPrice.style.display = "flex";
};

function getTotal(cartItems) {
  let { totalQuantity, totalPrice } = cartItems.reduce(
    (total, items) => {
      total.totalPrice += items.price * items.quantity;
      total.totalQuantity += items.quantity;
      return total;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
  const totalQuantityHTML = document.querySelector(".totalQuantity");
  totalQuantityHTML.innerHTML = `${totalQuantity}`;
  const totalPriceHTML = document.querySelector(".totalPrice");
  totalPriceHTML.innerHTML = `${formatCurrency(totalPrice)}`;
}

function deleteItem(id) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === id) {
      cartItems[i].quantity = 1;
      cartItems.splice(i, 1);
    }
  }
  const cartItemElements = cartItems
    .map(
      (item) =>
        ` 
      <div class="cartItem">
        <div>
          <p class="itemName">${item.name}</p> 
          <p class="itemInfo">${
            item.quantity
          }x <span class="itemPrice">@ ${formatCurrency(
          item.price
        )}</span> <span class="totalPriceInfo">${formatCurrency(
          item.price * item.quantity
        )}</span></p> 
        </div>
        <button onclick={deleteItem(${item.id})} id=${
          item.id
        } class="removeItem"><img src="/product-list-with-cart-main/assets/images/icon-remove-item.svg" alt="x"</button>
      </div>
      <hr />
      
  `
    )
    .join("");
  cartItemsContainer.innerHTML = cartItemElements;
  getTotal(cartItems);

  if (cartItems.length === 0) {
    confirmOrderButton.style.display = "none";
    deliveryType.style.display = "none";
    orderPrice.style.display = "none";
    cartItemsContainer.innerHTML = `
        <img
          class="emptyCake"
          src="/product-list-with-cart-main/assets/images/illustration-empty-cart.svg"
          alt="empty"
        />
        <p class="emptyDescription">Your added items will appear here</p>`;
  }
}

function increaseItem(id) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i] && cartItems[i].id == id) {
      cartItems[i].quantity += 1;
    }
    getTotal(cartItems);
  }
}

function decreaseItem(id) {
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i] && cartItems[i].id > id) {
      cartItems[i].quantity -= 1;
    }
  }
  getTotal(cartItems);
}

renderDessertItems();

// function changeButtonAppearance(id) {
//   if (cartItems[id].inCart) {
//     originalCartButton.style.display = "none";
//   }
//   getTotal(cartItems);
// }

/*
const dessertElements = desserts
      .map((id) => {
        const isItemInCart = cartItems.find((item) => item.id === id);
        return `
        <div class="foodItem">
                <div class="imagePlusCart" >
                  <img
                    class="itemPic"
                    id="itemPicID"
                    src="${item.imgUrl}"
                    alt="${item.name}"
                    style="${
                      !!isItemInCart
                        ? "border: 1px solid hsl(14, 86%, 42%);"
                        : ""
                    }"
                  />
                  <div class="newAddCartButton">
                    <button class="decreaseButton" onclick={decreaseItem(${
                      item.id
                    })} id=${item.id}>
                      <img class="minusBtn" src="/product-list-with-cart-main/assets/images/icon-decrement-quantity.svg" alt="minus" />
                    </button>
                    <p class="quantityAmount">${item.quantity}</p>
                    <button class="increaseButton" onclick={increaseItem(${
                      item.id
                    })} id=${item.id}>
                      <img class="plusBtn" src="/product-list-with-cart-main/assets/images/icon-increment-quantity.svg" alt="plus" />
                      </button>
                  </div>
                </div>
                <div class="foodInfo">
                  <p class="title">${item.title}</p>
                  <p class="foodName">${item.name}</p>
                  <p class="price">${formatCurrency(item.price)}</p>
                </div>
        </div>
        `;
      })
      .join("");

    dessertItemsContainer.innerHTML = dessertElements;
*/
