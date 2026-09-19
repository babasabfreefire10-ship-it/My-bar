"use strict";

/* =========================================================
   MY BAR — APP.JS
   Version i ri nga zero
========================================================= */

/* =========================
   STORAGE KEYS
========================= */

const USERS_KEY = "MYBAR_USERS_V2";
const SESSION_KEY = "MYBAR_SESSION_V2";
const CURRENT_USER_KEY = "MYBAR_CURRENT_USER";

const TABLES_KEY = "MYBAR_TABLES_V2";
const PRODUCTS_KEY = "MYBAR_PRODUCTS_V2";
const INVOICES_KEY = "MYBAR_INVOICES_V2";
const INVENTORY_KEY = "MYBAR_INVENTORY_V2";
const SETTINGS_KEY = "MYBAR_SETTINGS_V2";
const SELECTED_TABLE_KEY = "MYBAR_SELECTED_TABLE_V2";


/* =========================
   DEFAULT USERS
========================= */

const DEFAULT_USERS = [
    {
        username: "admin",
        password: "1234",
        role: "admin",
        name: "ADMIN"
    },
    {
        username: "sabi",
        password: "1234",
        role: "waiter",
        name: "SABI"
    },
    {
        username: "mondi",
        password: "1234",
        role: "waiter",
        name: "MONDI"
    }
];


/* =========================
   DEFAULT SETTINGS
========================= */

const DEFAULT_SETTINGS = {
    appName: "MY BAR",
    welcomeTitle: "MIRË SE VINI",
    businessName: "MY BAR",
    nipt: "",
    address: "",
    phone: "",
    footer: "Faleminderit për vizitën!",
    tableCount: 12
};


/* =========================
   DEFAULT PRODUCTS
========================= */

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

    /* PIJE */

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

    { id: 110, name: "Baileys", category: "Liqueur & Amaro", price: 450 },
    { id: 111, name: "Jägermeister", category: "Liqueur & Amaro", price: 450 },
    { id: 112, name: "Aperol", category: "Liqueur & Amaro", price: 400 },

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

function readJSON(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error("Storage error:", key, error);

        return fallback;
    }
}


function writeJSON(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}


function money(value) {

    const number = Number(value || 0);

    return number.toLocaleString("sq-AL") + " L";
}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function getCurrentUser() {

    return readJSON(
        SESSION_KEY,
        null
    );
}


function getSettings() {

    return readJSON(
        SETTINGS_KEY,
        DEFAULT_SETTINGS
    );
}


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeApp() {

    /* USERS */

    if (!localStorage.getItem(USERS_KEY)) {

        writeJSON(
            USERS_KEY,
            DEFAULT_USERS
        );
    }


    /* PRODUCTS */

    if (!localStorage.getItem(PRODUCTS_KEY)) {

        writeJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );
    }


    /* INVOICES */

    if (!localStorage.getItem(INVOICES_KEY)) {

        writeJSON(
            INVOICES_KEY,
            []
        );
    }


    /* SETTINGS */

    if (!localStorage.getItem(SETTINGS_KEY)) {

        writeJSON(
            SETTINGS_KEY,
            DEFAULT_SETTINGS
        );
    }


    /* TABLES */

    initializeTables();


    /* INVENTORY */

    initializeInventory();

}


/* =========================================================
   TABLES
========================================================= */

function initializeTables() {

    const settings =
        getSettings();

    const count =
        Math.max(
            1,
            Number(settings.tableCount || 12)
        );

    let tables =
        readJSON(
            TABLES_KEY,
            []
        );


    if (!Array.isArray(tables)) {

        tables = [];
    }


    /*
       Nëse kemi më pak tavolina,
       shtojmë tavolina.
    */

    for (
        let i = tables.length + 1;
        i <= count;
        i++
    ) {

        tables.push({

            id: i,

            name: "Tavolina " + i,

            items: [],

            openedAt: null,

            waiter: null

        });

    }


    /*
       Nëse kemi më shumë tavolina,
       i mbajmë që të mos humbasim të dhëna.
    */


    writeJSON(
        TABLES_KEY,
        tables
    );

}


function getTables() {

    return readJSON(
        TABLES_KEY,
        []
    );
}


function saveTables(tables) {

    writeJSON(
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


function setSelectedTable(id) {

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(id)
    );

}


function selectTable(id) {

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === Number(id)
        );

    if (!table) {
        return;
    }

    setSelectedTable(id);

    renderTables();
    renderOrder();

    toast(
        table.name + " u zgjodh."
    );

}


/* =========================================================
   FIND FIRST FREE TABLE
========================================================= */

function findFirstFreeTable() {

    const tables =
        getTables();

    return tables.find(
        table =>
            !table.items ||
            table.items.length === 0
    );

}


/* =========================================================
   NEW INVOICE
========================================================= */

function newInvoice() {

    const freeTable =
        findFirstFreeTable();

    if (!freeTable) {

        toast(
            "Të gjitha tavolinat janë të zëna."
        );

        return;
    }


    setSelectedTable(
        freeTable.id
    );


    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.id)
                === Number(freeTable.id)
        );


    if (table) {

        table.items = [];

        table.openedAt =
            Date.now();

        const user =
            getCurrentUser();

        table.waiter =
            user
                ? user.name
                : "";

    }


    saveTables(tables);

    renderTables();
    renderOrder();
    renderMenu();

    toast(
        freeTable.name +
        " u hap për faturë të re."
    );

}


/* =========================================================
   INVENTORY
========================================================= */

function initializeInventory() {

    const products =
        readJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const stock =
        readJSON(
            INVENTORY_KEY,
            {}
        );


    products.forEach(
        product => {

            if (
                stock[product.id]
                === undefined
            ) {

                stock[product.id] = 20;

            }

        }
    );


    writeJSON(
        INVENTORY_KEY,
        stock
    );

}


function getStock(productId) {

    const stock =
        readJSON(
            INVENTORY_KEY,
            {}
        );

    return Number(
        stock[productId] || 0
    );

}


function changeStock(
    productId,
    amount
) {

    const stock =
        readJSON(
            INVENTORY_KEY,
            {}
        );


    stock[productId] =
        Math.max(
            0,
            Number(
                stock[productId] || 0
            ) + Number(amount || 0)
        );


    writeJSON(
        INVENTORY_KEY,
        stock
    );


    renderMenu();
    renderAdmin();

}


/* =========================================================
   TIME
========================================================= */

function isMorningOffer() {

    const now =
        new Date();

    const minutes =
        now.getHours() * 60
        + now.getMinutes();


    const start =
        6 * 60 + 40;

    const end =
        9 * 60 + 40;


    return (
        minutes >= start
        &&
        minutes <= end
    );

}


function isCoffeeClosed() {

    const now =
        new Date();

    const minutes =
        now.getHours() * 60
        + now.getMinutes();


    const start =
        20 * 60;

    const end =
        24 * 60;


    return (
        minutes >= start
        &&
        minutes < end
    );

}


/* =========================================================
   PRODUCT PRICE
========================================================= */

function getProductPrice(product) {

    let price =
        Number(product.price || 0);


    /*
       Oferta e mëngjesit
       06:40 - 09:40

       10% ulje vetëm për Kafe.
    */

    if (
        isMorningOffer()
        &&
        product.category === "Kafe"
    ) {

        price =
            Math.round(
                price * 0.90
            );

    }


    return price;

}


/* =========================================================
   HEADER
========================================================= */

function renderHeader() {

    const settings =
        getSettings();

    const user =
        getCurrentUser();


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
            settings.appName ||
            "MY BAR";

    }


    if (
        userInfo
        &&
        user
    ) {

        userInfo.textContent =
            user.name
            +
            " • "
            +
            (
                user.role === "admin"
                    ? "ADMIN"
                    : "KAMARIER"
            );

    }

}


/* =========================================================
   TABLES UI
========================================================= */

function renderTables() {

    const dashboardTables =
        document.getElementById(
            "dashboardTables"
        );

    const tableGrid =
        document.getElementById(
            "tableGrid"
        );


    const tables =
        getTables();


    const selected =
        getSelectedTable();


    const html =
        tables.map(
            table => {

                const active =
                    table.items
                    &&
                    table.items.length > 0;


                const total =
                    getOrderTotal(table);


                return `
                    <button
                        class="table-card
                        ${active ? "active" : ""}
                        ${selected === Number(table.id) ? "selected" : ""}"
                        onclick="selectTable(${Number(table.id)})"
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

            }
        ).join("");


    if (dashboardTables) {

        dashboardTables.innerHTML =
            html;

    }


    if (tableGrid) {

        tableGrid.innerHTML =
            html;

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


/* =========================================================
   MENU
========================================================= */

function renderMenu(
    selectedCategory = "Të gjitha"
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
        readJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );


    let allCategories = [
        "Të gjitha",
        ...new Set(
            products.map(
                product =>
                    product.category
            )
        )
    ];


    /*
       Nga ora 20:00
       Kafe nuk shfaqet.
    */

    if (isCoffeeClosed()) {

        allCategories =
            allCategories.filter(
                category =>
                    category !== "Kafe"
            );

    }


    if (
        selectedCategory === "Kafe"
        &&
        isCoffeeClosed()
    ) {

        selectedCategory =
            "Të gjitha";

    }


    if (categories) {

        categories.innerHTML =
            allCategories.map(
                category => `
                    <button
                        class="${
                            category === selectedCategory
                                ? "active"
                                : ""
                        }"
                        onclick="renderMenu('${escapeHTML(category)}')"
                    >
                        ${escapeHTML(category)}
                    </button>
                `
            ).join("");

    }


    let filtered;


    if (
        selectedCategory === "Të gjitha"
    ) {

        filtered =
            products;

    } else {

        filtered =
            products.filter(
                product =>
                    product.category
                    ===
                    selectedCategory
            );

    }


    if (isCoffeeClosed()) {

        filtered =
            filtered.filter(
                product =>
                    product.category
                    !== "Kafe"
            );

    }


    grid.innerHTML =
        filtered.map(
            product => {

                const stock =
                    getStock(product.id);


                const price =
                    getProductPrice(
                        product
                    );


                return `
                    <button
                        class="menu-card"
                        ${
                            stock <= 0
                                ? "disabled"
                                : ""
                        }
                        onclick="addProduct(${Number(product.id)})"
                    >

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <span>
                            ${money(price)}
                        </span>

                        <small>
                            Stok: ${stock}
                        </small>

                    </button>
                `;

            }
        ).join("");

}


/* =========================================================
   ADD PRODUCT
========================================================= */

function addProduct(productId) {

    let tableId =
        getSelectedTable();


    /*
       Nëse nuk ka tavolinë,
       hapim automatikisht të parën e lirë.
    */

    if (!tableId) {

        const freeTable =
            findFirstFreeTable();


        if (!freeTable) {

            toast(
                "Nuk ka tavolinë të lirë."
            );

            return;
        }


        tableId =
            freeTable.id;


        setSelectedTable(
            tableId
        );

    }


    const products =
        readJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );


    const product =
        products.find(
            p =>
                Number(p.id)
                ===
                Number(productId)
        );


    if (!product) {
        return;
    }


    /*
       Kafe nuk lejohet pas 20:00.
    */

    if (
        product.category === "Kafe"
        &&
        isCoffeeClosed()
    ) {

        toast(
            "Kafeja nuk është aktive pas orës 20:00."
        );

        return;

    }


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
                Number(t.id)
                ===
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
                Number(item.productId)
                ===
                Number(productId)
        );


    if (existing) {

        if (
            existing.quantity
            >= stock
        ) {

            toast(
                "Nuk ka më stok."
            );

            return;

        }


        existing.quantity++;

    } else {

        table.items.push({

            productId:
                product.id,

            name:
                product.name,

            price:
                getProductPrice(product),

            quantity:
                1

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

function getOrderTotal(table) {

    if (
        !table
        ||
        !Array.isArray(table.items)
    ) {

        return 0;

    }


    return table.items.reduce(
        (
            total,
            item
        ) =>
            total
            +
            Number(item.price || 0)
            *
            Number(item.quantity || 0),
        0
    );

}


function renderOrder() {

    const container =
        document.getElementById(
            "orderItems"
        );


    const totalElement =
        document.getElementById(
            "orderTotal"
        );


    if (!container) {
        return;
    }


    const tableId =
        getSelectedTable();


    const tables =
        getTables();


    const table =
        tables.find(
            t =>
                Number(t.id)
                ===
                Number(tableId)
        );


    if (
        !table
        ||
        !table.items
        ||
        !table.items.length
    ) {

        container.innerHTML =
            `
                <div class="empty-state">
                    Nuk ka produkte në porosi.
                </div>
            `;


        if (totalElement) {

            totalElement.textContent =
                money(0);

        }


        return;

    }


    let total = 0;


    container.innerHTML =
        table.items.map(
            (
                item,
                index
            ) => {

                const itemTotal =
                    Number(item.price)
                    *
                    Number(item.quantity);


                total +=
                    itemTotal;


                return `
                    <div class="order-item">

                        <div>

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
                                onclick="changeOrderQuantity(${index},-1)"
                            >
                                −
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="changeOrderQuantity(${index},1)"
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


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeOrderQuantity(
    index,
    amount
) {

    const tableId =
        getSelectedTable();


    const tables =
        getTables();


    const table =
        tables.find(
            t =>
                Number(t.id)
                ===
                Number(tableId)
        );


    if (!table) {
        return;
    }


    const item =
        table.items[index];


    if (!item) {
        return;
    }


    const newQuantity =
        Number(item.quantity)
        +
        Number(amount);


    if (newQuantity <= 0) {

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
            newQuantity
            >
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


    saveTables(tables);

    renderTables();
    renderOrder();

}


/* =========================================================
   REMOVE ORDER ITEM
========================================================= */

function removeOrderItem(index) {

    const tableId =
        getSelectedTable();


    const tables =
        getTables();


    const table =
        tables.find(
            t =>
                Number(t.id)
                ===
                Number(tableId)
        );


    if (!table) {
        return;
    }


    table.items.splice(
        index,
        1
    );


    saveTables(tables);

    renderTables();
    renderOrder();

}


/* =========================================================
   PAYMENT
========================================================= */

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
                Number(t.id)
                ===
                Number(tableId)
        );


    if (
        !table
        ||
        !table.items
        ||
        !table.items.length
    ) {

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

        modal.style.display =
            "flex";

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

        modal.style.display =
            "none";

    }

}


/* =========================================================
   COMPLETE PAYMENT
========================================================= */

function completePayment(
    method
) {

    const tableId =
        getSelectedTable();


    if (!tableId) {
        return;
    }


    const tables =
        getTables();


    const table =
        tables.find(
            t =>
                Number(t.id)
                ===
                Number(tableId)
        );


    if (
        !table
        ||
        !table.items
        ||
        !table.items.length
    ) {

        toast(
            "Porosia është bosh."
        );

        return;

    }


    /* Kontrollo stokun */

    for (
        const item
        of table.items
    ) {

        const stock =
            getStock(
                item.productId
            );


        if (
            Number(item.quantity)
            >
            stock
        ) {

            toast(
                "Stoku nuk mjafton për " +
                item.name
            );

            return;

        }

    }


    /* Ul stokun */

    for (
        const item
        of table.items
    ) {

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
        readJSON(
            INVOICES_KEY,
            []
        );


    const invoice = {

        id:
            Date.now(),

        number:
            "INV-" +
            Date.now(),

        date:
            new Date().toISOString(),

        createdAt:
            Date.now(),

        table:
            table.id,

        tableName:
            table.name,

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


    invoices.push(
        invoice
    );


    writeJSON(
        INVOICES_KEY,
        invoices
    );


    /*
       Mbyll tavolinën.
    */

    table.items = [];

    table.openedAt =
        null;

    table.waiter =
        null;


    saveTables(
        tables
    );


    closePayment();


    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );


    renderTables();
    renderOrder();
    renderMenu();
    updateDashboard();
    renderHistory();


    showInvoice(
        invoice
    );


    toast(
        "Pagesa u krye me sukses."
    );

}


/* =========================================================
   INVOICE
========================================================= */

function showInvoice(
    invoice
) {

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
                            ×
                            ${item.quantity}
                        </span>

                        <strong>
                            ${money(
                                Number(item.price)
                                *
                                Number(item.quantity)
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

        modal.style.display =
            "flex";

    }

}


/* =========================================================
   CLOSE INVOICE
========================================================= */

function closeInvoice() {

    const modal =
        document.getElementById(
            "invoiceModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =========================================================
   PRINT
========================================================= */

function printInvoice() {

    const invoice =
        getLastInvoice();


    if (!invoice) {

        toast(
            "Nuk u gjet fatura."
        );

        return;

    }


    const settings =
        getSettings();


    const rows =
        invoice.items.map(
            item => `
                <tr>

                    <td>
                        ${escapeHTML(item.name)}
                    </td>

                    <td>
                        ${item.quantity}
                    </td>

                    <td>
                        ${money(
                            Number(item.price)
                            *
                            Number(item.quantity)
                        )}
                    </td>

                </tr>
            `
        ).join("");


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=420,height=700"
        );


    if (!printWindow) {

        toast(
            "Lejo popup-et për printim."
        );

        return;

    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                ${escapeHTML(invoice.number)}
            </title>

            <style>

                body{
                    font-family:Arial,sans-serif;
                    width:80mm;
                    margin:auto;
                    color:#000;
                    font-size:12px;
                }

                h2{
                    text-align:center;
                    margin-bottom:5px;
                }

                p{
                    margin:3px 0;
                }

                table{
                    width:100%;
                    border-collapse:collapse;
                    margin-top:10px;
                }

                th,td{
                    padding:4px 0;
                    border-bottom:1px dashed #999;
                    text-align:left;
                }

                .total{
                    font-size:16px;
                    font-weight:bold;
                    text-align:right;
                    margin-top:10px;
                }

                .center{
                    text-align:center;
                }

            </style>

        </head>

        <body>

            <h2>
                ${escapeHTML(
                    settings.businessName
                    ||
                    "MY BAR"
                )}
            </h2>

            <p class="center">
                ${escapeHTML(
                    settings.address
                    ||
                    ""
                )}
            </p>

            <p>
                Fatura:
                ${escapeHTML(invoice.number)}
            </p>

            <p>
                Tavolina:
                ${escapeHTML(invoice.tableName)}
            </p>

            <p>
                Kamarier:
                ${escapeHTML(invoice.waiterName)}
            </p>

            <p>
                Data:
                ${new Date(
                    invoice.date
                ).toLocaleString("sq-AL")}
            </p>

            <table>

                <thead>

                    <tr>
                        <th>Produkt</th>
                        <th>Sasi</th>
                        <th>Total</th>
                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

            <div class="total">
                TOTAL:
                ${money(invoice.total)}
            </div>

            <p class="center">
                ${escapeHTML(
                    settings.footer
                )}
            </p>

            <script>
                window.onload = function(){
                    window.print();
                };
            <\/script>

        </body>

        </html>

    `);


    printWindow.document.close();

}


function getLastInvoice() {

    const invoices =
        readJSON(
            INVOICES_KEY,
            []
        );


    if (!invoices.length) {
        return null;
    }


    return invoices[
        invoices.length - 1
    ];

}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

    const invoices =
        readJSON(
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
                    invoice.date
                    ||
                    invoice.createdAt
                ).toDateString()
                ===
                todayString
        );


    const sales =
        todayInvoices.reduce(
            (
                total,
                invoice
            ) =>
                total
                +
                Number(
                    invoice.total || 0
                ),
            0
        );


    const cash =
        todayInvoices
        .filter(
            invoice =>
                invoice.payment
                ===
                "cash"
        )
        .reduce(
            (
                total,
                invoice
            ) =>
                total
                +
                Number(
                    invoice.total || 0
                ),
            0
        );


    const card =
        todayInvoices
        .filter(
            invoice =>
                invoice.payment
                ===
                "card"
        )
        .reduce(
            (
                total,
                invoice
            ) =>
                total
                +
                Number(
                    invoice.total || 0
                ),
            0
        );


    const activeTables =
        getTables().filter(
            table =>
                table.items
                &&
                table.items.length
        ).length;


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
        todayInvoices.length
    );


    setText(
        "cardToday",
        money(card)
    );


    setText(
        "cashTotal",
        money(sales)
    );


    setText(
        "cashMoney",
        money(cash)
    );


    setText(
        "cashCard",
        money(card)
    );


    setText(
        "cashInvoices",
        todayInvoices.length
    );


    renderPayments(
        todayInvoices
    );

}


/* =========================================================
   PAYMENTS
========================================================= */

function renderPayments(
    invoices
) {

    const list =
        document.getElementById(
            "paymentsList"
        );


    if (!list) {
        return;
    }


    if (!invoices.length) {

        list.innerHTML =
            `
                <div class="empty-state">
                    Nuk ka pagesa sot.
                </div>
            `;

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
                                invoice.waiterName
                                ||
                                "Pa emër"
                            )}
                            •
                            ${escapeHTML(
                                invoice.payment
                                ||
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


/* =========================================================
   HISTORY
========================================================= */

function renderHistory() {

    const list =
        document.getElementById(
            "historyList"
        );


    if (!list) {
        return;
    }


    const invoices =
        readJSON(
            INVOICES_KEY,
            []
        );


    if (!invoices.length) {

        list.innerHTML =
            `
                <div class="empty-state">
                    Nuk ka histori.
                </div>
            `;

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
                                invoice.payment
                                ||
                                "cash"
                            )}
                        </small>

                    </div>

                </div>

            `
        ).join("");

}


/* =========================================================
   DELETE HISTORY
========================================================= */

function deleteHistory() {

    if (
        !confirm(
            "Dëshiron të fshish të gjithë historikun?"
        )
    ) {

        return;

    }


    writeJSON(
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
   ADMIN
========================================================= */

function renderAdmin() {

    const usersList =
        document.getElementById(
            "usersList"
        );


    if (usersList) {

        const users =
            readJSON(
                USERS_KEY,
                DEFAULT_USERS
            );


        usersList.innerHTML =
            users.map(
                (
                    user,
                    index
                ) => `

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

                            ?

                            `
                                <button
                                    onclick="deleteWaiter(${index})"
                                >
                                    Fshi
                                </button>
                            `

                            :

                            ""
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
            readJSON(
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
                                onclick="changeStock(${product.id},1)"
                            >
                                +
                            </button>

                            <button
                                onclick="changeStock(${product.id},-1)"
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
            getSettings().tableCount;

    }

}


/* =========================================================
   DELETE USER
========================================================= */

function deleteWaiter(
    index
) {

    const users =
        readJSON(
            USERS_KEY,
            DEFAULT_USERS
        );


    if (!users[index]) {
        return;
    }


    if (
        users[index].username
        ===
        "admin"
    ) {

        return;

    }


    users.splice(
        index,
        1
    );


    writeJSON(
        USERS_KEY,
        users
    );


    renderAdmin();


    toast(
        "Përdoruesi u fshi."
    );

}


/* =========================================================
   SAVE TABLE COUNT
========================================================= */

function saveTableCount() {

    const input =
        document.getElementById(
            "tableCountInput"
        );


    if (!input) {
        return;
    }


    const settings =
        getSettings();


    const count =
        Math.max(
            1,
            Math.min(
                100,
                Number(
                    input.value
                )
            )
        );


    settings.tableCount =
        count;


    writeJSON(
        SETTINGS_KEY,
        settings
    );


    initializeTables();

    renderTables();


    toast(
        "Numri i tavolinave u ruajt."
    );

}


/* =========================================================
   SAVE APP NAME
========================================================= */

function saveAppName() {

    const input =
        document.getElementById(
            "appNameInput"
        );


    if (!input) {
        return;
    }


    const settings =
        getSettings();


    settings.appName =
        input.value.trim()
        ||
        "MY BAR";


    writeJSON(
        SETTINGS_KEY,
        settings
    );


    renderHeader();


    toast(
        "Emri u ruajt."
    );

}


/* =========================================================
   CHANGE ADMIN PASSWORD
========================================================= */

function changeAdminPassword() {

    const input =
        document.getElementById(
            "newAdminPassword"
        );


    if (!input) {
        return;
    }


    const password =
        input.value.trim();


    if (!password) {

        toast(
            "Shkruaj fjalëkalimin."
        );

        return;

    }


    const users =
        readJSON(
            USERS_KEY,
            DEFAULT_USERS
        );


    const admin =
        users.find(
            user =>
                user.username
                ===
                "admin"
        );


    if (!admin) {
        return;
    }


    admin.password =
        password;


    writeJSON(
        USERS_KEY,
        users
    );


    input.value = "";


    toast(
        "Fjalëkalimi u ndryshua."
    );

}


/* =========================================================
   ROLE
========================================================= */

function applyRole() {

    const user =
        getCurrentUser();


    if (!user) {

        window.location.href =
            "./index.html";

        return;

    }


    const adminElements =
        document.querySelectorAll(
            ".admin-only,[data-admin]"
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
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem(
        SESSION_KEY
    );


    localStorage.removeItem(
        CURRENT_USER_KEY
    );


    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );


    window.location.href =
        "./index.html";

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
        new Date().toLocaleTimeString(
            "sq-AL",
            {
                hour:"2-digit",
                minute:"2-digit",
                second:"2-digit"
            }
        );

}


/* =========================================================
   TOAST
========================================================= */

function toast(
    message
) {

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
            "1px solid #c9a55c";

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


/* =========================================================
   SET TEXT
========================================================= */

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


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const menuGrid =
        document.getElementById(
            "menuGrid"
        );


    if (!menuGrid) {
        return;
    }


    const parent =
        menuGrid.parentElement;


    if (!parent) {
        return;
    }


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
                readJSON(
                    PRODUCTS_KEY,
                    DEFAULT_PRODUCTS
                );


            let filtered =
                products.filter(
                    product =>
                        product.name
                            .toLowerCase()
                            .includes(query)
                );


            if (isCoffeeClosed()) {

                filtered =
                    filtered.filter(
                        product =>
                            product.category
                            !==
                            "Kafe"
                    );

            }


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
                                    getProductPrice(
                                        product
                                    )
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
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeApp();

        applyRole();

        renderHeader();

        renderTables();

        renderMenu();

        renderOrder();

        updateDashboard();

        renderHistory();

        renderAdmin();

        setupSearch();

        updateClock();


        setInterval(
            updateClock,
            1000
        );


        /*
           Rifreskon menunë kur ndryshon ora,
           që 20:00 dhe 06:40 të aplikohen automatikisht.
        */

        setInterval(
            () => {

                renderMenu();

            },
            30000
        );


        console.log(
            "MY BAR APP.JS loaded."
        );

    }
);


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.selectTable =
    selectTable;

window.newInvoice =
    newInvoice;

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

window.showInvoice =
    showInvoice;

window.closeInvoice =
    closeInvoice;

window.printInvoice =
    printInvoice;

window.deleteHistory =
    deleteHistory;

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

window.logout =
    logout;

window.openWaiterModal =
    function() {

        const modal =
            document.getElementById(
                "generalModal"
            );

        if (modal) {

            modal.style.display =
                "flex";

        }

    };
