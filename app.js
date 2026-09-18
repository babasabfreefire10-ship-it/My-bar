"use strict";

/* =========================================================
   MY BAR — APP.JS
   Stable POS controller
========================================================= */

/* =========================
   STORAGE
========================= */

const USERS_KEY = "MYBAR_USERS_FINAL";
const SESSION_KEY = "MY_BAR_SESSION";
const PRODUCTS_KEY = "MYBAR_PRODUCTS_FINAL";
const TABLES_KEY = "MYBAR_TABLES_FINAL";
const INVOICES_KEY = "MYBAR_INVOICES_FINAL";
const SETTINGS_KEY = "MYBAR_SETTINGS_FINAL";
const STOCK_KEY = "MYBAR_STOCK_FINAL";
const TABLE_COUNT_KEY = "MYBAR_TABLE_COUNT_FINAL";
const SHIFT_KEY = "MYBAR_CURRENT_SHIFT";
const FISCAL_KEY = "MYBAR_FISCAL_FINAL";
const SELECTED_TABLE_KEY = "MYBAR_SELECTED_TABLE";

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

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function toast(message) {
    let box = document.getElementById("myBarToast");

    if (!box) {
        box = document.createElement("div");
        box.id = "myBarToast";

        box.style.position = "fixed";
        box.style.bottom = "25px";
        box.style.left = "50%";
        box.style.transform = "translateX(-50%)";
        box.style.zIndex = "99999";
        box.style.padding = "12px 18px";
        box.style.borderRadius = "10px";
        box.style.background = "#101820";
        box.style.color = "#fff";
        box.style.border = "1px solid #287cff";
        box.style.fontSize = "13px";
        box.style.boxShadow = "0 15px 40px rgba(0,0,0,.45)";

        document.body.appendChild(box);
    }

    box.textContent = message;
    box.style.display = "block";

    clearTimeout(window.myBarToastTimer);

    window.myBarToastTimer = setTimeout(() => {
        box.style.display = "none";
    }, 2200);
}

/* =========================
   SESSION
========================= */

function getCurrentSession() {
    let session = getJSON(SESSION_KEY, null);

    if (!session) {
        session = getJSON("barCurrentUser", null);
    }

    if (!session) {
        return null;
    }

    const username = String(
        session.username || session.user || ""
    ).toLowerCase();

    const role = String(
        session.role || ""
    ).toLowerCase();

    if (
        username === "admin" ||
        role === "admin" ||
        role === "administrator"
    ) {
        return {
            username: "admin",
            user: "admin",
            role: "admin",
            name: "Administrator"
        };
    }

    if (
        role === "waiter" ||
        role === "kamarier"
    ) {
        return {
            username,
            user: username,
            role: "waiter",
            name: session.name || "Kamarier"
        };
    }

    return session;
}

function requireLogin() {
    const user = getCurrentSession();

    if (!user) {
        window.location.href = "login.html";
        return null;
    }

    return user;
}

/* =========================
   INITIALIZATION
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

    if (!localStorage.getItem(SETTINGS_KEY)) {
        setJSON(SETTINGS_KEY, {
            appName: "MY BAR"
        });
    }

    initializeTables();
    initializeStock();
}

function initializeTables() {

    const count = Math.max(
        1,
        Math.min(
            100,
            Number(
                localStorage.getItem(TABLE_COUNT_KEY) || 12
            )
        )
    );

    const existing = getJSON(TABLES_KEY, []);

    const tables = [];

    for (let i = 1; i <= count; i++) {

        const old = existing.find(
            table => Number(table.id) === i
        );

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

function initializeStock() {

    const products = getJSON(
        PRODUCTS_KEY,
        DEFAULT_PRODUCTS
    );

    const stock = getJSON(
        STOCK_KEY,
        {}
    );

    products.forEach(product => {

        if (stock[product.id] === undefined) {
            stock[product.id] = 20;
        }

    });

    setJSON(STOCK_KEY, stock);
}

/* =========================
   TABLES
========================= */

function getTables() {
    return getJSON(TABLES_KEY, []);
}

function saveTables(tables) {
    setJSON(TABLES_KEY, tables);
}

function getSelectedTable() {
    return Number(
        localStorage.getItem(
            SELECTED_TABLE_KEY
        ) || 0
    );
}

function getSelectedTableObject() {

    const id = getSelectedTable();

    return getTables().find(
        table => Number(table.id) === id
    );
}

function selectTable(id) {

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(id)
    );

    renderAll();

    showPage("pos");
}

/* =========================
   STOCK
========================= */

function getStock(productId) {

    const stock = getJSON(
        STOCK_KEY,
        {}
    );

    return Number(
        stock[productId] ?? 0
    );
}

function setStock(productId, value) {

    const stock = getJSON(
        STOCK_KEY,
        {}
    );

    stock[productId] = Math.max(
        0,
        Number(value) || 0
    );

    setJSON(STOCK_KEY, stock);
}

function changeStock(productId, amount) {

    setStock(
        productId,
        getStock(productId) + Number(amount)
    );

    renderAll();
}

/* =========================
   MENU
========================= */

let selectedCategory = "Të gjitha";

function getProducts() {
    return getJSON(
        PRODUCTS_KEY,
        DEFAULT_PRODUCTS
    );
}

function renderCategories() {

    const container =
        document.getElementById("categories");

    if (!container) return;

    const products = getProducts();

    const categories = [
        "Të gjitha",
        ...new Set(
            products.map(product => product.category)
        )
    ];

    container.innerHTML =
        categories.map(category => `
            <button
                class="category ${
                    category === selectedCategory
                        ? "active"
                        : ""
                }"
                onclick="selectCategory('${escapeHTML(category)}')"
            >
                ${escapeHTML(category)}
            </button>
        `).join("");
}

function selectCategory(category) {

    selectedCategory = category;

    renderCategories();
    renderProducts();
}

function renderProducts() {

    const container =
        document.getElementById("products");

    if (!container) return;

    const search =
        document.getElementById("search");

    const query =
        search
            ? search.value.trim().toLowerCase()
            : "";

    const products = getProducts();

    const filtered = products.filter(product => {

        const categoryMatch =
            selectedCategory === "Të gjitha" ||
            product.category === selectedCategory;

        const searchMatch =
            !query ||
            product.name.toLowerCase().includes(query);

        return categoryMatch && searchMatch;
    });

    container.innerHTML =
        filtered.map(product => {

            const stock =
                getStock(product.id);

            return `
                <button
                    class="product"
                    ${stock <= 0 ? "disabled" : ""}
                    onclick="addProduct(${product.id})"
                >
                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <span class="price">
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

    const table =
        getSelectedTableObject();

    if (!table) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    const product =
        getProducts().find(
            item => Number(item.id) === Number(productId)
        );

    if (!product) return;

    const stock =
        getStock(productId);

    if (stock <= 0) {
        toast("Ky produkt nuk ka stok.");
        return;
    }

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

        existing.quantity += 1;

    } else {

        table.items.push({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1
        });
    }

    saveTables(getTables());

    renderAll();

    toast(
        product.name + " u shtua."
    );
}

/* =========================
   BILL
========================= */

function getBillTotal(table) {

    if (!table) return 0;

    if (!Array.isArray(table.items)) {
        return 0;
    }

    return table.items.reduce(
        (total, item) => {

            const price =
                Number(item.price || 0);

            const quantity =
                Number(item.quantity || 0);

            return total + (price * quantity);
        },
        0
    );
}

function changeQuantity(index, amount) {

    const tables = getTables();

    const table = tables.find(
        item =>
            Number(item.id) ===
            getSelectedTable()
    );

    if (!table) return;

    if (!Array.isArray(table.items)) {
        table.items = [];
    }

    const item = table.items[index];

    if (!item) return;

    const next =
        Number(item.quantity) +
        Number(amount);

    if (next <= 0) {

        table.items.splice(index, 1);

    } else {

        const stock =
            getStock(item.productId);

        if (next > stock) {
            toast("Nuk ka mjaftueshëm stok.");
            return;
        }

        item.quantity = next;
    }

    saveTables(tables);

    renderAll();
}

function removeItem(index) {

    const tables = getTables();

    const table = tables.find(
        item =>
            Number(item.id) ===
            getSelectedTable()
    );

    if (!table) return;

    if (!Array.isArray(table.items)) {
        table.items = [];
    }

    table.items.splice(index, 1);

    saveTables(tables);

    renderAll();
}

/* =========================
   PAYMENT
========================= */

function payCurrent(method) {

    const table = getSelectedTableObject();

    if (!table) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    if (
        !Array.isArray(table.items) ||
        table.items.length === 0
    ) {
        toast("Porosia është bosh.");
        return;
    }

    /*
       IMPORTANT:
       Total is calculated directly from the
       currently selected table BEFORE payment.
    */
    const total = getBillTotal(table);

    if (total <= 0) {
        toast("Totali i faturës është 0 L.");
        return;
    }

    const modal =
        document.getElementById("paymentModal");

    const text =
        document.getElementById("paymentText");

    const totalElement =
        document.getElementById("paymentTotal");

    const amountElement =
        document.getElementById("paymentAmount");

    const confirmButton =
        document.getElementById("paymentConfirm");

    /*
       Support different modal IDs so the
       total doesn't remain 0 L.
    */

    if (text) {
        text.textContent =
            "Pagesë " +
            String(method).toUpperCase() +
            " • " +
            money(total);
    }

    if (totalElement) {
        totalElement.textContent =
            money(total);
    }

    if (amountElement) {
        amountElement.textContent =
            money(total);
    }

    window.MYBAR_CURRENT_PAYMENT_TOTAL = total;
    window.MYBAR_CURRENT_PAYMENT_METHOD = method;

    if (confirmButton) {

        confirmButton.onclick = function () {
            completePayment(method);
        };
    }

    if (modal) {

        modal.classList.add("show");

    } else {

        completePayment(method);
    }
}

function completePayment(method) {

    const tables = getTables();

    const table =
        tables.find(
            item =>
                Number(item.id) ===
                getSelectedTable()
        );

    if (!table) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    if (
        !Array.isArray(table.items) ||
        table.items.length === 0
    ) {

        closeModal("paymentModal");

        toast("Porosia është bosh.");

        return;
    }

    /* =========================
       STOCK CHECK
    ========================= */

    for (const item of table.items) {

        const quantity =
            Number(item.quantity || 0);

        if (
            quantity >
            getStock(item.productId)
        ) {

            toast(
                "Stok i pamjaftueshëm: " +
                item.name
            );

            return;
        }
    }

    /*
       IMPORTANT:
       Calculate the total BEFORE clearing
       the table.
    */
    const total =
        table.items.reduce(
            (sum, item) => {

                const price =
                    Number(item.price || 0);

                const quantity =
                    Number(item.quantity || 0);

                return sum + (price * quantity);

            },
            0
        );

    if (total <= 0) {
        toast("Totali i faturës është 0 L.");
        return;
    }

    /* =========================
       STOCK DECREASE
    ========================= */

    table.items.forEach(item => {

        setStock(
            item.productId,
            getStock(item.productId) -
            Number(item.quantity || 0)
        );

    });

    const user =
        getCurrentSession();

    /* =========================
       CREATE INVOICE
    ========================= */

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
            Number(table.id),

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

        payment:
            method,

        paymentMethod:
            method,

        waiterName:
            user?.name ||
            "Kamarier",

        userName:
            user?.name ||
            "Kamarier",

        username:
            user?.username ||
            "",

        fiscal: {
            status: "draft",
            fiscalized: false,
            printed: false
        }
    };

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    invoices.push(invoice);

    setJSON(
        INVOICES_KEY,
        invoices
    );

    /*
       Clear table ONLY after invoice
       has been successfully created.
    */
    table.items = [];

    saveTables(tables);

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    closeModal("paymentModal");

    renderAll();

    toast(
        "Pagesa u krye • " +
        money(total)
    );
}

/* =========================
   TRANSFER
========================= */

function openTransfer() {

    const table =
        getSelectedTableObject();

    if (
        !table ||
        !Array.isArray(table.items) ||
        !table.items.length
    ) {

        toast(
            "Nuk ka faturë për transferim."
        );

        return;
    }

    const modal =
        document.getElementById(
            "transferModal"
        );

    const select =
        document.getElementById(
            "transferSelect"
        );

    if (!modal || !select) return;

    const tables =
        getTables();

    select.innerHTML =
        `<option value="">
            Zgjidh tavolinën
        </option>` +
        tables
            .filter(
                item =>
                    Number(item.id) !==
                    Number(table.id)
            )
            .map(item => `
                <option value="${item.id}">
                    ${escapeHTML(item.name)}
                    ${
                        item.items &&
                        item.items.length
                            ? " • AKTIVE"
                            : ""
                    }
                </option>
            `)
            .join("");

    modal.classList.add("show");
}

function confirmTransfer() {

    const select =
        document.getElementById(
            "transferSelect"
        );

    if (!select) return;

    const targetId =
        Number(select.value);

    if (!targetId) {
        toast("Zgjidh tavolinën.");
        return;
    }

    const tables =
        getTables();

    const from =
        tables.find(
            table =>
                Number(table.id) ===
                getSelectedTable()
        );

    const to =
        tables.find(
            table =>
                Number(table.id) ===
                targetId
        );

    if (!from || !to) return;

    if (!Array.isArray(from.items)) {
        from.items = [];
    }

    if (!Array.isArray(to.items)) {
        to.items = [];
    }

    if (to.items.length) {

        const accepted =
            confirm(
                "Tavolina ka një porosi. " +
                "Dëshiron t'i bashkosh?"
            );

        if (!accepted) return;
    }

    from.items.forEach(item => {

        const existing =
            to.items.find(
                x =>
                    Number(x.productId) ===
                    Number(item.productId)
            );

        if (existing) {

            existing.quantity +=
                Number(item.quantity);

        } else {

            to.items.push(
                JSON.parse(
                    JSON.stringify(item)
                )
            );
        }
    });

    from.items = [];

    saveTables(tables);

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(targetId)
    );

    closeModal("transferModal");

    renderAll();

    toast(
        "Fatura u transferua në " +
        to.name
    );
}

/* =========================
   CLOSE TABLE
========================= */

function openCloseTable() {

    const table =
        getSelectedTableObject();

    if (!table) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    if (
        !Array.isArray(table.items) ||
        table.items.length === 0
    ) {

        toast("Tavolina është bosh.");

        return;
    }

    /*
       Calculate the real current table total.
    */
    const total =
        getBillTotal(table);

    if (total <= 0) {
        toast("Totali i tavolinës është 0 L.");
        return;
    }

    const text =
        document.getElementById(
            "closeTableText"
        );

    const totalElement =
        document.getElementById(
            "closeTableTotal"
        );

    if (text) {

        text.textContent =
            table.name +
            " • " +
            money(total);
    }

    if (totalElement) {

        totalElement.textContent =
            money(total);
    }

    window.MYBAR_CURRENT_CLOSE_TOTAL =
        total;

    openModal("closeTableModal");
}

function confirmCloseTable() {

    const table =
        getSelectedTableObject();

    if (!table) return;

    if (
        !Array.isArray(table.items) ||
        table.items.length === 0
    ) {

        closeModal("closeTableModal");

        toast("Tavolina është bosh.");

        return;
    }

    const total =
        getBillTotal(table);

    if (total <= 0) {

        toast(
            "Totali i tavolinës është 0 L."
        );

        return;
    }

    const tables =
        getTables();

    const index =
        tables.findIndex(
            item =>
                Number(item.id) ===
                Number(table.id)
        );

    if (index < 0) return;

    /*
       MBYLL TAVOLINË is intentionally separate
       from payment. It clears the open table.
    */
    tables[index].items = [];

    saveTables(tables);

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    closeModal("closeTableModal");

    renderAll();

    toast(
        table.name +
        " u mbyll • " +
        money(total)
    );
}

/* =========================
   INVOICES
========================= */

function getInvoices() {
    return getJSON(
        INVOICES_KEY,
        []
    );
}

function getTodayInvoices() {

    const today =
        new Date().toDateString();

    return getInvoices().filter(
        invoice =>
            new Date(
                invoice.date ||
                invoice.createdAt
            ).toDateString() === today
    );
}

function renderInvoices() {

    const list =
        document.getElementById(
            "invoiceList"
        );

    if (!list) return;

    const user =
        getCurrentSession();

    let invoices =
        getInvoices();

    if (
        user &&
        user.role !== "admin"
    ) {

        invoices =
            invoices.filter(
                invoice =>
                    invoice.username ===
                    user.username
            );
    }

    invoices =
        [...invoices].reverse();

    const summary =
        document.getElementById(
            "invoiceSummary"
        );

    if (summary) {

        summary.textContent =
            invoices.length +
            " faturë";
    }

    if (!invoices.length) {

        list.innerHTML =
            `<div class="row">
                <small>
                    Nuk ka fatura.
                </small>
            </div>`;

        return;
    }

    list.innerHTML =
        invoices.map(invoice => {

            return `
                <div class="row">

                    <div>
                        <strong>
                            ${escapeHTML(
                                invoice.number
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                invoice.tableName
                            )}
                            •
                            ${new Date(
                                invoice.date
                            ).toLocaleString(
                                "sq-AL"
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
            `;

        }).join("");
}

/* =========================
   CASH
========================= */

function renderCash() {

    const invoices =
        getTodayInvoices();

    const sales =
        invoices.reduce(
            (sum, invoice) =>
                sum +
                Number(invoice.total || 0),
            0
        );

    const cash =
        invoices
            .filter(
                invoice =>
                    invoice.payment === "cash"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(invoice.total || 0),
                0
            );

    const card =
        invoices
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

    const salesEl =
        document.getElementById(
            "salesToday"
        );

    const cashEl =
        document.getElementById(
            "cashToday"
        );

    const cardEl =
        document.getElementById(
            "cardToday"
        );

    const countEl =
        document.getElementById(
            "invoiceCount"
        );

    if (salesEl) {
        salesEl.textContent =
            money(sales);
    }

    if (cashEl) {
        cashEl.textContent =
            money(cash);
    }

    if (cardEl) {
        cardEl.textContent =
            money(card);
    }

    if (countEl) {
        countEl.textContent =
            invoices.length;
    }

    const list =
        document.getElementById(
            "cashList"
        );

    if (!list) return;

    if (!invoices.length) {

        list.innerHTML =
            `<div class="row">
                <small>
                    Nuk ka pagesa sot.
                </small>
            </div>`;

        return;
    }

    list.innerHTML =
        [...invoices]
            .reverse()
            .map(invoice => `
                <div class="row">

                    <div>
                        <strong>
                            ${escapeHTML(
                                invoice.number
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                invoice.waiterName ||
                                "Kamarier"
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

/* =========================
   SHIFT
========================= */

function getShift() {
    return getJSON(
        SHIFT_KEY,
        null
    );
}

function renderShift() {

    const shift =
        getShift();

    const status =
        shift
            ? "HAPUR"
            : "MBYLLUR";

    const status1 =
        document.getElementById(
            "shiftStatus"
        );

    const status2 =
        document.getElementById(
            "shiftStatusBig"
        );

    if (status1) {
        status1.textContent =
            status;
    }

    if (status2) {
        status2.textContent =
            status;
    }

    const invoices =
        shift
            ? getInvoices().filter(
                invoice =>
                    Number(
                        invoice.createdAt ||
                        invoice.id
                    ) >=
                    Number(
                        shift.startedAt
                    )
            )
            : [];

    const sales =
        invoices.reduce(
            (sum, invoice) =>
                sum +
                Number(invoice.total || 0),
            0
        );

    const cash =
        invoices
            .filter(
                invoice =>
                    invoice.payment === "cash"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(invoice.total || 0),
                0
            );

    const card =
        invoices
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

    const salesEl =
        document.getElementById(
            "shiftSales"
        );

    const cashEl =
        document.getElementById(
            "shiftCash"
        );

    const cardEl =
        document.getElementById(
            "shiftCard"
        );

    if (salesEl) {
        salesEl.textContent =
            money(sales);
    }

    if (cashEl) {
        cashEl.textContent =
            money(cash);
    }

    if (cardEl) {
        cardEl.textContent =
            money(card);
    }
}

function toggleShift() {

    const shift =
        getShift();

    if (!shift) {

        const title =
            document.getElementById(
                "shiftModalTitle"
            );

        const text =
            document.getElementById(
                "shiftModalText"
            );

        const input =
            document.getElementById(
                "shiftCashInput"
            );

        if (title) {
            title.textContent =
                "Hap turnin";
        }

        if (text) {
            text.textContent =
                "Vendos cash-in fillestar të arkës.";
        }

        if (input) {
            input.value = "";
        }

        openModal("shiftModal");

        return;
    }

    const openTables =
        getTables().some(
            table =>
                table.items &&
                table.items.length > 0
        );

    if (openTables) {

        toast(
            "Mbyll fillimisht tavolinat aktive."
        );

        return;
    }

    const title =
        document.getElementById(
            "shiftModalTitle"
        );

    const text =
        document.getElementById(
            "shiftModalText"
        );

    const input =
        document.getElementById(
            "shiftCashInput"
        );

    if (title) {
        title.textContent =
            "Mbyll turnin";
    }

    if (text) {
        text.textContent =
            "Konfirmo mbylljen e turnit.";
    }

    if (input) {
        input.value = "";
        input.placeholder =
            "Cash i numëruar";
    }

    openModal("shiftModal");
}

function confirmShift() {

    const current =
        getShift();

    const input =
        document.getElementById(
            "shiftCashInput"
        );

    const amount =
        Number(
            input?.value || 0
        );

    if (!current) {

        const user =
            getCurrentSession();

        setJSON(
            SHIFT_KEY,
            {
                startedAt: Date.now(),
                waiter:
                    user?.name ||
                    "Kamarier",
                openingCash:
                    amount
            }
        );

        closeModal("shiftModal");

        renderShift();

        toast(
            "Turni u hap."
        );

        return;
    }

    localStorage.removeItem(
        SHIFT_KEY
    );

    closeModal("shiftModal");

    renderShift();

    toast(
        "Turni u mbyll."
    );
}

/* =========================
   FISCAL
========================= */

function getFiscal() {
    return getJSON(
        FISCAL_KEY,
        {}
    );
}

function saveFiscal(data) {
    setJSON(
        FISCAL_KEY,
        data
    );
}

function renderFiscal() {

    const list =
        document.getElementById(
            "fiscalList"
        );

    if (!list) return;

    const invoices =
        [...getInvoices()]
            .reverse()
            .slice(0, 30);

    const fiscal =
        getFiscal();

    if (!invoices.length) {

        list.innerHTML =
            `<div class="row">
                <small>
                    Nuk ka fatura.
                </small>
            </div>`;

        return;
    }

    list.innerHTML =
        invoices.map(invoice => {

            const state =
                fiscal[invoice.id]?.status ||
                invoice.fiscal?.status ||
                "DRAFT";

            return `
                <div class="row">

                    <div>
                        <strong>
                            ${escapeHTML(
                                invoice.number
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                invoice.tableName
                            )}
                            •
                            ${money(
                                invoice.total
                            )}
                            •
                            ${state}
                        </small>
                    </div>

                    <div
                        style="
                            display:flex;
                            gap:5px;
                            flex-wrap:wrap
                        "
                    >

                        <button
                            class="action"
                            onclick="fiscalize(${invoice.id})"
                        >
                            FATURO
                        </button>

                        <button
                            class="action blue"
                            onclick="printInvoice(${invoice.id})"
                        >
                            PRINT
                        </button>

                    </div>

                </div>
            `;
        }).join("");
}

function fiscalize(invoiceId) {

    const fiscal =
        getFiscal();

    fiscal[invoiceId] = {
        status:
            "GATI PER FISKALIZIM",
        updatedAt:
            Date.now()
    };

    saveFiscal(fiscal);

    renderFiscal();

    toast(
        "Fatura u përgatit për fiskalizim."
    );
}

function printInvoice(invoiceId) {

    const invoice =
        getInvoices().find(
            item =>
                Number(item.id) ===
                Number(invoiceId)
        );

    if (!invoice) return;

    const printArea =
        document.getElementById(
            "printArea"
        );

    if (!printArea) return;

    printArea.innerHTML = `
        <h2>MY BAR</h2>

        <p>
            ${escapeHTML(
                invoice.number
            )}
        </p>

        <p>
            ${escapeHTML(
                invoice.tableName
            )}
        </p>

        <p>
            ${new Date(
                invoice.date
            ).toLocaleString("sq-AL")}
        </p>

        <hr>

        ${invoice.items.map(item => `
            <p>
                ${escapeHTML(item.name)}
                × ${item.quantity}
                —
                ${money(
                    Number(item.price) *
                    Number(item.quantity)
                )}
            </p>
        `).join("")}

        <hr>

        <h3>
            TOTAL:
            ${money(invoice.total)}
        </h3>

        <p>
            Pagesa:
            ${escapeHTML(
                invoice.payment ||
                "cash"
            )}
        </p>
    `;

    window.print();
}

/* =========================
   TABLES PAGE
========================= */

function renderTableCards() {

    const container =
        document.getElementById(
            "tableCards"
        );

    if (!container) return;

    const tables =
        getTables();

    const active =
        tables.filter(
            table =>
                table.items &&
                table.items.length
        ).length;

    const summary =
        document.getElementById(
            "tablesSummary"
        );

    if (summary) {

        summary.textContent =
            active +
            " aktive • " +
            (tables.length - active) +
            " të lira";
    }

    container.innerHTML =
        tables.map(table => {

            const open =
                table.items &&
                table.items.length;

            const total =
                getBillTotal(table);

            return `
                <div
                    class="stat"
                    onclick="selectTable(${table.id})"
                    style="cursor:pointer"
                >

                    <small>
                        ${escapeHTML(
                            table.name
                        )}
                    </small>

                    <strong>
                        ${
                            open
                                ? money(total)
                                : "E lirë"
                        }
                    </strong>

                    <button
                        class="action ${
                            open ? "blue" : ""
                        }"
                        onclick="
                            event.stopPropagation();
                            selectTable(${table.id})
                        "
                        style="margin-top:12px"
                    >
                        HAP
                    </button>

                </div>
            `;
        }).join("");
}

/* =========================
   NAVIGATION
========================= */

function showPage(page, button) {

    const welcome =
        document.getElementById(
            "welcome"
        );

    const content =
        document.getElementById(
            "content"
        );

    if (welcome) {
        welcome.style.display =
            "none";
    }

    if (content) {
        content.classList.add(
            "show"
        );
    }

    document.querySelectorAll(
        ".page"
    ).forEach(element => {
        element.classList.remove(
            "active"
        );
    });

    const target =
        document.getElementById(
            "page-" + page
        );

    if (target) {
        target.classList.add(
            "active"
        );
    }

    document.querySelectorAll(
        ".top-btn"
    ).forEach(element => {
        element.classList.remove(
            "active"
        );
    });

    if (button) {

        button.classList.add(
            "active"
        );

    } else {

        const names = {
            pos: "FATURË E RE",
            tables: "TAVOLINAT",
            invoices: "FATURAT",
            cash: "ARKA",
            shift: "TURNI",
            fiscal: "FISKAL"
        };

        document.querySelectorAll(
            ".top-btn"
        ).forEach(element => {

            if (
                element.textContent.trim() ===
                names[page]
            ) {

                element.classList.add(
                    "active"
                );
            }

        });
    }

    if (page === "tables") {
        renderTableCards();
    }

    if (page === "invoices") {
        renderInvoices();
    }

    if (page === "cash") {
        renderCash();
    }

    if (page === "shift") {
        renderShift();
    }

    if (page === "fiscal") {
        renderFiscal();
    }
}

function newBill() {

    const welcome =
        document.getElementById(
            "welcome"
        );

    const content =
        document.getElementById(
            "content"
        );

    if (welcome) {
        welcome.style.display =
            "none";
    }

    if (content) {
        content.classList.add(
            "show"
        );
    }

    showPage("pos");

    const current =
        getSelectedTable();

    if (current) {
        renderAll();
        return;
    }

    const free =
        getTables().find(
            table =>
                !table.items ||
                !table.items.length
        );

    if (free) {

        selectTable(
            free.id
        );

    } else {

        toast(
            "Të gjitha tavolinat janë aktive."
        );
    }
}

/* =========================
   MODALS
========================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.add(
            "show"
        );
    }
}

function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.classList.remove(
            "show"
        );
    }
}

/* =========================
   LOCK
========================= */

function lockScreen() {

    const input =
        document.getElementById(
            "unlockPassword"
        );

    if (input) {
        input.value = "";
    }

    openModal("lockModal");
}

function unlockScreen() {

    const user =
        getCurrentSession();

    const password =
        document.getElementById(
            "unlockPassword"
        )?.value || "";

    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    const current =
        users.find(
            item =>
                String(item.username)
                    .toLowerCase() ===
                String(user?.username)
                    .toLowerCase()
        );

    if (
        current &&
        String(current.password) ===
        String(password)
    ) {

        closeModal(
            "lockModal"
        );

        toast(
            "Sistemi u zhbllokua."
        );

    } else {

        toast(
            "Fjalëkalim i gabuar."
        );
    }
}

/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem(
        SESSION_KEY
    );

    localStorage.removeItem(
        "barCurrentUser"
    );

    window.location.href =
        "login.html";
}

/* =========================
   HEADER
========================= */

function renderHeader() {

    const user =
        getCurrentSession();

    if (!user) return;

    const name =
        document.getElementById(
            "userName"
        );

    const role =
        document.getElementById(
            "userRole"
        );

    if (name) {
        name.textContent =
            user.name ||
            user.username ||
            "Kamarier";
    }

    if (role) {
        role.textContent =
            user.role === "admin"
                ? "ADMIN"
                : "KAMARIER";
    }
}

/* =========================
   RENDER ALL
========================= */

function renderAll() {

    renderHeader();

    renderCategories();
    renderProducts();

    renderPOSTables();
    renderBill();

    renderTableCards();
    renderInvoices();
    renderCash();
    renderShift();
    renderFiscal();
}

/* =========================
   POS TABLES
========================= */

function renderPOSTables() {

    const container =
        document.getElementById(
            "posTables"
        );

    if (!container) return;

    const tables =
        getTables();

    container.innerHTML =
        tables.map(table => {

            const active =
                table.items &&
                table.items.length > 0;

            const selected =
                Number(table.id) ===
                getSelectedTable();

            return `
                <button
                    class="table-btn
                    ${active ? "open" : ""}
                    ${selected ? "selected" : ""}"
                    onclick="selectTable(${table.id})"
                >

                    <strong>
                        ${escapeHTML(
                            table.name
                        )}
                    </strong>

                    <small>
                        ${
                            active
                                ? money(
                                    getBillTotal(
                                        table
                                    )
                                  )
                                : "E lirë"
                        }
                    </small>

                </button>
            `;
        }).join("");
}

/* =========================
   CLOCK
========================= */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );

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
   SEARCH
========================= */

function setupSearch() {

    const search =
        document.getElementById(
            "search"
        );

    if (!search) return;

    search.addEventListener(
        "input",
        renderProducts
    );
}

/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const user =
            requireLogin();

        if (!user) return;

        initializeApp();

        renderAll();

        setupSearch();

        updateClock();

        setInterval(
            updateClock,
            1000
        );

        console.log(
            "MY BAR app.js loaded successfully."
        );
    }
);

/* =========================
   GLOBAL FUNCTIONS
========================= */

window.showPage = showPage;
window.newBill = newBill;

window.selectTable = selectTable;
window.selectCategory = selectCategory;
window.addProduct = addProduct;

window.changeQuantity =
    changeQuantity;

window.removeItem =
    removeItem;

window.payCurrent =
    payCurrent;

window.completePayment =
    completePayment;

window.openTransfer =
    openTransfer;

window.confirmTransfer =
    confirmTransfer;

window.openCloseTable =
    openCloseTable;

window.confirmCloseTable =
    confirmCloseTable;

window.toggleShift =
    toggleShift;

window.confirmShift =
    confirmShift;

window.fiscalize =
    fiscalize;

window.printInvoice =
    printInvoice;

window.openModal =
    openModal;

window.closeModal =
    closeModal;

window.lockScreen =
    lockScreen;

window.unlockScreen =
    unlockScreen;

window.logout =
    logout;

window.changeStock =
    changeStock;
