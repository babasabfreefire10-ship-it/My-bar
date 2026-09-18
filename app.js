"use strict";

/* =========================================================
   MY BAR — APP.JS
   SINGLE STABLE VERSION
========================================================= */

/* =========================
   STORAGE KEYS
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
const SHIFT_HISTORY_KEY = "MYBAR_SHIFT_HISTORY";
const CASH_MOVEMENTS_KEY = "MYBAR_CASH_MOVEMENTS";
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
   DEFAULT PRODUCTS
========================= */

const DEFAULT_PRODUCTS = [
    {id:1,name:"Espresso",category:"Kafe",price:100},
    {id:2,name:"Espresso Dopio",category:"Kafe",price:150},
    {id:3,name:"Macchiato",category:"Kafe",price:120},
    {id:4,name:"Cappuccino",category:"Kafe",price:180},
    {id:5,name:"Latte",category:"Kafe",price:200},
    {id:6,name:"Freddo Espresso",category:"Kafe",price:200},
    {id:7,name:"Freddo Cappuccino",category:"Kafe",price:220},
    {id:8,name:"Çaj",category:"Kafe",price:120},

    {id:20,name:"Coca Cola",category:"Pije Freskuese",price:150},
    {id:21,name:"Coca Cola Zero",category:"Pije Freskuese",price:150},
    {id:22,name:"Fanta",category:"Pije Freskuese",price:150},
    {id:23,name:"Sprite",category:"Pije Freskuese",price:150},
    {id:24,name:"Schweppes",category:"Pije Freskuese",price:150},
    {id:25,name:"Red Bull",category:"Pije Freskuese",price:250},
    {id:26,name:"Fresh Orange",category:"Pije Freskuese",price:250},
    {id:27,name:"Fresh Lemon",category:"Pije Freskuese",price:250},

    {id:40,name:"Ujë 0.5L",category:"Ujë",price:100},
    {id:41,name:"Ujë 0.75L",category:"Ujë",price:150},
    {id:42,name:"Ujë 1.5L",category:"Ujë",price:150},

    {id:50,name:"Birra Tirana",category:"Birra",price:200},
    {id:51,name:"Birra Korça",category:"Birra",price:200},
    {id:52,name:"Heineken",category:"Birra",price:250},
    {id:53,name:"Corona",category:"Birra",price:300},
    {id:54,name:"Tuborg",category:"Birra",price:250},

    {id:60,name:"Jack Daniel's",category:"Whisky",price:500},
    {id:61,name:"Johnnie Walker Red",category:"Whisky",price:450},
    {id:62,name:"Johnnie Walker Black",category:"Whisky",price:650},
    {id:63,name:"Chivas Regal",category:"Whisky",price:700},

    {id:70,name:"Gordon's Gin",category:"Gin",price:450},
    {id:71,name:"Bombay Sapphire",category:"Gin",price:550},
    {id:72,name:"Hendrick's",category:"Gin",price:800},

    {id:80,name:"Absolut Vodka",category:"Vodka",price:450},
    {id:81,name:"Smirnoff",category:"Vodka",price:450},
    {id:82,name:"Grey Goose",category:"Vodka",price:800},

    {id:90,name:"Bacardi",category:"Rum",price:450},
    {id:91,name:"Captain Morgan",category:"Rum",price:500},

    {id:100,name:"Jose Cuervo",category:"Tequila",price:500},
    {id:101,name:"Olmeca",category:"Tequila",price:550},

    {id:110,name:"Baileys",category:"Liqueur & Amaro",price:450},
    {id:111,name:"Jägermeister",category:"Liqueur & Amaro",price:450},
    {id:112,name:"Aperol",category:"Liqueur & Amaro",price:400},

    {id:120,name:"Verë e Kuqe",category:"Verë",price:300},
    {id:121,name:"Verë e Bardhë",category:"Verë",price:300},
    {id:122,name:"Prosecco",category:"Verë",price:600},

    {id:130,name:"Mojito",category:"Cocktails",price:600},
    {id:131,name:"Margarita",category:"Cocktails",price:650},
    {id:132,name:"Aperol Spritz",category:"Cocktails",price:650},
    {id:133,name:"Sex on the Beach",category:"Cocktails",price:700},
    {id:134,name:"Long Island",category:"Cocktails",price:800},

    {id:140,name:"Gin Tonic",category:"Long Drinks",price:550},
    {id:141,name:"Vodka Red Bull",category:"Long Drinks",price:600},
    {id:142,name:"Whisky Cola",category:"Long Drinks",price:550},

    {id:150,name:"Shot Tequila",category:"Shots",price:300},
    {id:151,name:"Shot Jägermeister",category:"Shots",price:300},
    {id:152,name:"Shot Vodka",category:"Shots",price:250},

    {id:160,name:"Patatina",category:"Snacks",price:200},
    {id:161,name:"Kikirikë",category:"Snacks",price:200},
    {id:162,name:"Ullinj",category:"Snacks",price:250},
    {id:163,name:"Mix Nuts",category:"Snacks",price:350}
];

/* =========================================================
   HELPERS
========================================================= */

function getJSON(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        if (value === null) return fallback;

        const parsed = JSON.parse(value);
        return parsed ?? fallback;
    } catch (error) {
        console.error("Storage error:", key, error);
        return fallback;
    }
}

function setJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Cannot save:", key, error);
    }
}

function money(value) {
    const number = Number(value) || 0;

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

function toast(message) {
    let box = document.getElementById("myBarToast");

    if (!box) {
        box = document.createElement("div");

        box.id = "myBarToast";

        box.style.position = "fixed";
        box.style.left = "50%";
        box.style.bottom = "25px";
        box.style.transform = "translateX(-50%)";
        box.style.zIndex = "999999";
        box.style.background = "#111820";
        box.style.color = "#fff";
        box.style.padding = "13px 20px";
        box.style.borderRadius = "12px";
        box.style.border = "1px solid #1677ff";
        box.style.boxShadow = "0 15px 40px rgba(0,0,0,.45)";
        box.style.fontSize = "14px";
        box.style.fontWeight = "600";

        document.body.appendChild(box);
    }

    box.textContent = message;
    box.style.display = "block";

    clearTimeout(window.__myBarToastTimer);

    window.__myBarToastTimer = setTimeout(() => {
        box.style.display = "none";
    }, 2200);
}

/* =========================================================
   SESSION
========================================================= */

function getCurrentSession() {
    let session = getJSON(SESSION_KEY, null);

    if (!session) {
        session = getJSON("barCurrentUser", null);
    }

    if (!session) return null;

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

    return {
        username: username,
        user: username,
        role: role === "kamarier" ? "waiter" : role,
        name: session.name || "Kamarier"
    };
}

/* =========================================================
   SETTINGS
========================================================= */

function getSettings() {
    return getJSON(SETTINGS_KEY, {
        appName: "MY BAR",
        currency: "L",
        tableCount: 12
    });
}

function saveSettings(settings) {
    setJSON(SETTINGS_KEY, settings);
}

/* =========================================================
   PRODUCTS
========================================================= */

function getProducts() {
    return getJSON(PRODUCTS_KEY, DEFAULT_PRODUCTS);
}

function saveProducts(products) {
    setJSON(PRODUCTS_KEY, products);
}

/* =========================================================
   STOCK
========================================================= */

function initializeStock() {
    const products = getProducts();
    const stock = getJSON(STOCK_KEY, {});

    products.forEach(product => {
        if (stock[product.id] === undefined) {
            stock[product.id] = 20;
        }
    });

    setJSON(STOCK_KEY, stock);
}

function getStock(productId) {
    const stock = getJSON(STOCK_KEY, {});
    return Math.max(0, Number(stock[productId] || 0));
}

function setStock(productId, quantity) {
    const stock = getJSON(STOCK_KEY, {});

    stock[productId] = Math.max(
        0,
        Number(quantity) || 0
    );

    setJSON(STOCK_KEY, stock);
}

function changeStock(productId, amount) {
    const current = getStock(productId);

    setStock(
        productId,
        current + Number(amount || 0)
    );

    renderAll();
}

/* =========================================================
   TABLES
========================================================= */

function createEmptyTables(count) {
    const tables = [];

    for (let i = 1; i <= count; i++) {
        tables.push({
            id: i,
            name: "Tavolina " + i,
            items: []
        });
    }

    return tables;
}

function initializeTables() {
    const settings = getSettings();

    let count = Number(
        localStorage.getItem(TABLE_COUNT_KEY)
    );

    if (!count) {
        count = Number(settings.tableCount) || 12;
        localStorage.setItem(
            TABLE_COUNT_KEY,
            String(count)
        );
    }

    let tables = getJSON(TABLES_KEY, []);

    if (!Array.isArray(tables) || !tables.length) {
        tables = createEmptyTables(count);
        setJSON(TABLES_KEY, tables);
        return;
    }

    /*
       Preserve existing tables and orders.
       Only add/remove tables when count changes.
    */

    if (tables.length < count) {
        for (
            let i = tables.length + 1;
            i <= count;
            i++
        ) {
            tables.push({
                id: i,
                name: "Tavolina " + i,
                items: []
            });
        }
    }

    if (tables.length > count) {
        tables = tables.slice(0, count);
    }

    tables.forEach((table, index) => {
        table.id = index + 1;

        if (!table.name) {
            table.name =
                "Tavolina " + (index + 1);
        }

        if (!Array.isArray(table.items)) {
            table.items = [];
        }
    });

    setJSON(TABLES_KEY, tables);
}

function getTables() {
    const tables = getJSON(TABLES_KEY, []);

    return Array.isArray(tables)
        ? tables
        : [];
}

function saveTables(tables) {
    setJSON(TABLES_KEY, tables);
}

function getSelectedTable() {
    return Number(
        localStorage.getItem(SELECTED_TABLE_KEY) || 0
    );
}

function getSelectedTableObject() {
    const id = getSelectedTable();

    if (!id) return null;

    return getTables().find(
        table => Number(table.id) === id
    ) || null;
}

function selectTable(id) {
    const tableId = Number(id);

    if (!tableId) return;

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(tableId)
    );

    renderAll();

    if (
        typeof window.showPage === "function"
    ) {
        window.showPage("newBill");
    }
}

/* =========================================================
   BILL
========================================================= */

function getBillTotal(table) {
    if (!table || !Array.isArray(table.items)) {
        return 0;
    }

    return table.items.reduce(
        (total, item) => {
            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 0;

            return total + price * quantity;
        },
        0
    );
}

function getSelectedBillTotal() {
    return getBillTotal(
        getSelectedTableObject()
    );
}

function addProduct(productId) {
    const table = getSelectedTableObject();

    if (!table) {
        toast("Zgjidh një tavolinë fillimisht.");
        return;
    }

    const products = getProducts();

    const product = products.find(
        p => Number(p.id) === Number(productId)
    );

    if (!product) {
        toast("Produkti nuk u gjet.");
        return;
    }

    const stock = getStock(product.id);

    if (stock <= 0) {
        toast("Ky produkt nuk ka stok.");
        return;
    }

    if (!Array.isArray(table.items)) {
        table.items = [];
    }

    const existing = table.items.find(
        item =>
            Number(item.productId) ===
            Number(product.id)
    );

    if (existing) {
        if (
            Number(existing.quantity) + 1 >
            stock
        ) {
            toast("Nuk ka më stok.");
            return;
        }

        existing.quantity =
            Number(existing.quantity) + 1;
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

    toast(product.name + " u shtua.");
}

function changeQuantity(index, amount) {
    const table = getSelectedTableObject();

    if (!table) return;

    if (!Array.isArray(table.items)) {
        return;
    }

    const item = table.items[index];

    if (!item) return;

    const newQuantity =
        Number(item.quantity) +
        Number(amount);

    if (newQuantity <= 0) {
        table.items.splice(index, 1);
    } else {
        const stock = getStock(item.productId);

        if (newQuantity > stock) {
            toast("Nuk ka mjaftueshëm stok.");
            return;
        }

        item.quantity = newQuantity;
    }

    saveTables(getTables());

    renderAll();
}

function removeItem(index) {
    const table = getSelectedTableObject();

    if (!table) return;

    if (!Array.isArray(table.items)) {
        return;
    }

    if (!table.items[index]) {
        return;
    }

    table.items.splice(index, 1);

    saveTables(getTables());

    renderAll();
}

/* =========================================================
   MENU
========================================================= */

function renderMenu(category) {
    const grid =
        document.getElementById("productGrid") ||
        document.getElementById("menuGrid");

    if (!grid) return;

    const products = getProducts();

    const activeCategory =
        category || "Të gjitha";

    const categories = [
        "Të gjitha",
        ...new Set(
            products.map(
                product => product.category
            )
        )
    ];

    const categoryContainer =
        document.getElementById("categoryBar") ||
        document.getElementById("categories");

    if (categoryContainer) {
        categoryContainer.innerHTML =
            categories.map(cat => `
                <button
                    class="${
                        cat === activeCategory
                            ? "active"
                            : ""
                    }"
                    onclick="renderMenu('${escapeHTML(cat)}')"
                >
                    ${escapeHTML(cat)}
                </button>
            `).join("");
    }

    const filtered =
        activeCategory === "Të gjitha"
            ? products
            : products.filter(
                product =>
                    product.category ===
                    activeCategory
            );

    grid.innerHTML =
        filtered.map(product => {

            const stock =
                getStock(product.id);

            return `
                <button
                    class="menu-card"
                    ${
                        stock <= 0
                            ? "disabled"
                            : ""
                    }
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
   TABLE UI
========================================================= */

function renderTables() {
    const containers = [
        document.getElementById("tableGrid"),
        document.getElementById("dashboardTables")
    ].filter(Boolean);

    if (!containers.length) return;

    const tables = getTables();
    const selected = getSelectedTable();

    const html = tables.map(table => {

        const active =
            Array.isArray(table.items) &&
            table.items.length > 0;

        const total =
            getBillTotal(table);

        return `
            <button
                class="
                    table-card
                    ${active ? "active" : ""}
                    ${
                        selected === Number(table.id)
                            ? "selected"
                            : ""
                    }
                "
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
    }).join("");

    containers.forEach(
        container => {
            container.innerHTML = html;
        }
    );

    const selectedText =
        document.getElementById(
            "selectedTableText"
        );

    if (selectedText) {
        const table =
            getSelectedTableObject();

        selectedText.textContent =
            table
                ? table.name
                : "Zgjidh një tavolinë";
    }
}

/* =========================================================
   BILL UI
========================================================= */

function renderBill() {
    const container =
        document.getElementById("billItems") ||
        document.getElementById("orderItems");

    if (!container) return;

    const table =
        getSelectedTableObject();

    if (
        !table ||
        !Array.isArray(table.items) ||
        !table.items.length
    ) {
        container.innerHTML = `
            <div class="empty-state">
                Porosia është bosh.
            </div>
        `;

        setBillTotalUI(0);

        return;
    }

    let total = 0;

    container.innerHTML =
        table.items.map((item, index) => {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 0;

            const itemTotal =
                price * quantity;

            total += itemTotal;

            return `
                <div class="bill-item order-item">

                    <div>
                        <strong>
                            ${escapeHTML(item.name)}
                        </strong>

                        <small>
                            ${money(price)} × ${quantity}
                        </small>
                    </div>

                    <div class="order-actions">

                        <button
                            onclick="changeQuantity(${index},-1)"
                        >
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index},1)"
                        >
                            +
                        </button>

                        <button
                            onclick="removeItem(${index})"
                        >
                            ×
                        </button>

                    </div>

                    <strong>
                        ${money(itemTotal)}
                    </strong>

                </div>
            `;
        }).join("");

    setBillTotalUI(total);
}

function setBillTotalUI(total) {
    const ids = [
        "billTotal",
        "orderTotal",
        "paymentTotal",
        "paymentAmount",
        "paymentText",
        "closeTableTotal",
        "closeTableText"
    ];

    ids.forEach(id => {
        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                money(total);
        }
    });
}

/* =========================================================
   PAYMENT
========================================================= */

function payCurrent(method) {
    const table =
        getSelectedTableObject();

    if (!table) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    if (
        !Array.isArray(table.items) ||
        !table.items.length
    ) {
        toast("Fatura është bosh.");
        return;
    }

    const total =
        getBillTotal(table);

    window.MYBAR_CURRENT_PAYMENT_TOTAL =
        total;

    const modal =
        document.getElementById("paymentModal");

    const ids = [
        "paymentText",
        "paymentTotal",
        "paymentAmount"
    ];

    ids.forEach(id => {
        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                money(total);
        }
    });

    const methodElement =
        document.getElementById(
            "paymentMethod"
        );

    if (methodElement) {
        methodElement.value =
            method || "cash";
    }

    if (modal) {
        modal.style.display = "flex";
    } else {
        /*
           If no modal exists in index.html,
           complete directly.
        */
        completePayment(
            method || "cash"
        );
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
    const table =
        getSelectedTableObject();

    if (!table) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    if (
        !Array.isArray(table.items) ||
        !table.items.length
    ) {
        toast("Fatura është bosh.");
        return;
    }

    /*
       IMPORTANT:
       Calculate total BEFORE clearing table.
    */

    const items =
        JSON.parse(
            JSON.stringify(table.items)
        );

    const total =
        items.reduce(
            (sum, item) =>
                sum +
                (
                    Number(item.price) || 0
                ) *
                (
                    Number(item.quantity) || 0
                ),
            0
        );

    if (total <= 0) {
        toast("Totali i faturës është 0 L.");
        return;
    }

    /*
       Check stock first.
    */

    for (const item of items) {
        const stock =
            getStock(item.productId);

        if (
            Number(item.quantity) >
            stock
        ) {
            toast(
                "Stoku nuk mjafton për " +
                item.name
            );

            return;
        }
    }

    /*
       Remove stock.
    */

    for (const item of items) {
        setStock(
            item.productId,
            getStock(item.productId) -
            Number(item.quantity)
        );
    }

    const session =
        getCurrentSession();

    const now =
        new Date();

    const invoice = {
        id: Date.now(),

        number:
            "INV-" +
            Date.now(),

        date:
            now.toISOString(),

        createdAt:
            Date.now(),

        timestamp:
            Date.now(),

        table:
            Number(table.id),

        tableName:
            table.name,

        items:
            items,

        total:
            total,

        amount:
            total,

        payment:
            method || "cash",

        paymentMethod:
            method || "cash",

        waiterName:
            session
                ? session.name
                : "Pa emër",

        userName:
            session
                ? session.name
                : "Pa emër",

        user:
            session
                ? session.username
                : ""
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
       Clear only after invoice saved.
    */

    const tables =
        getTables();

    const realTable =
        tables.find(
            t =>
                Number(t.id) ===
                Number(table.id)
        );

    if (realTable) {
        realTable.items = [];
    }

    saveTables(tables);

    closePayment();

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    renderAll();

    showInvoice(invoice);

    toast(
        "Pagesa u krye: " +
        money(total)
    );
}

/* =========================================================
   CLOSE TABLE
========================================================= */

function openCloseTable() {
    const table =
        getSelectedTableObject();

    if (!table) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    if (
        !Array.isArray(table.items) ||
        !table.items.length
    ) {
        toast("Tavolina është bosh.");
        return;
    }

    const total =
        getBillTotal(table);

    window.MYBAR_CURRENT_CLOSE_TOTAL =
        total;

    const ids = [
        "closeTableText",
        "closeTableTotal"
    ];

    ids.forEach(id => {
        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                money(total);
        }
    });

    const modal =
        document.getElementById(
            "closeTableModal"
        );

    if (modal) {
        modal.style.display = "flex";
    } else {
        /*
           If no close modal exists,
           close with cash.
        */
        completePayment("cash");
    }
}

function closeCloseTable() {
    const modal =
        document.getElementById(
            "closeTableModal"
        );

    if (modal) {
        modal.style.display = "none";
    }
}

function confirmCloseTable() {
    const table =
        getSelectedTableObject();

    if (!table) {
        closeCloseTable();
        return;
    }

    const total =
        getBillTotal(table);

    if (total <= 0) {
        toast("Tavolina është bosh.");
        closeCloseTable();
        return;
    }

    closeCloseTable();

    completePayment("cash");
}

/* =========================================================
   TRANSFER TABLE
========================================================= */

function openTransfer() {
    const table =
        getSelectedTableObject();

    if (!table) {
        toast("Zgjidh tavolinën.");
        return;
    }

    if (
        !Array.isArray(table.items) ||
        !table.items.length
    ) {
        toast("Nuk ka produkte për transferim.");
        return;
    }

    const select =
        document.getElementById(
            "transferTableSelect"
        );

    if (select) {
        const tables =
            getTables();

        select.innerHTML =
            tables
                .filter(
                    t =>
                        Number(t.id) !==
                        Number(table.id)
                )
                .map(
                    t => `
                        <option
                            value="${t.id}"
                        >
                            ${escapeHTML(t.name)}
                        </option>
                    `
                )
                .join("");
    }

    const modal =
        document.getElementById(
            "transferModal"
        );

    if (modal) {
        modal.style.display = "flex";
    }
}

function closeTransfer() {
    const modal =
        document.getElementById(
            "transferModal"
        );

    if (modal) {
        modal.style.display = "none";
    }
}

function confirmTransfer() {
    const from =
        getSelectedTableObject();

    if (!from) {
        toast("Zgjidh tavolinën.");
        return;
    }

    const select =
        document.getElementById(
            "transferTableSelect"
        );

    if (!select) {
        toast("Nuk u gjet tavolina.");
        return;
    }

    const targetId =
        Number(select.value);

    if (!targetId) {
        toast("Zgjidh tavolinën tjetër.");
        return;
    }

    if (
        targetId ===
        Number(from.id)
    ) {
        toast("Zgjidh një tavolinë tjetër.");
        return;
    }

    const tables =
        getTables();

    const source =
        tables.find(
            t =>
                Number(t.id) ===
                Number(from.id)
        );

    const target =
        tables.find(
            t =>
                Number(t.id) ===
                targetId
        );

    if (!source || !target) {
        toast("Tavolina nuk u gjet.");
        return;
    }

    if (!Array.isArray(target.items)) {
        target.items = [];
    }

    if (!Array.isArray(source.items)) {
        source.items = [];
    }

    source.items.forEach(sourceItem => {

        const existing =
            target.items.find(
                item =>
                    Number(item.productId) ===
                    Number(sourceItem.productId)
            );

        if (existing) {
            existing.quantity =
                Number(existing.quantity) +
                Number(sourceItem.quantity);
        } else {
            target.items.push(
                JSON.parse(
                    JSON.stringify(sourceItem)
                )
            );
        }
    });

    source.items = [];

    saveTables(tables);

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(targetId)
    );

    closeTransfer();

    renderAll();

    toast(
        "Fatura u transferua te " +
        target.name
    );
}

/* =========================================================
   INVOICES
========================================================= */

function getInvoices() {
    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    return Array.isArray(invoices)
        ? invoices
        : [];
}

function renderInvoices() {
    const container =
        document.getElementById(
            "invoicesList"
        ) ||
        document.getElementById(
            "invoiceList"
        );

    if (!container) return;

    const invoices =
        getInvoices();

    if (!invoices.length) {
        container.innerHTML = `
            <div class="empty-state">
                Nuk ka fatura.
            </div>
        `;

        return;
    }

    container.innerHTML =
        [...invoices]
            .reverse()
            .map(invoice => `
                <div class="invoice-row">

                    <div>
                        <strong>
                            ${escapeHTML(
                                invoice.number
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                invoice.tableName ||
                                ""
                            )}
                            •
                            ${escapeHTML(
                                invoice.waiterName ||
                                ""
                            )}
                        </small>

                        <small>
                            ${
                                new Date(
                                    invoice.date
                                ).toLocaleString(
                                    "sq-AL"
                                )
                            }
                        </small>
                    </div>

                    <div>
                        <strong>
                            ${money(
                                invoice.total
                            )}
                        </strong>

                        <small>
                            ${
                                invoice.payment ||
                                "cash"
                            }
                        </small>
                    </div>

                </div>
            `)
            .join("");
}

/* =========================================================
   DASHBOARD / CASH
========================================================= */

function getTodayInvoices() {
    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        today.getMonth();

    const day =
        today.getDate();

    return getInvoices().filter(
        invoice => {

            const date =
                new Date(
                    invoice.date ||
                    invoice.createdAt
                );

            return (
                date.getFullYear() ===
                    year &&
                date.getMonth() ===
                    month &&
                date.getDate() ===
                    day
            );
        }
    );
}

function updateDashboard() {
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
                i =>
                    i.payment ===
                    "cash"
            )
            .reduce(
                (sum, i) =>
                    sum +
                    Number(i.total || 0),
                0
            );

    const card =
        invoices
            .filter(
                i =>
                    i.payment ===
                    "card"
            )
            .reduce(
                (sum, i) =>
                    sum +
                    Number(i.total || 0),
                0
            );

    const activeTables =
        getTables()
            .filter(
                table =>
                    Array.isArray(
                        table.items
                    ) &&
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
        invoices.length
    );
}

function setText(id, value) {
    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            String(value);
    }
}

/* =========================================================
   SHIFT
========================================================= */

function getCurrentShift() {
    return getJSON(
        SHIFT_KEY,
        null
    );
}

function openShift() {
    const existing =
        getCurrentShift();

    if (existing) {
        toast("Turni është tashmë i hapur.");
        return;
    }

    const input =
        document.getElementById(
            "openingCash"
        );

    const openingCash =
        input
            ? Number(input.value || 0)
            : 0;

    const session =
        getCurrentSession();

    const shift = {
        id: Date.now(),
        openedAt:
            new Date().toISOString(),
        openedBy:
            session
                ? session.name
                : "Pa emër",
        openingCash:
            openingCash
    };

    setJSON(
        SHIFT_KEY,
        shift
    );

    renderAll();

    toast("Turni u hap.");
}

function closeShift() {
    const shift =
        getCurrentShift();

    if (!shift) {
        toast("Nuk ka turn të hapur.");
        return;
    }

    const todayInvoices =
        getTodayInvoices();

    const sales =
        todayInvoices.reduce(
            (sum, invoice) =>
                sum +
                Number(invoice.total || 0),
            0
        );

    const cashSales =
        todayInvoices
            .filter(
                i =>
                    i.payment ===
                    "cash"
            )
            .reduce(
                (sum, i) =>
                    sum +
                    Number(i.total || 0),
                0
            );

    const expectedCash =
        Number(shift.openingCash || 0) +
        cashSales;

    const input =
        document.getElementById(
            "closingCash"
        );

    const countedCash =
        input
            ? Number(input.value || 0)
            : expectedCash;

    const history =
        getJSON(
            SHIFT_HISTORY_KEY,
            []
        );

    history.push({
        ...shift,

        closedAt:
            new Date().toISOString(),

        sales:
            sales,

        cashSales:
            cashSales,

        expectedCash:
            expectedCash,

        countedCash:
            countedCash,

        difference:
            countedCash -
            expectedCash
    });

    setJSON(
        SHIFT_HISTORY_KEY,
        history
    );

    localStorage.removeItem(
        SHIFT_KEY
    );

    renderAll();

    toast("Turni u mbyll.");
}

/* =========================================================
   FISCAL
========================================================= */

function fiscalizeSelected() {
    const table =
        getSelectedTableObject();

    if (!table) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    if (
        !Array.isArray(table.items) ||
        !table.items.length
    ) {
        toast("Fatura është bosh.");
        return;
    }

    /*
       IMPORTANT:
       This is only a local workflow marker.
       It is NOT official Albanian fiscalization.
    */

    const fiscal =
        getJSON(
            FISCAL_KEY,
            []
        );

    fiscal.push({
        id: Date.now(),

        table:
            table.name,

        total:
            getBillTotal(table),

        createdAt:
            new Date().toISOString(),

        status:
            "PENDING_BACKEND"
    });

    setJSON(
        FISCAL_KEY,
        fiscal
    );

    toast(
        "Fatura u përgatit. Fiskalizimi real kërkon backend."
    );
}

/* =========================================================
   PRINT
========================================================= */

function printInvoice(invoice) {
    if (!invoice) {
        toast("Fatura nuk u gjet.");
        return;
    }

    const printArea =
        document.getElementById(
            "printArea"
        );

    if (printArea) {

        printArea.innerHTML = `
            <div style="font-family:Arial;padding:20px">

                <h1>MY BAR</h1>

                <p>
                    ${escapeHTML(
                        invoice.number
                    )}
                </p>

                <p>
                    ${new Date(
                        invoice.date
                    ).toLocaleString("sq-AL")}
                </p>

                <p>
                    ${escapeHTML(
                        invoice.tableName || ""
                    )}
                </p>

                <hr>

                ${
                    invoice.items
                        .map(
                            item => `
                                <div>
                                    ${
                                        escapeHTML(
                                            item.name
                                        )
                                    }
                                    ×
                                    ${item.quantity}
                                    —
                                    ${money(
                                        item.price *
                                        item.quantity
                                    )}
                                </div>
                            `
                        )
                        .join("")
                }

                <hr>

                <h2>
                    TOTAL:
                    ${money(invoice.total)}
                </h2>

                <p>
                    Pagesa:
                    ${escapeHTML(
                        invoice.payment ||
                        "cash"
                    )}
                </p>

            </div>
        `;
    }

    window.print();
}

/* =========================================================
   SHOW INVOICE
========================================================= */

function showInvoice(invoice) {
    if (!invoice) return;

    setText(
        "invoiceNumber",
        invoice.number
    );

    setText(
        "invoiceDate",
        new Date(
            invoice.date
        ).toLocaleString("sq-AL")
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

    const items =
        document.getElementById(
            "invoiceItems"
        );

    if (items) {
        items.innerHTML =
            invoice.items
                .map(
                    item => `
                        <div class="invoice-row">
                            <span>
                                ${
                                    escapeHTML(
                                        item.name
                                    )
                                }
                                ×
                                ${item.quantity}
                            </span>

                            <strong>
                                ${money(
                                    item.price *
                                    item.quantity
                                )}
                            </strong>
                        </div>
                    `
                )
                .join("");
    }

    const modal =
        document.getElementById(
            "invoiceModal"
        );

    if (modal) {
        modal.style.display =
            "flex";
    }
}

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
   HEADER
========================================================= */

function renderHeader() {
    const session =
        getCurrentSession();

    const settings =
        getSettings();

    setText(
        "appName",
        settings.appName ||
        "MY BAR"
    );

    if (session) {
        setText(
            "userInfo",
            session.name +
            " • " +
            (
                session.role === "admin"
                    ? "ADMIN"
                    : "KAMARIER"
            )
        );
    }
}

/* =========================================================
   ROLE
========================================================= */

function applyRole() {
    const session =
        getCurrentSession();

    if (!session) return;

    const adminElements =
        document.querySelectorAll(
            ".admin-only, [data-admin]"
        );

    adminElements.forEach(
        element => {

            element.style.display =
                session.role === "admin"
                    ? ""
                    : "none";
        }
    );
}

/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {
    const grid =
        document.getElementById(
            "productGrid"
        ) ||
        document.getElementById(
            "menuGrid"
        );

    if (!grid) return;

    if (
        document.getElementById(
            "myBarSearch"
        )
    ) {
        return;
    }

    const parent =
        grid.parentElement;

    if (!parent) return;

    const input =
        document.createElement(
            "input"
        );

    input.id =
        "myBarSearch";

    input.type =
        "search";

    input.placeholder =
        "Kërko produkt...";

    input.style.width =
        "100%";

    input.style.padding =
        "12px 14px";

    input.style.marginBottom =
        "12px";

    input.style.borderRadius =
        "10px";

    input.style.border =
        "1px solid #263442";

    input.style.background =
        "#0b1117";

    input.style.color =
        "#fff";

    parent.insertBefore(
        input,
        grid
    );

    input.addEventListener(
        "input",
        () => {

            const query =
                input.value
                    .trim()
                    .toLowerCase();

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
                filtered
                    .map(
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
                                    ${
                                        escapeHTML(
                                            product.name
                                        )
                                    }
                                </strong>

                                <span>
                                    ${
                                        money(
                                            product.price
                                        )
                                    }
                                </span>

                                <small>
                                    Stok:
                                    ${
                                        getStock(
                                            product.id
                                        )
                                    }
                                </small>
                            </button>
                        `
                    )
                    .join("");
        }
    );
}

/* =========================================================
   LOCK
========================================================= */

function lockScreen() {
    const modal =
        document.getElementById(
            "lockModal"
        );

    if (modal) {
        modal.style.display =
            "flex";
    }
}

function unlockScreen() {
    const input =
        document.getElementById(
            "lockPassword"
        );

    const session =
        getCurrentSession();

    if (!input || !session) return;

    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    const user =
        users.find(
            u =>
                String(
                    u.username
                ).toLowerCase() ===
                String(
                    session.username
                ).toLowerCase()
        );

    if (
        user &&
        String(input.value) ===
        String(user.password)
    ) {
        input.value = "";

        const modal =
            document.getElementById(
                "lockModal"
            );

        if (modal) {
            modal.style.display =
                "none";
        }

        toast("U zhbllokua.");
    } else {
        toast("Fjalëkalim i gabuar.");
    }
}

/* =========================================================
   LOGOUT
========================================================= */

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
   ADMIN — USERS
========================================================= */

function renderAdmin() {
    const users =
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    const list =
        document.getElementById(
            "usersList"
        );

    if (list) {

        list.innerHTML =
            users.map(
                (user, index) => `
                    <div class="admin-row">

                        <div>
                            <strong>
                                ${
                                    escapeHTML(
                                        user.name
                                    )
                                }
                            </strong>

                            <small>
                                ${
                                    escapeHTML(
                                        user.username
                                    )
                                }
                                •
                                ${user.role}
                            </small>
                        </div>

                        ${
                            user.username !==
                            "admin"
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
            )
            .join("");
    }
}

function deleteWaiter(index) {
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

    toast("Kamarieri u fshi.");
}

/* =========================================================
   APP INITIALIZATION
========================================================= */

function initializeApp() {

    if (
        !localStorage.getItem(
            USERS_KEY
        )
    ) {
        setJSON(
            USERS_KEY,
            DEFAULT_USERS
        );
    }

    if (
        !localStorage.getItem(
            PRODUCTS_KEY
        )
    ) {
        setJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );
    }

    if (
        !localStorage.getItem(
            INVOICES_KEY
        )
    ) {
        setJSON(
            INVOICES_KEY,
            []
        );
    }

    if (
        !localStorage.getItem(
            SETTINGS_KEY
        )
    ) {
        setJSON(
            SETTINGS_KEY,
            {
                appName: "MY BAR",
                currency: "L",
                tableCount: 12
            }
        );
    }

    if (
        !localStorage.getItem(
            TABLE_COUNT_KEY
        )
    ) {
        localStorage.setItem(
            TABLE_COUNT_KEY,
            "12"
        );
    }

    initializeStock();
    initializeTables();
}

/* =========================================================
   RENDER ALL
========================================================= */

function renderAll() {
    renderHeader();
    renderTables();
    renderMenu();
    renderBill();
    renderInvoices();
    updateDashboard();
    renderAdmin();
    applyRole();

    const shift =
        getCurrentShift();

    const shiftStatus =
        document.getElementById(
            "shiftStatus"
        );

    if (shiftStatus) {
        shiftStatus.textContent =
            shift
                ? "TURNI I HAPUR"
                : "TURNI I MBYLLUR";
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
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        try {

            initializeApp();

            renderAll();

            setupSearch();

            updateClock();

            setInterval(
                updateClock,
                1000
            );

            console.log(
                "MY BAR: app.js loaded successfully."
            );

        } catch (error) {

            console.error(
                "MY BAR START ERROR:",
                error
            );

            toast(
                "Gabim në ngarkimin e MY BAR."
            );
        }
    }
);

/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.getCurrentSession =
    getCurrentSession;

window.getTables =
    getTables;

window.getSelectedTable =
    getSelectedTable;

window.getSelectedTableObject =
    getSelectedTableObject;

window.selectTable =
    selectTable;

window.renderMenu =
    renderMenu;

window.addProduct =
    addProduct;

window.changeQuantity =
    changeQuantity;

window.removeItem =
    removeItem;

window.getBillTotal =
    getBillTotal;

window.payCurrent =
    payCurrent;

window.closePayment =
    closePayment;

window.completePayment =
    completePayment;

window.openCloseTable =
    openCloseTable;

window.closeCloseTable =
    closeCloseTable;

window.confirmCloseTable =
    confirmCloseTable;

window.openTransfer =
    openTransfer;

window.closeTransfer =
    closeTransfer;

window.confirmTransfer =
    confirmTransfer;

window.renderInvoices =
    renderInvoices;

window.showInvoice =
    showInvoice;

window.closeInvoice =
    closeInvoice;

window.printInvoice =
    printInvoice;

window.openShift =
    openShift;

window.closeShift =
    closeShift;

window.fiscalizeSelected =
    fiscalizeSelected;

window.lockScreen =
    lockScreen;

window.unlockScreen =
    unlockScreen;

window.logout =
    logout;

window.changeStock =
    changeStock;

window.deleteWaiter =
    deleteWaiter;

window.renderAll =
    renderAll;

window.money =
    money;

window.escapeHTML =
    escapeHTML;
