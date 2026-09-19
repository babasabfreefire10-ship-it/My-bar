"use strict";

/* =========================================================
   MY BAR — APP.JS
   NEW SYSTEM / V1
========================================================= */


/* =========================================================
   STORAGE KEYS
========================================================= */

const USERS_KEY = "MYBAR_USERS_FINAL";
const SESSION_KEY = "MY_BAR_SESSION";

const PRODUCTS_KEY = "MYBAR_NEW_PRODUCTS";
const TABLES_KEY = "MYBAR_NEW_TABLES";
const INVOICES_KEY = "MYBAR_NEW_INVOICES";
const STOCK_KEY = "MYBAR_NEW_STOCK";
const SHIFT_KEY = "MYBAR_NEW_SHIFT";
const SELECTED_TABLE_KEY = "MYBAR_NEW_SELECTED";

const SETTINGS_KEY = "MYBAR_NEW_SETTINGS";


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
   DEFAULT SETTINGS
========================================================= */

const DEFAULT_SETTINGS = {
    appName: "MY BAR",
    businessName: "MY BAR",
    address: "Tiranë, Shqipëri",
    nipt: "",
    phone: "",
    vatRate: 20,
    tableCount: 12
};


/* =========================================================
   HELPERS
========================================================= */

function getJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);

        if (!raw) {
            return fallback;
        }

        return JSON.parse(raw);

    } catch {
        return fallback;
    }
}


function setJSON(key, value) {
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
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

    let box =
        document.getElementById("myBarToast");

    if (!box) {

        box =
            document.createElement("div");

        box.id =
            "myBarToast";

        box.style.position =
            "fixed";

        box.style.left =
            "50%";

        box.style.bottom =
            "25px";

        box.style.transform =
            "translateX(-50%)";

        box.style.zIndex =
            "99999";

        box.style.padding =
            "12px 18px";

        box.style.borderRadius =
            "10px";

        box.style.background =
            "#101611";

        box.style.border =
            "1px solid #55dc8a";

        box.style.color =
            "#fff";

        box.style.fontSize =
            "13px";

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

        }, 2200);
}


/* =========================================================
   SESSION
========================================================= */

function getCurrentSession() {

    let session =
        getJSON(
            SESSION_KEY,
            null
        );

    if (!session) {

        session =
            getJSON(
                "barCurrentUser",
                null
            );
    }

    if (!session) {
        return null;
    }

    const username =
        String(
            session.username ||
            session.user ||
            ""
        ).toLowerCase();

    const role =
        String(
            session.role ||
            ""
        ).toLowerCase();

    if (
        username === "admin" ||
        role === "admin" ||
        role === "administrator"
    ) {

        return {
            username: "admin",
            user: "admin",
            name: "Administrator",
            role: "admin"
        };
    }

    if (
        role === "waiter" ||
        role === "kamarier"
    ) {

        return {
            username,
            user: username,
            name:
                session.name ||
                "Kamarier",
            role: "waiter"
        };
    }

    return null;
}


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeApp() {

    const session =
        getCurrentSession();

    if (!session) {

        window.location.href =
            "login.html";

        return false;
    }


    if (!localStorage.getItem(USERS_KEY)) {

        setJSON(
            USERS_KEY,
            DEFAULT_USERS
        );
    }


    if (!localStorage.getItem(PRODUCTS_KEY)) {

        setJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );
    }


    if (!localStorage.getItem(INVOICES_KEY)) {

        setJSON(
            INVOICES_KEY,
            []
        );
    }


    if (!localStorage.getItem(SETTINGS_KEY)) {

        setJSON(
            SETTINGS_KEY,
            DEFAULT_SETTINGS
        );
    }


    initializeTables();

    initializeStock();

    initializeShift();

    renderHeader();

    applyRole();

    renderTables();

    renderMenu();

    renderOrder();

    updateDashboard();

    renderAdmin();

    loadSettingsIntoForm();

    setupSearch();

    updateClock();

    setInterval(
        updateClock,
        1000
    );

    return true;
}


/* =========================================================
   SETTINGS
========================================================= */

function getSettings() {

    const saved =
        getJSON(
            SETTINGS_KEY,
            {}
        );

    return {
        ...DEFAULT_SETTINGS,
        ...saved
    };
}


function saveSettings() {

    if (!isAdmin()) {

        toast(
            "Vetëm administratori mund të ndryshojë settings."
        );

        return;
    }


    const current =
        getSettings();


    const name =
        document
            .getElementById("appNameInput")
            ?.value
            .trim();


    const nipt =
        document
            .getElementById("businessNipt")
            ?.value
            .trim();


    const phone =
        document
            .getElementById("businessPhone")
            ?.value
            .trim();


    const address =
        document
            .getElementById("businessAddress")
            ?.value
            .trim();


    const count =
        Number(
            document
                .getElementById("tableCountInput")
                ?.value
        );


    const settings = {

        ...current,

        appName:
            name ||
            current.appName,

        businessName:
            name ||
            current.businessName,

        nipt,

        phone,

        address:
            address ||
            current.address,

        tableCount:
            Math.max(
                1,
                Math.min(
                    100,
                    count || current.tableCount
                )
            )
    };


    setJSON(
        SETTINGS_KEY,
        settings
    );


    localStorage.setItem(
        "APP_NAME",
        settings.appName
    );


    localStorage.setItem(
        "BUSINESS_NIPT",
        settings.nipt
    );


    localStorage.setItem(
        "BUSINESS_PHONE",
        settings.phone
    );


    localStorage.setItem(
        "BUSINESS_ADDRESS",
        settings.address
    );


    localStorage.setItem(
        "TABLE_COUNT",
        String(settings.tableCount)
    );


    initializeTables();

    renderHeader();

    renderTables();

    toast(
        "Settings u ruajtën."
    );
}


function loadSettingsIntoForm() {

    const settings =
        getSettings();


    const appName =
        document.getElementById(
            "appNameInput"
        );

    const nipt =
        document.getElementById(
            "businessNipt"
        );

    const phone =
        document.getElementById(
            "businessPhone"
        );

    const address =
        document.getElementById(
            "businessAddress"
        );

    const tableCount =
        document.getElementById(
            "tableCountInput"
        );


    if (appName) {
        appName.value =
            settings.appName;
    }

    if (nipt) {
        nipt.value =
            settings.nipt;
    }

    if (phone) {
        phone.value =
            settings.phone;
    }

    if (address) {
        address.value =
            settings.address;
    }

    if (tableCount) {
        tableCount.value =
            settings.tableCount;
    }
}


/* =========================================================
   HEADER
========================================================= */

function renderHeader() {

    const session =
        getCurrentSession();

    const settings =
        getSettings();


    const appName =
        document.getElementById(
            "appName"
        );

    const userInfo =
        document.getElementById(
            "userInfo"
        );


    if (appName) {

        appName.textContent =
            settings.appName;
    }


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


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const clock =
        document.getElementById(
            "clock"
        );

    if (!clock) {
        return;
    }

    clock.textContent =
        new Date()
            .toLocaleTimeString(
                "sq-AL",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );
}


/* =========================================================
   ROLE
========================================================= */

function isAdmin() {

    const session =
        getCurrentSession();

    return Boolean(
        session &&
        session.role === "admin"
    );
}


function applyRole() {

    const admin =
        isAdmin();


    document
        .querySelectorAll(
            ".admin-only, [data-admin]"
        )
        .forEach(element => {

            element.style.display =
                admin
                    ? ""
                    : "none";
        });
}


/* =========================================================
   TABLES
========================================================= */

function initializeTables() {

    const settings =
        getSettings();

    const count =
        Number(
            settings.tableCount
        ) || 12;


    let tables =
        getJSON(
            TABLES_KEY,
            null
        );


    if (!Array.isArray(tables)) {

        tables = [];

        for (
            let i = 1;
            i <= count;
            i++
        ) {

            tables.push({

                id: i,

                name:
                    "Tavolina " +
                    i,

                items: []

            });
        }

        setJSON(
            TABLES_KEY,
            tables
        );

        return;
    }


    if (tables.length < count) {

        for (
            let i = tables.length + 1;
            i <= count;
            i++
        ) {

            tables.push({

                id: i,

                name:
                    "Tavolina " +
                    i,

                items: []

            });
        }
    }


    if (tables.length > count) {

        tables =
            tables.slice(
                0,
                count
            );
    }


    tables.forEach(table => {

        if (!Array.isArray(table.items)) {
            table.items = [];
        }

        table.name =
            "Tavolina " +
            table.id;
    });


    setJSON(
        TABLES_KEY,
        tables
    );
}


function getTables() {

    return getJSON(
        TABLES_KEY,
        []
    );
}


function saveTables(tables) {

    setJSON(
        TABLES_KEY,
        tables
    );
}


function getSelectedTable() {

    return Number(
        localStorage.getItem(
            SELECTED_TABLE_KEY
        ) || 0
    );
}


function selectTable(id) {

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(id)
    );

    renderTables();

    renderOrder();

    updateSelectedTableText();
}


function renderTables() {

    const grid =
        document.getElementById(
            "tableGrid"
        );

    if (!grid) {
        return;
    }


    const tables =
        getTables();

    const selected =
        getSelectedTable();


    grid.innerHTML =
        tables.map(table => {

            const total =
                getOrderTotal(
                    table
                );

            const active =
                table.items.length > 0;


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
                        ${
                            active
                                ? money(total)
                                : "E lirë"
                        }
                    </span>

                </button>

            `;

        }).join("");


    updateSelectedTableText();
}


function updateSelectedTableText() {

    const selected =
        getSelectedTable();

    const text =
        selected
            ? "Tavolina " + selected
            : "Zgjidh një tavolinë";


    const elements =
        document.querySelectorAll(
            "#selectedTableText, #selectedTableTextRight"
        );


    elements.forEach(element => {

        element.textContent =
            text;
    });
}


/* =========================================================
   STOCK
========================================================= */

function initializeStock() {

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );


    const stock =
        getJSON(
            STOCK_KEY,
            {}
        );


    let changed = false;


    products.forEach(product => {

        if (
            stock[product.id] ===
            undefined
        ) {

            stock[product.id] = 20;

            changed = true;
        }
    });


    if (changed) {

        setJSON(
            STOCK_KEY,
            stock
        );
    }
}


function getStock(productId) {

    const stock =
        getJSON(
            STOCK_KEY,
            {}
        );

    return Number(
        stock[productId] ?? 0
    );
}


function changeStock(
    productId,
    amount
) {

    if (
        !isAdmin()
    ) {

        toast(
            "Vetëm administratori mund të ndryshojë stokun."
        );

        return;
    }


    const stock =
        getJSON(
            STOCK_KEY,
            {}
        );


    stock[productId] =
        Math.max(
            0,
            Number(
                stock[productId] || 0
            ) +
            Number(amount || 0)
        );


    setJSON(
        STOCK_KEY,
        stock
    );


    renderMenu();

    renderAdmin();
}


/* =========================================================
   MENU
========================================================= */

function renderMenu(
    category = "Të gjitha",
    searchTerm = ""
) {

    const grid =
        document.getElementById(
            "menuGrid"
        );

    const categories =
        document.getElementById(
            "categories"
        );


    if (!grid) {
        return;
    }


    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );


    const allCategories = [
        "Të gjitha",
        ...new Set(
            products.map(
                product =>
                    product.category
            )
        )
    ];


    if (categories) {

        categories.innerHTML =
            allCategories.map(
                cat => `

                    <button
                        class="${
                            cat === category
                                ? "active"
                                : ""
                        }"
                        data-category="${escapeHTML(cat)}"
                    >
                        ${escapeHTML(cat)}
                    </button>

                `
            ).join("");


        categories
            .querySelectorAll(
                "button"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        renderMenu(
                            button.dataset.category,
                            document
                                .getElementById("menuSearch")
                                ?.value || ""
                        );
                    }
                );

            });
    }


    const query =
        String(
            searchTerm || ""
        )
        .trim()
        .toLowerCase();


    let filtered =
        products;


    if (
        category !==
        "Të gjitha"
    ) {

        filtered =
            filtered.filter(
                product =>
                    product.category ===
                    category
            );
    }


    if (query) {

        filtered =
            filtered.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(query)
            );
    }


    grid.innerHTML =
        filtered.map(product => {

            const stock =
                getStock(
                    product.id
                );


            return `

                <button
                    class="menu-card
                        ${stock <= 0 ? "disabled" : ""}"
                    ${
                        stock <= 0
                            ? ""
                            : `onclick="addProduct(${product.id})"`
                    }
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


    if (!filtered.length) {

        grid.innerHTML =
            `
            <div class="empty-state">
                Nuk u gjet produkt.
            </div>
            `;
    }
}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const search =
        document.getElementById(
            "menuSearch"
        );


    if (!search) {
        return;
    }


    search.addEventListener(
        "input",
        () => {

            renderMenu(
                getActiveCategory(),
                search.value
            );

        }
    );
}


function getActiveCategory() {

    const active =
        document.querySelector(
            "#categories button.active"
        );

    return active
        ? active.dataset.category
        : "Të gjitha";
}


/* =========================================================
   ORDERS
========================================================= */

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


    if (!product) {
        return;
    }


    const stock =
        getStock(
            productId
        );


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


    if (!table) {
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

        if (
            existing.quantity >=
            stock
        ) {

            toast(
                "Nuk ka më stok."
            );

            return;
        }


        existing.quantity += 1;

    } else {

        table.items.push({

            productId:
                product.id,

            name:
                product.name,

            price:
                Number(product.price),

            quantity: 1

        });
    }


    saveTables(
        tables
    );


    renderTables();

    renderMenu(
        getActiveCategory(),
        document
            .getElementById("menuSearch")
            ?.value || ""
    );

    renderOrder();


    toast(
        product.name +
        " u shtua."
    );
}


function getSelectedTableObject() {

    const id =
        getSelectedTable();

    return getTables().find(
        table =>
            Number(table.id) ===
            Number(id)
    );
}


function getOrderSubtotal(table) {

    if (
        !table ||
        !Array.isArray(table.items)
    ) {
        return 0;
    }


    return table.items.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );
}


function getOrderVat(table) {

    const settings =
        getSettings();


    const subtotal =
        getOrderSubtotal(
            table
        );


    return Math.round(
        subtotal *
        (
            Number(
                settings.vatRate
            ) / 100
        )
    );
}


function getOrderTotal(table) {

    return getOrderSubtotal(
        table
    );
}


/* =========================================================
   RENDER ORDER
========================================================= */

function renderOrder() {

    const container =
        document.getElementById(
            "orderItems"
        );


    if (!container) {
        return;
    }


    const table =
        getSelectedTableObject();


    if (
        !table ||
        !table.items ||
        !table.items.length
    ) {

        container.innerHTML =
            `
            <div class="empty-state">
                Nuk ka produkte në porosi.
            </div>
            `;


        setText(
            "orderSubtotal",
            money(0)
        );

        setText(
            "orderVat",
            money(0)
        );

        setText(
            "orderTotal",
            money(0)
        );

        return;
    }


    let html = "";


    table.items.forEach(
        (item, index) => {

            html += `

                <div class="order-item">

                    <div class="order-item-info">

                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <small>
                            ${money(item.price)}
                            ×
                            ${item.quantity}
                        </small>

                    </div>


                    <div class="order-actions">

                        <button
                            class="qty-btn"
                            onclick="changeOrderQuantity(${index}, -1)"
                        >
                            −
                        </button>

                        <span class="qty">
                            ${item.quantity}
                        </span>

                        <button
                            class="qty-btn"
                            onclick="changeOrderQuantity(${index}, 1)"
                        >
                            +
                        </button>

                        <button
                            class="qty-btn remove-btn"
                            onclick="removeOrderItem(${index})"
                        >
                            ×
                        </button>

                    </div>

                </div>

            `;
        }
    );


    container.innerHTML =
        html;


    const subtotal =
        getOrderSubtotal(
            table
        );

    const vat =
        getOrderVat(
            table
        );

    const total =
        getOrderTotal(
            table
        );


    setText(
        "orderSubtotal",
        money(subtotal)
    );

    setText(
        "orderVat",
        money(vat)
    );

    setText(
        "orderTotal",
        money(total)
    );
}


function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );

    if (element) {
        element.textContent =
            value;
    }
}


function changeOrderQuantity(
    index,
    amount
) {

    const table =
        getSelectedTableObject();


    if (!table) {
        return;
    }


    const item =
        table.items[index];


    if (!item) {
        return;
    }


    const newQuantity =
        Number(item.quantity) +
        Number(amount);


    if (
        newQuantity <= 0
    ) {

        table.items.splice(
            index,
            1
        );

    } else {

        const stock =
            getStock(
                item.productId
            );


        if (
            newQuantity >
            stock
        ) {

            toast(
                "Nuk ka mjaftueshëm stok."
            );

            return;
        }


        item.quantity =
            newQuantity;
    }


    saveTables(
        getTables()
    );


    renderTables();

    renderOrder();
}


function removeOrderItem(
    index
) {

    const table =
        getSelectedTableObject();


    if (!table) {
        return;
    }


    table.items.splice(
        index,
        1
    );


    saveTables(
        getTables()
    );


    renderTables();

    renderOrder();
}


/* =========================================================
   NEW INVOICE
========================================================= */

function newInvoice() {

    const tables =
        getTables();


    const free =
        tables.find(
            table =>
                !table.items ||
                table.items.length === 0
        );


    if (free) {

        selectTable(
            free.id
        );

        toast(
            free.name +
            " u hap për faturë të re."
        );

        return;
    }


    toast(
        "Nuk ka tavolinë të lirë."
    );
}


/* =========================================================
   PAYMENT
========================================================= */

let currentPaymentMethod =
    null;


function openPayment(
    method = null
) {

    const table =
        getSelectedTableObject();


    if (
        !table ||
        !table.items.length
    ) {

        toast(
            "Porosia është bosh."
        );

        return;
    }


    currentPaymentMethod =
        method;


    const total =
        getOrderTotal(
            table
        );


    setText(
        "paymentTotal",
        money(total)
    );


    showModal(
        "paymentModal"
    );
}


function closePayment() {

    hideModal(
        "paymentModal"
    );

    currentPaymentMethod =
        null;
}


function completePayment(
    method
) {

    const table =
        getSelectedTableObject();


    if (
        !table ||
        !table.items.length
    ) {

        toast(
            "Porosia është bosh."
        );

        return;
    }


    for (
        const item of table.items
    ) {

        if (
            item.quantity >
            getStock(
                item.productId
            )
        ) {

            toast(
                "Stoku nuk është i mjaftueshëm për " +
                item.name
            );

            return;
        }
    }


    const subtotal =
        getOrderSubtotal(
            table
        );


    const vat =
        getOrderVat(
            table
        );


    const total =
        getOrderTotal(
            table
        );


    const session =
        getCurrentSession();


    const invoice = {

        id:
            Date.now(),

        number:
            "INV-" +
            new Date()
                .getTime(),

        date:
            new Date()
                .toISOString(),

        table:
            table.id,

        tableName:
            table.name,

        waiterName:
            session
                ? session.name
                : "Pa emër",

        waiter:
            session
                ? session.username
                : "",

        items:
            JSON.parse(
                JSON.stringify(
                    table.items
                )
            ),

        subtotal,

        vat,

        vatRate:
            getSettings()
                .vatRate,

        total,

        amount:
            total,

        payment:
            method,

        paymentMethod:
            method,

        fiscalized:
            false,

        fiscalStatus:
            "NOT_FISCALIZED"

    };


    /* decrease stock */

    const stock =
        getJSON(
            STOCK_KEY,
            {}
        );


    table.items.forEach(
        item => {

            stock[item.productId] =
                Math.max(
                    0,
                    Number(
                        stock[
                            item.productId
                        ] || 0
                    ) -
                    Number(
                        item.quantity
                    )
                );
        }
    );


    setJSON(
        STOCK_KEY,
        stock
    );


    /* save invoice */

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );


    invoices.push(
        invoice
    );


    setJSON(
        INVOICES_KEY,
        invoices
    );


    /* clear table */

    table.items = [];


    saveTables(
        getTables()
    );


    closePayment();


    showInvoice(
        invoice
    );


    renderTables();

    renderOrder();

    renderMenu(
        getActiveCategory(),
        document
            .getElementById("menuSearch")
            ?.value || ""
    );

    updateDashboard();


    toast(
        "Fatura u krijua."
    );
}


/* =========================================================
   INVOICE
========================================================= */

let currentInvoice =
    null;


function showInvoice(
    invoice
) {

    currentInvoice =
        invoice;


    const settings =
        getSettings();


    setText(
        "invoiceBusinessName",
        settings.businessName
    );

    setText(
        "invoiceAddress",
        settings.address
    );

    setText(
        "invoiceNipt",
        settings.nipt ||
        "—"
    );

    setText(
        "invoicePhone",
        settings.phone ||
        "—"
    );

    setText(
        "invoiceNumber",
        invoice.number
    );

    setText(
        "invoiceDate",
        new Date(
            invoice.date
        ).toLocaleString(
            "sq-AL"
        )
    );

    setText(
        "invoiceTable",
        invoice.tableName
    );

    setText(
        "invoiceWaiter",
        invoice.waiterName
    );

    setText(
        "invoiceTotal",
        money(invoice.total)
    );

    setText(
        "invoicePayment",
        paymentLabel(
            invoice.payment
        )
    );

    setText(
        "invoiceVat",
        money(invoice.vat)
    );


    const items =
        document.getElementById(
            "invoiceItems"
        );


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
                                Number(item.price) *
                                Number(item.quantity)
                            )}
                        </strong>

                    </div>

                `
            ).join("");
    }


    showModal(
        "invoiceModal"
    );
}


function paymentLabel(
    method
) {

    if (method === "card") {
        return "KARTË";
    }

    if (method === "cash") {
        return "CASH";
    }

    return method ||
        "—";
}


function closeInvoice() {

    hideModal(
        "invoiceModal"
    );

    currentInvoice =
        null;
}


/* =========================================================
   FISCALIZATION
========================================================= */

function fiscalizeInvoice() {

    if (!currentInvoice) {

        toast(
            "Nuk ka faturë aktive."
        );

        return;
    }


    /*
       IMPORTANT:

       Ky funksion NUK pretendon të bëjë
       fiskalizim real.

       Fiskalizimi real kërkon backend,
       kredenciale/certifikatë dhe integrim
       me shërbimin fiskal përkatës.
    */


    currentInvoice.fiscalized =
        false;

    currentInvoice.fiscalStatus =
        "NOT_CONNECTED";


    toast(
        "Fiskalizimi real nuk është lidhur me backend."
    );
}


/* =========================================================
   PRINT
========================================================= */

function printInvoice() {

    if (!currentInvoice) {

        toast(
            "Nuk ka faturë për printim."
        );

        return;
    }


    window.print();
}


/* =========================================================
   TRANSFER
========================================================= */

function openTransfer() {

    const tables =
        getTables();


    const from =
        document.getElementById(
            "transferFrom"
        );

    const to =
        document.getElementById(
            "transferTo"
        );


    if (!from || !to) {
        return;
    }


    from.innerHTML =
        tables.map(
            table => `

                <option
                    value="${table.id}"
                >
                    ${escapeHTML(table.name)}
                </option>

            `
        ).join("");


    to.innerHTML =
        tables.map(
            table => `

                <option
                    value="${table.id}"
                >
                    ${escapeHTML(table.name)}
                </option>

            `
        ).join("");


    const selected =
        getSelectedTable();


    if (selected) {

        from.value =
            String(selected);
    }


    showModal(
        "transferModal"
    );
}


function closeTransfer() {

    hideModal(
        "transferModal"
    );
}


function confirmTransfer() {

    const from =
        Number(
            document.getElementById(
                "transferFrom"
            )?.value
        );


    const to =
        Number(
            document.getElementById(
                "transferTo"
            )?.value
        );


    if (!from || !to) {
        return;
    }


    if (from === to) {

        toast(
            "Zgjidh një tavolinë tjetër."
        );

        return;
    }


    const tables =
        getTables();


    const source =
        tables.find(
            table =>
                table.id === from
        );


    const destination =
        tables.find(
            table =>
                table.id === to
        );


    if (!source || !destination) {
        return;
    }


    if (
        !source.items ||
        !source.items.length
    ) {

        toast(
            "Tavolina burim është bosh."
        );

        return;
    }


    if (
        destination.items &&
        destination.items.length
    ) {

        toast(
            "Tavolina destinacion nuk është bosh."
        );

        return;
    }


    destination.items =
        source.items;


    source.items =
        [];


    saveTables(
        tables
    );


    selectTable(
        to
    );


    closeTransfer();


    toast(
        "Porosia u transferua."
    );
}


/* =========================================================
   TABLE DETAILS
========================================================= */

function openTableDetails() {

    const table =
        getSelectedTableObject();


    const content =
        document.getElementById(
            "tableDetailsContent"
        );


    if (!content) {
        return;
    }


    if (!table) {

        content.innerHTML =
            `
            <div class="empty-state">
                Zgjidh një tavolinë.
            </div>
            `;

        showModal(
            "tableDetailsModal"
        );

        return;
    }


    const total =
        getOrderTotal(
            table
        );


    content.innerHTML = `

        <div class="section-title">

            <strong>
                ${escapeHTML(table.name)}
            </strong>

            <span>
                ${money(total)}
            </span>

        </div>

        ${
            table.items.length
                ? table.items.map(
                    item => `

                        <div class="admin-row">

                            <div>

                                <strong>
                                    ${escapeHTML(item.name)}
                                </strong>

                                <small>
                                    ${item.quantity}
                                    ×
                                    ${money(item.price)}
                                </small>

                            </div>

                            <strong>
                                ${money(
                                    item.quantity *
                                    item.price
                                )}
                            </strong>

                        </div>

                    `
                ).join("")
                : `
                    <div class="empty-state">
                        Tavolina është bosh.
                    </div>
                `
        }

    `;


    showModal(
        "tableDetailsModal"
    );
}


function closeTableDetails() {

    hideModal(
        "tableDetailsModal"
    );
}


/* =========================================================
   CLOSE TABLE
========================================================= */

function closeTable() {

    const table =
        getSelectedTableObject();


    if (!table) {

        toast(
            "Zgjidh një tavolinë."
        );

        return;
    }


    if (!table.items.length) {

        toast(
            "Tavolina është bosh."
        );

        return;
    }


    openPayment();
}


/* =========================================================
   SUMMARY
========================================================= */

function openSummary() {

    const invoices =
        getTodayInvoices();


    const cash =
        invoices
            .filter(
                invoice =>
                    invoice.payment ===
                    "cash"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(
                        invoice.total
                    ),
                0
            );


    const card =
        invoices
            .filter(
                invoice =>
                    invoice.payment ===
                    "card"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(
                        invoice.total
                    ),
                0
            );


    const total =
        invoices.reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.total
                ),
            0
        );


    const content =
        document.getElementById(
            "summaryContent"
        );


    if (content) {

        content.innerHTML = `

            <div class="stats">

                <div class="stat">

                    <small>
                        TOTAL
                    </small>

                    <strong>
                        ${money(total)}
                    </strong>

                </div>

                <div class="stat">

                    <small>
                        CASH
                    </small>

                    <strong>
                        ${money(cash)}
                    </strong>

                </div>

                <div class="stat">

                    <small>
                        KARTË
                    </small>

                    <strong>
                        ${money(card)}
                    </strong>

                </div>

                <div class="stat">

                    <small>
                        FATURA
                    </small>

                    <strong>
                        ${invoices.length}
                    </strong>

                </div>

            </div>

        `;
    }


    showModal(
        "summaryModal"
    );
}


function closeSummary() {

    hideModal(
        "summaryModal"
    );
}


/* =========================================================
   MY INVOICES
========================================================= */

function openMyInvoices() {

    const session =
        getCurrentSession();


    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );


    const mine =
        session &&
        session.role === "admin"
            ? invoices
            : invoices.filter(
                invoice =>
                    invoice.waiter ===
                    session.username
            );


    const list =
        document.getElementById(
            "myInvoicesList"
        );


    if (!list) {
        return;
    }


    if (!mine.length) {

        list.innerHTML =
            `
            <div class="empty-state">
                Nuk ka fatura.
            </div>
            `;

    } else {

        list.innerHTML =
            [...mine]
                .reverse()
                .map(
                    invoice => `

                        <div class="admin-row">

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
                                    ${paymentLabel(
                                        invoice.payment
                                    )}
                                    •
                                    ${new Date(
                                        invoice.date
                                    ).toLocaleString(
                                        "sq-AL"
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
                )
                .join("");
    }


    showModal(
        "myInvoicesModal"
    );
}


function closeMyInvoices() {

    hideModal(
        "myInvoicesModal"
    );
}


/* =========================================================
   SHIFT
========================================================= */

function initializeShift() {

    if (
        !localStorage.getItem(
            SHIFT_KEY
        )
    ) {

        setJSON(
            SHIFT_KEY,
            {
                open: false,
                openedAt: null,
                openedBy: null
            }
        );
    }
}


function getShift() {

    return getJSON(
        SHIFT_KEY,
        {
            open: false,
            openedAt: null,
            openedBy: null
        }
    );
}


function openShift() {

    const shift =
        getShift();


    const session =
        getCurrentSession();


    const content =
        document.getElementById(
            "shiftContent"
        );


    if (!content) {
        return;
    }


    if (!shift.open) {

        content.innerHTML = `

            <div class="empty-state">

                Turni nuk është hapur.

            </div>

            <div class="modal-actions">

                <button
                    class="primary"
                    onclick="startShift()"
                >
                    HAP TURNIN
                </button>

            </div>

        `;

    } else {

        const invoices =
            getTodayInvoices();


        const total =
            invoices.reduce(
                (sum, invoice) =>
                    sum +
                    Number(invoice.total),
                0
            );


        content.innerHTML = `

            <div class="stat">

                <small>
                    TURNI
                </small>

                <strong>
                    AKTIV
                </strong>

            </div>

            <br>

            <div class="admin-row">

                <div>

                    <strong>
                        Hapur nga
                    </strong>

                    <small>
                        ${escapeHTML(
                            shift.openedBy ||
                            "—"
                        )}
                    </small>

                </div>

                <strong>
                    ${new Date(
                        shift.openedAt
                    ).toLocaleTimeString(
                        "sq-AL"
                    )}
                </strong>

            </div>

            <div class="admin-row">

                <div>

                    <strong>
                        Shitje
                    </strong>

                    <small>
                        ${invoices.length} fatura
                    </small>

                </div>

                <strong>
                    ${money(total)}
                </strong>

            </div>

            <div class="modal-actions">

                <button
                    class="primary"
                    onclick="closeShiftNow()"
                >
                    MBYLL TURNIN
                </button>

            </div>

        `;
    }


    showModal(
        "shiftModal"
    );
}


function startShift() {

    const session =
        getCurrentSession();


    setJSON(
        SHIFT_KEY,
        {
            open: true,
            openedAt: Date.now(),
            openedBy:
                session
                    ? session.name
                    : "Pa emër"
        }
    );


    openShift();


    toast(
        "Turni u hap."
    );
}


function closeShiftNow() {

    const shift =
        getShift();


    if (!shift.open) {
        return;
    }


    setJSON(
        SHIFT_KEY,
        {
            open: false,
            openedAt: null,
            openedBy: null
        }
    );


    closeShift();


    toast(
        "Turni u mbyll."
    );
}


function closeShift() {

    hideModal(
        "shiftModal"
    );
}


/* =========================================================
   DASHBOARD
========================================================= */

function getTodayInvoices() {

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );


    const today =
        new Date()
            .toDateString();


    return invoices.filter(
        invoice =>
            new Date(
                invoice.date
            ).toDateString() ===
            today
    );
}


function updateDashboard() {

    const invoices =
        getTodayInvoices();


    const sales =
        invoices.reduce(
            (sum, invoice) =>
                sum +
                Number(
                    invoice.total || 0
                ),
            0
        );


    const card =
        invoices
            .filter(
                invoice =>
                    invoice.payment ===
                    "card"
            )
            .reduce(
                (sum, invoice) =>
                    sum +
                    Number(
                        invoice.total || 0
                    ),
                0
            );


    const activeTables =
        getTables()
            .filter(
                table =>
                    table.items &&
                    table.items.length
            )
            .length;


    setText(
        "salesToday",
        money(sales)
    );

    setText(
        "activeTables",
        activeTables
    );

    setText(
        "invoiceToday",
        invoices.length
    );

    setText(
        "cardToday",
        money(card)
    );
}


/* =========================================================
   ADMIN
========================================================= */

function renderAdmin() {

    if (!isAdmin()) {
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
                (user, index) => {

                    if (
                        user.username ===
                        "admin"
                    ) {

                        return `

                            <div class="admin-row">

                                <div>

                                    <strong>
                                        Administrator
                                    </strong>

                                    <small>
                                        admin • ADMIN
                                    </small>

                                </div>

                            </div>

                        `;
                    }


                    return `

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
                                    • KAMARIER
                                </small>

                            </div>

                            <button
                                class="delete"
                                onclick="deleteWaiter(${index})"
                            >
                                FSHI
                            </button>

                        </div>

                    `;

                }
            ).join("");
    }


    const productsList =
        document.getElementById(
            "adminProducts"
        );


    if (productsList) {

        const products =
            getJSON(
                PRODUCTS_KEY,
                DEFAULT_PRODUCTS
            );


        productsList.innerHTML =
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
}


/* =========================================================
   ADMIN MODALS
========================================================= */

function openAdmin() {

    if (!isAdmin()) {

        toast(
            "Nuk ke akses."
        );

        return;
    }


    renderAdmin();

    loadSettingsIntoForm();

    showModal(
        "adminModal"
    );
}


function closeAdmin() {

    hideModal(
        "adminModal"
    );
}


function openAddWaiter() {

    if (!isAdmin()) {
        return;
    }


    document.getElementById(
        "newWaiterName"
    ).value = "";


    document.getElementById(
        "newWaiterUsername"
    ).value = "";


    document.getElementById(
        "newWaiterPassword"
    ).value = "";


    showModal(
        "addWaiterModal"
    );
}


function closeAddWaiter() {

    hideModal(
        "addWaiterModal"
    );
}


function saveWaiter() {

    if (!isAdmin()) {
        return;
    }


    const name =
        document
            .getElementById(
                "newWaiterName"
            )
            .value
            .trim();


    const username =
        document
            .getElementById(
                "newWaiterUsername"
            )
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById(
                "newWaiterPassword"
            )
            .value
            .trim();


    if (
        !name ||
        !username ||
        !password
    ) {

        toast(
            "Plotëso të gjitha fushat."
        );

        return;
    }


    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );


    if (
        users.some(
            user =>
                user.username
                    .toLowerCase() ===
                username
        )
    ) {

        toast(
            "Ky username ekziston."
        );

        return;
    }


    users.push({

        username,

        password,

        role: "waiter",

        name

    });


    setJSON(
        USERS_KEY,
        users
    );


    closeAddWaiter();

    renderAdmin();


    toast(
        "Kamarieri u shtua."
    );
}


function deleteWaiter(
    index
) {

    if (!isAdmin()) {
        return;
    }


    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );


    if (!users[index]) {
        return;
    }


    if (
        users[index].username ===
        "admin"
    ) {
        return;
    }


    const confirmed =
        confirm(
            "Dëshiron ta fshish këtë kamarier?"
        );


    if (!confirmed) {
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


function changeAdminPassword() {

    if (!isAdmin()) {
        return;
    }


    const newPassword =
        prompt(
            "Shkruaj password-in e ri:"
        );


    if (!newPassword) {
        return;
    }


    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );


    const admin =
        users.find(
            user =>
                user.username ===
                "admin"
        );


    if (!admin) {
        return;
    }


    admin.password =
        newPassword;


    setJSON(
        USERS_KEY,
        users
    );


    toast(
        "Password-i u ndryshua."
    );
}


/* =========================================================
   LOCK / LOGOUT
========================================================= */

function lockSystem() {

    const confirmed =
        confirm(
            "Dëshiron të bllokosh sistemin?"
        );


    if (!confirmed) {
        return;
    }


    window.location.href =
        "login.html";
}


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


/* =========================================================
   MODAL HELPERS
========================================================= */

function showModal(id) {

    const modal =
        document.getElementById(
            id
        );


    if (modal) {

        modal.style.display =
            "flex";
    }
}


function hideModal(id) {

    const modal =
        document.getElementById(
            id
        );


    if (modal) {

        modal.style.display =
            "none";
    }
}


/* =========================================================
   GLOBAL MODAL CLOSE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            event.target.style.display =
                "none";
        }

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

window.newInvoice =
    newInvoice;

window.openPayment =
    openPayment;

window.closePayment =
    closePayment;

window.completePayment =
    completePayment;

window.closeInvoice =
    closeInvoice;

window.fiscalizeInvoice =
    fiscalizeInvoice;

window.printInvoice =
    printInvoice;

window.openTransfer =
    openTransfer;

window.closeTransfer =
    closeTransfer;

window.confirmTransfer =
    confirmTransfer;

window.openTableDetails =
    openTableDetails;

window.closeTableDetails =
    closeTableDetails;

window.closeTable =
    closeTable;

window.openSummary =
    openSummary;

window.closeSummary =
    closeSummary;

window.openMyInvoices =
    openMyInvoices;

window.closeMyInvoices =
    closeMyInvoices;

window.openShift =
    openShift;

window.startShift =
    startShift;

window.closeShiftNow =
    closeShiftNow;

window.closeShift =
    closeShift;

window.openAdmin =
    openAdmin;

window.closeAdmin =
    closeAdmin;

window.openAddWaiter =
    openAddWaiter;

window.closeAddWaiter =
    closeAddWaiter;

window.saveWaiter =
    saveWaiter;

window.deleteWaiter =
    deleteWaiter;

window.changeStock =
    changeStock;

window.saveSettings =
    saveSettings;

window.changeAdminPassword =
    changeAdminPassword;

window.lockSystem =
    lockSystem;

window.logout =
    logout;


/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeApp();

        console.log(
            "MY BAR NEW SYSTEM loaded."
        );

    }
);
