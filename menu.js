// ------------- TABLE NUMBER -------------
var pendingPopup = false;
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

// URL se aaya hua table no (global)
var tableNo = getTableNumber();


// ------------- MENU DATA -------------

var menu = [
  { id: 1, name: "Paneer Butter Masala", price: 220, img: "https://i0.wp.com/infusedliving.net/wp-content/uploads/2023/03/Paneer-makhani-scaled.webp?fit=750%2C1000&ssl=1" },
  { id: 2, name: "Shahi Paneer",         price: 240, img: "https://img.freepik.com/premium-photo/modern-kitchen-shahi-paneer_1179130-90095.jpg?w=2000" },
  { id: 3, name: "Dal Makhani",          price: 190, img: "https://wallpaperaccess.com/full/10568742.jpg" },
  { id: 4, name: "Jeera Rice",           price: 120, img: "https://nishkitchen.com/wp-content/uploads/2019/03/Jeera-Rice-1B-480x480.jpg" },
  { id: 5, name: "Butter Naan",          price: 40,  img: "https://img.freepik.com/premium-photo/butter-naan-delightfully-fluffy-flavorful-indian-bread-straight-from-tandoor-clay-oven_1015980-44475.jpg" },
  { id: 6, name: "Tandoori Roti",        price: 25,  img: "https://tse2.mm.bing.net/th/id/OIP.x-LwN81NhTOgLkABr-XXWwHaEK?pid=Api&P=0&h=180" },
  { id: 7, name: "Dosa",                 price: 180, img: "https://tse1.mm.bing.net/th/id/OIP.J5rELBbpNsC98i3tFfgeVgHaHa?pid=Api&P=0&h=180" },
  { id: 8, name: "Idli-Sambhar",         price: 120, img: "https://img.freepik.com/premium-photo/idly-sambar-idli-with-sambhar-green-red-chutney-popular-south-indian-breakfast_999766-2544.jpg?w=740" }
];


// ------------- CART -------------

var cart = [];

// item cart me add karo
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

// cart se item hatao (index ke basis pe)
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// cart ko screen par dikhana
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
      "<div class='cart-item'>" +
        "<span>" + c.name + " - ₹" + c.price + "</span>" +
        "<button onclick='removeItem(" + i + ")' class='remove-btn'>Remove</button>" +
      "</div>";
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
      "<div class='menu-card'>" +
        "<img class='menu-img' src='" + m.img + "' alt='" + m.name + "'>" +
        "<div class='menu-info'>" +
          "<div class='menu-name'>" + m.name + "</div>" +
          "<div class='menu-bottom-row'>" +
            "<span class='menu-price'>₹" + m.price + "</span>" +
            "<button class='menu-add-btn' onclick='addToCart(" + m.id + ")'>+ Add</button>" +
          "</div>" +
        "</div>" +
      "</div>";
  }

  menuDiv.innerHTML = html;
}


// ------------- PLACE ORDER (WhatsApp + POPUP) -------------
function placeOrder() {
  if (cart.length === 0) {
    alert("Please add at least one item.");
    return;
  }

  // final table number: localStorage > URL > "Not Provided"
  var savedTable = localStorage.getItem("tableNo");
  var finalTableNo = savedTable || tableNo || "Not Provided";

  var msg = "New order from Table: " + finalTableNo + "\n\n";
  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    var c = cart[i];
    msg += c.name + " - ₹" + c.price + "\n";
    total += c.price;
  }

  msg += "\nTotal: ₹" + total;

  // 👉 yaha chacha ka WhatsApp number daalo (91 + 10 digit, '+' mat lagana)
  var phone = "919783746912";

  var url =
    "https://api.whatsapp.com/send?phone=" +
    phone +
    "&text=" +
    encodeURIComponent(msg);

  // WhatsApp open karo
  var link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  localStorage.setItem("orderDone", "yes");

  // ✅ 3 second baad popup dikhana (user tab tak WhatsApp pe hoga / send karega)
  setTimeout(function () {
    showOrderPopup();
  }, 3000);
}


// ------------- BUTTON LISTENER -------------

var btn = document.getElementById("placeOrder");
if (btn) {
  btn.onclick = placeOrder;
}


// ------------- START -------------

renderMenu();
renderCart();


// removeItem already upar defined

// ------------- TABLE SAVE / LOAD -------------

// ------------- TABLE SAVE / LOAD -------------

function saveTable() {
  const table = document.getElementById("tableInput").value;

  if (table === "") {
    alert("Please enter table number!");
    return;
  }

  localStorage.setItem("tableNo", table);
  document.getElementById("table-text").innerText = "Table No: " + table;
}

// ✅ page reload pe table number wapas set karo
window.addEventListener("load", () => {
  const savedTable = localStorage.getItem("tableNo");
  if (savedTable) {
    document.getElementById("table-text").innerText = "Table No: " + savedTable;
  }
});

// ✅ order ke baad user sach-me page chhod kar gaya ya nahi, ye track karne ke liye
var leftAfterOrder = false;

// jab window blur ho (user dusri tab / app pe jaye: WhatsApp, etc.)
window.addEventListener("blur", function () {
  if (pendingPopup) {
    leftAfterOrder = true;
  }
});





// ---------- DARK / LIGHT THEME ----------

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  // button text update
  var btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = theme === "dark" ? "☀ Light" : "🌙 Dark";
  }

  // save preference
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  var isDark = document.body.classList.contains("dark-theme");
  applyTheme(isDark ? "light" : "dark");
}

function initTheme() {
  var saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);

  var btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }
}

// page load pe theme set karo
window.addEventListener("load", initTheme);



function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.textContent = theme === "dark" ? "☀" : "🌙";
  }

  localStorage.setItem("theme", theme);
}

function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const saved = localStorage.getItem("theme") || "light";
  applyTheme(saved);

  btn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    applyTheme(isDark ? "light" : "dark");
  });
}

window.addEventListener("load", initThemeToggle);

// ===== ORDER POPUP FUNCTIONS =====

// show popup
function showOrderPopup() {
  // clear cart
  cart = [];
  renderCart();

  const popup = document.getElementById("orderSuccess");
  if (popup) popup.classList.add("show");
}

// close popup
function closeOrderPopup() {
  const popup = document.getElementById("orderSuccess");
  if (popup) popup.classList.remove("show");
}

// WhatsApp ke baad popup show karo
window.addEventListener("focus", function () {
  let done = localStorage.getItem("orderDone");

  if (done === "yes") {
    showOrderPopup();
    localStorage.removeItem("orderDone");
  }
});
