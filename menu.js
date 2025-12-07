// ------------- TABLE NUMBER -------------

function getTableNumber() {
  var query = window.location.search; // ?table=1
  var table = "Not Provided";

  if (query.indexOf("table=") !== -1) {
    var parts = query.split("table=");
    if (parts.length > 1) {
      var numPart = parts[1].split("&")[0];
      if (numPart) {
        table = numPart;
      }
    }
  }

  var t = document.getElementById("table-text");
  if (t) {
    t.innerHTML = "Table No: " + table;
  }
  return table;
}

var tableNo = getTableNumber();

// ------------- MENU DATA -------------

var menu = [
  { id: 1, name: "Paneer Butter Masala", price: 220 },
  { id: 2, name: "Shahi Paneer", price: 240 },
  { id: 3, name: "Dal Makhani", price: 190 },
  { id: 4, name: "Jeera Rice", price: 120 },
  { id: 5, name: "Butter Naan", price: 40 },
  { id: 6, name: "Tandoori Roti", price: 25 },
  { id: 7, name: "Cold Drink", price: 40 },
  { id: 8, name: "Mineral Water", price: 20 }
];

// ------------- CART -------------

var cart = [];

function addToCart(id) {
  var item = null;
  for (var i = 0; i < menu.length; i++) {
    if (menu[i].id === id) {
      item = menu[i];
      break;
    }
  }
  if (!item) return;

  cart.push(item);
  renderCart();
}

function renderCart() {
  var cartDiv = document.getElementById("cart");
  var totalP = document.getElementById("total");
  if (!cartDiv || !totalP) return;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No items added yet.</p>";
    totalP.innerHTML = "Total: ₹0";
    return;
  }

  var html = "";
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var c = cart[i];
    html +=
      "<p>" + c.name + " - ₹" + c.price + "</p>";
    total += c.price;
  }

  cartDiv.innerHTML = html;
  totalP.innerHTML = "Total: ₹" + total;
}

// ------------- MENU RENDER -------------

function renderMenu() {
  var menuDiv = document.getElementById("menu");
  if (!menuDiv) return;

  var html = "";

  for (var i = 0; i < menu.length; i++) {
    var m = menu[i];
    html +=
      "<div class='menu-item'>" +
      "<span>" + m.name + " - ₹" + m.price + "</span>" +
      " <button onclick='addToCart(" + m.id + ")'>Add</button>" +
      "</div>";
  }

  menuDiv.innerHTML = html;
}

// ------------- PLACE ORDER (abhi sirf alert) -------------

function placeOrder() {
  if (cart.length === 0) {
    alert("Please add at least one item.");
    return;
  }

  var msg = "New order from Table: " + tableNo + "\n\n";
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var c = cart[i];
    var lineTotal = c.price; // har item ek baar add ho raha hai
    msg += c.name + " - ₹" + lineTotal + "\n";
    total += lineTotal;
  }

  msg += "\nTotal: ₹" + total;

  // 👇 yaha chacha ka WhatsApp number daalo
  // format: 91 + 10 digit number (without + sign)
  var phone = "91XXXXXXXXXX";

  var url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(msg);

  window.location.href = url;
}

// button listener
var btn = document.getElementById("placeOrder");
if (btn) {
  btn.onclick = placeOrder;
}

// start
renderMenu();
renderCart();

