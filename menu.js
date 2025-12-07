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

// Table number
const params = new URLSearchParams(window.location.search);
const tableNo = params.get("table") || "Not Provided";

// show table number
const tableDiv = document.createElement("h3");
tableDiv.innerText = "Table No: " + tableNo;
document.body.prepend(tableDiv);

// menu render
const menuDiv = document.getElementById("menu");

menu.forEach(item => {
  const div = document.createElement("div");
  div.style.padding = "10px";
  div.style.borderBottom = "1px solid gray";

  div.innerHTML = `
    <strong>${item.name}</strong><br>
    Price: ₹${item.price}
  `;

  menuDiv.appendChild(div);
});
