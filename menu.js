// ------- SIMPLE MENU DATA -------
const menu = [
  { id: 1, name: "Paneer Butter Masala", price: 220 },
  { id: 2, name: "Shahi Paneer", price: 240 },
  { id: 3, name: "Dal Makhani", price: 190 },
  { id: 4, name: "Jeera Rice", price: 120 },
  { id: 5, name: "Butter Naan", price: 40 },
  { id: 6, name: "Tandoori Roti", price: 25 },
  { id: 7, name: "Cold Drink", price: 40 },
  { id: 8, name: "Mineral Water", price: 20 }
];

// ------- TABLE NUMBER (optional) -------
const params = new URLSearchParams(window.location.search);
const tableNo = params.get("table") || "Not Provided";
const tableInfoEl = document.getElementById("table-info");
if (tableInfoEl) {
  tableInfoEl.innerText = "Table No: " + tableNo;
}

// ------- CART DATA -------
let cart = [];

// item cart me add karo
function addToCart(id) {
  // menu me item dhoondo
  let item = null;
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].id === id) {
      item = menu[i];
      break;
    }
  }
  if (!item) {
    return;
  }

  // cart me already hai to qty++
  let found = null;
  for (let j = 0; j < cart.length; j++) {
    if (cart[j].id === id) {
      found = cart[j];
      break;
    }
  }

  if (found) {
    found.qty = found.qty + 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1
    });
  }

  renderCart();
}

// ------- CART KO SCREEN PAR DIKHAO -------
function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalEl = document.getElementById("total");

  if (!cartDiv || !totalEl) {
    return;
  }

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No items added yet.</p>";
    totalEl.innerText = "Total: ₹0";
    return;
  }

  let html = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const c = cart[i];
    const lineTotal = c.price * c.qty;
    total = total + lineTotal;

    html =
      html +
      "<p>" +
      c.name +
      " x " +
      c.qty +
      " = ₹" +
      lineTotal +
      "</p>";
  }

  cartDiv.innerHTML = html;
  totalEl.innerText = "Total: ₹" + total;
}

// ------- MENU KO SCREEN PAR DIKHAO -------
function renderMenu() {
  const menuDiv = document.getElementById("menu");
  if (!menuDiv) {
    return;
  }

  let html = "";

  for (let i = 0; i < menu.length; i++) {
    const item = menu[i];
    html =
      html +
      "<div>" +
      "<strong>" +
      item.name +
      "</strong><br>" +
      "Price: ₹" +
      item.price +
      " " +
      "<button onclick='addToCart(" +
      item.id +
      ")'>Add</button>" +
      "<hr>" +
      "</div>";
  }

  menuDiv.innerHTML = html;
}

// ------- PLACE ORDER (abhi sirf alert) -------
function placeOrder() {
  if (cart.length === 0) {
    alert("Please add at least one item.");
    return;
  }

  let message = "Table: " + tableNo + "\n\n";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const c = cart[i];
    const lineTotal = c.price * c.qty;
    total = total + lineTotal;
    message =
      message +
      c.name +
      " x " +
      c.qty +
      " = ₹" +
      lineTotal +
      "\n";
  }

  message = message + "\nTotal: ₹" + total;

  alert("ORDER SUMMARY:\n\n" + message);
}

// button ka click connect karo
const placeBtn = document.getElementById("place-order-btn");
if (placeBtn) {
  placeBtn.addEventListener("click", placeOrder);
}

// start
renderMenu();
renderCart();
