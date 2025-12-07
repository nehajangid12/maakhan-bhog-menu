// ---------- MENU ITEMS ----------
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

// ---------- TABLE NUMBER FROM URL ----------
const params = new URLSearchParams(window.location.search);
const tableNo = params.get("table") || "Not Provided";
document.getElementById("table-info").innerText = "Table No: " + tableNo;

// ---------- CART ----------
let cart = [];

// add item
function addToCart(id) {
  const item = menu.find(m => m.id === id);
  if (!item) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

// decrease item
function decreaseItem(id) {
  const existing = cart.find(c => c.id === id);
  if (!existing) return;
  existing.qty -= 1;
  if (existing.qty <= 0) {
    cart = cart.filter(c => c.id !== id);
  }
  renderCart();
}

// ---------- RENDER MENU ----------
function renderMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  menu.forEach(item => {
    const row = document.createElement("div");
    row.className = "menu-item";

    row.innerHTML = `
      <div>
        <div class="item-name">${item.name}</div>
        <div class="item-price">₹${item.price}</div>
      </div>
      <button class="btn-add" data-id="${item.id}">Add +</button>
    `;

    menuDiv.appendChild(row);
  });

  // attach click for all buttons
  document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// ---------- RENDER CART ----------
function renderCart() {
  const cartDiv = document.getElementById("cart");
  const totalP = document.getElementById("total");

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>No items added yet.</p>";
    totalP.innerText = "Total: ₹0";
    return;
  }

  let total = 0;
  cartDiv.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <div class="item-name">${item.name}</div>
        <div class="item-price">₹${item.price} x ${item.qty}</div>
      </div>
      <div class="qty-buttons">
        <button class="btn-qty" data-id="${item.id}" data-action="dec">-</button>
        <button class="btn-qty" data-id="${item.id}" data-action="inc">+</button>
      </div>
    `;
    cartDiv.appendChild(row);
  });

  totalP.innerText = "Total: ₹" + total;

  // quantity buttons
  document.querySelectorAll(".btn-qty").forEach(btn => {
    const id = Number(btn.getAttribute("data-id"));
    const action = btn.getAttribute("data-action");
    btn.addEventListener("click", () => {
      if (action === "inc") addToCart(id);
      else decreaseItem(id);
    });
  });
}

// ---------- PLACE ORDER (WHATSAPP) ----------
function placeOrder() {
  if (cart.length === 0) {
    alert("Please add at least one item.");
    return;
  }

  let total = 0;
  let lines = cart.map(item => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    return ${item.name} x ${item.qty} = ₹${lineTotal};
  });

  const message =
    New order from Table: ${tableNo}\n\n +
    lines.join("\n") +
    \n\nTotal: ₹${total};

  // 👉 yahan pe restaurant ka WhatsApp number daalo
  const phone = "91XXXXXXXXXX"; // for example 91 + 10-digit number

  const url =
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

  // WhatsApp open
  window.location.href = url;
}

// button listener
document.getElementById("place-order-btn").addEventListener("click", placeOrder);

// start
renderMenu();
renderCart();
