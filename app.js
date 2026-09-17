let order = [];
let totalSales = 0;
let completed = 0;

const tables = [
    { number: 1, busy: false },
    { number: 2, busy: false },
    { number: 3, busy: false },
    { number: 4, busy: false },
    { number: 5, busy: false },
    { number: 6, busy: false },
    { number: 7, busy: false },
    { number: 8, busy: false }
];

function showPage(page) {
    document.querySelectorAll(".page").forEach(section => {
        section.classList.remove("active-page");
    });

    document.getElementById(page).classList.add("active-page");

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.remove("active");
    });

    event.target.classList.add("active");
}

function renderTables() {
    const containers = [
        document.getElementById("tablesList"),
        document.getElementById("dashboardTables")
    ];

    containers.forEach(container => {
        if (!container) return;

        container.innerHTML = "";

        tables.forEach(table => {
            const div = document.createElement("div");

            div.className =
                "table " + (table.busy ? "busy" : "available");

            div.innerHTML = `
                <h3>🪑 Tavolina ${table.number}</h3>
                <div class="status">
                    ${table.busy ? "🔴 E zënë" : "🟢 E lirë"}
                </div>
            `;

            div.onclick = () => toggleTable(table.number);

            container.appendChild(div);
        });
    });

    updateDashboard();
}

function toggleTable(number) {
    const table = tables.find(t => t.number === number);

    table.busy = !table.busy;

    renderTables();
}

function addProduct(name, price) {
    order.push({
        name: name,
        price: price
    });

    renderOrder();

    showPage("orders");
}

function renderOrder() {
    const container = document.getElementById("orderItems");

    container.innerHTML = "";

    if (order.length === 0) {
        container.innerHTML =
            `<p class="empty">Nuk ka produkte.</p>`;
    } else {
        order.forEach(item => {
            const div = document.createElement("div");

            div.className = "order-item";

            div.innerHTML = `
                <span>${item.name}</span>
                <strong>${item.price} Lek</strong>
            `;

            container.appendChild(div);
        });
    }

    const total = order.reduce(
        (sum, item) => sum + item.price,
        0
    );

    document.getElementById("orderTotal").textContent =
        total + " Lek";
}

function completeOrder() {
    if (order.length === 0) {
        alert("Nuk ka produkte në porosi!");
        return;
    }

    const total = order.reduce(
        (sum, item) => sum + item.price,
        0
    );

    totalSales += total;
    completed++;

    order = [];

    renderOrder();
    updateDashboard();

    alert("✅ Porosia u mbyll me sukses!");
}

function updateDashboard() {
    const active = tables.filter(t => t.busy).length;

    document.getElementById("todaySales").textContent =
        totalSales + " Lek";

    document.getElementById("activeTables").textContent =
        active;

    document.getElementById("orderCount").textContent =
        completed;

    document.getElementById("cashTotal").textContent =
        totalSales + " Lek";

    document.getElementById("completedOrders").textContent =
        completed;
}

function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString("sq-AL", {
            hour: "2-digit",
            minute: "2-digit"
        });
}

renderTables();
renderOrder();
updateClock();

setInterval(updateClock, 1000);
