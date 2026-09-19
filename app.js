/* =========================================================
   MY BAR — APP.JS
   POS SYSTEM — NEW VERSION
========================================================= */

"use strict";

/* =========================================================
   STORAGE
========================================================= */

const USERS_KEY = "MYBAR_USERS_V2";
const SESSION_KEY = "MYBAR_SESSION_V2";
const TABLES_KEY = "MYBAR_TABLES_V2";
const PRODUCTS_KEY = "MYBAR_PRODUCTS_V2";
const INVOICES_KEY = "MYBAR_INVOICES_V2";
const SETTINGS_KEY = "MYBAR_SETTINGS_V2";

/* =========================================================
   DEFAULT USERS
========================================================= */

const DEFAULT_USERS = [
    {
        id: 1,
        username: "admin",
        password: "1234",
        name: "Administrator",
        role: "admin"
    },
    {
        id: 2,
        username: "sabi",
        password: "1234",
        name: "Sabi",
        role: "waiter"
    },
    {
        id: 3,
        username: "mondi",
        password: "1234",
        name: "Mondi",
        role: "waiter"
    }
];

/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

const DEFAULT_PRODUCTS = [

    /* KAFE */

    { id: 1, name: "Espresso", category: "Kafe", price: 100 },
    { id: 2, name: "Espresso Dopio", category: "Kafe", price: 150 },
    { id: 3, name: "Macchiato", category: "Kafe", price: 120 },
    { id: 4, name: "Cappuccino", category: "Kafe", price: 180 },
    { id: 5, name: "Latte", category: "Kafe", price: 200 },
    { id: 6, name: "Freddo Espresso", category: "Kafe", price: 200 },
    { id: 7, name: "Freddo Cappuccino", category: "Kafe", price: 220 },
    { id: 8, name: "Çaj", category: "Kafe", price: 120 },

    /* PIJE FRESKUESE */

    { id: 20, name: "Coca Cola", category: "Pije Freskuese", price: 150 },
    { id: 21, name: "Coca Cola Zero", category: "Pije Freskuese", price: 150 },
    { id: 22, name: "Fanta", category: "Pije Freskuese", price: 150 },
    { id: 23, name: "Sprite", category: "Pije Freskuese", price: 150 },
    { id: 24, name: "Schweppes", category: "Pije Freskuese", price: 150 },
    { id: 25, name: "Red Bull", category: "Pije Freskuese", price: 250 },
    { id: 26, name: "Fresh Orange", category: "Pije Freskuese", price: 250 },
    { id: 27, name: "Fresh Lemon", category: "Pije Freskuese", price: 250 },

    /* UJE */

    { id: 40, name: "Ujë 0.5L", category: "Ujë", price: 100 },
    { id: 41, name: "Ujë 0.75L", category: "Ujë", price: 150 },
    { id: 42, name: "Ujë 1.5L", category: "Ujë", price: 150 },

    /* BIRRA */

    { id: 50, name: "Birra Tirana", category: "Birra", price: 200 },
    { id: 51, name: "Birra Korça", category: "Birra", price: 200 },
    { id: 52, name: "Heineken", category: "Birra", price: 250 },
    { id: 53, name: "Corona", category: "Birra", price: 300 },
    { id: 54, name: "Tuborg", category: "Birra", price: 250 },

    /* WHISKY */

    { id: 60, name: "Jack Daniel's", category: "Whisky", price: 500 },
    { id: 61, name: "Johnnie Walker Red", category: "Whisky", price: 450 },
    { id: 62, name: "Johnnie Walker Black", category: "Whisky", price: 650 },
    { id: 63, name: "Chivas Regal", category: "Whisky", price: 700 },

    /* GIN */

    { id: 70, name: "Gordon's Gin", category: "Gin", price: 450 },
    { id: 71, name: "Bombay Sapphire", category: "Gin", price: 550 },
    { id: 72, name: "Hendrick's", category: "Gin", price: 800 },

    /* VODKA */

    { id: 80, name: "Absolut Vodka", category: "Vodka", price: 450 },
    { id: 81, name: "Smirnoff", category: "Vodka", price: 450 },
    { id: 82, name: "Grey Goose", category: "Vodka", price: 800 },

    /* RUM */

    { id: 90, name: "Bacardi", category: "Rum", price: 450 },
    { id: 91, name: "Captain Morgan", category: "Rum", price: 500 },

    /* TEQUILA */

    { id: 100, name: "Jose Cuervo", category: "Tequila", price: 500 },
    { id: 101, name: "Olmeca", category: "Tequila", price: 550 },

    /* LIQUEUR */

    { id: 110, name: "Baileys", category: "Liqueur", price: 450 },
    { id: 111, name: "Jägermeister", category: "Liqueur", price: 450 },
    { id: 112, name: "Aperol", category: "Liqueur", price: 400 },

    /* VERE */

    { id: 120, name: "Verë e Kuqe", category: "Verë", price: 300 },
    { id: 121, name: "Verë e Bardhë", category: "Verë", price: 300 },
    { id: 122, name: "Prosecco", category: "Verë", price: 600 },

    /* COCKTAILS */

    { id: 130, name: "Mojito", category: "Cocktails", price: 600 },
    { id: 131, name: "Margarita", category: "Cocktails", price: 650 },
    { id: 132, name: "Aperol Spritz", category: "Cocktails", price: 650 },
    { id: 133, name: "Sex on the Beach", category: "Cocktails", price: 700 },
    { id: 134, name: "Long Island", category: "Cocktails", price: 800 },

    /* LONG DRINKS */

    { id: 140, name: "Gin Tonic", category: "Long Drinks", price: 550 },
    { id: 141, name: "Vodka Red Bull", category: "Long Drinks", price: 600 },
    { id: 142, name: "Whisky Cola", category: "Long Drinks", price: 550 },

    /* SHOTS */

    { id: 150, name: "Shot Tequila", category: "Shots", price: 300 },
    { id: 151, name: "Shot Jägermeister", category: "Shots", price: 300 },
    { id: 152, name: "Shot Vodka", category: "Shots", price: 250 },

    /* SNACKS */

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

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================================================
   SETTINGS
========================================================= */

const DEFAULT_SETTINGS = {
    businessName: "MY BAR",
    nipt: "",
    address: "Tiranë, Shqipëri",
    phone: "",
    tableCount: 12
};

function getSettings() {
    return {
        ...DEFAULT_SETTINGS,
        ...getJSON(SETTINGS_KEY, {})
    };
}

/* =========================================================
   INITIALIZATION
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

    if (!localStorage.getItem(SETTINGS_KEY)) {
        setJSON(SETTINGS_KEY, DEFAULT_SETTINGS);
    }

    initializeTables();
}

/* =========================================================
   SESSION
========================================================= */

function getSession() {
    return getJSON(SESSION_KEY, null);
}

function setSession(user) {

    const session = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
    };

    setJSON(SESSION_KEY, session);

    /* compatibility */
    setJSON("barCurrentUser", session);
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("barCurrentUser");
}

/* =========================================================
   LOGIN
========================================================= */

function login(username, password) {

    const users = getJSON(USERS_KEY, DEFAULT_USERS);

    const user = users.find(
        u =>
            String(u.username).toLowerCase() ===
            String(username).toLowerCase() &&
            String(u.password) === String(password)
    );

    if (!user) {
        toast("Username ose PIN i gabuar.");
        return false;
    }

    setSession(user);

    window.location.href = "index.html";

    return true;
}

function logout() {

    clearSession();

    window.location.href = "login.html";
}

function lockApp() {

    clearSession();

    window.location.href = "login.html";
}

/* =========================================================
   TABLES
========================================================= */

function initializeTables() {

    const settings = getSettings();

    let tables = getJSON(TABLES_KEY, null);

    if (!Array.isArray(tables) ||
        tables.length !== Number(settings.tableCount)) {

        tables = [];

        for (let i = 1; i <= Number(settings.tableCount); i++) {

            tables.push({
                id: i,
                name: "Tavolina " + i,
                items: [],
                waiter: null
            });
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
        localStorage.getItem("MYBAR_SELECTED_TABLE") || 0
    );
}

function selectTable(tableId) {

    localStorage.setItem(
        "MYBAR_SELECTED_TABLE",
        String(tableId)
    );

    renderTables();
    renderOrder();

    const text =
        document.getElementById("selectedTableText");

    if (text) {
        text.textContent =
            "Tavolina " + tableId;
    }
}

/* =========================================================
   TABLE RENDER
========================================================= */

function renderTables() {

    const grid =
        document.getElementById("tableGrid");

    if (!grid) return;

    const tables = getTables();

    const selected = getSelectedTable();

    grid.innerHTML = tables.map(table => {

        const active =
            Array.isArray(table.items) &&
            table.items.length > 0;

        const total = getTableTotal(table);

        return `
            <button
                class="table-card
                ${active ? "active" : ""}
                ${selected === table.id ? "selected" : ""}"
                onclick="selectTable(${table.id})"
            >

                <span class="table-number">
                    ${table.id}
                </span>

                <strong>
                    Tavolina ${table.id}
                </strong>

                <small>
                    ${active ? money(total) : "E lirë"}
                </small>

            </button>
        `;

    }).join("");
}

/* =========================================================
   PRODUCTS
========================================================= */

function getProducts() {
    return getJSON(PRODUCTS_KEY, DEFAULT_PRODUCTS);
}

function renderCategories(category = "Të gjitha") {

    const container =
        document.getElementById("categories");

    if (!container) return;

    const products = getProducts();

    const categories = [
        "Të gjitha",
        ...new Set(products.map(p => p.category))
    ];

    container.innerHTML =
        categories.map(cat => `
            <button
                class="category-btn
                ${cat === category ? "active" : ""}"
                onclick="renderProducts('${escapeHTML(cat)}')"
            >
                ${escapeHTML(cat)}
            </button>
        `).join("");
}

function renderProducts(category = "Të gjitha") {

    const grid =
        document.getElementById("menuGrid");

    if (!grid) return;

    renderCategories(category);

    const products = getProducts();

    const filtered =
        category === "Të gjitha"
            ? products
            : products.filter(
                product => product.category === category
            );

    grid.innerHTML =
        filtered.map(product => `
            <button
                class="product-card"
                onclick="addProduct(${product.id})"
            >

                <strong>
                    ${escapeHTML(product.name)}
                </strong>

                <span>
                    ${money(product.price)}
                </span>

            </button>
        `).join("");
}

/* =========================================================
   ORDER
========================================================= */

function addProduct(productId) {

    const tableId = getSelectedTable();

    if (!tableId) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    const products = getProducts();

    const product =
        products.find(
            p => Number(p.id) === Number(productId)
        );

    if (!product) return;

    const tables = getTables();

    const table =
        tables.find(t => Number(t.id) === tableId);

    if (!table) return;

    if (!Array.isArray(table.items)) {
        table.items = [];
    }

    const existing =
        table.items.find(
            item =>
                Number(item.productId) ===
                Number(product.id)
        );

    if (existing) {

        existing.quantity++;

    } else {

        table.items.push({
            productId: product.id,
            name: product.name,
            category: product.category,
            price: Number(product.price),
            quantity: 1
        });
    }

    const session = getSession();

    if (session) {
        table.waiter = session.name;
    }

    saveTables(tables);

    renderTables();
    renderOrder();

    toast(product.name + " u shtua.");
}

function changeQuantity(index, amount) {

    const tableId = getSelectedTable();

    const tables = getTables();

    const table =
        tables.find(t => t.id === tableId);

    if (!table) return;

    const item = table.items[index];

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        table.items.splice(index, 1);
    }

    saveTables(tables);

    renderTables();
    renderOrder();
}

function removeItem(index) {

    const tableId = getSelectedTable();

    const tables = getTables();

    const table =
        tables.find(t => t.id === tableId);

    if (!table) return;

    table.items.splice(index, 1);

    saveTables(tables);

    renderTables();
    renderOrder();
}

/* =========================================================
   ORDER TOTAL
========================================================= */

function getTableTotal(table) {

    if (!table || !Array.isArray(table.items)) {
        return 0;
    }

    return table.items.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );
}

function getCurrentTotal() {

    const tableId = getSelectedTable();

    const table =
        getTables().find(
            t => Number(t.id) === tableId
        );

    return getTableTotal(table);
}

/* =========================================================
   ORDER RENDER
========================================================= */

function renderOrder() {

    const container =
        document.getElementById("orderItems");

    const total =
        document.getElementById("orderTotal");

    if (!container) return;

    const tableId = getSelectedTable();

    const table =
        getTables().find(
            t => Number(t.id) === tableId
        );

    if (!table || !table.items.length) {

        container.innerHTML = `
            <div class="empty-order">
                Zgjidh produkte për faturën.
            </div>
        `;

        if (total) {
            total.textContent = money(0);
        }

        return;
    }

    container.innerHTML =
        table.items.map((item, index) => {

            const itemTotal =
                Number(item.price) *
                Number(item.quantity);

            return `
                <div class="order-item">

                    <div class="order-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <small>
                            ${money(item.price)}
                        </small>

                    </div>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <strong>
                        ${money(itemTotal)}
                    </strong>

                    <button
                        class="remove-item"
                        onclick="removeItem(${index})"
                    >
                        ×
                    </button>

                </div>
            `;

        }).join("");

    if (total) {
        total.textContent =
            money(getTableTotal(table));
    }
}

/* =========================================================
   NEW INVOICE
========================================================= */

function newInvoice() {

    const tableId = getSelectedTable();

    if (!tableId) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    renderProducts("Të gjitha");

    const box =
        document.getElementById("newInvoicePanel");

    if (box) {
        box.style.display = "block";
    }
}

/* =========================================================
   PAYMENT
========================================================= */

function openPayment() {

    const total = getCurrentTotal();

    if (total <= 0) {
        toast("Fatura është bosh.");
        return;
    }

    const modal =
        document.getElementById("paymentModal");

    const amount =
        document.getElementById("paymentTotal");

    if (amount) {
        amount.textContent = money(total);
    }

    if (modal) {
        modal.style.display = "flex";
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

    const tableId = getSelectedTable();

    const tables = getTables();

    const table =
        tables.find(t => t.id === tableId);

    if (!table || !table.items.length) {
        toast("Fatura është bosh.");
        return;
    }

    const session = getSession();

    const total =
        getTableTotal(table);

    const invoice = {

        id: Date.now(),

        number:
            "MB-" +
            new Date().getFullYear() +
            "-" +
            String(Date.now()).slice(-6),

        date:
            new Date().toISOString(),

        table:
            table.id,

        tableName:
            "Tavolina " + table.id,

        waiter:
            session ? session.name : "Pa emër",

        waiterUsername:
            session ? session.username : "",

        items:
            JSON.parse(
                JSON.stringify(table.items)
            ),

        total:
            total,

        payment:
            method,

        fiscalized:
            false

    };

    const invoices =
        getJSON(INVOICES_KEY, []);

    invoices.push(invoice);

    setJSON(INVOICES_KEY, invoices);

    /* Clear table */

    table.items = [];
    table.waiter = null;

    saveTables(tables);

    closePayment();

    renderTables();
    renderOrder();

    showInvoice(invoice);

    toast("Fatura u mbyll me sukses.");
}

/* =========================================================
   INVOICE
========================================================= */

let currentInvoice = null;

function showInvoice(invoice) {

    currentInvoice = invoice;

    const modal =
        document.getElementById("invoiceModal");

    if (!modal) return;

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
            new Date(invoice.date)
                .toLocaleString("sq-AL");
    }

    if (table) {
        table.textContent =
            invoice.tableName;
    }

    if (waiter) {
        waiter.textContent =
            invoice.waiter;
    }

    if (items) {

        items.innerHTML =
            invoice.items.map(item => `

                <div class="invoice-line">

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

    modal.style.display = "flex";
}

function closeInvoice() {

    const modal =
        document.getElementById("invoiceModal");

    if (modal) {
        modal.style.display = "none";
    }
}

/* =========================================================
   PRINT
========================================================= */

function printInvoice() {

    if (!currentInvoice) {
        toast("Nuk ka faturë.");
        return;
    }

    const settings = getSettings();

    const invoice =
        currentInvoice;

    const rows =
        invoice.items.map(item => `

            <tr>
                <td>${escapeHTML(item.name)}</td>
                <td>${item.quantity}</td>
                <td>${money(item.price)}</td>
                <td>
                    ${money(
                        item.price *
                        item.quantity
                    )}
                </td>
            </tr>

        `).join("");

    const html = `

<!DOCTYPE html>

<html lang="sq">

<head>

<meta charset="UTF-8">

<title>${invoice.number}</title>

<style>

@page {
    size: 80mm auto;
    margin: 4mm;
}

body {
    font-family: Arial, sans-serif;
    width: 72mm;
    margin: 0 auto;
    color: #000;
    font-size: 12px;
}

.center {
    text-align: center;
}

h2 {
    margin: 0 0 5px;
}

.line {
    border-top: 1px dashed #000;
    margin: 8px 0;
}

table {
    width: 100%;
    border-collapse: collapse;
}

td {
    padding: 3px 0;
}

.right {
    text-align: right;
}

.total {
    font-size: 16px;
    font-weight: bold;
}

</style>

</head>

<body>

<div class="center">

<h2>
${escapeHTML(settings.businessName)}
</h2>

<div>
${escapeHTML(settings.address)}
</div>

${settings.nipt
    ? `<div>NIPT: ${escapeHTML(settings.nipt)}</div>`
    : ""
}

${settings.phone
    ? `<div>${escapeHTML(settings.phone)}</div>`
    : ""
}

</div>

<div class="line"></div>

<div>
Fatura: ${escapeHTML(invoice.number)}
</div>

<div>
Data:
${new Date(invoice.date).toLocaleString("sq-AL")}
</div>

<div>
Tavolina: ${invoice.table}
</div>

<div>
Kamarier: ${escapeHTML(invoice.waiter)}
</div>

<div class="line"></div>

<table>

${rows}

</table>

<div class="line"></div>

<div class="right total">
TOTAL: ${money(invoice.total)}
</div>

<div>
Pagesa:
${invoice.payment === "cash"
    ? "CASH"
    : "CARD"}
</div>

<div class="line"></div>

<div class="center">
Faleminderit!
</div>

</body>

</html>
`;

    const printWindow =
        window.open("", "_blank");

    if (!printWindow) {
        toast("Lejo popup-et për printim.");
        return;
    }

    printWindow.document.open();

    printWindow.document.write(html);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {
        printWindow.print();
    }, 300);
}

/* =========================================================
   FISCAL INVOICE
========================================================= */

function printTaxInvoice() {

    if (!currentInvoice) {
        toast("Nuk ka faturë.");
        return;
    }

    /*
        Kjo është vetëm pamja e faturës tatimore.

        Fiskalizimi REAL shqiptar kërkon
        backend / integrim me sistemin përkatës.
    */

    printInvoice();

    toast(
        "Fatura tatimore u përgatit për printim."
    );
}

/* =========================================================
   MY INVOICES
========================================================= */

function openMyInvoices() {

    const session = getSession();

    const invoices =
        getJSON(INVOICES_KEY, []);

    const mine =
        session && session.role === "waiter"
            ? invoices.filter(
                invoice =>
                    invoice.waiterUsername ===
                    session.username
            )
            : invoices;

    const container =
        document.getElementById("myInvoicesList");

    if (!container) {
        openSimpleList(
            "Faturat e mia",
            mine
        );
        return;
    }

    container.innerHTML =
        mine.length
            ? [...mine]
                .reverse()
                .map(invoice => `

                    <div class="invoice-history">

                        <strong>
                            ${invoice.number}
                        </strong>

                        <span>
                            ${invoice.tableName}
                        </span>

                        <span>
                            ${money(invoice.total)}
                        </span>

                        <small>
                            ${new Date(
                                invoice.date
                            ).toLocaleString("sq-AL")}
                        </small>

                    </div>

                `)
                .join("")
            : `<div>Nuk ka fatura.</div>`;
}

/* =========================================================
   SUMMARY
========================================================= */

function openSummary() {

    const invoices =
        getJSON(INVOICES_KEY, []);

    const today =
        new Date().toDateString();

    const todayInvoices =
        invoices.filter(
            invoice =>
                new Date(invoice.date)
                    .toDateString() === today
        );

    const total =
        todayInvoices.reduce(
            (sum, invoice) =>
                sum + Number(invoice.total),
            0
        );

    const cash =
        todayInvoices
            .filter(
                invoice =>
                    invoice.payment === "cash"
            )
            .reduce(
                (sum, invoice) =>
                    sum + Number(invoice.total),
                0
            );

    const card =
        todayInvoices
            .filter(
                invoice =>
                    invoice.payment === "card"
            )
            .reduce(
                (sum, invoice) =>
                    sum + Number(invoice.total),
                0
            );

    const text = `
        <h2>PËRMBLEDHJE</h2>

        <div>
            Fatura sot:
            <strong>${todayInvoices.length}</strong>
        </div>

        <div>
            CASH:
            <strong>${money(cash)}</strong>
        </div>

        <div>
            CARD:
            <strong>${money(card)}</strong>
        </div>

        <div>
            TOTAL:
            <strong>${money(total)}</strong>
        </div>
    `;

    openMessageModal(text);
}

/* =========================================================
   ADMIN
========================================================= */

function openAdmin() {

    const session = getSession();

    if (!session || session.role !== "admin") {
        toast("Vetëm administratori ka akses.");
        return;
    }

    const users =
        getJSON(USERS_KEY, DEFAULT_USERS);

    const waiterCount =
        users.filter(
            user => user.role === "waiter"
        ).length;

    openMessageModal(`

        <h2>ADMIN</h2>

        <p>
            Kamarierë:
            <strong>${waiterCount}</strong>
        </p>

        <button
            onclick="addWaiter()"
        >
            + SHTO KAMARIER
        </button>

    `);
}

function addWaiter() {

    const session = getSession();

    if (!session || session.role !== "admin") {
        toast("Nuk ke akses.");
        return;
    }

    const name =
        prompt("Emri i kamarierit:");

    if (!name) return;

    const username =
        prompt("Username:");

    if (!username) return;

    const password =
        prompt("PIN / Fjalëkalimi:");

    if (!password) return;

    const users =
        getJSON(USERS_KEY, DEFAULT_USERS);

    if (
        users.some(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
        )
    ) {
        toast("Ky username ekziston.");
        return;
    }

    users.push({

        id: Date.now(),

        username:
            username.trim(),

        password:
            password.trim(),

        name:
            name.trim(),

        role:
            "waiter"

    });

    setJSON(USERS_KEY, users);

    toast("Kamarieri u shtua.");
}

/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const invoices =
        getJSON(INVOICES_KEY, []);

    const today =
        new Date().toDateString();

    const todayInvoices =
        invoices.filter(
            invoice =>
                new Date(invoice.date)
                    .toDateString() === today
        );

    const sales =
        todayInvoices.reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0
        );

    const salesElement =
        document.getElementById("salesToday");

    if (salesElement) {
        salesElement.textContent =
            money(sales);
    }

    const invoiceElement =
        document.getElementById("invoiceToday");

    if (invoiceElement) {
        invoiceElement.textContent =
            todayInvoices.length;
    }

    const activeTables =
        getTables().filter(
            table =>
                table.items &&
                table.items.length
        ).length;

    const activeElement =
        document.getElementById("activeTables");

    if (activeElement) {
        activeElement.textContent =
            activeTables;
    }
}

/* =========================================================
   MODALS
========================================================= */

function openMessageModal(content) {

    let modal =
        document.getElementById("messageModal");

    if (!modal) {

        modal =
            document.createElement("div");

        modal.id =
            "messageModal";

        modal.style.position =
            "fixed";

        modal.style.inset =
            "0";

        modal.style.background =
            "rgba(0,0,0,.75)";

        modal.style.display =
            "flex";

        modal.style.alignItems =
            "center";

        modal.style.justifyContent =
            "center";

        modal.style.zIndex =
            "99999";

        document.body.appendChild(modal);
    }

    modal.innerHTML = `

        <div style="
            background:#111;
            color:white;
            padding:25px;
            border-radius:18px;
            min-width:300px;
            max-width:90%;
            border:1px solid #26352d;
        ">

            ${content}

            <br>

            <button
                onclick="closeMessageModal()"
            >
                MBYLL
            </button>

        </div>

    `;

    modal.style.display = "flex";
}

function closeMessageModal() {

    const modal =
        document.getElementById("messageModal");

    if (modal) {
        modal.style.display = "none";
    }
}

/* =========================================================
   TOAST
========================================================= */

function toast(message) {

    let box =
        document.getElementById("myBarToast");

    if (!box) {

        box =
            document.createElement("div");

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
            "13px 20px";

        box.style.borderRadius =
            "12px";

        box.style.background =
            "#111";

        box.style.color =
            "#fff";

        box.style.border =
            "1px solid #20b26b";

        box.style.boxShadow =
            "0 15px 40px rgba(0,0,0,.5)";

        document.body.appendChild(box);
    }

    box.textContent =
        message;

    box.style.display =
        "block";

    clearTimeout(
        window.myBarToastTimer
    );

    window.myBarToastTimer =
        setTimeout(() => {

            box.style.display =
                "none";

        }, 2500);
}

/* =========================================================
   CLOCK
========================================================= */

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

/* =========================================================
   SECURITY / ROLE
========================================================= */

function checkAccess() {

    const session =
        getSession();

    if (!session) {

        if (
            location.pathname.endsWith(
                "index.html"
            )
        ) {
            window.location.href =
                "login.html";
        }

        return null;
    }

    document
        .querySelectorAll(
            "[data-admin], .admin-only"
        )
        .forEach(element => {

            element.style.display =
                session.role === "admin"
                    ? ""
                    : "none";

        });

    return session;
}

/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const search =
        document.getElementById(
            "menuSearch"
        );

    if (!search) return;

    search.addEventListener(
        "input",
        () => {

            const query =
                search.value
                    .trim()
                    .toLowerCase();

            const grid =
                document.getElementById(
                    "menuGrid"
                );

            if (!grid) return;

            const products =
                getProducts();

            const filtered =
                products.filter(
                    product =>
                        product.name
                            .toLowerCase()
                            .includes(query)
                );

            grid.innerHTML =
                filtered.map(product => `

                    <button
                        class="product-card"
                        onclick="addProduct(${product.id})"
                    >

                        <strong>
                            ${escapeHTML(
                                product.name
                            )}
                        </strong>

                        <span>
                            ${money(product.price)}
                        </span>

                    </button>

                `).join("");
        }
    );
}

/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeApp();

        checkAccess();

        renderTables();

        renderCategories();

        renderProducts();

        renderOrder();

        updateDashboard();

        setupSearch();

        updateClock();

        setInterval(
            updateClock,
            1000
        );

        const session =
            getSession();

        const userInfo =
            document.getElementById(
                "userInfo"
            );

        if (userInfo && session) {

            userInfo.textContent =
                session.name +
                " • " +
                (
                    session.role === "admin"
                        ? "ADMIN"
                        : "KAMARIER"
                );
        }

    }
);

/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.login = login;
window.logout = logout;
window.lockApp = lockApp;

window.selectTable = selectTable;

window.newInvoice = newInvoice;

window.renderProducts =
    renderProducts;

window.renderCategories =
    renderCategories;

window.addProduct =
    addProduct;

window.changeQuantity =
    changeQuantity;

window.removeItem =
    removeItem;

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

window.printTaxInvoice =
    printTaxInvoice;

window.openSummary =
    openSummary;

window.openMyInvoices =
    openMyInvoices;

window.openAdmin =
    openAdmin;

window.addWaiter =
    addWaiter;

window.closeMessageModal =
    closeMessageModal;
