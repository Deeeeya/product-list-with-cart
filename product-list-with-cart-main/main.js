let quantity = document.querySelectorAll(".addCart").length;
const cart = document.getElementById("cartTable");

const desserts = [
  { id: 1, name: "Waffle with Berries", price: 6.5, quantity: 1 },
  { id: 2, name: "Vanilla Bean Crème Brûlée", price: 7.0, quantity: 1 },
  { id: 3, name: "Macaron Mix of Five", price: 8.0, quantity: 1 },
  { id: 4, name: "Classic Tiramisu", price: 5.5, quantity: 1 },
  { id: 5, name: "Pistachio Baklava", price: 4.0, quantity: 1 },
  { id: 6, name: "Lemon Meringue Pie", price: 5.0, quantity: 1 },
  { id: 7, name: "Rev Velvet Cake", price: 4.5, quantity: 1 },
  { id: 8, name: "Salted Caramel Brownie", price: 5.5, quantity: 1 },
  { id: 9, name: "Vanilla Panna Cotta", price: 6.5, quantity: 1 },
];

function updateCart() {
  const cartHTML = cart.map(
    (desserts) => `
    <div class="cart-item">
      <h3>${desserts.name}</h3>
      <div class="cart-detail">
        <p>$${desserts.price}</p>
        <button onlick="deleteItem(${desserts.id})" class="cart-dessert" id=${desserts.id}>x</button>
      </div>
    </div>`
  );
  const dessertMenu = document.querySelector(".dessertItems");
  dessertMenu.innerHTML = cartHTML.join("");
}
updateCart();

// add items to cart
for (let i = 0; i < quantity; i++) {
  document
    .querySelectorAll(".addCart")
    [i].addEventListener("click", function (e) {
      addToCart(desserts, parseInt(e.target.id));
    });
}

function addToCart(desserts, id) {
  const dessert = desserts.find((dessert) => dessert.id === id);
  cart.unshift(dessert);
  updateCart();
}

// find total price
function totalPrice(cart) {
  let cartTotal = cart.reduce((total, cartItem) => {
    total.cartTotal += cartItem.price * cartItem.quantity;
    return total;
  }, (cartTotal = 0));
  const totalPriceHTML = document.querySelector(".totalPrice");
  totalPriceHTML.innerHTML = `$${cartTotal}`;
}

// delete items in cart
function deleteItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = 1;
      cart.splice(i, 1);
    }
  }
  updateCart();
  getTotal(cart);
}
