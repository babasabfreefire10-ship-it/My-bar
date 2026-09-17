/* =========================================================
   MY BAR - APP.JS
   Sistem menaxhimi për bar
   ========================================================= */

"use strict";

/* =========================
   STORAGE KEYS
========================= */

const USERS_KEY = "barUsersV3";
const PRODUCTS_KEY = "barProductsV3";
const INVOICES_KEY = "barInvoicesV3";
const TABLES_KEY = "barTablesV4";
const TABLE_COUNT_KEY = "barTableCountV3";
const CURRENT_USER_KEY = "barCurrentUser";
const APP_NAME_KEY = "barAppNameV3";
const INVENTORY_KEY = "barInventoryV1";
const SELECTED_TABLE_KEY = "barSelectedTable";


/* =========================
   DEFAULT DATA
========================= */

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

const DEFAULT_PRODUCTS = [
    { id: "p1", name: "Espresso", category: "Kafe", price: 100 },
    { id: "p2", name: "Macchiato", category: "Kafe", price: 120 },
    { id: "p3", name: "Cappuccino", category: "Kafe", price: 150 },
    { id: "p4", name: "Americano", category: "Kafe", price: 130 },
    { id: "p5", name: "Ujë", category: "Pije", price: 80 },
    { id: "p6", name: "Coca Cola", category: "Pije", price: 150 },
    { id: "p7", name: "Fanta", category: "Pije", price: 150 },
    { id: "p8", name: "Sprite", category: "Pije", price: 150 },
    { id: "p9", name: "Red Bull", category: "Pije", price: 250 },
    { id: "p10", name: "Birrë", category: "Alkool", price: 200 },
    { id: "p11", name: "Verë", category: "Alkool", price: 300 },
    { id: "p12", name: "Vodka", category: "Alkool", price: 350 },
    { id: "p13", name: "Pizza", category: "Ushqim", price: 500 },
    { id: "p14", name: "Burger", category: "Ushqim", price: 450 },
    { id: "p15", name: "Patate", category: "Ushqim", price: 250 }
];

const DEFAULT_TABLE_COUNT = 10;


/* =========================
   HELPERS
========================= */

function $(id) {
    return document.getElementById(id);
}

function getJSON(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        if (!value) return fallback;
        return JSON.parse(value);
    } catch (error) {
        console.error("Storage error:", key, error);
        return fallback;
    }
}

function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function uid(prefix = "id") {
    return (
        prefix +
        "_" +
        Date.now().toString(36) +
        "_" +
        Math.random().toString(36).slice(2, 8)
    );
}

function money(value) {
    return Number(value || 0).toLocaleString("sq-AL") + " L";
}

function todayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function formatDate(dateValue) {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return date.toLocaleString("sq-AL");
}

function isAdmin() {
    return currentUser?.role === "admin";
}

function getCurrentUser() {
    return getJSON(CURRENT_USER_KEY, null);
}

let currentUser = getCurrentUser();

function getProducts() {
    return getJSON(PRODUCTS_KEY, []);
}

function saveProducts(products) {
    setJSON(PRODUCTS_KEY, products);
}

function getUsers() {
    return getJSON(USERS_KEY, []);
}

function saveUsers(users) {
    setJSON(USERS_KEY, users);
}

function getInvoices() {
    return getJSON(INVOICES_KEY, []);
}

function saveInvoices(invoices) {
    setJSON(INVOICES_KEY, invoices);
}

function getTables() {
    return getJSON(TABLES_KEY, []);
}

function saveTables(tables) {
    setJSON(TABLES_KEY, tables);
}

function getTableCount() {
    return Number(
        localStorage.getItem(TABLE_COUNT_KEY) || DEFAULT_TABLE_COUNT
    );
}

function setTableCountValue(count) {
    localStorage.setItem(TABLE_COUNT_KEY, String(count));
}


/* =========================
   INITIALIZATION
========================= */

function initializeUsers() {
    let users = getUsers();

    if (!Array.isArray(users) || users.length === 0) {
        users = DEFAULT_USERS;
        saveUsers(users);
    }
}

function initializeProducts() {
    let products = getProducts();

    if (!Array.isArray(products) || products.length === 0) {
        products = DEFAULT_PRODUCTS;
        saveProducts(products);
    }
}

function initializeTables() {
    let tables = getTables();
    const count = getTableCount();

    if (!Array.isArray(tables)) {
        tables = [];
    }

    const result = [];

    for (let i = 1; i <= count; i++) {
        const existing = tables.find(t => Number(t.number) === i);

        result.push(
            existing || {
                id: "table_" + i,
                number: i,
                name: "Tavolina " + i,
                orders: []
            }
        );
    }

    saveTables(result);
}

function initializeInventory() {
    const products = getProducts();
    const inventory = getJSON(INVENTORY_KEY, {});

    products.forEach(product => {
        if (inventory[product.id] === undefined) {
            inventory[product.id] = 20;
        }
    });

    setJSON(INVENTORY_KEY, inventory);
}

function initializeApp() {
    initializeUsers();
    initializeProducts();
    initializeTables();
    initializeInventory();

    if (!localStorage.getItem(APP_NAME_KEY)) {
        localStorage.setItem(APP_NAME_KEY, "MY BAR");
    }
}


/* =========================
   INVENTORY
========================= */

function getInventory() {
    return getJSON(INVENTORY_KEY, {});
}

function saveInventory(inventory) {
    setJSON(INVENTORY_KEY, inventory);
}

function getStock(productId) {
    const inventory = getInventory();

    if (inventory[productId] === undefined) {
        inventory[productId] = 20;
        saveInventory(inventory);
    }

    return Number(inventory[productId] || 0);
}

function setStock(productId, amount) {
    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të ndryshojë stokun.");
        return false;
    }

    const inventory = getInventory();

    inventory[productId] = Math.max(0, Number(amount) || 0);

    saveInventory(inventory);

    renderMenu();
    renderAdmin();

    return true;
}

function changeStock(productId, amount) {
    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të ndryshojë stokun.");
        return;
    }

    const current = getStock(productId);
    setStock(productId, current + Number(amount || 0));
}

function decreaseStock(productId, amount) {
    const inventory = getInventory();
    const current = Number(inventory[productId] || 0);

    inventory[productId] = Math.max(
        0,
        current - Number(amount || 0)
    );

    saveInventory(inventory);
}


/* =========================
   CLOCK
========================= */

function updateClock() {
    const clock = $("clock");

    if (!clock) return;

    clock.textContent = new Date().toLocaleString("sq-AL", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}


/* =========================
   HEADER
========================= */

function renderHeader() {
    const appName = localStorage.getItem(APP_NAME_KEY) || "MY BAR";

    if ($("appName")) {
        $("appName").textContent = appName;
    }

    if ($("userInfo")) {
        $("userInfo").textContent =
            currentUser
                ? `${currentUser.name} • ${
                      currentUser.role === "admin"
                          ? "ADMIN"
                          : "KAMARIER"
                  }`
                : "";
    }

    document.title = appName;
}


/* =========================
   ROLE VISIBILITY
========================= */

function applyRoleVisibility() {
    const adminElements = document.querySelectorAll(".admin-only");

    adminElements.forEach(el => {
        el.style.display = isAdmin() ? "" : "none";
    });
}


/* =========================
   TABLES
========================= */

let selectedTableId =
    localStorage.getItem(SELECTED_TABLE_KEY) || null;

function getSelectedTable() {
    const tables = getTables();

    return tables.find(t => t.id === selectedTableId) || null;
}

function selectTable(tableId) {
    const tables = getTables();
    const table = tables.find(t => t.id === tableId);

    if (!table) return;

    selectedTableId = tableId;
    localStorage.setItem(SELECTED_TABLE_KEY, tableId);

    renderTables();
    renderOrder();
    renderDashboardTables();

    if ($("selectedTableText")) {
        $("selectedTableText").textContent =
            table.name || `Tavolina ${table.number}`;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function renderTables() {
    const container = $("tableGrid");

    if (!container) return;

    const tables = getTables();

    container.innerHTML = tables.map(table => {

        const hasOrders =
            Array.isArray(table.orders) &&
            table.orders.length > 0;

        const active =
            selectedTableId === table.id;

        return `
            <button
                type="button"
                class="table-card ${hasOrders ? "occupied" : ""} ${
                    active ? "selected" : ""
                }"
                onclick="selectTable('${table.id}')"
            >
                <strong>${escapeHTML(table.name)}</strong>
                <span>
                    ${
                        hasOrders
                            ? "E zënë"
                            : "Bosh"
                    }
                </span>
            </button>
        `;
    }).join("");
}

function renderDashboardTables() {
    const container = $("dashboardTables");

    if (!container) return;

    const tables = getTables();

    container.innerHTML = tables.map(table => {

        const active =
            Array.isArray(table.orders) &&
            table.orders.length > 0;

        const total = active
            ? table.orders.reduce(
                  (sum, item) =>
                      sum +
                      Number(item.price || 0) *
                          Number(item.quantity || 1),
                  0
              )
            : 0;

        return `
            <div class="dashboard-table-card ${
                active ? "occupied" : ""
            }"
            onclick="selectTable('${table.id}')">

                <strong>${escapeHTML(table.name)}</strong>

                <span>
                    ${
                        active
                            ? money(total)
                            : "Bosh"
                    }
                </span>

            </div>
        `;
    }).join("");
}


/* =========================
   MENU
========================= */

let selectedCategory = "Të gjitha";

function renderCategories() {
    const container = $("categories");

    if (!container) return;

    const products = getProducts();

    const categories = [
        "Të gjitha",
        ...new Set(
            products
                .map(product => product.category)
                .filter(Boolean)
        )
    ];

    container.innerHTML = categories.map(category => `
        <button
            type="button"
            class="category-btn ${
                selectedCategory === category
                    ? "active"
                    : ""
            }"
            onclick="selectCategory('${escapeHTML(
                category
            )}')"
        >
            ${escapeHTML(category)}
        </button>
    `).join("");
}

function selectCategory(category) {
    selectedCategory = category;
    renderCategories();
    renderMenu();
}

function renderMenu() {
    const container = $("menuGrid");

    if (!container) return;

    const products = getProducts();

    const filtered =
        selectedCategory === "Të gjitha"
            ? products
            : products.filter(
                  p => p.category === selectedCategory
              );

    container.innerHTML = filtered.map(product => {

        const stock = getStock(product.id);

        const disabled = stock <= 0;

        return `
            <button
                type="button"
                class="menu-product ${
                    disabled ? "disabled" : ""
                }"
                ${
                    disabled
                        ? "disabled"
                        : `onclick="addProductToOrder('${product.id}')"`
                }
            >

                <div class="product-name">
                    ${escapeHTML(product.name)}
                </div>

                <div class="product-category">
                    ${escapeHTML(product.category || "")}
                </div>

                <div class="product-bottom">

                    <strong>
                        ${money(product.price)}
                    </strong>

                    <span class="${
                        stock <= 5
                            ? "low-stock"
                            : ""
                    }">
                        Stok: ${stock}
                    </span>

                </div>

            </button>
        `;
    }).join("");
}


/* =========================
   ORDERS
========================= */

function addProductToOrder(productId) {

    const tables = getTables();

    const tableIndex = tables.findIndex(
        t => t.id === selectedTableId
    );

    if (tableIndex === -1) {
        toast("Zgjidh një tavolinë më parë.");
        return;
    }

    const product = getProducts().find(
        p => p.id === productId
    );

    if (!product) return;

    const stock = getStock(productId);

    if (stock <= 0) {
        toast("Ky produkt nuk ka më stok.");
        return;
    }

    if (!Array.isArray(tables[tableIndex].orders)) {
        tables[tableIndex].orders = [];
    }

    const existing =
        tables[tableIndex].orders.find(
            item => item.productId === productId
        );

    if (existing) {

        if (existing.quantity >= stock) {
            toast("Nuk ka më stok për këtë produkt.");
            return;
        }

        existing.quantity += 1;

    } else {

        tables[tableIndex].orders.push({
            id: uid("order"),
            productId: product.id,
            name: product.name,
            price: Number(product.price || 0),
            quantity: 1
        });
    }

    saveTables(tables);

    renderTables();
    renderDashboardTables();
    renderOrder();

    toast("Produkti u shtua.");
}

function changeOrderQuantity(orderId, amount) {

    const tables = getTables();

    const table = tables.find(
        t => t.id === selectedTableId
    );

    if (!table || !Array.isArray(table.orders)) return;

    const order = table.orders.find(
        item => item.id === orderId
    );

    if (!order) return;

    const newQuantity =
        Number(order.quantity || 1) +
        Number(amount || 0);

    if (newQuantity <= 0) {

        table.orders = table.orders.filter(
            item => item.id !== orderId
        );

    } else {

        const stock = getStock(order.productId);

        if (newQuantity > stock) {
            toast("Nuk ka mjaftueshëm stok.");
            return;
        }

        order.quantity = newQuantity;
    }

    saveTables(tables);

    renderTables();
    renderDashboardTables();
    renderOrder();
}

function removeOrderItem(orderId) {

    const tables = getTables();

    const table = tables.find(
        t => t.id === selectedTableId
    );

    if (!table) return;

    table.orders =
        (table.orders || []).filter(
            item => item.id !== orderId
        );

    saveTables(tables);

    renderTables();
    renderDashboardTables();
    renderOrder();
}

function calculateOrderTotal(table) {

    if (!table || !Array.isArray(table.orders)) {
        return 0;
    }

    return table.orders.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
                Number(item.quantity || 1),
        0
    );
}

function renderOrder() {

    const table = getSelectedTable();

    if ($("selectedTableText")) {
        $("selectedTableText").textContent =
            table
                ? table.name
                : "Zgjidh tavolinën";
    }

    const container = $("orderItems");

    if (!container) return;

    if (!table || !table.orders.length) {

        container.innerHTML = `
            <div class="empty-state">
                Nuk ka produkte në porosi.
            </div>
        `;

        if ($("orderTotal")) {
            $("orderTotal").textContent = money(0);
        }

        return;
    }

    container.innerHTML = table.orders.map(item => {

        const total =
            Number(item.price || 0) *
            Number(item.quantity || 1);

        return `
            <div class="order-item">

                <div class="order-item-info">

                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                    <small>
                        ${money(item.price)}
                    </small>

                </div>

                <div class="order-controls">

                    <button
                        type="button"
                        onclick="changeOrderQuantity(
                            '${item.id}',
                            -1
                        )"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        onclick="changeOrderQuantity(
                            '${item.id}',
                            1
                        )"
                    >
                        +
                    </button>

                    <strong>
                        ${money(total)}
                    </strong>

                    <button
                        type="button"
                        class="remove-btn"
                        onclick="removeOrderItem(
                            '${item.id}'
                        )"
                    >
                        ×
                    </button>

                </div>

            </div>
        `;
    }).join("");

    if ($("orderTotal")) {
        $("orderTotal").textContent =
            money(calculateOrderTotal(table));
    }
}


/* =========================
   PAYMENT
========================= */

function openPayment() {

    const table = getSelectedTable();

    if (!table || !table.orders.length) {
        toast("Porosia është bosh.");
        return;
    }

    const total = calculateOrderTotal(table);

    const modal = $("paymentModal");

    if (!modal) {
        processPayment("cash");
        return;
    }

    modal.style.display = "flex";

    const totalElement =
        modal.querySelector(".payment-total");

    if (totalElement) {
        totalElement.textContent = money(total);
    }
}

function closePayment() {

    const modal = $("paymentModal");

    if (modal) {
        modal.style.display = "none";
    }
}

function processPayment(method) {

    const table = getSelectedTable();

    if (!table || !table.orders.length) {
        toast("Porosia është bosh.");
        return;
    }

    const total = calculateOrderTotal(table);

    if (total <= 0) {
        toast("Totali është 0.");
        return;
    }

    const invoices = getInvoices();

    const invoice = {
        id: uid("invoice"),
        invoiceNumber:
            "INV-" +
            Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),

        total: total,
        amount: total,
        grandTotal: total,

        payment: method,
        paymentMethod: method,
        method: method,

        tableId: table.id,
        tableName: table.name,

        waiterName:
            currentUser?.name || "Pa emër",

        userName:
            currentUser?.name || "Pa emër",

        user:
            currentUser?.username || "",

        waiter:
            currentUser?.name || "Pa emër",

        items: table.orders.map(item => ({
            id: item.id,
            productId: item.productId,
            name: item.name,
            productName: item.name,
            price: Number(item.price || 0),
            quantity: Number(item.quantity || 1),
            qty: Number(item.quantity || 1),
            subtotal:
                Number(item.price || 0) *
                Number(item.quantity || 1),
            total:
                Number(item.price || 0) *
                Number(item.quantity || 1)
        }))
    };

    invoices.push(invoice);
    saveInvoices(invoices);

    /* Ul stokun */
    table.orders.forEach(item => {
        decreaseStock(
            item.productId,
            item.quantity
        );
    });

    /* Pastro tavolinën */
    table.orders = [];

    saveTables(
        getTables().map(t =>
            t.id === table.id ? table : t
        )
    );

    closePayment();

    renderTables();
    renderDashboardTables();
    renderOrder();
    renderMenu();
    renderDashboard();
    renderHistory();
    renderPayments();

    showInvoice(invoice);

    toast("Pagesa u regjistrua.");
}


/* =========================
   INVOICE
========================= */

function showInvoice(invoice) {

    const modal = $("invoiceModal");

    if (!modal) return;

    modal.style.display = "flex";

    modal.innerHTML = `
        <div class="modal-content invoice-content">

            <div class="invoice-header">

                <h2>
                    ${escapeHTML(
                        localStorage.getItem(APP_NAME_KEY) ||
                        "MY BAR"
                    )}
                </h2>

                <p>Faturë</p>

            </div>

            <div class="invoice-info">

                <div>
                    <strong>Nr:</strong>
                    ${escapeHTML(
                        invoice.invoiceNumber
                    )}
                </div>

                <div>
                    <strong>Data:</strong>
                    ${formatDate(invoice.date)}
                </div>

                <div>
                    <strong>Tavolina:</strong>
                    ${escapeHTML(
                        invoice.tableName
                    )}
                </div>

                <div>
                    <strong>Kamarieri:</strong>
                    ${escapeHTML(
                        invoice.waiterName
                    )}
                </div>

                <div>
                    <strong>Pagesa:</strong>
                    ${escapeHTML(
                        invoice.payment
                    )}
                </div>

            </div>

            <div class="invoice-items">

                ${invoice.items.map(item => `
                    <div class="invoice-row">

                        <span>
                            ${escapeHTML(item.name)}
                            × ${item.quantity}
                        </span>

                        <strong>
                            ${money(item.total)}
                        </strong>

                    </div>
                `).join("")}

            </div>

            <div class="invoice-total">
                TOTAL:
                ${money(invoice.total)}
            </div>

            <div class="invoice-actions">

                <button
                    type="button"
                    onclick="printInvoice()"
                >
                    PRINT
                </button>

                <button
                    type="button"
                    onclick="closeInvoice()"
                >
                    MBYLL
                </button>

            </div>

        </div>
    `;

    window.currentInvoiceForPrint = invoice;
}

function closeInvoice() {

    const modal = $("invoiceModal");

    if (modal) {
        modal.style.display = "none";
    }
}

function printInvoice() {

    const invoice = window.currentInvoiceForPrint;

    if (!invoice) return;

    const appName =
        localStorage.getItem(APP_NAME_KEY) ||
        "MY BAR";

    const html = `
        <!DOCTYPE html>
        <html lang="sq">
        <head>
            <meta charset="UTF-8">
            <title>${appName}</title>

            <style>
                body{
                    font-family:Arial,sans-serif;
                    width:80mm;
                    margin:auto;
                    padding:10px;
                    color:#000;
                }

                h2{
                    text-align:center;
                }

                .center{
                    text-align:center;
                }

                .row{
                    display:flex;
                    justify-content:space-between;
                    padding:4px 0;
                    border-bottom:1px dashed #aaa;
                }

                .total{
                    margin-top:12px;
                    font-size:18px;
                    font-weight:bold;
                    text-align:right;
                }
            </style>
        </head>

        <body>

            <h2>${escapeHTML(appName)}</h2>

            <div class="center">
                Faturë ${escapeHTML(
                    invoice.invoiceNumber
                )}
            </div>

            <hr>

            ${invoice.items.map(item => `
                <div class="row">
                    <span>
                        ${escapeHTML(item.name)}
                        ×${item.quantity}
                    </span>

                    <span>
                        ${money(item.total)}
                    </span>
                </div>
            `).join("")}

            <div class="total">
                TOTAL: ${money(invoice.total)}
            </div>

            <p class="center">
                ${formatDate(invoice.date)}
            </p>

        </body>
        </html>
    `;

    const win = window.open(
        "",
        "_blank",
        "width=500,height=700"
    );

    if (!win) {
        toast("Lejo popup-et për printim.");
        return;
    }

    win.document.write(html);
    win.document.close();

    setTimeout(() => {
        win.print();
    }, 300);
}


/* =========================
   DASHBOARD
========================= */

function renderDashboard() {

    const invoices = getInvoices();
    const today = todayKey();

    const todayInvoices =
        invoices.filter(invoice => {

            const date =
                invoice.date ||
                invoice.createdAt ||
                invoice.timestamp;

            return todayKey(new Date(date)) === today;
        });

    const sales = todayInvoices.reduce(
        (sum, invoice) =>
            sum +
            Number(
                invoice.total ||
                invoice.amount ||
                invoice.grandTotal ||
                0
            ),
        0
    );

    const cash = todayInvoices
        .filter(invoice =>
            String(
                invoice.payment ||
                invoice.paymentMethod ||
                invoice.method ||
                "cash"
            ).toLowerCase() === "cash"
        )
        .reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.total ||
                    invoice.amount ||
                    0
                ),
            0
        );

    const card = todayInvoices
        .filter(invoice =>
            ["card", "kartë", "karte"].includes(
                String(
                    invoice.payment ||
                    invoice.paymentMethod ||
                    invoice.method ||
                    ""
                ).toLowerCase()
            )
        )
        .reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.total ||
                    invoice.amount ||
                    0
                ),
            0
        );

    const tables = getTables();

    const activeTables = tables.filter(
        table =>
            Array.isArray(table.orders) &&
            table.orders.length > 0
    ).length;

    if ($("salesToday")) {
        $("salesToday").textContent = money(sales);
    }

    if ($("activeTables")) {
        $("activeTables").textContent =
            activeTables;
    }

    if ($("invoiceToday")) {
        $("invoiceToday").textContent =
            todayInvoices.length;
    }

    if ($("cardToday")) {
        $("cardToday").textContent =
            money(card);
    }

    if ($("cashTotal")) {
        $("cashTotal").textContent =
            money(sales);
    }

    if ($("cashMoney")) {
        $("cashMoney").textContent =
            money(cash);
    }

    if ($("cashCard")) {
        $("cashCard").textContent =
            money(card);
    }

    if ($("cashInvoices")) {
        $("cashInvoices").textContent =
            todayInvoices.length;
    }
}


/* =========================
   PAYMENTS LIST
========================= */

function renderPayments() {

    const container = $("paymentsList");

    if (!container) return;

    const invoices = getInvoices()
        .slice()
        .sort(
            (a, b) =>
                new Date(
                    b.date ||
                    b.createdAt ||
                    b.timestamp
                ) -
                new Date(
                    a.date ||
                    a.createdAt ||
                    a.timestamp
                )
        )
        .slice(0, 30);

    if (!invoices.length) {

        container.innerHTML = `
            <div class="empty-state">
                Nuk ka pagesa.
            </div>
        `;

        return;
    }

    container.innerHTML = invoices.map(invoice => {

        const payment =
            invoice.payment ||
            invoice.paymentMethod ||
            invoice.method ||
            "cash";

        const amount =
            invoice.total ||
            invoice.amount ||
            invoice.grandTotal ||
            0;

        return `
            <div class="payment-row">

                <div>
                    <strong>
                        ${escapeHTML(
                            invoice.invoiceNumber ||
                            invoice.id
                        )}
                    </strong>

                    <small>
                        ${formatDate(
                            invoice.date ||
                            invoice.createdAt ||
                            invoice.timestamp
                        )}
                    </small>
                </div>

                <div>
                    ${escapeHTML(payment)}
                </div>

                <strong>
                    ${money(amount)}
                </strong>

            </div>
        `;
    }).join("");
}


/* =========================
   HISTORY
========================= */

function renderHistory() {

    const container = $("historyList");

    if (!container) return;

    const invoices = getInvoices()
        .slice()
        .sort(
            (a, b) =>
                new Date(
                    b.date ||
                    b.createdAt ||
                    b.timestamp
                ) -
                new Date(
                    a.date ||
                    a.createdAt ||
                    a.timestamp
                )
        );

    if (!invoices.length) {

        container.innerHTML = `
            <div class="empty-state">
                Nuk ka histori.
            </div>
        `;

        return;
    }

    container.innerHTML = invoices.map(invoice => {

        const total =
            invoice.total ||
            invoice.amount ||
            invoice.grandTotal ||
            0;

        const payment =
            invoice.payment ||
            invoice.paymentMethod ||
            invoice.method ||
            "cash";

        const waiter =
            invoice.waiterName ||
            invoice.userName ||
            invoice.user ||
            invoice.waiter ||
            "Pa emër";

        return `
            <div class="history-row">

                <div>
                    <strong>
                        ${escapeHTML(
                            invoice.invoiceNumber ||
                            invoice.id
                        )}
                    </strong>

                    <small>
                        ${formatDate(
                            invoice.date ||
                            invoice.createdAt ||
                            invoice.timestamp
                        )}
                    </small>
                </div>

                <div>
                    ${escapeHTML(waiter)}
                </div>

                <div>
                    ${escapeHTML(payment)}
                </div>

                <strong>
                    ${money(total)}
                </strong>

                <button
                    type="button"
                    onclick="deleteHistory(
                        '${invoice.id}'
                    )"
                >
                    Fshi
                </button>

            </div>
        `;
    }).join("");
}

function deleteHistory(invoiceId) {

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të fshijë historikun.");
        return;
    }

    if (!confirm("Dëshiron ta fshish këtë faturë?")) {
        return;
    }

    const invoices =
        getInvoices().filter(
            invoice => invoice.id !== invoiceId
        );

    saveInvoices(invoices);

    renderHistory();
    renderDashboard();
    renderPayments();

    toast("Fatura u fshi.");
}

function deleteAllHistory() {

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të fshijë historikun.");
        return;
    }

    if (!confirm(
        "Dëshiron të fshish të gjithë historikun?"
    )) {
        return;
    }

    saveInvoices([]);

    renderHistory();
    renderDashboard();
    renderPayments();

    toast("Historiku u fshi.");
}


/* =========================
   ADMIN
========================= */

function renderAdmin() {

    if (!isAdmin()) return;

    renderAdminUsers();
    renderAdminProducts();
    renderAdminTables();
    renderAdminSettings();
}


/* =========================
   ADMIN USERS
========================= */

function renderAdminUsers() {

    const container = $("usersList");

    if (!container || !isAdmin()) return;

    const users = getUsers();

    container.innerHTML = users.map(user => {

        return `
            <div class="admin-row">

                <div>
                    <strong>
                        ${escapeHTML(user.name)}
                    </strong>

                    <small>
                        @${escapeHTML(user.username)}
                        •
                        ${user.role === "admin"
                            ? "ADMIN"
                            : "KAMARIER"}
                    </small>
                </div>

                <div class="admin-actions">

                    <button
                        type="button"
                        onclick="editWaiter(
                            '${user.id}'
                        )"
                    >
                        Ndrysho
                    </button>

                    ${
                        user.id !== "admin"
                            ? `
                                <button
                                    type="button"
                                    onclick="deleteWaiter(
                                        '${user.id}'
                                    )"
                                >
                                    Fshi
                                </button>
                            `
                            : ""
                    }

                </div>

            </div>
        `;
    }).join("");
}

function openWaiterModal(userId = null) {

    if (!isAdmin()) return;

    const user =
        getUsers().find(
            u => u.id === userId
        );

    openGeneralModal(`
        <h2>
            ${
                user
                    ? "Ndrysho përdoruesin"
                    : "Shto kamarier"
            }
        </h2>

        <label>Emri</label>

        <input
            id="waiterName"
            type="text"
            value="${
                escapeHTML(user?.name || "")
            }"
        >

        <label>Username</label>

        <input
            id="waiterUsername"
            type="text"
            value="${
                escapeHTML(user?.username || "")
            }"
        >

        <label>Password</label>

        <input
            id="waiterPassword"
            type="text"
            value="${
                escapeHTML(user?.password || "")
            }"
        >

        <div class="modal-actions">

            <button
                type="button"
                onclick="saveWaiter(
                    ${user ? `'${user.id}'` : "null"}
                )"
            >
                RUAJ
            </button>

            <button
                type="button"
                onclick="closeGeneralModal()"
            >
                ANULO
            </button>

        </div>
    `);
}

function saveWaiter(userId = null) {

    const name =
        $("waiterName")?.value.trim();

    const username =
        $("waiterUsername")?.value.trim();

    const password =
        $("waiterPassword")?.value.trim();

    if (!name || !username || !password) {
        toast("Plotëso të gjitha fushat.");
        return;
    }

    const users = getUsers();

    const duplicate = users.find(
        user =>
            user.username === username &&
            user.id !== userId
    );

    if (duplicate) {
        toast("Ky username ekziston.");
        return;
    }

    if (userId) {

        const user = users.find(
            u => u.id === userId
        );

        if (!user) return;

        user.name = name;
        user.username = username;
        user.password = password;

    } else {

        users.push({
            id: uid("user"),
            name,
            username,
            password,
            role: "waiter"
        });
    }

    saveUsers(users);

    closeGeneralModal();
    renderAdminUsers();

    toast("Përdoruesi u ruajt.");
}

function editWaiter(userId) {
    openWaiterModal(userId);
}

function deleteWaiter(userId) {

    if (!isAdmin()) return;

    if (userId === "admin") {
        toast("Admin nuk mund të fshihet.");
        return;
    }

    if (!confirm("Dëshiron ta fshish këtë përdorues?")) {
        return;
    }

    const users =
        getUsers().filter(
            user => user.id !== userId
        );

    saveUsers(users);
    renderAdminUsers();

    toast("Përdoruesi u fshi.");
}


/* =========================
   ADMIN PRODUCTS
========================= */

function renderAdminProducts() {

    const container = $("adminProducts");

    if (!container || !isAdmin()) return;

    const products = getProducts();

    container.innerHTML = products.map(product => {

        const stock = getStock(product.id);

        return `
            <div class="admin-row">

                <div>
                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <small>
                        ${escapeHTML(
                            product.category || ""
                        )}
                        •
                        ${money(product.price)}
                        •
                        Stok: ${stock}
                    </small>
                </div>

                <div class="admin-actions">

                    <button
                        type="button"
                        onclick="openProductModal(
                            '${product.id}'
                        )"
                    >
                        Ndrysho
                    </button>

                    <button
                        type="button"
                        onclick="changeStock(
                            '${product.id}',
                            1
                        )"
                    >
                        + Stok
                    </button>

                    <button
                        type="button"
                        onclick="changeStock(
                            '${product.id}',
                            -1
                        )"
                    >
                        − Stok
                    </button>

                    <button
                        type="button"
                        onclick="deleteProduct(
                            '${product.id}'
                        )"
                    >
                        Fshi
                    </button>

                </div>

            </div>
        `;
    }).join("");
}

function openProductModal(productId = null) {

    if (!isAdmin()) return;

    const product =
        getProducts().find(
            p => p.id === productId
        );

    openGeneralModal(`
        <h2>
            ${
                product
                    ? "Ndrysho produktin"
                    : "Shto produkt"
            }
        </h2>

        <label>Emri</label>

        <input
            id="productName"
            type="text"
            value="${
                escapeHTML(product?.name || "")
            }"
        >

        <label>Kategoria</label>

        <input
            id="productCategory"
            type="text"
            value="${
                escapeHTML(product?.category || "")
            }"
        >

        <label>Çmimi</label>

        <input
            id="productPrice"
            type="number"
            min="0"
            value="${
                Number(product?.price || 0)
            }"
        >

        <label>Stoku</label>

        <input
            id="productStock"
            type="number"
            min="0"
            value="${
                product
                    ? getStock(product.id)
                    : 20
            }"
        >

        <div class="modal-actions">

            <button
                type="button"
                onclick="saveProduct(
                    ${product ? `'${product.id}'` : "null"}
                )"
            >
                RUAJ
            </button>

            <button
                type="button"
                onclick="closeGeneralModal()"
            >
                ANULO
            </button>

        </div>
    `);
}

function saveProduct(productId = null) {

    if (!isAdmin()) return;

    const name =
        $("productName")?.value.trim();

    const category =
        $("productCategory")?.value.trim();

    const price =
        Number(
            $("productPrice")?.value || 0
        );

    const stock =
        Number(
            $("productStock")?.value || 0
        );

    if (!name || !category) {
        toast("Plotëso emrin dhe kategorinë.");
        return;
    }

    const products = getProducts();

    if (productId) {

        const product = products.find(
            p => p.id === productId
        );

        if (!product) return;

        product.name = name;
        product.category = category;
        product.price = price;

        saveProducts(products);
        setStock(productId, stock);

    } else {

        const id = uid("product");

        products.push({
            id,
            name,
            category,
            price
        });

        saveProducts(products);

        const inventory = getInventory();
        inventory[id] = Math.max(0, stock);
        saveInventory(inventory);
    }

    closeGeneralModal();

    renderCategories();
    renderMenu();
    renderAdminProducts();

    toast("Produkti u ruajt.");
}

function deleteProduct(productId) {

    if (!isAdmin()) return;

    const product =
        getProducts().find(
            p => p.id === productId
        );

    if (!product) return;

    if (!confirm(
        `Dëshiron të fshish "${product.name}"?`
    )) {
        return;
    }

    const products =
        getProducts().filter(
            p => p.id !== productId
        );

    saveProducts(products);

    const inventory = getInventory();
    delete inventory[productId];
    saveInventory(inventory);

    renderCategories();
    renderMenu();
    renderAdminProducts();

    toast("Produkti u fshi.");
}


/* =========================
   ADMIN TABLES
========================= */

function renderAdminTables() {

    const container = $("adminTables");

    if (!container || !isAdmin()) return;

    const tables = getTables();

    container.innerHTML = tables.map(table => {

        const active =
            Array.isArray(table.orders) &&
            table.orders.length > 0;

        return `
            <div class="admin-row">

                <div>
                    <strong>
                        ${escapeHTML(table.name)}
                    </strong>

                    <small>
                        Tavolina ${table.number}
                        •
                        ${active ? "E zënë" : "Bosh"}
                    </small>
                </div>

                <div class="admin-actions">

                    <button
                        type="button"
                        onclick="renameTable(
                            '${table.id}'
                        )"
                    >
                        Emër
                    </button>

                    <button
                        type="button"
                        onclick="deleteTable(
                            '${table.id}'
                        )"
                    >
                        Fshi
                    </button>

                </div>

            </div>
        `;
    }).join("");

    if ($("tableCountInput")) {
        $("tableCountInput").value =
            getTableCount();
    }
}

function renameTable(tableId) {

    if (!isAdmin()) return;

    const tables = getTables();

    const table =
        tables.find(
            t => t.id === tableId
        );

    if (!table) return;

    const newName = prompt(
        "Emri i ri i tavolinës:",
        table.name
    );

    if (newName === null) return;

    const name = newName.trim();

    if (!name) return;

    table.name = name;

    saveTables(tables);

    renderTables();
    renderDashboardTables();
    renderOrder();
    renderAdminTables();

    toast("Tavolina u ndryshua.");
}

function deleteTable(tableId) {

    if (!isAdmin()) return;

    const tables = getTables();

    const table =
        tables.find(
            t => t.id === tableId
        );

    if (!table) return;

    if (table.orders?.length) {
        toast(
            "Nuk mund të fshihet një tavolinë me porosi."
        );
        return;
    }

    if (!confirm(
        `Fshi ${table.name}?`
    )) {
        return;
    }

    const newTables =
        tables.filter(
            t => t.id !== tableId
        );

    saveTables(newTables);

    if (selectedTableId === tableId) {
        selectedTableId = null;
        localStorage.removeItem(
            SELECTED_TABLE_KEY
        );
    }

    setTableCountValue(newTables.length);

    renderTables();
    renderDashboardTables();
    renderOrder();
    renderAdminTables();

    toast("Tavolina u fshi.");
}

function saveTableCount() {

    if (!isAdmin()) return;

    const input = $("tableCountInput");

    if (!input) return;

    let count =
        Number(input.value || 0);

    count = Math.max(
        1,
        Math.min(100, Math.floor(count))
    );

    const oldTables = getTables();

    const newTables = [];

    for (let i = 1; i <= count; i++) {

        const existing =
            oldTables.find(
                t => Number(t.number) === i
            );

        newTables.push(
            existing || {
                id: uid("table"),
                number: i,
                name: `Tavolina ${i}`,
                orders: []
            }
        );
    }

    setTableCountValue(count);
    saveTables(newTables);

    if (
        selectedTableId &&
        !newTables.some(
            t => t.id === selectedTableId
        )
    ) {
        selectedTableId = null;
        localStorage.removeItem(
            SELECTED_TABLE_KEY
        );
    }

    renderTables();
    renderDashboardTables();
    renderOrder();
    renderAdminTables();

    toast("Numri i tavolinave u ruajt.");
}


/* =========================
   ADMIN SETTINGS
========================= */

function renderAdminSettings() {

    if (!isAdmin()) return;

    if ($("appNameInput")) {
        $("appNameInput").value =
            localStorage.getItem(APP_NAME_KEY) ||
            "MY BAR";
    }

    if ($("newAdminPassword")) {
        $("newAdminPassword").value = "";
    }
}

function saveAppName() {

    if (!isAdmin()) return;

    const input = $("appNameInput");

    if (!input) return;

    const name =
        input.value.trim();

    if (!name) {
        toast("Shkruaj emrin.");
        return;
    }

    localStorage.setItem(
        APP_NAME_KEY,
        name
    );

    renderHeader();

    toast("Emri i aplikacionit u ruajt.");
}

function changeAdminPassword() {

    if (!isAdmin()) return;

    const input =
        $("newAdminPassword");

    if (!input) return;

    const password =
        input.value.trim();

    if (!password) {
        toast("Shkruaj password-in e ri.");
        return;
    }

    const users = getUsers();

    const admin =
        users.find(
            user => user.role === "admin"
        );

    if (!admin) return;

    admin.password = password;

    saveUsers(users);

    input.value = "";

    toast("Password-i i ADMIN u ndryshua.");
}


/* =========================
   GENERAL MODAL
========================= */

function openGeneralModal(content) {

    const modal = $("generalModal");

    if (!modal) return;

    modal.innerHTML = `
        <div class="modal-content general-modal-content">
            ${content}
        </div>
    `;

    modal.style.display = "flex";
}

function closeGeneralModal() {

    const modal = $("generalModal");

    if (modal) {
        modal.style.display = "none";
        modal.innerHTML = "";
    }
}


/* =========================
   SEARCH
========================= */

function searchProducts(value) {

    const query =
        String(value || "")
            .trim()
            .toLowerCase();

    const container = $("menuGrid");

    if (!container) return;

    const products = getProducts()
        .filter(product => {

            if (!query) return true;

            return (
                String(product.name)
                    .toLowerCase()
                    .includes(query) ||
                String(product.category)
                    .toLowerCase()
                    .includes(query)
            );
        });

    container.innerHTML = products.map(product => {

        const stock = getStock(product.id);

        return `
            <button
                type="button"
                class="menu-product ${
                    stock <= 0 ? "disabled" : ""
                }"
                ${
                    stock <= 0
                        ? "disabled"
                        : `onclick="addProductToOrder(
                            '${product.id}'
                        )"`
                }
            >

                <div class="product-name">
                    ${escapeHTML(product.name)}
                </div>

                <div class="product-category">
                    ${escapeHTML(product.category)}
                </div>

                <div class="product-bottom">
                    <strong>
                        ${money(product.price)}
                    </strong>

                    <span>
                        Stok: ${stock}
                    </span>
                </div>

            </button>
        `;
    }).join("");
}


/* =========================
   REPORT SUMMARY
========================= */

function getReportSummary(period = "today") {

    const invoices = getInvoices();

    const now = new Date();

    let start = new Date(now);

    if (period === "today") {

        start.setHours(0, 0, 0, 0);

    } else if (period === "week") {

        start.setDate(
            start.getDate() - 7
        );

    } else if (period === "month") {

        start.setMonth(
            start.getMonth() - 1
        );

    } else if (period === "all") {

        start = new Date(0);
    }

    const filtered =
        invoices.filter(invoice => {

            const date = new Date(
                invoice.date ||
                invoice.createdAt ||
                invoice.timestamp
            );

            return date >= start;
        });

    const sales =
        filtered.reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.total ||
                    invoice.amount ||
                    invoice.grandTotal ||
                    0
                ),
            0
        );

    const cash =
        filtered
            .filter(invoice =>
                String(
                    invoice.payment ||
                    invoice.paymentMethod ||
                    invoice.method ||
                    "cash"
                ).toLowerCase() === "cash"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(
                        invoice.total ||
                        invoice.amount ||
                        0
                    ),
                0
            );

    const card =
        filtered
            .filter(invoice =>
                ["card", "kartë", "karte"].includes(
                    String(
                        invoice.payment ||
                        invoice.paymentMethod ||
                        invoice.method ||
                        ""
                    ).toLowerCase()
                )
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(
                        invoice.total ||
                        invoice.amount ||
                        0
                    ),
                0
            );

    return {
        invoices: filtered,
        sales,
        cash,
        card,
        invoiceCount: filtered.length
    };
}


/* =========================
   BACKUP
========================= */

function exportBackup() {

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të bëjë backup.");
        return;
    }

    const backup = {
        version: "MY-BAR-BACKUP-1",
        exportedAt: new Date().toISOString(),

        users: getUsers(),
        products: getProducts(),
        invoices: getInvoices(),
        tables: getTables(),
        tableCount: getTableCount(),
        inventory: getInventory(),

        appName:
            localStorage.getItem(APP_NAME_KEY) ||
            "MY BAR"
    };

    const blob = new Blob(
        [JSON.stringify(backup, null, 2)],
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
        `my-bar-backup-${todayKey()}.json`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);

    toast("Backup u shkarkua.");
}


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    currentUser = null;

    window.location.href =
        "login.html";
}


/* =========================
   TOAST
========================= */

function toast(message) {

    let element =
        document.getElementById(
            "myBarToast"
        );

    if (!element) {

        element =
            document.createElement("div");

        element.id =
            "myBarToast";

        element.style.position = "fixed";
        element.style.left = "50%";
        element.style.bottom = "25px";
        element.style.transform =
            "translateX(-50%)";
        element.style.zIndex = "99999";
        element.style.padding =
            "13px 20px";
        element.style.borderRadius =
            "12px";
        element.style.background =
            "#101813";
        element.style.border =
            "1px solid #00ff73";
        element.style.color =
            "#ffffff";
        element.style.boxShadow =
            "0 0 25px rgba(0,255,115,.25)";
        element.style.fontWeight =
            "700";

        document.body.appendChild(
            element
        );
    }

    element.textContent = message;

    element.style.display = "block";

    clearTimeout(
        window.myBarToastTimer
    );

    window.myBarToastTimer =
        setTimeout(() => {
            element.style.display =
                "none";
        }, 2500);
}


/* =========================
   INITIAL RENDER
========================= */

function renderAll() {

    renderHeader();
    applyRoleVisibility();

    renderTables();
    renderDashboardTables();

    renderCategories();
    renderMenu();

    renderOrder();

    renderDashboard();
    renderPayments();
    renderHistory();

    if (isAdmin()) {
        renderAdmin();
    }
}


/* =========================
   GLOBAL FUNCTIONS
========================= */

window.selectTable = selectTable;
window.renderTables = renderTables;

window.selectCategory = selectCategory;
window.renderMenu = renderMenu;

window.addProductToOrder =
    addProductToOrder;

window.changeOrderQuantity =
    changeOrderQuantity;

window.removeOrderItem =
    removeOrderItem;

window.openPayment =
    openPayment;

window.closePayment =
    closePayment;

window.processPayment =
    processPayment;

window.showInvoice =
    showInvoice;

window.closeInvoice =
    closeInvoice;

window.printInvoice =
    printInvoice;

window.deleteHistory =
    deleteHistory;

window.deleteAllHistory =
    deleteAllHistory;

window.openWaiterModal =
    openWaiterModal;

window.saveWaiter =
    saveWaiter;

window.editWaiter =
    editWaiter;

window.deleteWaiter =
    deleteWaiter;

window.openProductModal =
    openProductModal;

window.saveProduct =
    saveProduct;

window.deleteProduct =
    deleteProduct;

window.changeStock =
    changeStock;

window.setStock =
    setStock;

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

window.openGeneralModal =
    openGeneralModal;

window.closeGeneralModal =
    closeGeneralModal;

window.searchProducts =
    searchProducts;

window.exportBackup =
    exportBackup;

window.logout =
    logout;

window.renderAdmin =
    renderAdmin;

window.getReportSummary =
    getReportSummary;


/* =========================
   DOM READY
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeApp();

        currentUser =
            getCurrentUser();

        if (!currentUser) {

            /*
              Nëse app.js hapet në index.html
              pa login, ktheje te login.
            */

            if (
                location.pathname.endsWith(
                    "/index.html"
                ) ||
                location.pathname === "/"
            ) {
                window.location.href =
                    "login.html";

                return;
            }
        }

        updateClock();

        setInterval(
            updateClock,
            1000
        );

        renderAll();

        /*
          Mbyll modalet kur klikohet
          jashtë përmbajtjes.
        */

        document.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    $("paymentModal")
                ) {
                    closePayment();
                }

                if (
                    event.target ===
                    $("invoiceModal")
                ) {
                    closeInvoice();
                }

                if (
                    event.target ===
                    $("generalModal")
                ) {
                    closeGeneralModal();
                }
            }
        );

        /*
          ESC mbyll modalet
        */

        document.addEventListener(
            "keydown",
            event => {

                if (event.key !== "Escape") {
                    return;
                }

                closePayment();
                closeInvoice();
                closeGeneralModal();
            }
        );

    }
);
