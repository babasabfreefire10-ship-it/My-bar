/* =========================================================
   BAR LULISHTJA
   APP.JS V6 PRO
   MENU + STOCK + ORDERS + INVOICES + ADMIN + REPORTS
   ========================================================= */

const USERS_KEY = "barUsersV3";
const PRODUCTS_KEY = "barProductsV3";
const INVOICES_KEY = "barInvoicesV3";
const APP_NAME_KEY = "barAppNameV3";
const TABLE_COUNT_KEY = "barTableCountV3";
const TABLES_KEY = "barTablesV4";

const STOCK_KEY = "barInventoryV1";
const MENU_VERSION_KEY = "barMenuVersionV1";
const MENU_VERSION = "2026-09-PRO-1";

let selectedTableNumber = null;
let selectedCategory = "Të gjitha";

/* =========================================================
   DEFAULT USERS
   ========================================================= */

const DEFAULT_USERS = [
    {
        id: "admin-1",
        username: "admin",
        password: "1234",
        role: "admin",
        name: "Administrator"
    },
    {
        id: "waiter-1",
        username: "kamarier1",
        password: "1234",
        role: "waiter",
        name: "Kamarier 1"
    }
];

/* =========================================================
   COMPLETE MENU
   ========================================================= */

const DEFAULT_PRODUCTS = [

    /* ================= KAFE ================= */

    {id:"coffee-1", category:"Kafe", name:"Espresso", price:100},
    {id:"coffee-2", category:"Kafe", name:"Espresso Dopio", price:150},
    {id:"coffee-3", category:"Kafe", name:"Macchiato", price:120},
    {id:"coffee-4", category:"Kafe", name:"Macchiato Dopio", price:160},
    {id:"coffee-5", category:"Kafe", name:"Cappuccino", price:180},
    {id:"coffee-6", category:"Kafe", name:"Americano", price:150},
    {id:"coffee-7", category:"Kafe", name:"Latte", price:200},
    {id:"coffee-8", category:"Kafe", name:"Latte Macchiato", price:220},
    {id:"coffee-9", category:"Kafe", name:"Frappe", price:200},
    {id:"coffee-10", category:"Kafe", name:"Kafe Turke", price:100},
    {id:"coffee-11", category:"Kafe", name:"Decaf", price:150},
    {id:"coffee-12", category:"Kafe", name:"Hot Chocolate", price:220},

    /* ================= PIJE FRESKUESE ================= */

    {id:"soft-1", category:"Pije Freskuese", name:"Coca Cola", price:150},
    {id:"soft-2", category:"Pije Freskuese", name:"Coca Cola Zero", price:150},
    {id:"soft-3", category:"Pije Freskuese", name:"Fanta", price:150},
    {id:"soft-4", category:"Pije Freskuese", name:"Sprite", price:150},
    {id:"soft-5", category:"Pije Freskuese", name:"Schweppes", price:150},
    {id:"soft-6", category:"Pije Freskuese", name:"Ice Tea", price:180},
    {id:"soft-7", category:"Pije Freskuese", name:"Bravo", price:180},
    {id:"soft-8", category:"Pije Freskuese", name:"Amita", price:180},
    {id:"soft-9", category:"Pije Freskuese", name:"Lëng Portokalli", price:180},
    {id:"soft-10", category:"Pije Freskuese", name:"Limonatë", price:200},
    {id:"soft-11", category:"Pije Freskuese", name:"Fresh Portokalli", price:300},
    {id:"soft-12", category:"Pije Freskuese", name:"Red Bull", price:250},

    /* ================= UJE ================= */

    {id:"water-1", category:"Ujë", name:"Ujë Natyral 0.5L", price:100},
    {id:"water-2", category:"Ujë", name:"Ujë Natyral 0.75L", price:150},
    {id:"water-3", category:"Ujë", name:"Ujë Gazuar", price:150},
    {id:"water-4", category:"Ujë", name:"Ujë Premium", price:250},

    /* ================= BIRRA ================= */

    {id:"beer-1", category:"Birra", name:"Birrë Tirana", price:200},
    {id:"beer-2", category:"Birra", name:"Birrë Korça", price:200},
    {id:"beer-3", category:"Birra", name:"Birrë Peja", price:250},
    {id:"beer-4", category:"Birra", name:"Heineken", price:300},
    {id:"beer-5", category:"Birra", name:"Corona", price:400},
    {id:"beer-6", category:"Birra", name:"Stella Artois", price:350},
    {id:"beer-7", category:"Birra", name:"Peroni", price:350},
    {id:"beer-8", category:"Birra", name:"Budweiser", price:350},
    {id:"beer-9", category:"Birra", name:"Erdinger", price:450},
    {id:"beer-10", category:"Birra", name:"Birrë Pa Alkool", price:250},

    /* ================= WHISKY ================= */

    {id:"whisky-1", category:"Whisky", name:"Johnnie Walker Red", price:400},
    {id:"whisky-2", category:"Whisky", name:"Johnnie Walker Black", price:600},
    {id:"whisky-3", category:"Whisky", name:"Jack Daniel's", price:500},
    {id:"whisky-4", category:"Whisky", name:"Jameson", price:500},
    {id:"whisky-5", category:"Whisky", name:"Chivas Regal 12", price:600},
    {id:"whisky-6", category:"Whisky", name:"Chivas Regal 18", price:1000},
    {id:"whisky-7", category:"Whisky", name:"J&B", price:400},
    {id:"whisky-8", category:"Whisky", name:"Ballantine's", price:400},
    {id:"whisky-9", category:"Whisky", name:"Grant's", price:400},
    {id:"whisky-10", category:"Whisky", name:"Glenfiddich", price:700},

    /* ================= GIN ================= */

    {id:"gin-1", category:"Gin", name:"Gordon's Gin", price:400},
    {id:"gin-2", category:"Gin", name:"Bombay Sapphire", price:500},
    {id:"gin-3", category:"Gin", name:"Tanqueray", price:550},
    {id:"gin-4", category:"Gin", name:"Tanqueray Ten", price:700},
    {id:"gin-5", category:"Gin", name:"Hendrick's", price:700},
    {id:"gin-6", category:"Gin", name:"Gin Mare", price:750},
    {id:"gin-7", category:"Gin", name:"Monkey 47", price:900},

    /* ================= VODKA ================= */

    {id:"vodka-1", category:"Vodka", name:"Absolut", price:400},
    {id:"vodka-2", category:"Vodka", name:"Smirnoff", price:400},
    {id:"vodka-3", category:"Vodka", name:"Grey Goose", price:800},
    {id:"vodka-4", category:"Vodka", name:"Belvedere", price:800},
    {id:"vodka-5", category:"Vodka", name:"Beluga", price:900},

    /* ================= RUM ================= */

    {id:"rum-1", category:"Rum", name:"Bacardi", price:400},
    {id:"rum-2", category:"Rum", name:"Havana Club", price:400},
    {id:"rum-3", category:"Rum", name:"Captain Morgan", price:400},
    {id:"rum-4", category:"Rum", name:"Malibu", price:400},

    /* ================= TEQUILA ================= */

    {id:"tequila-1", category:"Tequila", name:"Jose Cuervo", price:450},
    {id:"tequila-2", category:"Tequila", name:"Olmeca", price:450},
    {id:"tequila-3", category:"Tequila", name:"Patrón", price:900},

    /* ================= LIQUEUR ================= */

    {id:"liq-1", category:"Liqueur & Amaro", name:"Jägermeister", price:400},
    {id:"liq-2", category:"Liqueur & Amaro", name:"Baileys", price:400},
    {id:"liq-3", category:"Liqueur & Amaro", name:"Disaronno", price:450},
    {id:"liq-4", category:"Liqueur & Amaro", name:"Kahlúa", price:450},
    {id:"liq-5", category:"Liqueur & Amaro", name:"Campari", price:350},
    {id:"liq-6", category:"Liqueur & Amaro", name:"Aperol", price:350},
    {id:"liq-7", category:"Liqueur & Amaro", name:"Martini", price:350},
    {id:"liq-8", category:"Liqueur & Amaro", name:"Montenegro", price:400},
    {id:"liq-9", category:"Liqueur & Amaro", name:"Fernet Branca", price:400},
    {id:"liq-10", category:"Liqueur & Amaro", name:"Amaro del Capo", price:400},
    {id:"liq-11", category:"Liqueur & Amaro", name:"Sambuca", price:400},

    /* ================= VERE ================= */

    {id:"wine-1", category:"Verë", name:"Verë e Kuqe - Gotë", price:300},
    {id:"wine-2", category:"Verë", name:"Verë e Bardhë - Gotë", price:300},
    {id:"wine-3", category:"Verë", name:"Verë Rosé - Gotë", price:300},
    {id:"wine-4", category:"Verë", name:"Verë Shtëpie - Shishe", price:1200},
    {id:"wine-5", category:"Verë", name:"Verë e Kuqe Premium", price:1800},
    {id:"wine-6", category:"Verë", name:"Verë e Bardhë Premium", price:1800},
    {id:"wine-7", category:"Verë", name:"Rosé Premium", price:1800},
    {id:"wine-8", category:"Verë", name:"Prosecco", price:1800},

    /* ================= COCKTAILS ================= */

    {id:"cocktail-1", category:"Cocktails", name:"Mojito", price:600},
    {id:"cocktail-2", category:"Cocktails", name:"Margarita", price:700},
    {id:"cocktail-3", category:"Cocktails", name:"Aperol Spritz", price:650},
    {id:"cocktail-4", category:"Cocktails", name:"Campari Spritz", price:650},
    {id:"cocktail-5", category:"Cocktails", name:"Hugo Spritz", price:650},
    {id:"cocktail-6", category:"Cocktails", name:"Negroni", price:700},
    {id:"cocktail-7", category:"Cocktails", name:"Cosmopolitan", price:700},
    {id:"cocktail-8", category:"Cocktails", name:"Moscow Mule", price:700},
    {id:"cocktail-9", category:"Cocktails", name:"Piña Colada", price:700},
    {id:"cocktail-10", category:"Cocktails", name:"Daiquiri", price:650},
    {id:"cocktail-11", category:"Cocktails", name:"Mai Tai", price:750},
    {id:"cocktail-12", category:"Cocktails", name:"Pornstar Martini", price:800},
    {id:"cocktail-13", category:"Cocktails", name:"Espresso Martini", price:750},
    {id:"cocktail-14", category:"Cocktails", name:"Whiskey Sour", price:700},
    {id:"cocktail-15", category:"Cocktails", name:"Amaretto Sour", price:700},
    {id:"cocktail-16", category:"Cocktails", name:"Gin Basil Smash", price:750},
    {id:"cocktail-17", category:"Cocktails", name:"Long Island Iced Tea", price:800},
    {id:"cocktail-18", category:"Cocktails", name:"Sex on the Beach", price:700},
    {id:"cocktail-19", category:"Cocktails", name:"Tequila Sunrise", price:650},
    {id:"cocktail-20", category:"Cocktails", name:"Bloody Mary", price:700},
    {id:"cocktail-21", category:"Cocktails", name:"Old Fashioned", price:750},

    /* ================= LONG DRINKS ================= */

    {id:"long-1", category:"Long Drinks", name:"Gin Tonic", price:600},
    {id:"long-2", category:"Long Drinks", name:"Gin Lemon", price:600},
    {id:"long-3", category:"Long Drinks", name:"Vodka Tonic", price:550},
    {id:"long-4", category:"Long Drinks", name:"Vodka Lemon", price:550},
    {id:"long-5", category:"Long Drinks", name:"Vodka Red Bull", price:650},
    {id:"long-6", category:"Long Drinks", name:"Whisky Cola", price:550},
    {id:"long-7", category:"Long Drinks", name:"Jack Daniel's Cola", price:650},
    {id:"long-8", category:"Long Drinks", name:"Rum Cola", price:500},
    {id:"long-9", category:"Long Drinks", name:"Jägermeister Red Bull", price:650},
    {id:"long-10", category:"Long Drinks", name:"Cuba Libre", price:550},

    /* ================= SHOTS ================= */

    {id:"shot-1", category:"Shots", name:"Tequila Shot", price:300},
    {id:"shot-2", category:"Shots", name:"Jägermeister Shot", price:300},
    {id:"shot-3", category:"Shots", name:"Vodka Shot", price:250},
    {id:"shot-4", category:"Shots", name:"Sambuca Shot", price:300},
    {id:"shot-5", category:"Shots", name:"Rum Shot", price:250},
    {id:"shot-6", category:"Shots", name:"Whisky Shot", price:300},

    /* ================= SNACKS ================= */

    {id:"snack-1", category:"Snacks", name:"Chips", price:200},
    {id:"snack-2", category:"Snacks", name:"Kikirikë", price:200},
    {id:"snack-3", category:"Snacks", name:"Ullinj", price:250},
    {id:"snack-4", category:"Snacks", name:"Mix Arra", price:350},
    {id:"snack-5", category:"Snacks", name:"Patate Frita", price:350},
    {id:"snack-6", category:"Snacks", name:"Tost", price:400},
    {id:"snack-7", category:"Snacks", name:"Sanduiç", price:450},
    {id:"snack-8", category:"Snacks", name:"Croissant", price:250},
    {id:"snack-9", category:"Snacks", name:"Brioche", price:300}
];

/* =========================================================
   BASIC HELPERS
   ========================================================= */

function clone(data) {
    return JSON.parse(JSON.stringify(data));
}

function money(value) {
    return Number(value || 0).toLocaleString("sq-AL") + " L";
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================================
   USERS
   ========================================================= */

function getUsers() {
    let users;

    try {
        users = JSON.parse(localStorage.getItem(USERS_KEY) || "null");
    } catch {
        users = null;
    }

    if (!Array.isArray(users) || !users.length) {
        users = clone(DEFAULT_USERS);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    return users;
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("barCurrentUser") || "null");
    } catch {
        return null;
    }
}

/* =========================================================
   PRODUCTS + MENU VERSIONING
   ========================================================= */

function getProducts() {

    const storedVersion = localStorage.getItem(MENU_VERSION_KEY);

    if (storedVersion !== MENU_VERSION) {

        const products = clone(DEFAULT_PRODUCTS);

        localStorage.setItem(
            PRODUCTS_KEY,
            JSON.stringify(products)
        );

        localStorage.setItem(
            MENU_VERSION_KEY,
            MENU_VERSION
        );

        initializeStock(products);

        return products;
    }

    let products;

    try {
        products = JSON.parse(
            localStorage.getItem(PRODUCTS_KEY) || "null"
        );
    } catch {
        products = null;
    }

    if (!Array.isArray(products) || !products.length) {

        products = clone(DEFAULT_PRODUCTS);

        localStorage.setItem(
            PRODUCTS_KEY,
            JSON.stringify(products)
        );
    }

    initializeStock(products);

    return products;
}

function saveProducts(products) {
    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );
}

/* =========================================================
   STOCK SYSTEM
   ========================================================= */

function getInventory() {

    let inventory;

    try {
        inventory = JSON.parse(
            localStorage.getItem(STOCK_KEY) || "{}"
        );
    } catch {
        inventory = {};
    }

    if (!inventory || typeof inventory !== "object") {
        inventory = {};
    }

    return inventory;
}

function saveInventory(inventory) {
    localStorage.setItem(
        STOCK_KEY,
        JSON.stringify(inventory)
    );
}

function initializeStock(products = getProducts()) {

    const inventory = getInventory();
    let changed = false;

    products.forEach(product => {

        const id = String(product.id);

        if (
            inventory[id] === undefined ||
            inventory[id] === null ||
            Number.isNaN(Number(inventory[id]))
        ) {
            inventory[id] = 20;
            changed = true;
        }
    });

    if (changed) {
        saveInventory(inventory);
    }

    return inventory;
}

function getStock(productId) {

    const inventory = initializeStock();

    const value = Number(
        inventory[String(productId)]
    );

    return Number.isFinite(value) ? value : 0;
}

function setStock(productId, quantity) {

    const inventory = getInventory();

    inventory[String(productId)] =
        Math.max(0, Number(quantity) || 0);

    saveInventory(inventory);

    renderEverything();
}

function changeStock(productId, amount) {

    const current = getStock(productId);

    setStock(
        productId,
        Math.max(0, current + Number(amount || 0))
    );
}

function resetProductStock(productId) {
    setStock(productId, 20);
}

/* =========================================================
   INVOICES
   ========================================================= */

function getInvoices() {

    let invoices;

    try {
        invoices = JSON.parse(
            localStorage.getItem(INVOICES_KEY) || "[]"
        );
    } catch {
        invoices = [];
    }

    if (!Array.isArray(invoices)) {
        invoices = [];
    }

    return invoices;
}

function saveInvoices(invoices) {
    localStorage.setItem(
        INVOICES_KEY,
        JSON.stringify(invoices)
    );
}

/* =========================================================
   APP NAME
   ========================================================= */

function getAppName() {
    return (
        localStorage.getItem(APP_NAME_KEY) ||
        "Bar Lulishtja"
    );
}

function saveAppName() {

    const input =
        document.getElementById("appNameInput");

    if (!input) return;

    const value =
        input.value.trim() || "Bar Lulishtja";

    localStorage.setItem(
        APP_NAME_KEY,
        value
    );

    updateAppName();

    alert("Emri u ruajt.");
}

function updateAppName() {

    const name = getAppName();

    const appName =
        document.getElementById("appName");

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
   TABLES
   ========================================================= */

function getTableCount() {

    const value =
        Number(
            localStorage.getItem(TABLE_COUNT_KEY)
        );

    return value >= 1 ? value : 12;
}

function saveTableCount() {

    const input =
        document.getElementById("tableCountInput");

    if (!input) return;

    let count = Number(input.value);

    if (!Number.isFinite(count)) {
        alert("Numri i tavolinave nuk është i vlefshëm.");
        return;
    }

    count = Math.max(1, Math.min(100, Math.floor(count)));

    localStorage.setItem(
        TABLE_COUNT_KEY,
        String(count)
    );

    const tables = getTables();

    const newTables = {};

    for (let i = 1; i <= count; i++) {

        newTables[i] =
            tables[i] || {
                number: i,
                status: "free",
                items: []
            };
    }

    saveTables(newTables);

    renderEverything();

    alert("Numri i tavolinave u ruajt.");
}

function getTables() {

    let tables;

    try {
        tables = JSON.parse(
            localStorage.getItem(TABLES_KEY) || "null"
        );
    } catch {
        tables = null;
    }

    if (!tables || typeof tables !== "object") {

        tables = {};

        for (
            let i = 1;
            i <= getTableCount();
            i++
        ) {
            tables[i] = {
                number: i,
                status: "free",
                items: []
            };
        }

        saveTables(tables);
    }

    return tables;
}

function saveTables(tables) {
    localStorage.setItem(
        TABLES_KEY,
        JSON.stringify(tables)
    );
}

/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(page) {

    document.querySelectorAll(".page").forEach(el => {
        el.style.display = "none";
    });

    const target =
        document.getElementById(page);

    if (target) {
        target.style.display = "block";
    }

    document.querySelectorAll(
        ".nav-btn, .nav-link"
    ).forEach(el => {
        el.classList.remove("active");
    });

    const active =
        document.querySelector(
            `[data-page="${page}"]`
        );

    if (active) {
        active.classList.add("active");
    }

    if (page === "dashboard") {
        renderDashboard();
    }

    if (page === "tables") {
        renderTables();
    }

    if (page === "menu") {
        renderMenu();
    }

    if (page === "orders") {
        renderOrderPage();
    }

    if (page === "cash") {
        renderCash();
    }

    if (page === "history") {
        renderHistory();
    }

    if (page === "admin") {
        renderAdmin();
    }
}

/* =========================================================
   PERMISSIONS
   ========================================================= */

function isAdmin() {

    const user = getCurrentUser();

    return user && user.role === "admin";
}

function protectAdminElements() {

    const admin =
        isAdmin();

    document.querySelectorAll(
        ".admin-only"
    ).forEach(el => {
        el.style.display =
            admin ? "" : "none";
    });
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
        now.toLocaleTimeString(
            "sq-AL",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );
}

setInterval(updateClock, 1000);

/* =========================================================
   DASHBOARD
   ========================================================= */

function renderDashboard() {

    const invoices = getInvoices();
    const tables = getTables();

    const today =
        new Date().toDateString();

    const todayInvoices =
        invoices.filter(inv => {

            const date =
                new Date(
                    inv.date ||
                    inv.createdAt ||
                    inv.timestamp
                );

            return date.toDateString() === today;
        });

    const sales =
        todayInvoices.reduce(
            (sum, inv) =>
                sum +
                Number(
                    inv.total ||
                    inv.amount ||
                    0
                ),
            0
        );

    const card =
        todayInvoices
            .filter(inv =>
                String(
                    inv.payment ||
                    inv.paymentMethod ||
                    ""
                ).toLowerCase() === "card"
            )
            .reduce(
                (sum, inv) =>
                    sum +
                    Number(
                        inv.total ||
                        inv.amount ||
                        0
                    ),
                0
            );

    const active =
        Object.values(tables)
            .filter(t =>
                t &&
                (
                    t.status === "busy" ||
                    Array.isArray(t.items) &&
                    t.items.length
                )
            ).length;

    const salesEl =
        document.getElementById("salesToday");

    if (salesEl) {
        salesEl.textContent = money(sales);
    }

    const activeEl =
        document.getElementById("activeTables");

    if (activeEl) {
        activeEl.textContent = active;
    }

    const invoiceEl =
        document.getElementById("invoiceToday");

    if (invoiceEl) {
        invoiceEl.textContent =
            todayInvoices.length;
    }

    const cardEl =
        document.getElementById("cardToday");

    if (cardEl) {
        cardEl.textContent = money(card);
    }

    renderDashboardTables();
}

function renderDashboardTables() {

    const container =
        document.getElementById(
            "dashboardTables"
        );

    if (!container) return;

    const tables = getTables();

    container.innerHTML =
        Object.keys(tables)
            .sort(
                (a,b) =>
                    Number(a) - Number(b)
            )
            .map(number => {

                const table =
                    tables[number];

                const busy =
                    table.status === "busy" ||
                    (
                        Array.isArray(table.items) &&
                        table.items.length
                    );

                return `
                    <button
                        class="table-card ${busy ? "busy" : "free"}"
                        onclick="openTable(${Number(number)})"
                    >
                        <strong>Tavolina ${number}</strong>
                        <span>
                            ${busy ? "E zënë" : "E lirë"}
                        </span>
                    </button>
                `;
            })
            .join("");
}

/* =========================================================
   TABLES PAGE
   ========================================================= */

function renderTables() {

    const container =
        document.getElementById(
            "tableGrid"
        );

    if (!container) return;

    const tables = getTables();

    container.innerHTML =
        Object.keys(tables)
            .sort(
                (a,b) =>
                    Number(a) - Number(b)
            )
            .map(number => {

                const table =
                    tables[number];

                const busy =
                    table.status === "busy" ||
                    (
                        Array.isArray(table.items) &&
                        table.items.length
                    );

                const total =
                    getOrderTotal(
                        table.items || []
                    );

                return `
                    <button
                        class="table-card ${busy ? "busy" : "free"}"
                        onclick="openTable(${Number(number)})"
                    >
                        <strong>
                            Tavolina ${number}
                        </strong>

                        <span>
                            ${busy ? "E zënë" : "E lirë"}
                        </span>

                        ${
                            busy
                            ? `<small>${money(total)}</small>`
                            : ""
                        }
                    </button>
                `;
            })
            .join("");
}

function openTable(number) {

    const tables = getTables();

    if (!tables[number]) {

        tables[number] = {
            number,
            status: "free",
            items: []
        };
    }

    selectedTableNumber = Number(number);

    tables[number].status = "busy";

    saveTables(tables);

    const text =
        document.getElementById(
            "selectedTableText"
        );

    if (text) {
        text.textContent =
            `Tavolina ${number}`;
    }

    showPage("orders");

    renderOrderPage();
}

/* =========================================================
   MENU
   ========================================================= */

function getCategories() {

    const products = getProducts();

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
        document.getElementById(
            "categories"
        );

    if (!container) return;

    container.innerHTML =
        getCategories()
            .map(category => `
                <button
                    class="category-btn ${
                        selectedCategory === category
                            ? "active"
                            : ""
                    }"
                    onclick='selectCategory(${JSON.stringify(category)})'
                >
                    ${escapeHTML(category)}
                </button>
            `)
            .join("");
}

function selectCategory(category) {

    selectedCategory = category;

    renderMenu();
}

function renderMenu() {

    const container =
        document.getElementById(
            "menuGrid"
        );

    if (!container) return;

    renderCategories();

    const products = getProducts();

    const searchInput =
        document.getElementById(
            "menuSearch"
        );

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const filtered =
        products.filter(product => {

            const categoryOK =
                selectedCategory === "Të gjitha" ||
                product.category === selectedCategory;

            const searchOK =
                !search ||
                product.name
                    .toLowerCase()
                    .includes(search) ||
                product.category
                    .toLowerCase()
                    .includes(search);

            return categoryOK && searchOK;
        });

    container.innerHTML =
        filtered.map(product => {

            const stock =
                getStock(product.id);

            const disabled =
                stock <= 0;

            return `
                <button
                    class="menu-card ${disabled ? "out-of-stock" : ""}"
                    onclick="addProductToOrder('${escapeHTML(product.id)}')"
                    ${disabled ? "disabled" : ""}
                >

                    <div class="menu-card-top">
                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <span class="menu-price">
                            ${money(product.price)}
                        </span>
                    </div>

                    <small>
                        ${escapeHTML(product.category)}
                    </small>

                    <div class="menu-stock">
                        ${
                            stock <= 0
                                ? "Mbaruar"
                                : `Stok: ${stock}`
                        }
                    </div>

                </button>
            `;
        })
        .join("");

    if (!filtered.length) {

        container.innerHTML = `
            <div class="empty-state">
                Nuk u gjet asnjë produkt.
            </div>
        `;
    }
}

function searchMenu() {
    renderMenu();
}

/* =========================================================
   ORDERS
   ========================================================= */

function getSelectedTable() {

    if (!selectedTableNumber) {
        return null;
    }

    const tables = getTables();

    return tables[selectedTableNumber] || null;
}

function getOrderTotal(items) {

    return (items || []).reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.quantity || 1),
        0
    );
}

function addProductToOrder(productId) {

    if (!selectedTableNumber) {

        alert(
            "Zgjidh fillimisht një tavolinë."
        );

        return;
    }

    const products = getProducts();

    const product =
        products.find(
            p =>
                String(p.id) ===
                String(productId)
        );

    if (!product) return;

    const stock =
        getStock(product.id);

    if (stock <= 0) {

        alert(
            `Stoku për "${product.name}" ka mbaruar.`
        );

        return;
    }

    const tables = getTables();

    if (!tables[selectedTableNumber]) {

        tables[selectedTableNumber] = {
            number: selectedTableNumber,
            status: "busy",
            items: []
        };
    }

    const table =
        tables[selectedTableNumber];

    if (!Array.isArray(table.items)) {
        table.items = [];
    }

    const existing =
        table.items.find(
            item =>
                String(item.productId) ===
                String(product.id)
        );

    const currentQuantity =
        existing
            ? Number(existing.quantity || 0)
            : 0;

    if (currentQuantity >= stock) {

        alert(
            `Nuk ka më stok për ${product.name}. Gjendje: ${stock}.`
        );

        return;
    }

    if (existing) {

        existing.quantity =
            currentQuantity + 1;

    } else {

        table.items.push({
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1
        });
    }

    table.status = "busy";

    saveTables(tables);

    renderOrderPage();
    renderTables();
    renderDashboard();
}

function changeOrderQuantity(index, change) {

    const tables = getTables();

    const table =
        tables[selectedTableNumber];

    if (!table || !Array.isArray(table.items)) {
        return;
    }

    const item =
        table.items[index];

    if (!item) return;

    const newQuantity =
        Number(item.quantity || 1) +
        Number(change);

    if (newQuantity <= 0) {

        table.items.splice(index, 1);

    } else {

        const stock =
            getStock(item.productId);

        if (newQuantity > stock) {

            alert(
                `Stoku për ${item.name} është vetëm ${stock}.`
            );

            return;
        }

        item.quantity =
            newQuantity;
    }

    if (!table.items.length) {
        table.status = "free";
    }

    saveTables(tables);

    renderOrderPage();
    renderTables();
    renderDashboard();
}

function removeOrderItem(index) {

    const tables = getTables();

    const table =
        tables[selectedTableNumber];

    if (!table) return;

    if (Array.isArray(table.items)) {
        table.items.splice(index, 1);
    }

    if (!table.items.length) {
        table.status = "free";
    }

    saveTables(tables);

    renderOrderPage();
    renderTables();
    renderDashboard();
}

function renderOrderPage() {

    const table =
        getSelectedTable();

    const items =
        table &&
        Array.isArray(table.items)
            ? table.items
            : [];

    const container =
        document.getElementById(
            "orderItems"
        );

    if (container) {

        if (!items.length) {

            container.innerHTML = `
                <div class="empty-state">
                    Nuk ka produkte në porosi.
                </div>
            `;

        } else {

            container.innerHTML =
                items.map(
                    (item, index) => `
                        <div class="order-row">

                            <div>
                                <strong>
                                    ${escapeHTML(item.name)}
                                </strong>

                                <small>
                                    ${money(item.price)}
                                </small>
                            </div>

                            <div class="quantity-controls">

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

                            </div>

                            <strong>
                                ${money(
                                    Number(item.price) *
                                    Number(item.quantity)
                                )}
                            </strong>

                            <button
                                onclick="removeOrderItem(${index})"
                                title="Hiq"
                            >
                                ×
                            </button>

                        </div>
                    `
                ).join("");
        }
    }

    const total =
        getOrderTotal(items);

    const totalEl =
        document.getElementById(
            "orderTotal"
        );

    if (totalEl) {
        totalEl.textContent =
            money(total);
    }

    const selected =
        document.getElementById(
            "selectedTableText"
        );

    if (selected) {

        selected.textContent =
            selectedTableNumber
                ? `Tavolina ${selectedTableNumber}`
                : "Zgjidh tavolinën";
    }

    renderMenu();
}

/* =========================================================
   PAYMENT
   ========================================================= */

function openPayment() {

    if (!selectedTableNumber) {

        alert(
            "Zgjidh një tavolinë."
        );

        return;
    }

    const table =
        getSelectedTable();

    const items =
        table && Array.isArray(table.items)
            ? table.items
            : [];

    if (!items.length) {

        alert(
            "Porosia është bosh."
        );

        return;
    }

    const total =
        getOrderTotal(items);

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

/* =========================================================
   COMPLETE PAYMENT + AUTOMATIC STOCK
   ========================================================= */

function completePayment(method) {

    if (!selectedTableNumber) {
        alert("Nuk është zgjedhur tavolina.");
        return;
    }

    const tables = getTables();

    const table =
        tables[selectedTableNumber];

    if (!table) {
        alert("Tavolina nuk u gjet.");
        return;
    }

    const items =
        Array.isArray(table.items)
            ? clone(table.items)
            : [];

    if (!items.length) {
        alert("Porosia është bosh.");
        return;
    }

    /*
       1. KONTROLLOJMË STOKUN
       Para se të bëjmë pagesën.
    */

    const inventory =
        initializeStock();

    for (const item of items) {

        const id =
            String(item.productId);

        const quantity =
            Number(item.quantity || 1);

        const current =
            Number(
                inventory[id] ?? 20
            );

        if (current < quantity) {

            alert(
                `Stok i pamjaftueshëm për "${item.name}".\n` +
                `Gjendje: ${current}\n` +
                `Kërkohen: ${quantity}`
            );

            return;
        }
    }

    /*
       2. ZBRIT STOKUN
    */

    for (const item of items) {

        const id =
            String(item.productId);

        const quantity =
            Number(item.quantity || 1);

        inventory[id] =
            Math.max(
                0,
                Number(
                    inventory[id] ?? 20
                ) - quantity
            );
    }

    saveInventory(inventory);

    /*
       3. KRIJO FATURËN
    */

    const total =
        getOrderTotal(items);

    const invoices =
        getInvoices();

    const currentUser =
        getCurrentUser();

    const invoiceNumber =
        "BL-" +
        Date.now()
            .toString()
            .slice(-8);

    const now =
        new Date();

    const invoice = {

        id:
            "inv-" +
            Date.now(),

        number:
            invoiceNumber,

        date:
            now.toISOString(),

        createdAt:
            now.toISOString(),

        timestamp:
            Date.now(),

        table:
            selectedTableNumber,

        tableName:
            `Tavolina ${selectedTableNumber}`,

        items:
            items,

        total:
            total,

        amount:
            total,

        payment:
            method,

        paymentMethod:
            method,

        waiterName:
            currentUser
                ? currentUser.name
                : "Pa emër",

        userName:
            currentUser
                ? currentUser.name
                : "Pa emër"
    };

    invoices.push(invoice);

    saveInvoices(invoices);

    /*
       4. PASTRO TAVOLINËN
    */

    tables[selectedTableNumber] = {

        number:
            selectedTableNumber,

        status:
            "free",

        items:
            []
    };

    saveTables(tables);

    /*
       5. MBYLL PAYMENT
    */

    closePayment();

    /*
       6. SHFAQ FATURËN
    */

    showInvoice(invoice);

    /*
       7. RIFRESKO SISTEMIN
    */

    renderEverything();
}

/* =========================================================
   INVOICE
   ========================================================= */

function showInvoice(invoice) {

    const modal =
        document.getElementById(
            "invoiceModal"
        );

    if (!modal) return;

    const content =
        document.getElementById(
            "invoiceContent"
        );

    if (!content) return;

    content.innerHTML = `

        <div class="invoice">

            <div class="invoice-header">

                <h2>
                    ${escapeHTML(getAppName())}
                </h2>

                <p>
                    Faturë
                </p>

                <strong>
                    ${escapeHTML(invoice.number)}
                </strong>

            </div>

            <div class="invoice-meta">

                <div>
                    Tavolina:
                    ${escapeHTML(invoice.tableName)}
                </div>

                <div>
                    Kamarieri:
                    ${escapeHTML(invoice.waiterName)}
                </div>

                <div>
                    Pagesa:
                    ${escapeHTML(invoice.payment)}
                </div>

                <div>
                    ${new Date(
                        invoice.date
                    ).toLocaleString("sq-AL")}
                </div>

            </div>

            <hr>

            <div class="invoice-items">

                ${invoice.items.map(item => `

                    <div class="invoice-item">

                        <span>
                            ${escapeHTML(item.name)}
                            × ${item.quantity}
                        </span>

                        <strong>
                            ${money(
                                Number(item.price) *
                                Number(item.quantity)
                            )}
                        </strong>

                    </div>

                `).join("")}

            </div>

            <hr>

            <div class="invoice-total">

                <span>
                    TOTAL
                </span>

                <strong>
                    ${money(invoice.total)}
                </strong>

            </div>

        </div>
    `;

    modal.style.display = "flex";
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

function printInvoice() {

    window.print();
}

/* =========================================================
   CASH
   ========================================================= */

function renderCash() {

    const invoices =
        getInvoices();

    const today =
        new Date().toDateString();

    const todayInvoices =
        invoices.filter(inv => {

            const date =
                new Date(
                    inv.date ||
                    inv.createdAt ||
                    inv.timestamp
                );

            return date.toDateString() === today;
        });

    const cash =
        todayInvoices
            .filter(inv =>
                String(
                    inv.payment ||
                    inv.paymentMethod ||
                    "cash"
                ).toLowerCase() === "cash"
            )
            .reduce(
                (sum, inv) =>
                    sum +
                    Number(
                        inv.total ||
                        inv.amount ||
                        0
                    ),
                0
            );

    const card =
        todayInvoices
            .filter(inv =>
                String(
                    inv.payment ||
                    inv.paymentMethod ||
                    ""
                ).toLowerCase() === "card"
            )
            .reduce(
                (sum, inv) =>
                    sum +
                    Number(
                        inv.total ||
                        inv.amount ||
                        0
                    ),
                0
            );

    const total =
        cash + card;

    const cashTotal =
        document.getElementById(
            "cashTotal"
        );

    if (cashTotal) {
        cashTotal.textContent =
            money(total);
    }

    const cashMoney =
        document.getElementById(
            "cashMoney"
        );

    if (cashMoney) {
        cashMoney.textContent =
            money(cash);
    }

    const cashCard =
        document.getElementById(
            "cashCard"
        );

    if (cashCard) {
        cashCard.textContent =
            money(card);
    }

    const cashInvoices =
        document.getElementById(
            "cashInvoices"
        );

    if (cashInvoices) {
        cashInvoices.textContent =
            todayInvoices.length;
    }

    const list =
        document.getElementById(
            "paymentsList"
        );

    if (!list) return;

    list.innerHTML =
        todayInvoices
            .slice()
            .reverse()
            .map(inv => `

                <div class="payment-row">

                    <div>
                        <strong>
                            ${escapeHTML(inv.number)}
                        </strong>

                        <small>
                            ${escapeHTML(
                                inv.waiterName ||
                                "Pa emër"
                            )}
                        </small>
                    </div>

                    <span>
                        ${escapeHTML(
                            inv.payment ||
                            inv.paymentMethod ||
                            "cash"
                        )}
                    </span>

                    <strong>
                        ${money(
                            inv.total ||
                            inv.amount ||
                            0
                        )}
                    </strong>

                </div>

            `)
            .join("");

    if (!todayInvoices.length) {

        list.innerHTML = `
            <div class="empty-state">
                Nuk ka pagesa sot.
            </div>
        `;
    }
}

/* =========================================================
   HISTORY
   ========================================================= */

function renderHistory() {

    const container =
        document.getElementById(
            "historyList"
        );

    if (!container) return;

    const invoices =
        getInvoices()
            .slice()
            .reverse();

    if (!invoices.length) {

        container.innerHTML = `
            <div class="empty-state">
                Nuk ka histori faturash.
            </div>
        `;

        return;
    }

    container.innerHTML =
        invoices.map(inv => `

            <div class="history-row">

                <div>
                    <strong>
                        ${escapeHTML(inv.number)}
                    </strong>

                    <small>
                        ${new Date(
                            inv.date ||
                            inv.createdAt ||
                            inv.timestamp
                        ).toLocaleString("sq-AL")}
                    </small>
                </div>

                <div>
                    ${escapeHTML(
                        inv.tableName ||
                        `Tavolina ${inv.table || "-"}`
                    )}
                </div>

                <div>
                    ${escapeHTML(
                        inv.waiterName ||
                        inv.userName ||
                        "Pa emër"
                    )}
                </div>

                <div>
                    ${escapeHTML(
                        inv.payment ||
                        inv.paymentMethod ||
                        "cash"
                    )}
                </div>

                <strong>
                    ${money(
                        inv.total ||
                        inv.amount ||
                        0
                    )}
                </strong>

            </div>

        `).join("");
}

function deleteHistory() {

    if (!isAdmin()) {
        alert("Vetëm administratori mund ta bëjë këtë.");
        return;
    }

    const confirmDelete =
        confirm(
            "A je i sigurt që dëshiron të fshish të gjithë historikun?"
        );

    if (!confirmDelete) return;

    localStorage.removeItem(INVOICES_KEY);

    renderHistory();
    renderDashboard();
    renderCash();

    alert("Historiku u fshi.");
}

/* =========================================================
   ADMIN
   ========================================================= */

function renderAdmin() {

    if (!isAdmin()) {
        return;
    }

    updateAppName();

    const countInput =
        document.getElementById(
            "tableCountInput"
        );

    if (countInput) {
        countInput.value =
            getTableCount();
    }

    renderUsersAdmin();
    renderProductsAdmin();
    renderAdminTables();
}

function renderUsersAdmin() {

    const container =
        document.getElementById(
            "usersList"
        );

    if (!container) return;

    const users =
        getUsers();

    container.innerHTML =
        users.map(user => `

            <div class="admin-row">

                <div>

                    <strong>
                        ${escapeHTML(user.name)}
                    </strong>

                    <small>
                        @${escapeHTML(user.username)}
                    </small>

                </div>

                <span>
                    ${user.role === "admin"
                        ? "Administrator"
                        : "Kamarier"}
                </span>

                ${
                    user.id !== "admin-1"
                        ? `
                            <button
                                onclick="deleteUser('${escapeHTML(user.id)}')"
                            >
                                Fshi
                            </button>
                        `
                        : ""
                }

            </div>

        `).join("");
}

function openWaiterModal() {

    const username =
        prompt(
            "Username i kamarierit:"
        );

    if (!username) return;

    const password =
        prompt(
            "Password:"
        );

    if (!password) return;

    const name =
        prompt(
            "Emri i kamarierit:"
        ) || username;

    const users =
        getUsers();

    if (
        users.some(
            user =>
                user.username === username
        )
    ) {

        alert(
            "Ky username ekziston."
        );

        return;
    }

    users.push({

        id:
            "waiter-" +
            Date.now(),

        username:
            username.trim(),

        password:
            password,

        role:
            "waiter",

        name:
            name.trim()
    });

    saveUsers(users);

    renderUsersAdmin();

    alert(
        "Kamarieri u shtua."
    );
}

function deleteUser(id) {

    if (!isAdmin()) return;

    const users =
        getUsers()
            .filter(
                user =>
                    user.id !== id
            );

    saveUsers(users);

    renderUsersAdmin();
}

function changeAdminPassword() {

    if (!isAdmin()) return;

    const input =
        document.getElementById(
            "newAdminPassword"
        );

    if (!input) return;

    const password =
        input.value.trim();

    if (password.length < 4) {

        alert(
            "Password duhet të ketë të paktën 4 karaktere."
        );

        return;
    }

    const users =
        getUsers();

    const admin =
        users.find(
            user =>
                user.role === "admin"
        );

    if (!admin) return;

    admin.password =
        password;

    saveUsers(users);

    input.value = "";

    alert(
        "Password i administratorit u ndryshua."
    );
}

/* =========================================================
   ADMIN PRODUCTS
   ========================================================= */

function renderProductsAdmin() {

    const container =
        document.getElementById(
            "adminProducts"
        );

    if (!container) return;

    const products =
        getProducts();

    container.innerHTML =
        products.map(product => {

            const stock =
                getStock(product.id);

            return `

                <div class="admin-row">

                    <div>

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <small>
                            ${escapeHTML(product.category)}
                            · ${money(product.price)}
                        </small>

                    </div>

                    <span>
                        Stok: ${stock}
                    </span>

                    <button
                        onclick="changeStock('${escapeHTML(product.id)}', -1)"
                    >
                        −
                    </button>

                    <button
                        onclick="changeStock('${escapeHTML(product.id)}', 1)"
                    >
                        +
                    </button>

                    <button
                        onclick="resetProductStock('${escapeHTML(product.id)}')"
                    >
                        20
                    </button>

                </div>

            `;
        }).join("");
}

/* =========================================================
   ADMIN TABLES
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
        Object.values(tables)
            .map(table => {

                const busy =
                    table.status === "busy";

                return `
                    <div class="admin-row">

                        <strong>
                            Tavolina ${table.number}
                        </strong>

                        <span>
                            ${
                                busy
                                    ? "E zënë"
                                    : "E lirë"
                            }
                        </span>

                    </div>
                `;
            })
            .join("");
}

/* =========================================================
   GENERAL MODAL
   ========================================================= */

function closeGeneralModal() {

    const modal =
        document.getElementById(
            "generalModal"
        );

    if (modal) {
        modal.style.display = "none";
    }
}

/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem(
        "barCurrentUser"
    );

    window.location.href =
        "login.html";
}

/* =========================================================
   GLOBAL SEARCH SUPPORT
   ========================================================= */

document.addEventListener(
    "input",
    function(event) {

        if (
            event.target &&
            event.target.id === "menuSearch"
        ) {
            renderMenu();
        }
    }
);

/* =========================================================
   REFRESH EVERYTHING
   ========================================================= */

function renderEverything() {

    updateAppName();
    protectAdminElements();

    renderDashboard();
    renderTables();
    renderMenu();
    renderOrderPage();
    renderCash();
    renderHistory();

    if (isAdmin()) {
        renderAdmin();
    }
}

/* =========================================================
   INIT
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Kontrollo login
        */

        const user =
            getCurrentUser();

        if (!user) {

            /*
               Nëse jemi në index.html
               dhe nuk ka login,
               kthehemi te login.
            */

            if (
                location.pathname.endsWith(
                    "index.html"
                ) ||
                location.pathname === "/" ||
                location.pathname.endsWith("/")
            ) {

                window.location.href =
                    "login.html";

                return;
            }
        }

        /*
           Inicializo sistemin
        */

        getUsers();
        getProducts();
        getTables();
        initializeStock();

        /*
           User info
        */

        const userInfo =
            document.getElementById(
                "userInfo"
            );

        if (userInfo && user) {

            userInfo.textContent =
                `${user.name} • ${
                    user.role === "admin"
                        ? "Administrator"
                        : "Kamarier"
                }`;
        }

        updateAppName();
        protectAdminElements();

        /*
           Fill dashboard
        */

        renderEverything();

        /*
           Default page
        */

        const dashboard =
            document.getElementById(
                "dashboard"
            );

        if (dashboard) {
            showPage("dashboard");
        }

        updateClock();
    }
);

/* =========================================================
   EXPOSE FUNCTIONS TO HTML
   ========================================================= */

window.showPage = showPage;

window.openTable = openTable;

window.selectCategory =
    selectCategory;

window.searchMenu =
    searchMenu;

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

window.completePayment =
    completePayment;

window.showInvoice =
    showInvoice;

window.closeInvoice =
    closeInvoice;

window.printInvoice =
    printInvoice;

window.deleteHistory =
    deleteHistory;

window.saveAppName =
    saveAppName;

window.openWaiterModal =
    openWaiterModal;

window.deleteUser =
    deleteUser;

window.changeAdminPassword =
    changeAdminPassword;

window.saveTableCount =
    saveTableCount;

window.changeStock =
    changeStock;

window.resetProductStock =
    resetProductStock;

window.closeGeneralModal =
    closeGeneralModal;

window.logout =
    logout;

window.renderMenu =
    renderMenu;

window.renderAdmin =
    renderAdmin;
/* =========================================================
   SABI LED SYSTEM
   LED EFFECT FOR ENTIRE APP
   ========================================================= */

function createSabiLED() {

    if (document.getElementById("sabiLedSystem")) {
        return;
    }

    const led = document.createElement("div");

    led.id = "sabiLedSystem";

    led.innerHTML = `
        <div class="sabi-led sabi-led-left"></div>
        <div class="sabi-led sabi-led-right"></div>
        <div class="sabi-led sabi-led-top"></div>
        <div class="sabi-led sabi-led-bottom"></div>

        <div class="sabi-corner sabi-corner-tl"></div>
        <div class="sabi-corner sabi-corner-tr"></div>
        <div class="sabi-corner sabi-corner-bl"></div>
        <div class="sabi-corner sabi-corner-br"></div>
    `;

    document.body.appendChild(led);
}

function createSabiLEDStyle() {

    if (document.getElementById("sabiLedStyle")) {
        return;
    }

    const style =
        document.createElement("style");

    style.id = "sabiLedStyle";

    style.textContent = `

        #sabiLedSystem {
            position: fixed;
            inset: 0;
            pointer-events: none;
            z-index: 99999;
            --led-color: #00ff88;
        }

        .sabi-led {
            position: fixed;
            z-index: 99999;
            background: var(--led-color);
            box-shadow:
                0 0 5px var(--led-color),
                0 0 12px var(--led-color),
                0 0 25px var(--led-color),
                0 0 45px var(--led-color);
            animation:
                sabiLedColor 8s linear infinite;
        }

        .sabi-led-left,
        .sabi-led-right {
            top: 0;
            bottom: 0;
            width: 3px;
        }

        .sabi-led-left {
            left: 0;
        }

        .sabi-led-right {
            right: 0;
        }

        .sabi-led-top,
        .sabi-led-bottom {
            left: 0;
            right: 0;
            height: 3px;
        }

        .sabi-led-top {
            top: 0;
        }

        .sabi-led-bottom {
            bottom: 0;
        }

        .sabi-led::after {
            content: "";
            position: absolute;
            background: white;
            opacity: .9;
            filter: blur(3px);
            box-shadow:
                0 0 10px white,
                0 0 25px var(--led-color),
                0 0 45px var(--led-color);
        }

        .sabi-led-left::after,
        .sabi-led-right::after {
            width: 100%;
            height: 90px;
            left: 0;
            top: -90px;
            animation:
                sabiLedMoveVertical 3s linear infinite;
        }

        .sabi-led-top::after,
        .sabi-led-bottom::after {
            width: 90px;
            height: 100%;
            top: 0;
            left: -90px;
            animation:
                sabiLedMoveHorizontal 3s linear infinite;
        }

        .sabi-corner {
            position: fixed;
            width: 35px;
            height: 35px;
            border-color: var(--led-color);
            border-style: solid;
            animation:
                sabiLedColor 8s linear infinite;
            filter:
                drop-shadow(
                    0 0 8px var(--led-color)
                );
        }

        .sabi-corner-tl {
            top: 12px;
            left: 12px;
            border-width: 2px 0 0 2px;
        }

        .sabi-corner-tr {
            top: 12px;
            right: 12px;
            border-width: 2px 2px 0 0;
        }

        .sabi-corner-bl {
            bottom: 12px;
            left: 12px;
            border-width: 0 0 2px 2px;
        }

        .sabi-corner-br {
            bottom: 12px;
            right: 12px;
            border-width: 0 2px 2px 0;
        }

        @keyframes sabiLedColor {

            0% {
                --led-color: #00ff88;
            }

            14% {
                --led-color: #00ffff;
            }

            28% {
                --led-color: #0088ff;
            }

            42% {
                --led-color: #7a00ff;
            }

            57% {
                --led-color: #ff00cc;
            }

            71% {
                --led-color: #ff5500;
            }

            85% {
                --led-color: #ffff00;
            }

            100% {
                --led-color: #00ff88;
            }
        }

        @keyframes sabiLedMoveVertical {

            0% {
                top: -90px;
            }

            100% {
                top: 100%;
            }
        }

        @keyframes sabiLedMoveHorizontal {

            0% {
                left: -90px;
            }

            100% {
                left: 100%;
            }
        }

        @media(max-width:600px) {

            .sabi-led-left,
            .sabi-led-right {
                width: 2px;
            }

            .sabi-led-top,
            .sabi-led-bottom {
                height: 2px;
            }

            .sabi-corner {
                width: 24px;
                height: 24px;
            }

            .sabi-corner-tl,
            .sabi-corner-tr {
                top: 8px;
            }

            .sabi-corner-bl,
            .sabi-corner-br {
                bottom: 8px;
            }

            .sabi-corner-tl,
            .sabi-corner-bl {
                left: 8px;
            }

            .sabi-corner-tr,
            .sabi-corner-br {
                right: 8px;
            }
        }

    `;

    document.head.appendChild(style);
}

function startSabiLED() {

    createSabiLEDStyle();
    createSabiLED();

}

window.addEventListener(
    "DOMContentLoaded",
    startSabiLED
);

startSabiLED();
