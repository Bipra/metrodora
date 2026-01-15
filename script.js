const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (document.getElementById("medicineList")) {
  document.getElementById("searchInput").addEventListener("input", function() {
    const value = this.value.toLowerCase();
    const result = medicines.filter(m =>
      m.brand.toLowerCase().includes(value) ||
      m.salt.toLowerCase().includes(value)
    );

    document.getElementById("medicineList").innerHTML =
      result.map(m =>
        `<div class="card">
          <a href="medicine.html?id=${m.id}">
            <b>${m.brand}</b><br>
            ${m.strength} | ₹${m.price}
          </a>
        </div>`
      ).join("");
  });
}

if (id) {
  const med = medicines.find(m => m.id == id);

  document.getElementById("details").innerHTML = `
    <h1>${med.brand}</h1>
    <p><b>Salt:</b> ${med.salt}</p>
    <p><b>Strength:</b> ${med.strength}</p>
    <p><b>Manufacturer:</b> ${med.manufacturer}</p>
    <p><b>Price:</b> ₹${med.price}</p>
  `;

  const alternatives = medicines.filter(m =>
    m.salt === med.salt &&
    m.strength === med.strength &&
    m.id != med.id
  ).sort((a,b)=>a.price-b.price);

  document.getElementById("alternatives").innerHTML =
    alternatives.map(a =>
      `<div class="card">
        <b>${a.brand}</b><br>
        ₹${a.price}
      </div>`
    ).join("");
}
