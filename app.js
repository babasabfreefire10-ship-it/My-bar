/* =========================================================
   MY BAR - NEW APP.JS
   Complete management system
========================================================= */

"use strict";


/* =========================================================
   STORAGE
========================================================= */

const KEYS = {
    users: "barUsersV4",
    products: "barProductsV4",
    invoices: "barInvoicesV4",
    tables: "barTablesV5",
    tableCount: "barTableCountV4",
    currentUser: "barCurrentUserV4",
    appName: "barAppNameV4",
    inventory: "barInventoryV2",
    selectedTable: "barSelectedTableV2"
};


/* =========================================================
   DEFAULT USERS
========================================================= */

const DEFAULT_USERS = [
    {
        id: "admin",
        username: "admin",
        password: "1234",
        role: "admin",
        name: "Administrator"
    },
    {
        id: "waiter1",
        username: "kamarier1",
        password: "1234",
        role: "waiter",
        name: "Kamarier 1"
    }
];


/* =========================================================
   DEFAULT PRODUCTS
   Photos are remote image URLs.
========================================================= */

const DEFAULT_PRODUCTS = [

    {
        id: "espresso",
        name: "Espresso",
        price: 100,
        category: "Kafe",
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "macchiato",
        name: "Macchiato",
        price: 120,
        category: "Kafe",
        image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "cappuccino",
        name: "Cappuccino",
        price: 150,
        category: "Kafe",
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "americano",
        name: "Americano",
        price: 130,
        category: "Kafe",
        image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "water",
        name: "Ujë",
        price: 80,
        category: "Pije",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "coca-cola",
        name: "Coca Cola",
        price: 150,
        category: "Pije",
        image: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "fanta",
        name: "Fanta",
        price: 150,
        category: "Pije",
        image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "sprite",
        name: "Sprite",
        price: 150,
        category: "Pije",
        image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "redbull",
        name: "Red Bull",
        price: 250,
        category: "Pije",
        image: "https://images.unsplash.com/photo-1613298593212-4d1f7f4b7c4e?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "beer",
        name: "Birrë",
        price: 200,
        category: "Alkool",
        image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "wine",
        name: "Verë",
        price: 300,
        category: "Alkool",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "vodka",
        name: "Vodka",
        price: 350,
        category: "Alkool",
        image: "https://images.unsplash.com/photo-1608885898957-a5599e505f6c?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "pizza",
        name: "Pizza",
        price: 500,
        category: "Ushqim",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "burger",
        name: "Burger",
        price: 450,
        category: "Ushqim",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: "fries",
        name: "Patate",
        price: 250,
        category: "Ushqim",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85"
    }

];


/* =========================================================
   STATE
========================================================= */

let users = [];
let products = [];
let invoices = [];
let tables = [];
let inventory = {};

let currentUser = null;
let selectedTableId = null;
let selectedCategory = "Të gjitha";
let currentOrder = [];

let editingUserId = null;
let editingProductId = null;


/* =========================================================
   HELPERS
========================================================= */

function getJSON(key, fallback) {
    try {
        const value = localStorage.getItem(key);

        if (!value) return fallback;

        return JSON.parse(value);

    } catch {
        return fallback;
    }
}


function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function money(value) {
    return `${Number(value || 0).toLocaleString("sq-AL")} L`;
}


function todayKey() {
    const d = new Date();

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}


function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   INITIALIZATION
========================================================= */

function init() {

    users = getJSON(KEYS.users, DEFAULT_USERS);

    if (!users.length) {
        users = [...DEFAULT_USERS];
        saveJSON(KEYS.users, users);
    }


    products = getJSON(KEYS.products, DEFAULT_PRODUCTS);

    if (!products.length) {
        products = [...DEFAULT_PRODUCTS];
        saveJSON(KEYS.products, products);
    }


    invoices = getJSON(KEYS.invoices, []);


    const tableCount = Number(
        localStorage.getItem(KEYS.tableCount) || 12
    );


    tables = getJSON(KEYS.tables, []);

    if (!tables.length) {

        for (let i = 1; i <= tableCount; i++) {

            tables.push({
                id: `table-${i}`,
                number: i,
                name: `Tavolina ${i}`,
                items: []
            });

        }

        saveJSON(KEYS.tables, tables);
    }


    inventory = getJSON(KEYS.inventory, {});

    products.forEach(product => {

        if (inventory[product.id] === undefined) {
            inventory[product.id] = 20;
        }

    });

    saveJSON(KEYS.inventory, inventory);


    currentUser = getJSON(
        KEYS.currentUser,
        null
    );


    if (!currentUser) {

        window.location.href = "login.html";
        return;

    }


    selectedTableId = localStorage.getItem(
        KEYS.selectedTable
    ) || null;


    applyAppName();
    updateUserHeader();
    setupNavigation();
    setupSearch();
    updateClock();
    setInterval(updateClock, 1000);

    renderAll();

}


/* =========================================================
   APP NAME
========================================================= */

function applyAppName() {

    const name =
        localStorage.getItem(KEYS.appName)
        || "MY BAR";

    const appName = document.getElementById("appName");

    if (appName) {
        appName.textContent = name;
    }

    const input =
        document.getElementById("appNameInput");

    if (input) {
        input.value = name;
    }
}


/* =========================================================
   USER
========================================================= */

function updateUserHeader() {

    const userInfo =
        document.getElementById("userInfo");

    if (!userInfo || !currentUser) return;

    userInfo.textContent =
        currentUser.name || currentUser.username;

}


function isAdmin() {

    return currentUser &&
        currentUser.role === "admin";

}


function setupRoleUI() {

    document
        .querySelectorAll(".admin-only")
        .forEach(element => {

            if (isAdmin()) {

                element.style.display = "";

            } else {

                element.style.display = "none";

            }

        });

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const section =
                    button.dataset.section;

                showSection(section);

            });

        });

}


function showSection(section) {

    if (
        ["cash", "history", "admin"].includes(section)
        && !isAdmin()
    ) {

        toast("Vetëm administratori ka akses.");

        return;

    }


    document
        .querySelectorAll(".page-section")
        .forEach(page => {

            page.classList.remove("active");

        });


    const target =
        document.getElementById(section);

    if (target) {
        target.classList.add("active");
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.section === section
            );

        });


    if (section === "dashboard") {
        renderDashboard();
    }

    if (section === "tables") {
        renderTables();
    }

    if (section === "menu") {
        renderMenu();
    }

    if (section === "orders") {
        renderOrder();
    }

    if (section === "cash") {
        renderCash();
    }

    if (section === "history") {
        renderHistory();
    }

    if (section === "admin") {
        renderAdmin();
    }

}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now = new Date();

    const clock =
        document.getElementById("clock");

    const date =
        document.getElementById("todayDate");


    if (clock) {

        clock.textContent =
            now.toLocaleTimeString(
                "sq-AL",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );

    }


    if (date) {

        date.textContent =
            now.toLocaleDateString(
                "sq-AL",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }

}


/* =========================================================
   TABLES
========================================================= */

function getTable(id) {

    return tables.find(
        table => table.id === id
    );

}


function tableIsBusy(table) {

    return Array.isArray(table.items)
        && table.items.length > 0;

}


function selectTable(id) {

    const table = getTable(id);

    if (!table) return;


    selectedTableId = id;

    localStorage.setItem(
        KEYS.selectedTable,
        id
    );


    currentOrder =
        Array.isArray(table.items)
            ? [...table.items]
            : [];


    renderAll();

    showSection("menu");

    toast(
        `${table.name} u zgjodh.`
    );

}


function renderTables() {

    const grid =
        document.getElementById("tableGrid");

    if (!grid) return;


    grid.innerHTML = tables.map(table => {

        const busy = tableIsBusy(table);

        const total = table.items.reduce(
            (sum, item) =>
                sum +
                Number(item.price || 0) *
                Number(item.quantity || 1),
            0
        );


        return `
            <button
                class="table-card ${busy ? "busy" : "available"}"
                type="button"
                onclick="selectTable('${table.id}')">

                <div class="table-number">
                    ${escapeHTML(table.number)}
                </div>

                <div class="table-info">

                    <strong>
                        ${escapeHTML(table.name)}
                    </strong>

                    <span>
                        ${
                            busy
                                ? `${money(total)} • ${table.items.length} artikuj`
                                : "E lirë"
                        }
                    </span>

                </div>

                <div class="table-status">
                    ${busy ? "ZËNË" : "E LIRË"}
                </div>

            </button>
        `;

    }).join("");

}


function renderDashboardTables() {

    const grid =
        document.getElementById(
            "dashboardTables"
        );

    if (!grid) return;


    grid.innerHTML = tables.map(table => {

        const busy = tableIsBusy(table);

        return `
            <button
                class="mini-table ${busy ? "busy" : ""}"
                type="button"
                onclick="selectTable('${table.id}')">

                <strong>${table.number}</strong>

                <span>
                    ${busy ? "ZËNË" : "E LIRË"}
                </span>

            </button>
        `;

    }).join("");

}


/* =========================================================
   MENU
========================================================= */

function getCategories() {

    return [
        "Të gjitha",
        ...new Set(
            products.map(
                product => product.category
            )
        )
    ];

}


function renderCategories() {

    const container =
        document.getElementById("categories");

    if (!container) return;


    container.innerHTML =
        getCategories().map(category => {

            return `
                <button
                    type="button"
                    class="category-btn ${
                        selectedCategory === category
                            ? "active"
                            : ""
                    }"
                    onclick="selectCategory('${escapeHTML(category)}')">

                    ${escapeHTML(category)}

                </button>
            `;

        }).join("");

}


function selectCategory(category) {

    selectedCategory = category;

    renderMenu();

}


function renderMenu() {

    renderCategories();


    const grid =
        document.getElementById("menuGrid");

    if (!grid) return;


    const search =
        document
            .getElementById("menuSearch")
            ?.value
            .toLowerCase()
            .trim() || "";


    const filtered =
        products.filter(product => {

            const categoryMatch =
                selectedCategory === "Të gjitha"
                || product.category === selectedCategory;


            const searchMatch =
                !search
                || product.name
                    .toLowerCase()
                    .includes(search);


            return categoryMatch && searchMatch;

        });


    if (!filtered.length) {

        grid.innerHTML = `
            <div class="empty-state">
                <div>⌕</div>
                <strong>Nuk u gjet produkt</strong>
                <span>Provo një kërkim tjetër.</span>
            </div>
        `;

        return;

    }


    grid.innerHTML =
        filtered.map(product => {

            const stock =
                Number(inventory[product.id] ?? 0);

            return `
                <article class="product-card">

                    <div class="product-image">

                        <img
                            src="${product.image}"
                            alt="${escapeHTML(product.name)}"
                            loading="lazy"
                            onerror="this.style.display='none'; this.parentElement.classList.add('no-image');">

                        <span class="product-category">
                            ${escapeHTML(product.category)}
                        </span>

                        ${
                            stock <= 5
                                ? `<span class="stock-badge">STOK ${stock}</span>`
                                : ""
                        }

                    </div>


                    <div class="product-content">

                        <div>
                            <h3>
                                ${escapeHTML(product.name)}
                            </h3>

                            <strong class="product-price">
                                ${money(product.price)}
                            </strong>
                        </div>


                        <button
                            type="button"
                            class="add-product-btn"
                            onclick="addToOrder('${product.id}')"
                            ${stock <= 0 ? "disabled" : ""}>

                            ${
                                stock <= 0
                                    ? "PA STOK"
                                    : "+ SHTO"
                            }

                        </button>

                    </div>

                </article>
            `;

        }).join("");


    updateSelectedTableDisplay();

}


function updateSelectedTableDisplay() {

    const element =
        document.getElementById(
            "menuSelectedTable"
        );

    if (!element) return;


    const table =
        selectedTableId
            ? getTable(selectedTableId)
            : null;


    element.textContent =
        table ? table.name : "Asnjë";

}


function setupSearch() {

    const input =
        document.getElementById("menuSearch");

    if (!input) return;


    input.addEventListener(
        "input",
        renderMenu
    );

}


/* =========================================================
   ORDER
========================================================= */

function addToOrder(productId) {

    const product =
        products.find(
            item => item.id === productId
        );

    if (!product) return;


    if (!selectedTableId) {

        toast(
            "Zgjidh fillimisht një tavolinë."
        );

        showSection("tables");

        return;

    }


    const stock =
        Number(inventory[product.id] ?? 0);


    const existing =
        currentOrder.find(
            item => item.productId === productId
        );


    const currentQuantity =
        existing
            ? Number(existing.quantity)
            : 0;


    if (currentQuantity >= stock) {

        toast("Nuk ka më stok.");

        return;

    }


    if (existing) {

        existing.quantity++;

    } else {

        currentOrder.push({

            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1

        });

    }


    saveCurrentOrder();

    renderOrder();

    updateTableUI();

    toast(
        `${product.name} u shtua.`
    );

}


function changeOrderQuantity(productId, amount) {

    const item =
        currentOrder.find(
            product => product.productId === productId
        );

    if (!item) return;


    const stock =
        Number(inventory[productId] ?? 0);


    item.quantity += amount;


    if (item.quantity > stock) {

        item.quantity = stock;

        toast("Nuk ka më stok.");

    }


    if (item.quantity <= 0) {

        currentOrder =
            currentOrder.filter(
                product =>
                    product.productId !== productId
            );

    }


    saveCurrentOrder();
    renderOrder();

}


function removeFromOrder(productId) {

    currentOrder =
        currentOrder.filter(
            item => item.productId !== productId
        );

    saveCurrentOrder();
    renderOrder();

}


function clearCurrentOrder() {

    if (!currentOrder.length) return;


    if (!confirm(
        "Dëshiron ta pastrosh porosinë?"
    )) return;


    currentOrder = [];

    saveCurrentOrder();

    renderOrder();

}


function saveCurrentOrder() {

    const table =
        getTable(selectedTableId);

    if (!table) return;


    table.items =
        currentOrder.map(
            item => ({ ...item })
        );


    saveJSON(
        KEYS.tables,
        tables
    );

}


function orderTotal() {

    return currentOrder.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.quantity || 1),
        0
    );

}


function renderOrder() {

    const container =
        document.getElementById(
            "orderItems"
        );

    if (!container) return;


    const table =
        getTable(selectedTableId);


    const tableText =
        document.getElementById(
            "selectedTableText"
        );


    if (tableText) {

        tableText.textContent =
            table ? table.name : "Asnjë";

    }


    if (!currentOrder.length) {

        container.innerHTML = `
            <div class="empty-state">
                <div>◉</div>
                <strong>Porosia është bosh</strong>
                <span>Zgjidh një tavolinë dhe shto produkte.</span>

                <button
                    class="primary-btn"
                    onclick="showSection('tables')">
                    ZGJIDH TAVOLINË
                </button>
            </div>
        `;

    } else {

        container.innerHTML =
            currentOrder.map(item => {

                const total =
                    Number(item.price) *
                    Number(item.quantity);


                return `
                    <div class="order-row">

                        <div class="order-product-info">

                            <strong>
                                ${escapeHTML(item.name)}
                            </strong>

                            <span>
                                ${money(item.price)} / copë
                            </span>

                        </div>


                        <div class="quantity-control">

                            <button
                                type="button"
                                onclick="changeOrderQuantity('${item.productId}', -1)">
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                type="button"
                                onclick="changeOrderQuantity('${item.productId}', 1)">
                                +
                            </button>

                        </div>


                        <strong class="order-item-total">
                            ${money(total)}
                        </strong>


                        <button
                            type="button"
                            class="remove-order"
                            onclick="removeFromOrder('${item.productId}')">
                            ×
                        </button>

                    </div>
                `;

            }).join("");

    }


    const total =
        orderTotal();


    const productsCount =
        currentOrder.reduce(
            (sum, item) =>
                sum + Number(item.quantity),
            0
        );


    const productsElement =
        document.getElementById(
            "orderProducts"
        );

    const subtotal =
        document.getElementById(
            "orderSubtotal"
        );

    const service =
        document.getElementById(
            "orderService"
        );

    const totalElement =
        document.getElementById(
            "orderTotal"
        );


    if (productsElement) {
        productsElement.textContent =
            `${productsCount} produkte`;
    }

    if (subtotal) {
        subtotal.textContent =
            money(total);
    }

    if (service) {
        service.textContent =
            money(0);
    }

    if (totalElement) {
        totalElement.textContent =
            money(total);
    }


    updateSelectedTableDisplay();

}


/* =========================================================
   PAYMENT
========================================================= */

function openPayment() {

    if (!selectedTableId) {

        toast("Zgjidh një tavolinë.");

        showSection("tables");

        return;

    }


    if (!currentOrder.length) {

        toast("Porosia është bosh.");

        return;

    }


    const amount =
        document.getElementById(
            "paymentAmount"
        );


    if (amount) {
        amount.textContent =
            money(orderTotal());
    }


    openModal("paymentModal");

}


function completePayment(method) {

    if (!selectedTableId || !currentOrder.length) {

        closeModal("paymentModal");

        return;

    }


    const table =
        getTable(selectedTableId);


    if (!table) return;


    const total =
        orderTotal();


    const invoice = {

        id:
            `INV-${Date.now()}`,

        date:
            new Date().toISOString(),

        table:
            table.name,

        tableNumber:
            table.number,

        total:
            total,

        amount:
            total,

        payment:
            method,

        paymentMethod:
            method,

        waiterName:
            currentUser?.name || "Pa emër",

        userName:
            currentUser?.name || "Pa emër",

        items:
            currentOrder.map(
                item => ({ ...item })
            )

    };


    invoices.unshift(invoice);

    saveJSON(
        KEYS.invoices,
        invoices
    );


    /* Reduce stock */

    currentOrder.forEach(item => {

        const oldStock =
            Number(
                inventory[item.productId] || 0
            );


        inventory[item.productId] =
            Math.max(
                0,
                oldStock -
                Number(item.quantity)
            );

    });


    saveJSON(
        KEYS.inventory,
        inventory
    );


    /* Clear table */

    table.items = [];

    saveJSON(
        KEYS.tables,
        tables
    );


    currentOrder = [];

    selectedTableId = null;

    localStorage.removeItem(
        KEYS.selectedTable
    );


    closeModal("paymentModal");

    renderAll();

    showInvoice(invoice);

    toast(
        "Pagesa u regjistrua me sukses."
    );

}


function showInvoice(invoice) {

    const container =
        document.getElementById(
            "invoiceContent"
        );

    if (!container) return;


    const itemsHTML =
        invoice.items.map(item => {

            const total =
                Number(item.price) *
                Number(item.quantity);


            return `
                <div class="invoice-item">
                    <span>
                        ${escapeHTML(item.name)}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${money(total)}
                    </strong>
                </div>
            `;

        }).join("");


    container.innerHTML = `

        <div class="invoice-header">

            <div class="invoice-logo">
                M
            </div>

            <h2>MY BAR</h2>

            <span>FATURË</span>

        </div>


        <div class="invoice-meta">

            <div>
                <span>Nr.</span>
                <strong>${invoice.id}</strong>
            </div>

            <div>
                <span>Data</span>
                <strong>
                    ${new Date(invoice.date).toLocaleString("sq-AL")}
                </strong>
            </div>

            <div>
                <span>Tavolina</span>
                <strong>${escapeHTML(invoice.table)}</strong>
            </div>

            <div>
                <span>Kamarieri</span>
                <strong>${escapeHTML(invoice.waiterName)}</strong>
            </div>

        </div>


        <div class="invoice-items">

            ${itemsHTML}

        </div>


        <div class="invoice-total">

            <span>TOTAL</span>

            <strong>
                ${money(invoice.total)}
            </strong>

        </div>


        <div class="invoice-payment">
            Pagesa:
            ${invoice.payment === "card" ? "CARD" : "CASH"}
        </div>

    `;


    openModal("invoiceModal");

}


function printInvoice() {

    window.print();

}


/* =========================================================
   DASHBOARD
========================================================= */

function getTodayInvoices() {

    const today =
        todayKey();


    return invoices.filter(invoice => {

        return todayKeyFromDate(
            invoice.date
        ) === today;

    });

}


function todayKeyFromDate(value) {

    const date =
        new Date(value);


    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(
        date.getDate()
    ).padStart(2, "0")}`;

}


function renderDashboard() {

    const today =
        getTodayInvoices();


    const sales =
        today.reduce(
            (sum, invoice) =>
                sum +
                Number(invoice.total || 0),
            0
        );


    const card =
        today
            .filter(
                invoice =>
                    invoice.payment === "card"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(invoice.total || 0),
                0
            );


    const active =
        tables.filter(
            table => tableIsBusy(table)
        ).length;


    const salesElement =
        document.getElementById(
            "salesToday"
        );

    const activeElement =
        document.getElementById(
            "activeTables"
        );

    const invoiceElement =
        document.getElementById(
            "invoiceToday"
        );

    const cardElement =
        document.getElementById(
            "cardToday"
        );


    if (salesElement)
        salesElement.textContent = money(sales);

    if (activeElement)
        activeElement.textContent = active;

    if (invoiceElement)
        invoiceElement.textContent =
            today.length;

    if (cardElement)
        cardElement.textContent = money(card);


    renderDashboardTables();

}


/* =========================================================
   CASH
========================================================= */

function renderCash() {

    const today =
        getTodayInvoices();


    const total =
        today.reduce(
            (sum, invoice) =>
                sum +
                Number(invoice.total || 0),
            0
        );


    const cash =
        today
            .filter(
                invoice =>
                    invoice.payment !== "card"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(invoice.total || 0),
                0
            );


    const card =
        today
            .filter(
                invoice =>
                    invoice.payment === "card"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(invoice.total || 0),
                0
            );


    document.getElementById("cashTotal")
        .textContent = money(total);

    document.getElementById("cashMoney")
        .textContent = money(cash);

    document.getElementById("cashCard")
        .textContent = money(card);

    document.getElementById("cashInvoices")
        .textContent = today.length;


    const list =
        document.getElementById(
            "paymentsList"
        );


    if (!list) return;


    list.innerHTML =
        today.length
            ? today.map(invoice => `

                <div class="payment-row">

                    <div>
                        <strong>
                            ${escapeHTML(invoice.table)}
                        </strong>

                        <span>
                            ${new Date(invoice.date).toLocaleTimeString("sq-AL")}
                        </span>
                    </div>

                    <span class="payment-method-tag">
                        ${invoice.payment === "card" ? "CARD" : "CASH"}
                    </span>

                    <strong>
                        ${money(invoice.total)}
                    </strong>

                </div>

            `).join("")
            : `
                <div class="empty-state">
                    <strong>Nuk ka pagesa sot.</strong>
                </div>
            `;

}


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

    const list =
        document.getElementById(
            "historyList"
        );

    if (!list) return;


    if (!invoices.length) {

        list.innerHTML = `
            <div class="empty-state">
                <strong>Historiku është bosh.</strong>
            </div>
        `;

        return;

    }


    list.innerHTML =
        invoices.map(invoice => `

            <div class="history-row">

                <div>
                    <strong>
                        ${escapeHTML(invoice.id)}
                    </strong>

                    <span>
                        ${new Date(invoice.date).toLocaleString("sq-AL")}
                    </span>
                </div>


                <div>
                    <strong>
                        ${escapeHTML(invoice.table)}
                    </strong>

                    <span>
                        ${escapeHTML(invoice.waiterName)}
                    </span>
                </div>


                <div class="history-payment">
                    ${invoice.payment === "card" ? "CARD" : "CASH"}
                </div>


                <strong>
                    ${money(invoice.total)}
                </strong>


                <button
                    type="button"
                    class="delete-btn"
                    onclick="deleteInvoice('${invoice.id}')">
                    ×
                </button>

            </div>

        `).join("");

}


function deleteInvoice(id) {

    if (!confirm("Fshi këtë faturë?")) return;


    invoices =
        invoices.filter(
            invoice => invoice.id !== id
        );


    saveJSON(
        KEYS.invoices,
        invoices
    );


    renderHistory();
    renderDashboard();

    toast("Fatura u fshi.");

}


function deleteHistory() {

    if (!invoices.length) return;


    if (!confirm(
        "Dëshiron të fshish të gjithë historikun?"
    )) return;


    invoices = [];

    saveJSON(
        KEYS.invoices,
        invoices
    );


    renderHistory();
    renderDashboard();

    toast("Historiku u fshi.");

}


/* =========================================================
   ADMIN
========================================================= */

function renderAdmin() {

    if (!isAdmin()) return;


    renderUsers();
    renderAdminProducts();
    renderAdminTables();

    const countInput =
        document.getElementById(
            "tableCountInput"
        );


    if (countInput) {
        countInput.value =
            tables.length;
    }


    applyAppName();

}


function renderUsers() {

    const list =
        document.getElementById(
            "usersList"
        );

    if (!list) return;


    list.innerHTML =
        users.map(user => `

            <div class="admin-row">

                <div>
                    <strong>
                        ${escapeHTML(user.name)}
                    </strong>

                    <span>
                        @${escapeHTML(user.username)}
                        • ${user.role}
                    </span>
                </div>

                <div class="admin-actions">

                    ${
                        user.username !== "admin"
                            ? `
                                <button
                                    onclick="editUser('${user.id}')">
                                    EDIT
                                </button>

                                <button
                                    class="danger"
                                    onclick="deleteUser('${user.id}')">
                                    DELETE
                                </button>
                            `
                            : ""
                    }

                </div>

            </div>

        `).join("");

}


function openWaiterModal(userId = null) {

    editingUserId = userId;


    const user =
        userId
            ? users.find(
                item => item.id === userId
            )
            : null;


    const html = `

        <span class="eyebrow">
            USER MANAGEMENT
        </span>

        <h2>
            ${user ? "Ndrysho kamarierin" : "Shto kamarier"}
        </h2>

        <div class="modal-form">

            <input
                id="modalUserName"
                class="form-input"
                placeholder="Emri"
                value="${escapeHTML(user?.name || "")}">

            <input
                id="modalUsername"
                class="form-input"
                placeholder="Username"
                value="${escapeHTML(user?.username || "")}">

            <input
                id="modalUserPassword"
                class="form-input"
                type="password"
                placeholder="Password"
                value="${escapeHTML(user?.password || "")}">

            <button
                class="primary-btn"
                onclick="saveUser()">
                RUAJ
            </button>

        </div>

    `;


    openGeneralModal(html);

}


function saveUser() {

    const name =
        document.getElementById(
            "modalUserName"
        ).value.trim();


    const username =
        document.getElementById(
            "modalUsername"
        ).value.trim();


    const password =
        document.getElementById(
            "modalUserPassword"
        ).value.trim();


    if (!name || !username || !password) {

        toast("Plotëso të gjitha fushat.");

        return;

    }


    if (editingUserId) {

        const user =
            users.find(
                item => item.id === editingUserId
            );


        if (user) {

            user.name = name;
            user.username = username;
            user.password = password;

        }

    } else {

        users.push({

            id:
                `user-${Date.now()}`,

            name,
            username,
            password,
            role: "waiter"

        });

    }


    saveJSON(
        KEYS.users,
        users
    );


    closeModal("generalModal");

    renderUsers();

    toast("Kamarieri u ruajt.");

}


function editUser(id) {

    openWaiterModal(id);

}


function deleteUser(id) {

    const user =
        users.find(
            item => item.id === id
        );


    if (!user) return;


    if (!confirm(
        `Fshi ${user.name}?`
    )) return;


    users =
        users.filter(
            item => item.id !== id
        );


    saveJSON(
        KEYS.users,
        users
    );


    renderUsers();

    toast("Kamarieri u fshi.");

}


/* =========================================================
   PRODUCTS ADMIN
========================================================= */

function renderAdminProducts() {

    const list =
        document.getElementById(
            "adminProducts"
        );

    if (!list) return;


    list.innerHTML =
        products.map(product => `

            <div class="admin-row">

                <div class="admin-product">

                    <img
                        src="${product.image}"
                        alt="">

                    <div>
                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <span>
                            ${escapeHTML(product.category)}
                            • ${money(product.price)}
                            • Stok:
                            ${inventory[product.id] ?? 0}
                        </span>
                    </div>

                </div>


                <div class="admin-actions">

                    <button
                        onclick="editProduct('${product.id}')">
                        EDIT
                    </button>

                    <button
                        class="danger"
                        onclick="deleteProduct('${product.id}')">
                        DELETE
                    </button>

                </div>

            </div>

        `).join("");

}


function openProductModal(productId = null) {

    editingProductId = productId;


    const product =
        productId
            ? products.find(
                item => item.id === productId
            )
            : null;


    const html = `

        <span class="eyebrow">
            MENU MANAGEMENT
        </span>

        <h2>
            ${product ? "Ndrysho produktin" : "Shto produkt"}
        </h2>

        <div class="modal-form">

            <input
                id="modalProductName"
                class="form-input"
                placeholder="Emri"
                value="${escapeHTML(product?.name || "")}">

            <input
                id="modalProductPrice"
                class="form-input"
                type="number"
                placeholder="Çmimi"
                value="${product?.price || ""}">

            <input
                id="modalProductCategory"
                class="form-input"
                placeholder="Kategoria"
                value="${escapeHTML(product?.category || "")}">

            <input
                id="modalProductImage"
                class="form-input"
                placeholder="URL e fotos"
                value="${escapeHTML(product?.image || "")}">

            <input
                id="modalProductStock"
                class="form-input"
                type="number"
                min="0"
                placeholder="Stoku"
                value="${product ? inventory[product.id] ?? 0 : 20}">

            <button
                class="primary-btn"
                onclick="saveProduct()">
                RUAJ PRODUKTIN
            </button>

        </div>

    `;


    openGeneralModal(html);

}


function saveProduct() {

    const name =
        document.getElementById(
            "modalProductName"
        ).value.trim();


    const price =
        Number(
            document.getElementById(
                "modalProductPrice"
            ).value
        );


    const category =
        document.getElementById(
            "modalProductCategory"
        ).value.trim();


    const image =
        document.getElementById(
            "modalProductImage"
        ).value.trim();


    const stock =
        Math.max(
            0,
            Number(
                document.getElementById(
                    "modalProductStock"
                ).value
            )
        );


    if (!name || !price || !category) {

        toast("Plotëso emrin, çmimin dhe kategorinë.");

        return;

    }


    if (editingProductId) {

        const product =
            products.find(
                item =>
                    item.id === editingProductId
            );


        if (product) {

            product.name = name;
            product.price = price;
            product.category = category;

            if (image) {
                product.image = image;
            }

            inventory[product.id] =
                stock;

        }

    } else {

        const id =
            `product-${Date.now()}`;


        products.push({

            id,
            name,
            price,
            category,

            image:
                image ||
                "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85"

        });


        inventory[id] = stock;

    }


    saveJSON(
        KEYS.products,
        products
    );


    saveJSON(
        KEYS.inventory,
        inventory
    );


    closeModal("generalModal");

    renderMenu();
    renderAdminProducts();

    toast("Produkti u ruajt.");

}


function editProduct(id) {

    openProductModal(id);

}


function deleteProduct(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) return;


    if (!confirm(
        `Fshi ${product.name}?`
    )) return;


    products =
        products.filter(
            item => item.id !== id
        );


    delete inventory[id];


    saveJSON(
        KEYS.products,
        products
    );


    saveJSON(
        KEYS.inventory,
        inventory
    );


    renderMenu();
    renderAdminProducts();

    toast("Produkti u fshi.");

}


/* =========================================================
   TABLE ADMIN
========================================================= */

function renderAdminTables() {

    const list =
        document.getElementById(
            "adminTables"
        );

    if (!list) return;


    list.innerHTML =
        tables.map(table => `

            <div class="admin-row">

                <div>

                    <strong>
                        ${escapeHTML(table.name)}
                    </strong>

                    <span>
                        Tavolina ${table.number}
                        • ${tableIsBusy(table) ? "Zënë" : "E lirë"}
                    </span>

                </div>


                <div class="admin-actions">

                    <button
                        onclick="renameTable('${table.id}')">
                        RENAME
                    </button>

                    <button
                        class="danger"
                        onclick="deleteTable('${table.id}')">
                        DELETE
                    </button>

                </div>

            </div>

        `).join("");

}


function renameTable(id) {

    const table =
        getTable(id);

    if (!table) return;


    const name =
        prompt(
            "Emri i ri:",
            table.name
        );


    if (!name?.trim()) return;


    table.name =
        name.trim();


    saveJSON(
        KEYS.tables,
        tables
    );


    renderAll();

    toast("Tavolina u ndryshua.");

}


function deleteTable(id) {

    if (tables.length <= 1) {

        toast(
            "Duhet të ketë të paktën një tavolinë."
        );

        return;

    }


    const table =
        getTable(id);

    if (!table) return;


    if (!confirm(
        `Fshi ${table.name}?`
    )) return;


    tables =
        tables.filter(
            item => item.id !== id
        );


    saveJSON(
        KEYS.tables,
        tables
    );


    if (selectedTableId === id) {

        selectedTableId = null;

        currentOrder = [];

        localStorage.removeItem(
            KEYS.selectedTable
        );

    }


    renderAll();

    toast("Tavolina u fshi.");

}


function saveTableCount() {

    let count =
        Number(
            document.getElementById(
                "tableCountInput"
            ).value
        );


    count =
        Math.max(
            1,
            Math.min(
                100,
                count
            )
        );


    if (count === tables.length) {

        toast("Numri nuk ndryshoi.");

        return;

    }


    if (count > tables.length) {

        const start =
            tables.length + 1;


        for (
            let i = start;
            i <= count;
            i++
        ) {

            tables.push({

                id:
                    `table-${Date.now()}-${i}`,

                number: i,

                name:
                    `Tavolina ${i}`,

                items: []

            });

        }

    } else {

        tables =
            tables.slice(
                0,
                count
            );

    }


    saveJSON(
        KEYS.tables,
        tables
    );


    localStorage.setItem(
        KEYS.tableCount,
        String(count)
    );


    renderAll();

    toast(
        `U vendosën ${count} tavolina.`
    );

}


/* =========================================================
   APP SETTINGS
========================================================= */

function saveAppName() {

    const input =
        document.getElementById(
            "appNameInput"
        );


    const name =
        input.value.trim()
        || "MY BAR";


    localStorage.setItem(
        KEYS.appName,
        name
    );


    applyAppName();

    toast("Emri u ruajt.");

}


function changeAdminPassword() {

    const input =
        document.getElementById(
            "newAdminPassword"
        );


    const password =
        input.value.trim();


    if (password.length < 4) {

        toast(
            "Password duhet të ketë të paktën 4 karaktere."
        );

        return;

    }


    const admin =
        users.find(
            user => user.username === "admin"
        );


    if (!admin) return;


    admin.password =
        password;


    saveJSON(
        KEYS.users,
        users
    );


    input.value = "";

    toast(
        "Password-i u ndryshua."
    );

}


/* =========================================================
   BACKUP
========================================================= */

function exportBackup() {

    const data = {

        exportedAt:
            new Date().toISOString(),

        users,
        products,
        invoices,
        tables,
        inventory

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],
            {
                type: "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const a =
        document.createElement("a");


    a.href = url;

    a.download =
        `MY-BAR-BACKUP-${todayKey()}.json`;


    a.click();


    URL.revokeObjectURL(url);

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;


    modal.classList.add("active");

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (!modal) return;


    modal.classList.remove("active");

}


function openGeneralModal(content) {

    const container =
        document.getElementById(
            "generalModalContent"
        );


    container.innerHTML =
        content;


    openModal("generalModal");

}


document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.classList.remove(
                "active"
            );

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        document
            .querySelectorAll(".modal.active")
            .forEach(modal => {

                modal.classList.remove(
                    "active"
                );

            });

    }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function toast(message) {

    const element =
        document.getElementById(
            "toast"
        );

    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    if (!element || !messageElement) return;


    messageElement.textContent =
        message;


    element.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                element.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   RENDER ALL
========================================================= */

function renderAll() {

    setupRoleUI();

    renderDashboard();
    renderTables();
    renderMenu();
    renderOrder();

    if (isAdmin()) {

        renderCash();
        renderHistory();
        renderAdmin();

    }

    updateTableUI();

}


function updateTableUI() {

    renderDashboardTables();

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    if (!confirm(
        "Dëshiron të dalësh nga sistemi?"
    )) return;


    localStorage.removeItem(
        KEYS.currentUser
    );


    window.location.href =
        "login.html";

}


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.showSection = showSection;
window.selectTable = selectTable;
window.selectCategory = selectCategory;

window.addToOrder = addToOrder;
window.changeOrderQuantity =
    changeOrderQuantity;

window.removeFromOrder =
    removeFromOrder;

window.clearCurrentOrder =
    clearCurrentOrder;

window.openPayment =
    openPayment;

window.completePayment =
    completePayment;

window.printInvoice =
    printInvoice;

window.closeModal =
    closeModal;

window.openWaiterModal =
    openWaiterModal;

window.saveUser =
    saveUser;

window.editUser =
    editUser;

window.deleteUser =
    deleteUser;

window.openProductModal =
    openProductModal;

window.saveProduct =
    saveProduct;

window.editProduct =
    editProduct;

window.deleteProduct =
    deleteProduct;

window.renameTable =
    renameTable;

window.deleteTable =
    deleteTable;

window.saveTableCount =
    saveTableCount;

window.saveAppName =
    saveAppName;

window.changeAdminPassword =
    changeAdminPassword;

window.exportBackup =
    exportBackup;

window.deleteInvoice =
    deleteInvoice;

window.deleteHistory =
    deleteHistory;

window.logout =
    logout;


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    init
);
