// City price data
const cityPrices = {
    gold: [
        { city: 'Mumbai', price: 65420 },
        { city: 'Delhi', price: 65380 },
        { city: 'Bangalore', price: 65450 },
        { city: 'Chennai', price: 65410 },
        { city: 'Kolkata', price: 65395 },
        { city: 'Hyderabad', price: 65430 }
    ],
    silver: [
        { city: 'Mumbai', price: 78540 },
        { city: 'Delhi', price: 78510 },
        { city: 'Bangalore', price: 78580 },
        { city: 'Chennai', price: 78520 },
        { city: 'Kolkata', price: 78495 },
        { city: 'Hyderabad', price: 78560 }
    ],
    platinum: [
        { city: 'Mumbai', price: 31200 },
        { city: 'Delhi', price: 31180 },
        { city: 'Bangalore', price: 31220 },
        { city: 'Chennai', price: 31195 },
        { city: 'Kolkata', price: 31175 },
        { city: 'Hyderabad', price: 31210 }
    ]
};

// Base prices for chart
const basePrices = {
    gold: 65420,
    silver: 78540,
    platinum: 31200,
    palladium: 29650
};

// Chart instance
let priceChart = null;

// Show specific page
function showPage(pageName, event) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.style.display = 'none');

    // Show selected page
    document.getElementById(pageName + '-page').style.display = 'block';

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    if (event) {
        event.target.classList.add('active');
    }

    // Initialize chart if needed
    if (pageName === 'history' && !priceChart) {
        initChart();
    }
}

// Update comparison table
function updateComparison() {
    const selectedMetal = document.getElementById('metalSelect').value;
    const data = cityPrices[selectedMetal];
    const tbody = document.getElementById('comparisonTableBody');

    // Find min and max prices
    const prices = data.map(item => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Generate table rows
    let html = '';
    data.forEach(item => {
        let badge = '';
        if (item.price === minPrice) {
            badge = '<span class="badge bg-success">Lowest</span>';
        } else if (item.price === maxPrice) {
            badge = '<span class="badge bg-danger">Highest</span>';
        }

        html += `
            <tr>
                <td><strong>${item.city}</strong></td>
                <td class="text-end"><strong>₹${item.price.toLocaleString()}</strong></td>
                <td class="text-center">${badge}</td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// Generate historical data
function generateHistoricalData(basePrice, days) {
    const data = [];
    const labels = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Format date
        const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        labels.push(label);

        // Generate price with some variance
        const variance = (Math.random() - 0.5) * (basePrice * 0.05);
        const price = Math.round(basePrice + variance);
        data.push(price);
    }

    return { labels, data };
}

// Initialize chart
function initChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    const selectedMetal = document.getElementById('historyMetalSelect').value;
    const period = parseInt(document.getElementById('periodSelect').value);

    const basePrice = basePrices[selectedMetal];
    const chartData = generateHistoricalData(basePrice, period);

    if (priceChart) {
        priceChart.destroy();
    }

    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Price (INR)',
                data: chartData.data,
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#D4AF37'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return 'Price: ₹' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Update chart
function updateChart() {
    if (priceChart) {
        initChart();
    }
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();

    const metal = document.getElementById('adminMetalSelect').value;
    const price = document.getElementById('priceInput').value;
    const source = document.getElementById('sourceSelect').value;

    // Show success message
    const successMsg = document.getElementById('successMessage');
    successMsg.style.display = 'block';

    // Hide after 3 seconds
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);

    // Reset form
    document.getElementById('updateForm').reset();

    console.log('Updated:', { metal, price, source });
}

// Initialize comparison table on page load
document.addEventListener('DOMContentLoaded', function() {
    updateComparison();
});