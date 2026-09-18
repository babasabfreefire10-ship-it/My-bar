/* =========================================================
   MY BAR — APP.JS
   Stable version
   Admin + Settings + Inventory fixed
========================================================= */

"use strict";

/* =========================
   STORAGE
========================= */

const USERS_KEY = "barUsersV3";
const PRODUCTS_KEY = "barProductsV3";
const INVOICES_KEY = "barInvoicesV3";
const TABLES_KEY = "barTablesV4";
const TABLE_COUNT_KEY = "barTableCountV3";
const CURRENT_USER_KEY = "barCurrentUser";
const APP_NAME_KEY = "barAppNameV3";
const INVENTORY_KEY = "barInventoryV1";

/* Login session used by login.html */
const LOGIN_SESSION_KEY = "MY_BAR_SESSION";

/* =========================
   DEFAULT USERS
========================= */

const DEFAULT_USERS = [
    {
        username: "admin",
        password: "1234",
        role: "admin",
        name: "Administrator"
    },
    {
        username: "kamarier",
        password: "1234",
        role: "waiter",
        name: "Kamarier"
    }
];

/* =========================
   DEFAULT MENU
========================= */

const DEFAULT_PRODUCTS = [
    { id: 1, name: "Espresso", category: "Kafe", price: 100 },
    { id: 2, name: "Espresso Dopio", category: "Kafe", price: 150 },
    { id: 3, name: "Macchiato", category: "Kafe", price: 120 },
    { id: 4, name: "Cappuccino", category: "Kafe", price: 180 },
    { id: 5, name: "Latte", category: "Kafe", price: 200 },
    { id: 6, name: "Freddo Espresso", category: "Kafe", price: 200 },
    { id: 7, name: "Freddo Cappuccino", category: "Kafe", price: 220 },
    { id: 8, name: "Çaj", category: "Kafe", price: 120 },

    { id: 20, name: "Coca Cola", category: "Pije Freskuese", price: 150 },
    { id: 21, name: "Coca Cola Zero", category: "Pije Freskuese", price: 150 },
    { id: 22, name: "Fanta", category: "Pije Freskuese", price: 150 },
    { id: 23, name: "Sprite", category: "Pije Freskuese", price: 150 },
    { id: 24, name: "Schweppes", category: "Pije Freskuese", price: 150 },
    { id: 25, name: "Red Bull", category: "Pije Freskuese", price: 250 },
    { id: 26, name: "Fresh Orange", category: "Pije Freskuese", price: 250 },
    { id: 27, name: "Fresh Lemon", category: "Pije Freskuese", price: 250 },

    { id: 40, name: "Ujë 0.5L", category: "Ujë", price: 100 },
    { id: 41, name: "Ujë 0.75L", category: "Ujë", price: 150 },
    { id: 42, name: "Ujë 1.5L", category: "Ujë", price: 150 },

    { id: 50, name: "Birra Tirana", category: "Birra", price: 200 },
    { id: 51, name: "Birra Korça", category: "Birra", price: 200 },
    { id: 52, name: "Heineken", category: "Birra", price: 250 },
    { id: 53, name: "Corona", category: "Birra", price: 300 },
    { id: 54, name: "Tuborg", category: "Birra", price: 250 },

    { id: 60, name: "Jack Daniel's", category: "Whisky", price: 500 },
    { id: 61, name: "Johnnie Walker Red", category: "Whisky", price: 450 },
    { id: 62, name: "Johnnie Walker Black", category: "Whisky", price: 650 },
    { id: 63, name: "Chivas Regal", category: "Whisky", price: 700 },

    { id: 70, name: "Gordon's Gin", category: "Gin", price: 450 },
    { id: 71, name: "Bombay Sapphire", category: "Gin", price: 550 },
    { id: 72, name: "Hendrick's", category: "Gin", price: 800 },

    { id: 80, name: "Absolut Vodka", category: "Vodka", price: 450 },
    { id: 81, name: "Smirnoff", category: "Vodka", price: 450 },
    { id: 82, name: "Grey Goose", category: "Vodka", price: 800 },

    { id: 90, name: "Bacardi", category: "Rum", price: 450 },
    { id: 91, name: "Captain Morgan", category: "Rum", price: 500 },

    { id: 100, name: "Jose Cuervo", category: "Tequila", price: 500 },
    { id: 101, name: "Olmeca", category: "Tequila", price: 550 },

    { id: 110, name: "Baileys", category: "Liqueur & Amaro", price: 450 },
    { id: 111, name: "Jägermeister", category: "Liqueur & Amaro", price: 450 },
    { id: 112, name: "Aperol", category: "Liqueur & Amaro", price: 400 },

    { id: 120, name: "Verë e Kuqe", category: "Verë", price: 300 },
    { id: 121, name: "Verë e Bardhë", category: "Verë", price: 300 },
    { id: 122, name: "Prosecco", category: "Verë", price: 600 },

    { id: 130, name: "Mojito", category: "Cocktails", price: 600 },
    { id: 131, name: "Margarita", category: "Cocktails", price: 650 },
    { id: 132, name: "Aperol Spritz", category: "Cocktails", price: 650 },
    { id: 133, name: "Sex on the Beach", category: "Cocktails", price: 700 },
    { id: 134, name: "Long Island", category: "Cocktails", price: 800 },

    { id: 140, name: "Gin Tonic", category: "Long Drinks", price: 550 },
    { id: 141, name: "Vodka Red Bull", category: "Long Drinks", price: 600 },
    { id: 142, name: "Whisky Cola", category: "Long Drinks", price: 550 },

    { id: 150, name: "Shot Tequila", category: "Shots", price: 300 },
    { id: 151, name: "Shot Jägermeister", category: "Shots", price: 300 },
    { id: 152, name: "Shot Vodka", category: "Shots", price: 250 },

    { id: 160, name: "Patatina", category: "Snacks", price: 200 },
    { id: 161, name: "Kikirikë", category: "Snacks", price: 200 },
    { id: 162, name: "Ullinj", category: "Snacks", price: 250 },
    { id: 163, name: "Mix Nuts", category: "Snacks", price: 350 }
];

/* =========================
   HELPERS
========================= */

function getJSON(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
    return Number(value || 0).toLocaleString("sq-AL") + " L";
}

/* =========================
   CURRENT USER — FIXED
========================= */

function getCurrentUser() {

    /* First check the login session */
    const loginSession = getJSON(LOGIN_SESSION_KEY, null);

    if (loginSession) {

        /* Keep old system synchronized */
        setJSON(CURRENT_USER_KEY, loginSession);

        return loginSession;
    }

    /* Fallback to old session */
    const oldSession = getJSON(CURRENT_USER_KEY, null);

    return oldSession;
}

/* =========================
   INITIALIZE
========================= */

function initializeApp() {

    if (!localStorage.getItem(USERS_KEY)) {
        setJSON(USERS_KEY, DEFAULT_USERS);
    }

    if (!localStorage.getItem(PRODUCTS_KEY)) {
        setJSON(PRODUCTS_KEY, DEFAULT_PRODUCTS);
    }

    if (!localStorage.getItem(INVOICES_KEY)) {
        setJSON(INVOICES_KEY, []);
    }

    if (!localStorage.getItem(TABLE_COUNT_KEY)) {
        localStorage.setItem(TABLE_COUNT_KEY, "12");
    }

    if (!localStorage.getItem(APP_NAME_KEY)) {
        localStorage.setItem(APP_NAME_KEY, "MY BAR");
    }

    initializeTables();
    initializeInventory();
}

/* =========================
   TABLES
========================= */

function initializeTables() {

    const count =
        Number(localStorage.getItem(TABLE_COUNT_KEY)) || 12;

    let tables =
        getJSON(TABLES_KEY, []);

    if (!Array.isArray(tables) || tables.length !== count) {

        /*
         * Preserve existing tables whenever possible.
         * Do not unnecessarily delete orders.
         */

        const oldTables =
            Array.isArray(tables) ? tables : [];

        tables = [];

        for (let i = 1; i <= count; i++) {

            const old =
                oldTables.find(t => Number(t.id) === i);

            tables.push(
                old || {
                    id: i,
                    name: "Tavolina " + i,
                    items: []
                }
            );
        }

        setJSON(TABLES_KEY, tables);
    }
}

function getTables() {
    return getJSON(TABLES_KEY, []);
}

function saveTables(tables) {
    setJSON(TABLES_KEY, tables);
}

function getSelectedTable() {
    return Number(
        localStorage.getItem("barSelectedTable") || 0
    );
}

function selectTable(id) {

    localStorage.setItem(
        "barSelectedTable",
        String(id)
    );

    renderTables();
    renderOrder();
}

/* =========================
   INVENTORY
========================= */

function initializeInventory() {

    const products =
        getJSON(PRODUCTS_KEY, DEFAULT_PRODUCTS);

    let stock =
        getJSON(INVENTORY_KEY, {});

    products.forEach(product => {

        if (stock[product.id] === undefined) {
            stock[product.id] = 20;
        }

    });

    setJSON(INVENTORY_KEY, stock);
}

function getStock(productId) {

    const stock =
        getJSON(INVENTORY_KEY, {});

    return Number(
        stock[productId] ?? 0
    );
}

function changeStock(productId, amount) {

    const stock =
        getJSON(INVENTORY_KEY, {});

    stock[productId] =
        Math.max(
            0,
            Number(stock[productId] || 0) +
            Number(amount || 0)
        );

    setJSON(INVENTORY_KEY, stock);

    renderMenu();
    renderAdmin();
}

/* =========================
   CLOCK
========================= */

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    clock.textContent =
        new Date().toLocaleTimeString(
            "sq-AL",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );
}

/* =========================
   HEADER
========================= */

function renderHeader() {

    const user =
        getCurrentUser();

    const appName =
        document.getElementById("appName");

    const userInfo =
        document.getElementById("userInfo");

    if (appName) {

        appName.textContent =
            localStorage.getItem(APP_NAME_KEY) ||
            "MY BAR";
    }

    if (userInfo && user) {

        userInfo.textContent =
            user.name +
            " • " +
            (
                user.role === "admin"
                    ? "ADMIN"
                    : "KAMARIER"
            );
    }
}

/* =========================
   TABLES UI
========================= */

function renderTables() {

    const dashboardTables =
        document.getElementById("dashboardTables");

    const tableGrid =
        document.getElementById("tableGrid");

    const tables =
        getTables();

    const selected =
        getSelectedTable();

    const html =
        tables.map(table => {

            const active =
                table.items &&
                table.items.length > 0;

            const total =
                (table.items || []).reduce(
                    (sum, item) =>
                        sum +
                        Number(item.price) *
                        Number(item.quantity),
                    0
                );

            return `
                <button
                    class="table-card
                        ${active ? "active" : ""}
                        ${selected === table.id ? "selected" : ""}"
                    onclick="selectTable(${table.id})"
                >
                    <strong>
                        ${escapeHTML(table.name)}
                    </strong>

                    <span>
                        ${active ? money(total) : "E lirë"}
                    </span>
                </button>
            `;
        }).join("");

    if (dashboardTables) {
        dashboardTables.innerHTML = html;
    }

    if (tableGrid) {
        tableGrid.innerHTML = html;
    }

    const selectedText =
        document.getElementById(
            "selectedTableText"
        );

    if (selectedText) {

        selectedText.textContent =
            selected > 0
                ? "Tavolina " + selected
                : "Zgjidh një tavolinë";
    }
}

/* =========================
   MENU
========================= */

function renderMenu(category = "Të gjitha") {

    const grid =
        document.getElementById("menuGrid");

    const categories =
        document.getElementById("categories");

    if (!grid) return;

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const allCategories = [
        "Të gjitha",
        ...new Set(
            products.map(
                p => p.category
            )
        )
    ];

    if (categories) {

        categories.innerHTML =
            allCategories.map(cat => `
                <button
                    class="${
                        cat === category
                            ? "active"
                            : ""
                    }"
                    onclick='renderMenu(${JSON.stringify(cat)})'
                >
                    ${escapeHTML(cat)}
                </button>
            `).join("");
    }

    const filtered =
        category === "Të gjitha"
            ? products
            : products.filter(
                p => p.category === category
            );

    grid.innerHTML =
        filtered.map(product => {

            const stock =
                getStock(product.id);

            return `
                <button
                    class="menu-card"
                    ${stock <= 0 ? "disabled" : ""}
                    onclick="addProduct(${product.id})"
                >
                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <span>
                        ${money(product.price)}
                    </span>

                    <small>
                        Stok: ${stock}
                    </small>
                </button>
            `;
        }).join("");
}

/* =========================
   ADD PRODUCT
========================= */

function addProduct(productId) {

    const tableId =
        getSelectedTable();

    if (!tableId) {

        toast(
            "Zgjidh fillimisht një tavolinë."
        );

        return;
    }

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const product =
        products.find(
            p =>
                Number(p.id) ===
                Number(productId)
        );

    if (!product) return;

    const stock =
        getStock(productId);

    if (stock <= 0) {

        toast(
            "Ky produkt nuk ka stok."
        );

        return;
    }

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.id) ===
                Number(tableId)
        );

    if (!table) return;

    if (!Array.isArray(table.items)) {
        table.items = [];
    }

    const existing =
        table.items.find(
            item =>
                Number(item.productId) ===
                Number(productId)
        );

    if (existing) {

        if (existing.quantity >= stock) {

            toast(
                "Nuk ka më stok."
            );

            return;
        }

        existing.quantity++;

    } else {

        table.items.push({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1
        });
    }

    saveTables(tables);

    renderTables();
    renderMenu();
    renderOrder();

    toast(
        product.name +
        " u shtua."
    );
}

/* =========================
   ORDER
========================= */

function renderOrder() {

    const container =
        document.getElementById(
            "orderItems"
        );

    const totalElement =
        document.getElementById(
            "orderTotal"
        );

    if (!container) return;

    const tableId =
        getSelectedTable();

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.id) ===
                Number(tableId)
        );

    if (!table || !Array.isArray(table.items) || !table.items.length) {

        container.innerHTML =
            `<div class="empty-state">
                Nuk ka produkte në porosi.
            </div>`;

        if (totalElement) {
            totalElement.textContent =
                money(0);
        }

        return;
    }

    let total = 0;

    container.innerHTML =
        table.items.map(
            (item, index) => {

                const itemTotal =
                    Number(item.price) *
                    Number(item.quantity);

                total += itemTotal;

                return `
                    <div class="order-item">

                        <div>
                            <strong>
                                ${escapeHTML(item.name)}
                            </strong>

                            <small>
                                ${money(item.price)}
                                × ${item.quantity}
                            </small>
                        </div>

                        <div class="order-actions">

                            <button
                                onclick="changeOrderQuantity(${index}, -1)"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeOrderQuantity(${index}, 1)"
                            >
                                +
                            </button>

                            <button
                                onclick="removeOrderItem(${index})"
                            >
                                ×
                            </button>

                        </div>

                    </div>
                `;
            }
        ).join("");

    if (totalElement) {
        totalElement.textContent =
            money(total);
    }
}

function changeOrderQuantity(index, amount) {

    const tableId =
        getSelectedTable();

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.id) ===
                Number(tableId)
        );

    if (!table) return;

    const item =
        table.items[index];

    if (!item) return;

    const newQuantity =
        Number(item.quantity) +
        Number(amount);

    if (newQuantity <= 0) {

        table.items.splice(
            index,
            1
        );

    } else {

        const stock =
            getStock(item.productId);

        if (newQuantity > stock) {

            toast(
                "Nuk ka mjaftueshëm stok."
            );

            return;
        }

        item.quantity =
            newQuantity;
    }

    saveTables(tables);

    renderTables();
    renderMenu();
    renderOrder();
}

function removeOrderItem(index) {

    const tableId =
        getSelectedTable();

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.id) ===
                Number(tableId)
        );

    if (!table) return;

    table.items.splice(
        index,
        1
    );

    saveTables(tables);

    renderTables();
    renderOrder();
}

/* =========================
   PAYMENT
========================= */

function getOrderTotal(table) {

    return (table.items || []).reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.quantity),
        0
    );
}

function openPayment() {

    const tableId =
        getSelectedTable();

    if (!tableId) {

        toast(
            "Zgjidh një tavolinë."
        );

        return;
    }

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.id) ===
                Number(tableId)
        );

    if (!table || !table.items.length) {

        toast(
            "Porosia është bosh."
        );

        return;
    }

    const total =
        getOrderTotal(table);

    const modal =
        document.getElementById(
            "paymentModal"
        );

    if (modal) {
        modal.style.display = "flex";
    }

    const paymentTotal =
        document.getElementById(
            "paymentTotal"
        );

    if (paymentTotal) {
        paymentTotal.textContent =
            money(total);
    }
}

function closePayment() {

    const modal =
        document.getElementById(
            "paymentModal"
        );

    if (modal) {
        modal.style.display = "none";
    }
}

function completePayment(method) {

    const tableId =
        getSelectedTable();

    if (!tableId) return;

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.id) ===
                Number(tableId)
        );

    if (!table || !table.items.length) {

        toast(
            "Porosia është bosh."
        );

        return;
    }

    for (const item of table.items) {

        const stock =
            getStock(item.productId);

        if (item.quantity > stock) {

            toast(
                "Stoku nuk është i mjaftueshëm për " +
                item.name
            );

            return;
        }
    }

    for (const item of table.items) {

        changeStock(
            item.productId,
            -Number(item.quantity)
        );
    }

    const total =
        getOrderTotal(table);

    const user =
        getCurrentUser();

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    const invoice = {

        id: Date.now(),

        number:
            "INV-" +
            Date.now(),

        date:
            new Date().toISOString(),

        createdAt:
            Date.now(),

        timestamp:
            Date.now(),

        table:
            tableId,

        tableName:
            "Tavolina " +
            tableId,

        items:
            JSON.parse(
                JSON.stringify(
                    table.items
                )
            ),

        total:
            total,

        amount:
            total,

        payment:
            method,

        paymentMethod:
            method,

        waiterName:
            user
                ? user.name
                : "Pa emër",

        userName:
            user
                ? user.name
                : "Pa emër",

        user:
            user
                ? user.username
                : ""
    };

    invoices.push(invoice);

    setJSON(
        INVOICES_KEY,
        invoices
    );

    table.items = [];

    saveTables(tables);

    closePayment();

    localStorage.removeItem(
        "barSelectedTable"
    );

    renderTables();
    renderOrder();
    renderMenu();
    updateDashboard();

    showInvoice(invoice);

    toast(
        "Pagesa u krye me sukses."
    );
}

/* =========================
   INVOICE
========================= */

function showInvoice(invoice) {

    const modal =
        document.getElementById(
            "invoiceModal"
        );

    const number =
        document.getElementById(
            "invoiceNumber"
        );

    const date =
        document.getElementById(
            "invoiceDate"
        );

    const table =
        document.getElementById(
            "invoiceTable"
        );

    const waiter =
        document.getElementById(
            "invoiceWaiter"
        );

    const items =
        document.getElementById(
            "invoiceItems"
        );

    const total =
        document.getElementById(
            "invoiceTotal"
        );

    if (number) {
        number.textContent =
            invoice.number;
    }

    if (date) {

        date.textContent =
            new Date(
                invoice.date
            ).toLocaleString(
                "sq-AL"
            );
    }

    if (table) {
        table.textContent =
            invoice.tableName;
    }

    if (waiter) {
        waiter.textContent =
            invoice.waiterName;
    }

    if (items) {

        items.innerHTML =
            invoice.items.map(
                item => `
                    <div class="invoice-row">

                        <span>
                            ${escapeHTML(item.name)}
                            × ${item.quantity}
                        </span>

                        <strong>
                            ${money(
                                item.price *
                                item.quantity
                            )}
                        </strong>

                    </div>
                `
            ).join("");
    }

    if (total) {
        total.textContent =
            money(invoice.total);
    }

    if (modal) {
        modal.style.display = "flex";
    }
}

function closeInvoice() {

    const modal =
        document.getElementById(
            "invoiceModal"
        );

    if (modal) {
        modal.style.display = "none";
    }
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    const today =
        new Date();

    const todayString =
        today.toDateString();

    const todayInvoices =
        invoices.filter(
            invoice =>
                new Date(
                    invoice.date ||
                    invoice.createdAt
                ).toDateString() ===
                todayString
        );

    const sales =
        todayInvoices.reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.total || 0
                ),
            0
        );

    const cash =
        todayInvoices
            .filter(
                i =>
                    i.payment ===
                    "cash"
            )
            .reduce(
                (sum, i) =>
                    sum +
                    Number(
                        i.total || 0
                    ),
                0
            );

    const card =
        todayInvoices
            .filter(
                i =>
                    i.payment ===
                    "card"
            )
            .reduce(
                (sum, i) =>
                    sum +
                    Number(
                        i.total || 0
                    ),
                0
            );

    const activeTables =
        getTables().filter(
            t =>
                t.items &&
                t.items.length > 0
        ).length;

    const salesToday =
        document.getElementById(
            "salesToday"
        );

    const activeTablesElement =
        document.getElementById(
            "activeTables"
        );

    const invoiceToday =
        document.getElementById(
            "invoiceToday"
        );

    const cardToday =
        document.getElementById(
            "cardToday"
        );

    if (salesToday) {
        salesToday.textContent =
            money(sales);
    }

    if (activeTablesElement) {
        activeTablesElement.textContent =
            activeTables;
    }

    if (invoiceToday) {
        invoiceToday.textContent =
            todayInvoices.length;
    }

    if (cardToday) {
        cardToday.textContent =
            money(card);
    }

    const cashTotal =
        document.getElementById(
            "cashTotal"
        );

    const cashMoney =
        document.getElementById(
            "cashMoney"
        );

    const cashCard =
        document.getElementById(
            "cashCard"
        );

    const cashInvoices =
        document.getElementById(
            "cashInvoices"
        );

    if (cashTotal) {
        cashTotal.textContent =
            money(sales);
    }

    if (cashMoney) {
        cashMoney.textContent =
            money(cash);
    }

    if (cashCard) {
        cashCard.textContent =
            money(card);
    }

    if (cashInvoices) {
        cashInvoices.textContent =
            todayInvoices.length;
    }

    renderPayments(
        todayInvoices
    );
}

/* =========================
   PAYMENTS LIST
========================= */

function renderPayments(invoices) {

    const list =
        document.getElementById(
            "paymentsList"
        );

    if (!list) return;

    if (!invoices.length) {

        list.innerHTML =
            `<div class="empty-state">
                Nuk ka pagesa sot.
            </div>`;

        return;
    }

    list.innerHTML =
        [...invoices]
            .reverse()
            .map(
                invoice => `
                    <div class="payment-row">

                        <div>

                            <strong>
                                ${escapeHTML(
                                    invoice.number
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    invoice.waiterName ||
                                    "Pa emër"
                                )}

                                •

                                ${escapeHTML(
                                    invoice.payment ||
                                    "cash"
                                )}
                            </small>

                        </div>

                        <strong>
                            ${money(
                                invoice.total
                            )}
                        </strong>

                    </div>
                `
            ).join("");
}

/* =========================
   HISTORY
========================= */

function renderHistory() {

    const list =
        document.getElementById(
            "historyList"
        );

    if (!list) return;

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    if (!invoices.length) {

        list.innerHTML =
            `<div class="empty-state">
                Nuk ka histori.
            </div>`;

        return;
    }

    list.innerHTML =
        [...invoices]
            .reverse()
            .map(
                invoice => `
                    <div class="history-row">

                        <div>

                            <strong>
                                ${escapeHTML(
                                    invoice.number
                                )}
                            </strong>

                            <small>
                                ${new Date(
                                    invoice.date
                                ).toLocaleString(
                                    "sq-AL"
                                )}
                            </small>

                        </div>

                        <div>

                            <strong>
                                ${money(
                                    invoice.total
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    invoice.payment ||
                                    "cash"
                                )}
                            </small>

                        </div>

                    </div>
                `
            ).join("");
}

function deleteHistory() {

    if (
        !confirm(
            "Dëshiron të fshish të gjithë historikun?"
        )
    ) {
        return;
    }

    localStorage.removeItem(
        INVOICES_KEY
    );

    updateDashboard();
    renderHistory();

    toast(
        "Historiku u fshi."
    );
}

/* =========================
   ADMIN
========================= */

function isAdmin() {

    const user =
        getCurrentUser();

    return !!(
        user &&
        user.role === "admin"
    );
}

function renderAdmin() {

    const user =
        getCurrentUser();

    /* Security */
    if (!user || user.role !== "admin") {

        document
            .querySelectorAll(
                ".admin-only, [data-admin]"
            )
            .forEach(
                element => {
                    element.style.display =
                        "none";
                }
            );

        return;
    }

    const usersList =
        document.getElementById(
            "usersList"
        );

    if (usersList) {

        const users =
            getJSON(
                USERS_KEY,
                DEFAULT_USERS
            );

        usersList.innerHTML =
            users.map(
                (user, index) => `

                    <div class="admin-row">

                        <div>

                            <strong>
                                ${escapeHTML(
                                    user.name
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    user.username
                                )}
                                •
                                ${escapeHTML(
                                    user.role
                                )}
                            </small>

                        </div>

                        ${
                            user.username !== "admin"
                                ? `
                                    <button
                                        onclick="deleteWaiter(${index})"
                                    >
                                        Fshi
                                    </button>
                                `
                                : ""
                        }

                    </div>
                `
            ).join("");
    }

    const adminProducts =
        document.getElementById(
            "adminProducts"
        );

    if (adminProducts) {

        const products =
            getJSON(
                PRODUCTS_KEY,
                DEFAULT_PRODUCTS
            );

        adminProducts.innerHTML =
            products.map(
                product => `

                    <div class="admin-row">

                        <div>

                            <strong>
                                ${escapeHTML(
                                    product.name
                                )}
                            </strong>

                            <small>
                                ${escapeHTML(
                                    product.category
                                )}
                                •
                                ${money(
                                    product.price
                                )}
                                •
                                Stok:
                                ${getStock(
                                    product.id
                                )}
                            </small>

                        </div>

                        <div>

                            <button
                                onclick="changeStock(${product.id}, 1)"
                            >
                                +
                            </button>

                            <button
                                onclick="changeStock(${product.id}, -1)"
                            >
                                −
                            </button>

                        </div>

                    </div>
                `
            ).join("");
    }

    const tableInput =
        document.getElementById(
            "tableCountInput"
        );

    if (tableInput) {

        tableInput.value =
            localStorage.getItem(
                TABLE_COUNT_KEY
            ) || "12";
    }

    const appNameInput =
        document.getElementById(
            "appNameInput"
        );

    if (appNameInput) {

        appNameInput.value =
            localStorage.getItem(
                APP_NAME_KEY
            ) || "MY BAR";
    }
}

/* =========================
   ADD WAITER
========================= */

function openWaiterModal() {

    if (!isAdmin()) {

        toast(
            "Vetëm administratori mund ta përdorë këtë."
        );

        return;
    }

    const modal =
        document.getElementById(
            "generalModal"
        );

    if (!modal) return;

    modal.style.display =
        "flex";

    const title =
        document.getElementById(
            "generalModalTitle"
        );

    if (title) {

        title.textContent =
            "Shto kamarier";
    }
}

function deleteWaiter(index) {

    if (!isAdmin()) return;

    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    if (!users[index]) return;

    if (
        users[index].username ===
        "admin"
    ) {
        return;
    }

    users.splice(
        index,
        1
    );

    setJSON(
        USERS_KEY,
        users
    );

    renderAdmin();

    toast(
        "Kamarieri u fshi."
    );
}

/* =========================
   TABLE COUNT
========================= */

function saveTableCount() {

    if (!isAdmin()) {

        toast(
            "Vetëm administratori."
        );

        return;
    }

    const input =
        document.getElementById(
            "tableCountInput"
        );

    if (!input) return;

    const count =
        Math.max(
            1,
            Math.min(
                100,
                Number(input.value)
            )
        );

    localStorage.setItem(
        TABLE_COUNT_KEY,
        String(count)
    );

    initializeTables();
    renderTables();

    toast(
        "Numri i tavolinave u ruajt."
    );
}

/* =========================
   APP NAME
========================= */

function saveAppName() {

    if (!isAdmin()) {

        toast(
            "Vetëm administratori."
        );

        return;
    }

    const input =
        document.getElementById(
            "appNameInput"
        );

    if (!input) return;

    const name =
        input.value.trim() ||
        "MY BAR";

    localStorage.setItem(
        APP_NAME_KEY,
        name
    );

    renderHeader();
    renderAdmin();

    toast(
        "Emri u ruajt."
    );
}

/* =========================
   ADMIN PASSWORD
========================= */

function changeAdminPassword() {

    if (!isAdmin()) {

        toast(
            "Vetëm administratori."
        );

        return;
    }

    const input =
        document.getElementById(
            "newAdminPassword"
        );

    if (!input) return;

    const password =
        input.value.trim();

    if (!password) {

        toast(
            "Shkruaj fjalëkalimin."
        );

        return;
    }

    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    const admin =
        users.find(
            u =>
                u.username ===
                "admin"
        );

    if (!admin) return;

    admin.password =
        password;

    setJSON(
        USERS_KEY,
        users
    );

    input.value = "";

    toast(
        "Fjalëkalimi u ndryshua."
    );
}

/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    localStorage.removeItem(
        LOGIN_SESSION_KEY
    );

    window.location.href =
        "login.html";
}

/* =========================
   ROLE
========================= */

function applyRole() {

    const user =
        getCurrentUser();

    const isAdminUser =
        !!(
            user &&
            user.role === "admin"
        );

    const adminElements =
        document.querySelectorAll(
            ".admin-only, [data-admin]"
        );

    adminElements.forEach(
        element => {

            element.style.display =
                isAdminUser
                    ? ""
                    : "none";
        }
    );

    /*
     * Also support common navigation IDs.
     */

    [
        "settingsNav",
        "adminNav",
        "inventoryNav",
        "usersNav",
        "settingsSection",
        "adminSection",
        "inventorySection"
    ].forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.style.display =
                isAdminUser
                    ? ""
                    : "none";
        }
    });

    renderHeader();
}

/* =========================
   TOAST
========================= */

function toast(message) {

    let box =
        document.getElementById(
            "myBarToast"
        );

    if (!box) {

        box =
            document.createElement(
                "div"
            );

        box.id =
            "myBarToast";

        box.style.position =
            "fixed";

        box.style.bottom =
            "25px";

        box.style.left =
            "50%";

        box.style.transform =
            "translateX(-50%)";

        box.style.zIndex =
            "99999";

        box.style.padding =
            "12px 18px";

        box.style.borderRadius =
            "12px";

        box.style.background =
            "#111";

        box.style.color =
            "#fff";

        box.style.border =
            "1px solid #2d8f5b";

        box.style.fontSize =
            "14px";

        box.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.4)";

        document.body.appendChild(
            box
        );
    }

    box.textContent =
        message;

    box.style.display =
        "block";

    clearTimeout(
        window.myBarToastTimer
    );

    window.myBarToastTimer =
        setTimeout(
            () => {
                box.style.display =
                    "none";
            },
            2200
        );
}

/* =========================
   SAFE HTML
========================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}

/* =========================
   SEARCH
========================= */

function setupSearch() {

    const menuGrid =
        document.getElementById(
            "menuGrid"
        );

    if (!menuGrid) return;

    const parent =
        menuGrid.parentElement;

    if (!parent) return;

    if (
        document.getElementById(
            "menuSearch"
        )
    ) {
        return;
    }

    const search =
        document.createElement(
            "input"
        );

    search.id =
        "menuSearch";

    search.type =
        "search";

    search.placeholder =
        "Kërko produkt...";

    search.style.width =
        "100%";

    search.style.padding =
        "12px 14px";

    search.style.marginBottom =
        "15px";

    search.style.borderRadius =
        "12px";

    search.style.border =
        "1px solid #26352d";

    search.style.background =
        "#0d1410";

    search.style.color =
        "#fff";

    search.style.outline =
        "none";

    parent.insertBefore(
        search,
        menuGrid
    );

    search.addEventListener(
        "input",
        () => {

            const query =
                search.value
                    .trim()
                    .toLowerCase();

            const products =
                getJSON(
                    PRODUCTS_KEY,
                    DEFAULT_PRODUCTS
                );

            const filtered =
                products.filter(
                    product =>
                        product.name
                            .toLowerCase()
                            .includes(query)
                );

            menuGrid.innerHTML =
                filtered.map(
                    product => `

                        <button
                            class="menu-card"
                            ${
                                getStock(
                                    product.id
                                ) <= 0
                                    ? "disabled"
                                    : ""
                            }
                            onclick="addProduct(${product.id})"
                        >

                            <strong>
                                ${escapeHTML(
                                    product.name
                                )}
                            </strong>

                            <span>
                                ${money(
                                    product.price
                                )}
                            </span>

                            <small>
                                Stok:
                                ${getStock(
                                    product.id
                                )}
                            </small>

                        </button>
                    `
                ).join("");
        }
    );
}

/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeApp();

        renderHeader();
        renderTables();
        renderMenu();
        renderOrder();
        updateDashboard();
        renderHistory();
        renderAdmin();
        applyRole();
        setupSearch();

        updateClock();

        setInterval(
            updateClock,
            1000
        );

        console.log(
            "MY BAR loaded successfully."
        );
    }
);

/* =========================
   GLOBAL FUNCTIONS
========================= */

window.selectTable =
    selectTable;

window.renderMenu =
    renderMenu;

window.addProduct =
    addProduct;

window.changeOrderQuantity =
    changeOrderQuantity;

window.removeOrderItem =
    removeOrderItem;

window.openPayment =
    openPayment;

window.closePayment =
    closePayment;

window.completePayment =
    completePayment;

window.closeInvoice =
    closeInvoice;

window.deleteHistory =
    deleteHistory;

window.logout =
    logout;

window.openWaiterModal =
    openWaiterModal;

window.deleteWaiter =
    deleteWaiter;

window.saveTableCount =
    saveTableCount;

window.saveAppName =
    saveAppName;

window.changeAdminPassword =
    changeAdminPassword;

window.changeStock =
    changeStock;

window.renderAdmin =
    renderAdmin;

window.applyRole =
    applyRole;
