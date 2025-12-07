// ----- GET TABLE NUMBER -----
const params = new URLSearchParams(window.location.search);
const tableNo = params.get("table") || "Not Provided";
document.getElementById("table").innerText = "Table No: " + tableNo;

// ----- MENU DATA -----
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

// ----- CART -----
let cart = [];

// ----- SHOW MENU -----
function renderMenu() {
  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    const info = document.createElement("span");
    info.innerText = ${item.name} - ₹${item.price};

    const btn = document.createElement("button");
    btn.innerText = "Add";
    btn.onclick = () => addToCart(item.id);

    div.appendChild(info);
    div.appendChild(btn);
    menuDiv.appendChild(div);
  });
}

// ----- ADD TO CART -----
function addToCart(id) {
  const item = menu.find(i => i.id === id);
  cart.push(item);
  showCart();
}

// ----- SHOW CART -----
function showCart() {
  const orderDiv = document.getElementById("order");
  const totalDiv = document.getElementById("total");

  orderDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const p = document.createElement("p");
    p.innerText = ${item.name} - ₹${item.price};
    orderDiv.appendChild(p);
    total += item.price;
  });

  totalDiv.innerText = "Total: ₹" + total;
}

// ----- SEND TO WHATSAPP -----
function placeOrder() {
  if (cart.length === 0) {
    alert("Please select items first");
    return;
  }

  let text = Order from Table ${tableNo}%0A%0A;
  let total = 0;

  cart.forEach(i => {
    text += ${i.name} - ₹${i.price}%0A;
    total += i.price;
  });

  text += %0ATotal: ₹${total};

  const phone = "91XXXXXXXXXX"; // 👈 apna number daalo
  window.open(https://wa.me/${phone}?text=${text}, "_blank");
}

// RUN MENU
renderMenu();
