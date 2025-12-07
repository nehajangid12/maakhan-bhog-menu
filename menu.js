// ---------- MENU DATA ----------
const menu = [
  { id: 1, name: "Paneer Butter Masala", price: 220 },
  { id: 2, name: "Dal Tadka",             price: 160 },
  { id: 3, name: "Butter Naan",           price: 40  },
  { id: 4, name: "Tandoori Roti",         price: 25  }
];

// ---------- TABLE NUMBER FROM URL ----------
const params  = new URLSearchParams(window.location.search);
const tableNo = params.get("table") || "Not Provided";
document.getElementById("table").innerText = "Table No: " + tableNo;

// ---------- CART ----------
let cart = [];

// MENU SHOW
function renderMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = ""; // clear

  menu.forEach(function (item) {
    const div = document.createElement("div");
    div.className = "item";

    // text
    const info = document.createElement("span");
    info.textContent = item.name + " - ₹" + item.price;

    // button
    const btn = document.createElement("button");
    btn.textContent = "Add";
    btn.onclick = function () {
      addItem(item.id);
    };

    div.appendChild(info);
    div.appendChild(btn);
    menuDiv.appendChild(div);
  });
}

// ADD ITEM
function addItem(id) {
  const item = menu.find(function (m) { return m.id === id; });
  cart.push(item);
  renderCart();
}

// CART SHOW
function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach(function (item) {
    const p = document.createElement("p");
    p.textContent = item.name + " - ₹" + item.price;
    cartDiv.appendChild(p);
    total += item.price;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

// PLACE ORDER
document.getElementById("placeOrder").onclick = function () {
  if (cart.length === 0) {
    alert("No items selected");
    return;
  }

  let msg = "Order for Table " + tableNo + ":\n\n";
  let total = 0;

  cart.forEach(function (item) {
    msg += item.name + " - ₹" + item.price + "\n";
    total += item.price;
  });

  msg += "\nTotal: ₹" + total;

  alert(msg);
  cart = [];
  renderCart();
};

// INITIAL RENDER
renderMenu();
renderCart();