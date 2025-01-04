const cartItemsContainer = document.getElementById("cart-items");
const dessertItemsContainer = document.getElementById("products-items");
const confirmationContainer = document.getElementById("chosenItems");
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
      const isItemInCart = cartItems.find((product) => product.id === item.id);
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
                        ? "border: 2px solid hsl(14, 86%, 42%);"
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

  confirmOrderButton.style.display = "block";
  deliveryType.style.display = "block";
  orderPrice.style.display = "flex";
  renderCartItems();
  getTotal(cartItems);
  renderDessertItems();
  increaseItem(id);
  decreaseItem(id);
  renderConfirmationOrder;
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

function renderCartItems() {
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
}

function deleteItem(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  const dessertItem = desserts.find((item) => item.id === id);
  if (!!dessertItem) {
    dessertItem.quantity = 1;
  }
  renderCartItems();
  getTotal(cartItems);
  renderDessertItems();

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
  const cartItem = cartItems.find((item) => item.id === id);
  const dessertItem = desserts.find((item) => item.id === id);

  if (!!cartItem) {
    cartItem.quantity += 1;
  }

  if (!!dessertItem) {
    dessertItem.quantity += 1;
  }

  renderCartItems();
  renderDessertItems();
  getTotal(cartItems);
}

function decreaseItem(id) {
  const cartItem = cartItems.find((item) => item.id === id);
  const dessertItem = desserts.find((item) => item.id === id);

  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  }

  if (dessertItem && dessertItem.quantity > 1) {
    dessertItem.quantity -= 1;
  }

  renderCartItems();
  renderDessertItems();
  getTotal(cartItems);
}

renderDessertItems();

function getReceiptTotal(cartItems) {
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
  const totalReceiptPriceHTML = document.querySelector(".confirmedTotalPrice");
  totalReceiptPriceHTML.innerHTML = `${formatCurrency(totalPrice)}`;
}

function renderConfirmationOrder() {
  const orderReceipt = cartItems
    .map(
      (item) =>
        `
  
    <div class="itemReceiptContainer"
      <img class="receiptItemPic" src="${item.imgUrl}" alt="${item.name}"/>
      <div class="namePlusInfo">
        <p class="itemName">${item.name}</p> 
        <p class="itemInfo">${
          item.quantity
        }x <span class="itemPrice">@ ${formatCurrency(item.price)}</span></p>
      </div>
      <p class="confirmedPriceInfo">${formatCurrency(
        item.price * item.quantity
      )}</p>
    </div>
  
  `
    )
    .join("");
  confirmationContainer.innerHTML = orderReceipt;
  getReceiptTotal(cartItems);
}

confirmOrderButton.addEventListener("click", renderConfirmationOrder);
