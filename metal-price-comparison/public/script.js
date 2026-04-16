const BASE_URL = "http://localhost:8080/api";

// Store API data globally
let apiMetals = [];

// Chart instance
let priceChart = null;

// ─── FETCH FROM BACKEND ───────────────────────────────────────────
async function loadPricesFromAPI() {
  try {
    const response = await fetch(`${BASE_URL}/prices`);
    if (!response.ok) throw new Error("Backend error: " + response.status);
    apiMetals = await response.json();

    updateDashboardCards();
    updateComparisonTable();
    console.log("✅ Loaded from backend:", apiMetals);
  } catch (error) {
    console.error("❌ Could not connect to backend:", error);
    showError("Could not connect to backend. Make sure Spring Boot is running on port 8080.");
  }
}

function showError(msg) {
  const container = document.querySelector(".container");
  const existing = document.getElementById("api-error");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.id = "api-error";
  div.className = "alert alert-danger mt-3";
  div.textContent = "⚠️ " + msg;
  container.prepend(div);
}

// ─── DASHBOARD CARDS ──────────────────────────────────────────────
function updateDashboardCards() {
  // Group: take first entry per metal name
  const grouped = {};
  apiMetals.forEach(m => {
    if (!grouped[m.name]) grouped[m.name] = m;
  });

  const cards = document.querySelectorAll("#dashboard-page .col-lg-3");
  const metalOrder = ["Gold", "Silver", "Platinum", "Palladium"];

  metalOrder.forEach((name, index) => {
    const card = cards[index];
    if (!card || !grouped[name]) return;

    const metal = grouped[name];
    const priceEl   = card.querySelector(".price");
    const unitEl    = card.querySelector(".unit");
    const updateEl  = card.querySelector("small");

    if (priceEl) priceEl.textContent = `₹${metal.price.toLocaleString("en-IN")}`;
    if (unitEl)  unitEl.textContent  = metal.unit;
    if (updateEl) updateEl.textContent = `Updated: ${metal.lastUpdated}`;
  });
}

// ─── COMPARISON TABLE ─────────────────────────────────────────────
function updateComparison() {
  updateComparisonTable();
}

function updateComparisonTable() {
  const selectEl = document.getElementById("metalSelect");
  const selected = selectEl ? selectEl.value : "gold";

  // Filter API data by selected metal name (case-insensitive)
  const filtered = apiMetals.filter(m =>
    m.name.toLowerCase() === selected.toLowerCase()
  );

  const tbody = document.getElementById("comparisonTableBody");
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-center text-muted">
      No data for ${selected}. Make sure backend has this metal.
    </td></tr>`;
    return;
  }

  const prices  = filtered.map(m => m.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  tbody.innerHTML = filtered.map(m => {
    let badge = "";
    if (m.price === minPrice && filtered.length > 1)
      badge = '<span class="badge bg-success">Lowest</span>';
    else if (m.price === maxPrice && filtered.length > 1)
      badge = '<span class="badge bg-danger">Highest</span>';

    return `
      <tr>
        <td><strong>${m.city}</strong></td>
        <td class="text-end"><strong>₹${m.price.toLocaleString("en-IN")}</strong></td>
        <td class="text-center">${badge}</td>
      </tr>`;
  }).join("");
}

// ─── HISTORY CHART ────────────────────────────────────────────────
function generateHistoricalData(metalName, days) {
  // Use real price as base if available
  const match = apiMetals.find(m => m.name.toLowerCase() === metalName.toLowerCase());
  const basePrice = match ? match.price : 10000;

  const labels = [];
  const data   = [];
  const today  = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    const variance = (Math.random() - 0.5) * basePrice * 0.05;
    data.push(Math.round(basePrice + variance));
  }

  return { labels, data };
}

function initChart() {
  const ctx           = document.getElementById("priceChart").getContext("2d");
  const selectedMetal = document.getElementById("historyMetalSelect").value;
  const period        = parseInt(document.getElementById("periodSelect").value);
  const chartData     = generateHistoricalData(selectedMetal, period);

  if (priceChart) priceChart.destroy();

  priceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartData.labels,
      datasets: [{
        label: `${selectedMetal} Price (INR)`,
        data: chartData.data,
        borderColor: "#D4AF37",
        backgroundColor: "rgba(212, 175, 55, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#D4AF37"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: ctx => "Price: ₹" + ctx.parsed.y.toLocaleString("en-IN")
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: val => "₹" + val.toLocaleString("en-IN")
          }
        }
      }
    }
  });
}

function updateChart() {
  if (priceChart) initChart();
}

// ─── ADMIN FORM ───────────────────────────────────────────────────
async function handleSubmit(event) {
  event.preventDefault();

  const metal  = document.getElementById("adminMetalSelect").value;
  const price  = document.getElementById("priceInput").value;
  const city   = document.getElementById("citySelect")?.value || "Delhi";

  if (!price || isNaN(Number(price))) {
    alert("Please enter a valid price");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/prices/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: metal, city: city, price: Number(price) })
    });

    if (response.ok) {
      // Show success
      const successMsg = document.getElementById("successMessage");
      successMsg.style.display = "block";
      setTimeout(() => successMsg.style.display = "none", 3000);

      // Reload prices from backend
      await loadPricesFromAPI();

      document.getElementById("updateForm").reset();
    } else {
      alert("Update failed. Check backend.");
    }
  } catch (error) {
    console.error("Update failed:", error);
    alert("Could not connect to backend: " + error.message);
  }
}

// ─── NAVIGATION ───────────────────────────────────────────────────
function showPage(pageName, event) {
  document.querySelectorAll(".page-content")
    .forEach(p => p.style.display = "none");

  document.getElementById(pageName + "-page").style.display = "block";

  document.querySelectorAll(".nav-link")
    .forEach(l => l.classList.remove("active"));

  if (event) event.target.classList.add("active");

  if (pageName === "history" && !priceChart) initChart();
  if (pageName === "compare") updateComparisonTable();
}

// ─── INIT ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadPricesFromAPI();
});