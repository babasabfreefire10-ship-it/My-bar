/* =========================================================
   MY BAR — APP.JS
   COMPLETE ADMIN SYSTEM
========================================================= */

"use strict";

/* =========================================================
   STORAGE
========================================================= */

const USERS_KEY = "barUsersV3";
const PRODUCTS_KEY = "barProductsV3";
const INVOICES_KEY = "barInvoicesV3";
const TABLES_KEY = "barTablesV4";
const TABLE_COUNT_KEY = "barTableCountV3";
const CURRENT_USER_KEY = "barCurrentUser";
const APP_NAME_KEY = "barAppNameV3";
const INVENTORY_KEY = "barInventoryV1";
const SELECTED_TABLE_KEY = "barSelectedTable";

/* =========================================================
   DEFAULT USERS
========================================================= */

const DEFAULT_USERS = [
    {
        username: "admin",
        password: "1234",
        role: "admin",
        name: "Administrator"
    },
    {
        username: "kamarier1",
        password: "1234",
        role: "waiter",
        name: "Kamarier 1"
    }
];

/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

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

/* =========================================================
   HELPERS
========================================================= */

function getJSON(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        return fallback;
    }
}

function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
    return Number(value || 0).toLocaleString("sq-AL") + " L";
}

function getCurrentUser() {
    return getJSON(CURRENT_USER_KEY, null);
}

function isAdmin() {
    const user = getCurrentUser();
    return !!user && user.role === "admin";
}

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

/* =========================================================
   INITIALIZE
========================================================= */

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

/* =========================================================
   TABLES
========================================================= */

function initializeTables() {

    const count =
        Math.max(
            1,
            Math.min(
                100,
                Number(localStorage.getItem(TABLE_COUNT_KEY)) || 12
            )
        );

    let tables = getJSON(TABLES_KEY, []);

    if (!Array.isArray(tables)) {
        tables = [];
    }

    /*
      Mos i fshin tavolinat ekzistuese.
      Nëse rritet numri, shtohen të rejat.
      Nëse zvogëlohet, hiqen vetëm tavolinat bosh.
    */

    for (let i = 1; i <= count; i++) {

        const exists = tables.find(t => Number(t.id) === i);

        if (!exists) {
            tables.push({
                id: i,
                name: "Tavolina " + i,
                items: []
            });
        }
    }

    tables = tables.filter(table => {

        if (Number(table.id) <= count) {
            return true;
        }

        return table.items && table.items.length > 0;
    });

    tables.sort((a, b) => Number(a.id) - Number(b.id));

    setJSON(TABLES_KEY, tables);
}

function getTables() {
    return getJSON(TABLES_KEY, []);
}

function saveTables(tables) {
    setJSON(TABLES_KEY, tables);
}

function getSelectedTable() {
    return Number(
        localStorage.getItem(SELECTED_TABLE_KEY) || 0
    );
}

function selectTable(id) {

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(id)
    );

    renderTables();
    renderOrder();
}

function renameTable(id, newName) {

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të ndryshojë tavolinat.");
        return;
    }

    const tables = getTables();
    const table = tables.find(t => Number(t.id) === Number(id));

    if (!table) return;

    table.name =
        newName.trim() ||
        "Tavolina " + id;

    saveTables(tables);
    renderTables();

    toast("Tavolina u ndryshua.");
}

function deleteTable(id) {

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të fshijë tavolina.");
        return;
    }

    const tables = getTables();
    const table = tables.find(t => Number(t.id) === Number(id));

    if (!table) return;

    if (table.items && table.items.length > 0) {
        toast("Nuk mund të fshish tavolinë me porosi aktive.");
        return;
    }

    const ok = confirm(
        "Dëshiron të fshish " + table.name + "?"
    );

    if (!ok) return;

    const filtered =
        tables.filter(t => Number(t.id) !== Number(id));

    saveTables(filtered);

    renderTables();
    renderAdmin();

    toast("Tavolina u fshi.");
}

/* =========================================================
   INVENTORY
========================================================= */

function initializeInventory() {

    const products =
        getJSON(PRODUCTS_KEY, DEFAULT_PRODUCTS);

    let stock =
        getJSON(INVENTORY_KEY, {});

    if (!stock || typeof stock !== "object") {
        stock = {};
    }

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

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të ndryshojë stokun.");
        return;
    }

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

    toast("Stoku u ndryshua.");
}

function setStock(productId, amount) {

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të ndryshojë stokun.");
        return;
    }

    amount = Math.max(
        0,
        Number(amount || 0)
    );

    const stock =
        getJSON(INVENTORY_KEY, {});

    stock[productId] = amount;

    setJSON(INVENTORY_KEY, stock);

    renderMenu();
    renderAdmin();

    toast("Stoku u ruajt.");
}

/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString("sq-AL", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
}

/* =========================================================
   HEADER
========================================================= */

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

/* =========================================================
   TABLE UI
========================================================= */

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
                    ${selected === Number(table.id) ? "selected" : ""}"
                    onclick="selectTable(${table.id})"
                >
                    <strong>
                        ${escapeHTML(table.name)}
                    </strong>

                    <span>
                        ${
                            active
                                ? money(total)
                                : "E lirë"
                        }
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
        document.getElementById("selectedTableText");

    if (selectedText) {

        const table =
            tables.find(
                t => Number(t.id) === selected
            );

        selectedText.textContent =
            table
                ? table.name
                : "Zgjidh një tavolinë";
    }
}

/* =========================================================
   MENU
========================================================= */

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
            products.map(p => p.category)
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
                    onclick="renderMenu(${JSON.stringify(cat)})"
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

/* =========================================================
   ADD PRODUCT TO ORDER
========================================================= */

function addProduct(productId) {

    const tableId =
        getSelectedTable();

    if (!tableId) {
        toast("Zgjidh fillimisht një tavolinë.");
        return;
    }

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const product =
        products.find(
            p => Number(p.id) === Number(productId)
        );

    if (!product) return;

    const stock =
        getStock(productId);

    if (stock <= 0) {
        toast("Ky produkt nuk ka stok.");
        return;
    }

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
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
            toast("Nuk ka më stok.");
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

/* =========================================================
   ORDER
========================================================= */

function renderOrder() {

    const container =
        document.getElementById("orderItems");

    const totalElement =
        document.getElementById("orderTotal");

    if (!container) return;

    const tableId =
        getSelectedTable();

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
        );

    if (!table || !table.items.length) {

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
            t => Number(t.id) === tableId
        );

    if (!table) return;

    const item =
        table.items[index];

    if (!item) return;

    const newQuantity =
        Number(item.quantity) +
        Number(amount);

    if (newQuantity <= 0) {

        table.items.splice(index, 1);

    } else {

        const stock =
            getStock(item.productId);

        if (newQuantity > stock) {
            toast("Nuk ka mjaftueshëm stok.");
            return;
        }

        item.quantity =
            newQuantity;
    }

    saveTables(tables);

    renderTables();
    renderOrder();
}

function removeOrderItem(index) {

    const tableId =
        getSelectedTable();

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
        );

    if (!table) return;

    table.items.splice(index, 1);

    saveTables(tables);

    renderTables();
    renderOrder();
}

/* =========================================================
   PAYMENT
========================================================= */

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
        toast("Zgjidh një tavolinë.");
        return;
    }

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
        );

    if (!table || !table.items.length) {
        toast("Porosia është bosh.");
        return;
    }

    const total =
        getOrderTotal(table);

    const modal =
        document.getElementById("paymentModal");

    if (modal) {
        modal.style.display = "flex";
    }

    const paymentTotal =
        document.getElementById("paymentTotal");

    if (paymentTotal) {
        paymentTotal.textContent =
            money(total);
    }
}

function closePayment() {

    const modal =
        document.getElementById("paymentModal");

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
            t => Number(t.id) === tableId
        );

    if (!table || !table.items.length) {
        toast("Porosia është bosh.");
        return;
    }

    for (const item of table.items) {

        const stock =
            getStock(item.productId);

        if (
            Number(item.quantity) >
            Number(stock)
        ) {
            toast(
                "Stoku nuk është i mjaftueshëm për " +
                item.name
            );
            return;
        }
    }

    for (const item of table.items) {

        reduceStockAfterSale(
            item.productId,
            Number(item.quantity)
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

        id: generateId(),

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
            table.name,

        items:
            JSON.parse(
                JSON.stringify(table.items)
            ),

        total:
            total,

        amount:
            total,

        grandTotal:
            total,

        payment:
            method,

        paymentMethod:
            method,

        method:
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
        SELECTED_TABLE_KEY
    );

    renderTables();
    renderOrder();
    renderMenu();

    updateDashboard();
    renderHistory();

    showInvoice(invoice);

    toast(
        "Pagesa u krye me sukses."
    );
}

function reduceStockAfterSale(productId, amount) {

    const stock =
        getJSON(
            INVENTORY_KEY,
            {}
        );

    stock[productId] =
        Math.max(
            0,
            Number(stock[productId] || 0) -
            Number(amount || 0)
        );

    setJSON(
        INVENTORY_KEY,
        stock
    );
}

/* =========================================================
   INVOICE
========================================================= */

function showInvoice(invoice) {

    const modal =
        document.getElementById("invoiceModal");

    const number =
        document.getElementById("invoiceNumber");

    const date =
        document.getElementById("invoiceDate");

    const table =
        document.getElementById("invoiceTable");

    const waiter =
        document.getElementById("invoiceWaiter");

    const items =
        document.getElementById("invoiceItems");

    const total =
        document.getElementById("invoiceTotal");

    if (number) {
        number.textContent =
            invoice.number;
    }

    if (date) {
        date.textContent =
            new Date(
                invoice.date
            ).toLocaleString("sq-AL");
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
            invoice.items.map(item => `
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
            `).join("");
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
        document.getElementById("invoiceModal");

    if (modal) {
        modal.style.display = "none";
    }
}

function printInvoice() {

    window.print();
}

/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    const todayString =
        new Date().toDateString();

    const todayInvoices =
        invoices.filter(invoice => {

            const date =
                new Date(
                    invoice.date ||
                    invoice.createdAt ||
                    Date.now()
                );

            return (
                date.toDateString() ===
                todayString
            );
        });

    const sales =
        todayInvoices.reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.total ||
                    invoice.amount ||
                    0
                ),
            0
        );

    const cash =
        todayInvoices
            .filter(
                i =>
                    (
                        i.payment ||
                        i.paymentMethod
                    ) === "cash"
            )
            .reduce(
                (sum, i) =>
                    sum +
                    Number(
                        i.total ||
                        i.amount ||
                        0
                    ),
                0
            );

    const card =
        todayInvoices
            .filter(
                i =>
                    (
                        i.payment ||
                        i.paymentMethod
                    ) === "card"
            )
            .reduce(
                (sum, i) =>
                    sum +
                    Number(
                        i.total ||
                        i.amount ||
                        0
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

/* =========================================================
   PAYMENTS LIST
========================================================= */

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
            .map(invoice => `
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
            `)
            .join("");
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
                (invoice, index) => `
                    <div class="history-row">

                        <div>

                            <strong>
                                ${escapeHTML(
                                    invoice.number
                                )}
                            </strong>

                            <small>
                                ${new Date(
                                    invoice.date ||
                                    invoice.createdAt
                                ).toLocaleString(
                                    "sq-AL"
                                )}
                            </small>

                            <small>
                                ${escapeHTML(
                                    invoice.waiterName ||
                                    "Pa emër"
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

                            ${
                                isAdmin()
                                    ? `
                                    <button
                                        onclick="deleteSingleInvoice(${invoice.id})"
                                    >
                                        Fshi
                                    </button>
                                    `
                                    : ""
                            }

                        </div>

                    </div>
                `
            )
            .join("");
}

function deleteSingleInvoice(id) {

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të fshijë historikun.");
        return;
    }

    const ok =
        confirm(
            "Dëshiron të fshish këtë faturë?"
        );

    if (!ok) return;

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    const filtered =
        invoices.filter(
            invoice =>
                Number(invoice.id) !==
                Number(id)
        );

    setJSON(
        INVOICES_KEY,
        filtered
    );

    updateDashboard();
    renderHistory();

    toast(
        "Fatura u fshi."
    );
}

function deleteHistory() {

    if (!isAdmin()) {
        toast("Vetëm ADMIN mund të fshijë historikun.");
        return;
    }

    const ok =
        confirm(
            "Dëshiron të fshish të GJITHË historikun?"
        );

    if (!ok) return;

    localStorage.removeItem(
        INVOICES_KEY
    );

    setJSON(
        INVOICES_KEY,
        []
    );

    updateDashboard();
    renderHistory();

    toast(
        "Historiku u fshi."
    );
}

/* =========================================================
   ADMIN CHECK
========================================================= */

function requireAdmin() {

    if (!isAdmin()) {
        toast(
            "Kjo mundësi është vetëm për ADMIN."
        );

        return false;
    }

    return true;
}

/* =========================================================
   ADMIN — MAIN
========================================================= */

function renderAdmin() {

    renderAdminUsers();
    renderAdminProducts();
    renderAdminTables();
    renderAdminSettings();
}

function renderAdminUsers() {

    const usersList =
        document.getElementById(
            "usersList"
        );

    if (!usersList) return;

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
                            ${
                                user.role === "admin"
                                    ? "ADMIN"
                                    : "KAMARIER"
                            }
                        </small>

                    </div>

                    <div>

                        ${
                            user.username !== "admin"
                                ? `
                                    <button
                                        onclick="editWaiter(${index})"
                                    >
                                        Ndrysho
                                    </button>

                                    <button
                                        onclick="deleteWaiter(${index})"
                                    >
                                        Fshi
                                    </button>
                                `
                                : `
                                    <span>
                                        Kryesor
                                    </span>
                                `
                        }

                    </div>

                </div>
            `
        ).join("");
}

/* =========================================================
   ADMIN — USERS
========================================================= */

function openWaiterModal(editIndex = -1) {

    if (!requireAdmin()) return;

    let modal =
        document.getElementById(
            "generalModal"
        );

    if (!modal) {

        modal =
            document.createElement(
                "div"
            );

        modal.id =
            "generalModal";

        modal.style.position =
            "fixed";

        modal.style.inset =
            "0";

        modal.style.zIndex =
            "99999";

        modal.style.display =
            "flex";

        modal.style.alignItems =
            "center";

        modal.style.justifyContent =
            "center";

        modal.style.background =
            "rgba(0,0,0,.75)";

        document.body.appendChild(
            modal
        );
    }

    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    const user =
        editIndex >= 0
            ? users[editIndex]
            : null;

    modal.innerHTML = `

        <div
            style="
                width:min(92%,430px);
                background:#101712;
                border:1px solid #2d8f5b;
                border-radius:20px;
                padding:22px;
                box-shadow:0 20px 60px rgba(0,0,0,.6);
                color:white;
            "
        >

            <h2 style="margin-top:0">
                ${
                    user
                        ? "Ndrysho kamarier"
                        : "Shto kamarier"
                }
            </h2>

            <input
                id="waiterNameInput"
                value="${
                    user
                        ? escapeHTML(user.name)
                        : ""
                }"
                placeholder="Emri i kamarierit"
                style="${adminInputStyle()}"
            >

            <input
                id="waiterUsernameInput"
                value="${
                    user
                        ? escapeHTML(user.username)
                        : ""
                }"
                placeholder="Username"
                ${
                    user
                        ? "disabled"
                        : ""
                }
                style="${adminInputStyle()}"
            >

            <input
                id="waiterPasswordInput"
                type="text"
                value="${
                    user
                        ? escapeHTML(user.password)
                        : ""
                }"
                placeholder="Password"
                style="${adminInputStyle()}"
            >

            <div
                style="
                    display:flex;
                    gap:10px;
                    margin-top:10px;
                "
            >

                <button
                    onclick="saveWaiter(${editIndex})"
                    style="${adminButtonStyle()}"
                >
                    RUAJ
                </button>

                <button
                    onclick="closeGeneralModal()"
                    style="${adminButtonStyle()}"
                >
                    ANULO
                </button>

            </div>

        </div>
    `;

    modal.style.display =
        "flex";
}

function saveWaiter(editIndex) {

    if (!requireAdmin()) return;

    const name =
        document.getElementById(
            "waiterNameInput"
        )?.value.trim();

    const username =
        document.getElementById(
            "waiterUsernameInput"
        )?.value.trim().toLowerCase();

    const password =
        document.getElementById(
            "waiterPasswordInput"
        )?.value.trim();

    if (!name) {
        toast("Shkruaj emrin.");
        return;
    }

    if (!username) {
        toast("Shkruaj username.");
        return;
    }

    if (!password) {
        toast("Shkruaj password.");
        return;
    }

    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    if (editIndex >= 0) {

        const user =
            users[editIndex];

        if (!user) return;

        user.name =
            name;

        user.password =
            password;

        setJSON(
            USERS_KEY,
            users
        );

        closeGeneralModal();
        renderAdminUsers();

        toast(
            "Kamarieri u ndryshua."
        );

        return;
    }

    const exists =
        users.some(
            u =>
                String(
                    u.username
                ).toLowerCase() ===
                username
        );

    if (exists) {
        toast(
            "Ky username ekziston."
        );

        return;
    }

    users.push({
        username:
            username,

        password:
            password,

        role:
            "waiter",

        name:
            name
    });

    setJSON(
        USERS_KEY,
        users
    );

    closeGeneralModal();
    renderAdminUsers();

    toast(
        "Kamarieri u krijua."
    );
}

function createWaiter() {
    saveWaiter(-1);
}

function editWaiter(index) {
    openWaiterModal(index);
}

function deleteWaiter(index) {

    if (!requireAdmin()) return;

    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    const user =
        users[index];

    if (!user) return;

    if (user.username === "admin") {
        toast(
            "ADMIN nuk mund të fshihet."
        );
        return;
    }

    const ok =
        confirm(
            "Dëshiron të fshish " +
            user.name +
            "?"
        );

    if (!ok) return;

    users.splice(
        index,
        1
    );

    setJSON(
        USERS_KEY,
        users
    );

    renderAdminUsers();

    toast(
        "Kamarieri u fshi."
    );
}

function closeGeneralModal() {

    const modal =
        document.getElementById(
            "generalModal"
        );

    if (modal) {
        modal.style.display =
            "none";
    }
}

/* =========================================================
   ADMIN — PRODUCTS
========================================================= */

function renderAdminProducts() {

    const container =
        document.getElementById(
            "adminProducts"
        );

    if (!container) return;

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    container.innerHTML =
        products.map(product => `
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

                        • Stok:
                        ${getStock(
                            product.id
                        )}
                    </small>

                </div>

                <div>

                    <button
                        onclick="editProduct(${product.id})"
                    >
                        Ndrysho
                    </button>

                    <button
                        onclick="changeStock(${product.id},1)"
                    >
                        +1
                    </button>

                    <button
                        onclick="changeStock(${product.id},-1)"
                    >
                        -1
                    </button>

                    <button
                        onclick="deleteProduct(${product.id})"
                    >
                        Fshi
                    </button>

                </div>

            </div>
        `).join("");
}

function openProductModal(productId = null) {

    if (!requireAdmin()) return;

    let modal =
        document.getElementById(
            "generalModal"
        );

    if (!modal) {

        modal =
            document.createElement(
                "div"
            );

        modal.id =
            "generalModal";

        modal.style.position =
            "fixed";

        modal.style.inset =
            "0";

        modal.style.zIndex =
            "99999";

        modal.style.display =
            "flex";

        modal.style.alignItems =
            "center";

        modal.style.justifyContent =
            "center";

        modal.style.background =
            "rgba(0,0,0,.75)";

        document.body.appendChild(
            modal
        );
    }

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const product =
        productId !== null
            ? products.find(
                p =>
                    Number(p.id) ===
                    Number(productId)
            )
            : null;

    modal.innerHTML = `

        <div
            style="
                width:min(92%,450px);
                background:#101712;
                border:1px solid #2d8f5b;
                border-radius:20px;
                padding:22px;
                color:white;
            "
        >

            <h2 style="margin-top:0">
                ${
                    product
                        ? "Ndrysho produkt"
                        : "Shto produkt"
                }
            </h2>

            <input
                id="productNameInput"
                value="${
                    product
                        ? escapeHTML(product.name)
                        : ""
                }"
                placeholder="Emri i produktit"
                style="${adminInputStyle()}"
            >

            <input
                id="productCategoryInput"
                value="${
                    product
                        ? escapeHTML(product.category)
                        : ""
                }"
                placeholder="Kategoria"
                style="${adminInputStyle()}"
            >

            <input
                id="productPriceInput"
                type="number"
                min="0"
                value="${
                    product
                        ? product.price
                        : ""
                }"
                placeholder="Çmimi"
                style="${adminInputStyle()}"
            >

            <input
                id="productStockInput"
                type="number"
                min="0"
                value="${
                    product
                        ? getStock(product.id)
                        : 20
                }"
                placeholder="Stoku"
                style="${adminInputStyle()}"
            >

            <div
                style="
                    display:flex;
                    gap:10px;
                    margin-top:10px;
                "
            >

                <button
                    onclick="saveProduct(${
                        product
                            ? product.id
                            : "null"
                    })"
                    style="${adminButtonStyle()}"
                >
                    RUAJ
                </button>

                <button
                    onclick="closeGeneralModal()"
                    style="${adminButtonStyle()}"
                >
                    ANULO
                </button>

            </div>

        </div>
    `;

    modal.style.display =
        "flex";
}

function saveProduct(productId) {

    if (!requireAdmin()) return;

    const name =
        document.getElementById(
            "productNameInput"
        )?.value.trim();

    const category =
        document.getElementById(
            "productCategoryInput"
        )?.value.trim();

    const price =
        Number(
            document.getElementById(
                "productPriceInput"
            )?.value
        );

    const stockAmount =
        Number(
            document.getElementById(
                "productStockInput"
            )?.value
        );

    if (!name) {
        toast(
            "Shkruaj emrin e produktit."
        );
        return;
    }

    if (!category) {
        toast(
            "Shkruaj kategorinë."
        );
        return;
    }

    if (!Number.isFinite(price) || price < 0) {
        toast(
            "Çmimi nuk është i saktë."
        );
        return;
    }

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    if (productId !== null) {

        const product =
            products.find(
                p =>
                    Number(p.id) ===
                    Number(productId)
            );

        if (!product) return;

        product.name =
            name;

        product.category =
            category;

        product.price =
            price;

        setJSON(
            PRODUCTS_KEY,
            products
        );

        setStock(
            product.id,
            Math.max(
                0,
                stockAmount
            )
        );

        closeGeneralModal();

        renderMenu();
        renderAdminProducts();

        toast(
            "Produkti u ndryshua."
        );

        return;
    }

    const id =
        generateId();

    products.push({
        id:
            id,

        name:
            name,

        category:
            category,

        price:
            price
    });

    setJSON(
        PRODUCTS_KEY,
        products
    );

    setStock(
        id,
        Math.max(
            0,
            stockAmount
        )
    );

    closeGeneralModal();

    renderMenu();
    renderAdminProducts();

    toast(
        "Produkti u shtua."
    );
}

function editProduct(productId) {
    openProductModal(
        productId
    );
}

function deleteProduct(productId) {

    if (!requireAdmin()) return;

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

    const ok =
        confirm(
            "Dëshiron të fshish " +
            product.name +
            "?"
        );

    if (!ok) return;

    const filtered =
        products.filter(
            p =>
                Number(p.id) !==
                Number(productId)
        );

    setJSON(
        PRODUCTS_KEY,
        filtered
    );

    const stock =
        getJSON(
            INVENTORY_KEY,
            {}
        );

    delete stock[productId];

    setJSON(
        INVENTORY_KEY,
        stock
    );

    renderMenu();
    renderAdminProducts();

    toast(
        "Produkti u fshi."
    );
}

/* =========================================================
   ADMIN — TABLES
========================================================= */

function renderAdminTables() {

    const container =
        document.getElementById(
            "adminTables"
        );

    if (!container) return;

    const tables =
        getTables();

    container.innerHTML =
        tables.map(table => `

            <div class="admin-row">

                <div>

                    <strong>
                        ${escapeHTML(
                            table.name
                        )}
                    </strong>

                    <small>
                        ID:
                        ${table.id}

                        •
                        ${
                            table.items &&
                            table.items.length
                                ? "Zënë"
                                : "E lirë"
                        }
                    </small>

                </div>

                <div>

                    <button
                        onclick="renameTablePrompt(${table.id})"
                    >
                        Ndrysho
                    </button>

                    <button
                        onclick="deleteTable(${table.id})"
                    >
                        Fshi
                    </button>

                </div>

            </div>

        `).join("");
}

function renameTablePrompt(id) {

    if (!requireAdmin()) return;

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.id) ===
                Number(id)
        );

    if (!table) return;

    const newName =
        prompt(
            "Emri i ri i tavolinës:",
            table.name
        );

    if (newName === null) return;

    renameTable(
        id,
        newName
    );

    renderAdminTables();
}

function saveTableCount() {

    if (!requireAdmin()) return;

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
    renderAdminTables();

    toast(
        "Numri i tavolinave u ruajt."
    );
}

/* =========================================================
   ADMIN — SETTINGS
========================================================= */

function renderAdminSettings() {

    const input =
        document.getElementById(
            "appNameInput"
        );

    if (input) {

        input.value =
            localStorage.getItem(
                APP_NAME_KEY
            ) ||
            "MY BAR";
    }

    const tableInput =
        document.getElementById(
            "tableCountInput"
        );

    if (tableInput) {

        tableInput.value =
            localStorage.getItem(
                TABLE_COUNT_KEY
            ) ||
            "12";
    }
}

function saveAppName() {

    if (!requireAdmin()) return;

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

    toast(
        "Emri u ruajt."
    );
}

function changeAdminPassword() {

    if (!requireAdmin()) return;

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

    if (password.length < 4) {
        toast(
            "Password duhet të ketë të paktën 4 karaktere."
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
        "Password-i i ADMIN u ndryshua."
    );
}

/* =========================================================
   REPORT DATA
========================================================= */

function getInvoicesByPeriod(period) {

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    const now =
        new Date();

    return invoices.filter(
        invoice => {

            const date =
                new Date(
                    invoice.date ||
                    invoice.createdAt ||
                    Date.now()
                );

            if (period === "all") {
                return true;
            }

            if (period === "today") {

                return (
                    date.toDateString() ===
                    now.toDateString()
                );
            }

            if (period === "week") {

                const start =
                    new Date(now);

                start.setDate(
                    now.getDate() - 7
                );

                return date >= start;
            }

            if (period === "month") {

                return (
                    date.getMonth() ===
                    now.getMonth() &&
                    date.getFullYear() ===
                    now.getFullYear()
                );
            }

            return true;
        }
    );
}

function getReportSummary(period = "today") {

    const invoices =
        getInvoicesByPeriod(
            period
        );

    const sales =
        invoices.reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.total ||
                    invoice.amount ||
                    0
                ),
            0
        );

    const cash =
        invoices
            .filter(
                i =>
                    (
                        i.payment ||
                        i.paymentMethod
                    ) === "cash"
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
        invoices
            .filter(
                i =>
                    (
                        i.payment ||
                        i.paymentMethod
                    ) === "card"
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

    const products = {};

    invoices.forEach(
        invoice => {

            (
                invoice.items ||
                []
            ).forEach(
                item => {

                    const name =
                        item.name ||
                        item.productName ||
                        "Pa emër";

                    const qty =
                        Number(
                            item.quantity ||
                            item.qty ||
                            1
                        );

                    products[name] =
                        (
                            products[name] ||
                            0
                        ) + qty;
                }
            );
        }
    );

    return {
        invoices,
        sales,
        cash,
        card,
        invoiceCount:
            invoices.length,
        products
    };
}

/* =========================================================
   EXPORT / BACKUP
========================================================= */

function exportBackup() {

    if (!requireAdmin()) return;

    const backup = {

        appName:
            localStorage.getItem(
                APP_NAME_KEY
            ),

        users:
            getJSON(
                USERS_KEY,
                []
            ),

        products:
            getJSON(
                PRODUCTS_KEY,
                []
            ),

        invoices:
            getJSON(
                INVOICES_KEY,
                []
            ),

        tables:
            getJSON(
                TABLES_KEY,
                []
            ),

        tableCount:
            localStorage.getItem(
                TABLE_COUNT_KEY
            ),

        inventory:
            getJSON(
                INVENTORY_KEY,
                {}
            ),

        createdAt:
            new Date().toISOString()
    };

    const blob =
        new Blob(
            [
                JSON.stringify(
                    backup,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href =
        url;

    a.download =
        "my-bar-backup-" +
        Date.now() +
        ".json";

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(
        url
    );

    toast(
        "Backup u krijua."
    );
}

/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.href =
        "login.html";
}

/* =========================================================
   ROLE
========================================================= */

function applyRole() {

    const user =
        getCurrentUser();

    if (!user) {
        return;
    }

    const adminElements =
        document.querySelectorAll(
            ".admin-only, [data-admin]"
        );

    adminElements.forEach(
        element => {

            element.style.display =
                user.role === "admin"
                    ? ""
                    : "none";
        }
    );
}

/* =========================================================
   TOAST
========================================================= */

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
            "999999";

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
            2500
        );
}

/* =========================================================
   SEARCH
========================================================= */

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
                            .includes(
                                query
                            )
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

/* =========================================================
   ADMIN STYLES
========================================================= */

function adminInputStyle() {

    return `
        width:100%;
        box-sizing:border-box;
        margin-top:10px;
        padding:13px;
        border-radius:12px;
        border:1px solid #26352d;
        background:#0b110d;
        color:#fff;
        outline:none;
    `;
}

function adminButtonStyle() {

    return `
        flex:1;
        padding:12px;
        border:1px solid #2d8f5b;
        border-radius:12px;
        background:#132219;
        color:#fff;
        cursor:pointer;
    `;
}

/* =========================================================
   CLOSE MODALS WHEN CLICK OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        const generalModal =
            document.getElementById(
                "generalModal"
            );

        if (
            generalModal &&
            event.target ===
            generalModal
        ) {
            generalModal.style.display =
                "none";
        }
    }
);

/* =========================================================
   START
========================================================= */

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
            "MY BAR — COMPLETE APP LOADED"
        );
    }
);

/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

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

window.printInvoice =
    printInvoice;

window.deleteHistory =
    deleteHistory;

window.deleteSingleInvoice =
    deleteSingleInvoice;

window.logout =
    logout;

/* USERS */

window.openWaiterModal =
    openWaiterModal;

window.createWaiter =
    createWaiter;

window.saveWaiter =
    saveWaiter;

window.editWaiter =
    editWaiter;

window.deleteWaiter =
    deleteWaiter;

window.closeGeneralModal =
    closeGeneralModal;

/* PRODUCTS */

window.openProductModal =
    openProductModal;

window.saveProduct =
    saveProduct;

window.editProduct =
    editProduct;

window.deleteProduct =
    deleteProduct;

/* STOCK */

window.changeStock =
    changeStock;

window.setStock =
    setStock;

/* TABLES */

window.saveTableCount =
    saveTableCount;

window.renameTable =
    renameTable;

window.renameTablePrompt =
    renameTablePrompt;

window.deleteTable =
    deleteTable;

/* SETTINGS */

window.saveAppName =
    saveAppName;

window.changeAdminPassword =
    changeAdminPassword;

/* REPORTS / BACKUP */

window.getReportSummary =
    getReportSummary;

window.exportBackup =
    exportBackup;
