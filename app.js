"use strict";

/* =========================================================
   MY BAR — APP.JS
   Version: Premium White POS
========================================================= */

const USERS_KEY = "MYBAR_USERS_V2";
const SESSION_KEY = "MYBAR_SESSION_V2";
const TABLES_KEY = "MYBAR_TABLES_V2";
const PRODUCTS_KEY = "MYBAR_PRODUCTS_V2";
const INVOICES_KEY = "MYBAR_INVOICES_V2";
const INVENTORY_KEY = "MYBAR_INVENTORY_V2";
const SETTINGS_KEY = "MYBAR_SETTINGS_V2";
const SELECTED_TABLE_KEY = "MYBAR_SELECTED_TABLE_V2";

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

/* =========================================================
   DEFAULT SETTINGS
========================================================= */

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

/* =========================================================
   DEFAULT PRODUCTS
========================================================= */

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

    {id:110,name:"Baileys",category:"Liqueur",price:450},
    {id:111,name:"Jägermeister",category:"Liqueur",price:450},
    {id:112,name:"Aperol",category:"Liqueur",price:400},

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
   STATE
========================================================= */

let activeCategory = "Të gjitha";
let lastInvoice = null;

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

function esc(value) {
    return String(value ?? "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

function getSettings() {
    return {
        ...DEFAULT_SETTINGS,
        ...getJSON(SETTINGS_KEY, {})
    };
}

function getSession() {
    return getJSON(SESSION_KEY, null);
}

function isAdmin() {
    const user = getSession();
    return !!user && user.role === "admin";
}

function selectedTableId() {
    return Number(
        localStorage.getItem(SELECTED_TABLE_KEY) || 0
    );
}

function getTables() {
    return getJSON(TABLES_KEY, []);
}

function saveTables(tables) {
    setJSON(TABLES_KEY, tables);
}

function getProducts() {
    return getJSON(PRODUCTS_KEY, DEFAULT_PRODUCTS);
}

function saveProducts(products) {
    setJSON(PRODUCTS_KEY, products);
}

function getUsers() {
    return getJSON(USERS_KEY, DEFAULT_USERS);
}

function saveUsers(users) {
    setJSON(USERS_KEY, users);
}

/* =========================================================
   INITIALIZE
========================================================= */

function initialize() {

    if (!localStorage.getItem(USERS_KEY)) {
        saveUsers(DEFAULT_USERS);
    }

    if (!localStorage.getItem(PRODUCTS_KEY)) {
        saveProducts(DEFAULT_PRODUCTS);
    }

    if (!localStorage.getItem(INVOICES_KEY)) {
        setJSON(INVOICES_KEY, []);
    }

    if (!localStorage.getItem(SETTINGS_KEY)) {
        setJSON(SETTINGS_KEY, DEFAULT_SETTINGS);
    }

    initializeTables();
    initializeInventory();
}

function initializeTables() {

    const settings = getSettings();
    const count = Number(settings.tableCount) || 12;

    let tables = getTables();

    if (!Array.isArray(tables)) {
        tables = [];
    }

    while (tables.length < count) {

        const number = tables.length + 1;

        tables.push({
            id:number,
            name:"Tavolina " + number,
            items:[]
        });
    }

    if (tables.length > count) {

        const occupied = tables
            .slice(count)
            .some(t => t.items && t.items.length);

        if (!occupied) {
            tables = tables.slice(0,count);
        }
    }

    saveTables(tables);
}

function initializeInventory() {

    const products = getProducts();

    let stock =
        getJSON(INVENTORY_KEY,{});

    products.forEach(product => {

        if (stock[product.id] === undefined) {
            stock[product.id] = 20;
        }
    });

    setJSON(INVENTORY_KEY,stock);
}

function getStock(id) {

    const stock =
        getJSON(INVENTORY_KEY,{});

    return Number(stock[id] ?? 0);
}

function setStock(id,value) {

    const stock =
        getJSON(INVENTORY_KEY,{});

    stock[id] =
        Math.max(0,Number(value) || 0);

    setJSON(INVENTORY_KEY,stock);
}

function changeStock(id,amount) {
    setStock(id,getStock(id) + Number(amount));
}

/* =========================================================
   HEADER
========================================================= */

function renderHeader() {

    const settings = getSettings();
    const user = getSession();

    const appName =
        document.getElementById("appName");

    const userInfo =
        document.getElementById("userInfo");

    if (appName) {
        appName.textContent =
            settings.appName || "MY BAR";
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

    document
        .querySelectorAll(".admin-only")
        .forEach(element => {

            element.style.display =
                isAdmin() ? "" : "none";
        });
}

/* =========================================================
   TABLES
========================================================= */

function renderTables() {

    const grid =
        document.getElementById("tableGrid");

    if (!grid) return;

    const tables = getTables();
    const selected = selectedTableId();

    grid.innerHTML =
        tables.map(table => {

            const active =
                table.items &&
                table.items.length > 0;

            const total =
                getTableTotal(table);

            return `
                <button
                    class="table-card
                    ${active ? "active" : ""}
                    ${selected === table.id ? "selected" : ""}"
                    onclick="selectTable(${table.id})">

                    <strong>
                        ${esc(table.name)}
                    </strong>

                    <span>
                        ${active ? money(total) : "E lirë"}
                    </span>

                </button>
            `;
        }).join("");

    const text =
        document.getElementById("selectedTableText");

    const orderTable =
        document.getElementById("orderTable");

    if (selected) {

        const table =
            tables.find(t => t.id === selected);

        const name =
            table ? table.name : "Tavolina " + selected;

        if (text) {
            text.textContent = name;
        }

        if (orderTable) {
            orderTable.textContent = name;
        }

    } else {

        if (text) {
            text.textContent =
                "Zgjidh një tavolinë";
        }

        if (orderTable) {
            orderTable.textContent =
                "Zgjidh tavolinën";
        }
    }
}

function selectTable(id) {

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(id)
    );

    renderTables();
    renderOrder();
}

/* =========================================================
   MENU
========================================================= */

function renderCategories() {

    const box =
        document.getElementById("categories");

    if (!box) return;

    const categories = [
        "Të gjitha",
        ...new Set(
            getProducts()
                .map(product => product.category)
        )
    ];

    box.innerHTML =
        categories.map(category => {

            return `
                <button
                    class="${category === activeCategory ? "active" : ""}"
                    onclick="setCategory('${esc(category)}')">

                    ${esc(category)}

                </button>
            `;
        }).join("");
}

function setCategory(category) {

    activeCategory = category;

    renderCategories();
    renderProducts();
}

function renderProducts(search = "") {

    const grid =
        document.getElementById("menuGrid");

    if (!grid) return;

    const query =
        search.trim().toLowerCase();

    let products =
        getProducts();

    if (activeCategory !== "Të gjitha") {

        products =
            products.filter(
                product =>
                    product.category === activeCategory
            );
    }

    if (query) {

        products =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(query)
            );
    }

    grid.innerHTML =
        products.map(product => {

            const stock =
                getStock(product.id);

            return `
                <button
                    class="menu-card ${stock <= 0 ? "disabled" : ""}"
                    ${stock <= 0 ? "disabled" : ""}
                    onclick="addProduct(${product.id})">

                    <strong>
                        ${esc(product.name)}
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

/* =========================================================
   NEW INVOICE
========================================================= */

function newInvoice() {

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    renderTables();
    renderOrder();

    toast("Zgjidh një tavolinë për faturën e re.");
}

/* =========================================================
   PRODUCTS
========================================================= */

function addProduct(productId) {

    const tableId =
        selectedTableId();

    if (!tableId) {
        toast("Zgjidh fillimisht një tavolinë.");
        return;
    }

    const products =
        getProducts();

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
            t => Number(t.id) === Number(tableId)
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

            productId:product.id,

            name:product.name,

            price:Number(product.price),

            quantity:1
        });
    }

    saveTables(tables);

    renderTables();
    renderOrder();
    renderProducts(
        document.getElementById("searchInput")?.value || ""
    );

    toast(product.name + " u shtua.");
}

/* =========================================================
   ORDER
========================================================= */

function getTableTotal(table) {

    if (!table || !Array.isArray(table.items)) {
        return 0;
    }

    return table.items.reduce(
        (sum,item) =>
            sum +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );
}

function renderOrder() {

    const container =
        document.getElementById("orderItems");

    const totalTop =
        document.getElementById("orderTotalTop");

    const totalBottom =
        document.getElementById("orderTotal");

    if (!container) return;

    const tableId =
        selectedTableId();

    const table =
        getTables().find(
            t => Number(t.id) === Number(tableId)
        );

    if (!table || !table.items.length) {

        container.innerHTML = `
            <div class="empty">
                Nuk ka produkte në faturë.
                <br><br>
                Zgjidh një tavolinë dhe shtyp produktet.
            </div>
        `;

        if (totalTop) {
            totalTop.textContent = money(0);
        }

        if (totalBottom) {
            totalBottom.textContent = money(0);
        }

        return;
    }

    const total =
        getTableTotal(table);

    container.innerHTML =
        table.items.map((item,index) => {

            const lineTotal =
                Number(item.price) *
                Number(item.quantity);

            return `
                <div class="order-item">

                    <div class="order-item-main">

                        <div>

                            <div class="order-item-name">
                                ${esc(item.name)}
                            </div>

                            <div class="order-item-prices">
                                Çmimi: ${money(item.price)}
                                × ${item.quantity}
                            </div>

                        </div>

                        <div class="line-total">
                            ${money(lineTotal)}
                        </div>

                    </div>

                    <div class="quantity-row">

                        <div class="qty">

                            <button
                                onclick="changeQuantity(${index},-1)">
                                −
                            </button>

                            <strong>
                                ${item.quantity}
                            </strong>

                            <button
                                onclick="changeQuantity(${index},1)">
                                +
                            </button>

                        </div>

                        <button
                            class="remove"
                            onclick="removeItem(${index})">
                            Fshi
                        </button>

                    </div>

                </div>
            `;
        }).join("");

    if (totalTop) {
        totalTop.textContent = money(total);
    }

    if (totalBottom) {
        totalBottom.textContent = money(total);
    }
}

function changeQuantity(index,amount) {

    const tableId =
        selectedTableId();

    const tables =
        getTables();

    const table =
        tables.find(t => t.id === tableId);

    if (!table) return;

    const item =
        table.items[index];

    if (!item) return;

    const newQuantity =
        Number(item.quantity) +
        Number(amount);

    if (newQuantity <= 0) {

        table.items.splice(index,1);

    } else {

        if (newQuantity > getStock(item.productId)) {

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

function removeItem(index) {

    const tableId =
        selectedTableId();

    const tables =
        getTables();

    const table =
        tables.find(t => t.id === tableId);

    if (!table) return;

    table.items.splice(index,1);

    saveTables(tables);

    renderTables();
    renderOrder();
}

function clearOrder() {

    const tableId =
        selectedTableId();

    if (!tableId) {
        toast("Nuk ka tavolinë të zgjedhur.");
        return;
    }

    if (!confirm("Dëshiron ta pastrosh faturën?")) {
        return;
    }

    const tables =
        getTables();

    const table =
        tables.find(t => t.id === tableId);

    if (!table) return;

    table.items = [];

    saveTables(tables);

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    renderTables();
    renderOrder();

    toast("Fatura u pastrua.");
}

/* =========================================================
   PAYMENT
========================================================= */

function openPayment() {

    const tableId =
        selectedTableId();

    if (!tableId) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    const table =
        getTables().find(
            t => t.id === tableId
        );

    if (!table || !table.items.length) {
        toast("Fatura është bosh.");
        return;
    }

    const total =
        getTableTotal(table);

    document.getElementById("paymentTotal")
        .textContent = money(total);

    openModal("paymentModal");
}

function completePayment(method) {

    const tableId =
        selectedTableId();

    const tables =
        getTables();

    const table =
        tables.find(t => t.id === tableId);

    if (!table || !table.items.length) {
        toast("Fatura është bosh.");
        return;
    }

    const total =
        getTableTotal(table);

    if (total <= 0) {
        toast("Totali është 0.");
        return;
    }

    for (const item of table.items) {

        if (
            Number(item.quantity) >
            getStock(item.productId)
        ) {
            toast(
                "Stoku nuk mjafton për " +
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

    const user =
        getSession();

    const settings =
        getSettings();

    const invoices =
        getJSON(INVOICES_KEY,[]);

    const invoice = {

        id:Date.now(),

        number:
            "INV-" +
            Date.now(),

        date:
            new Date().toISOString(),

        table:
            table.id,

        tableName:
            table.name,

        waiter:
            user ? user.name : "",

        waiterUsername:
            user ? user.username : "",

        payment:
            method,

        items:
            JSON.parse(
                JSON.stringify(table.items)
            ),

        total:
            Number(total),

        businessName:
            settings.businessName,

        nipt:
            settings.nipt,

        address:
            settings.address,

        phone:
            settings.phone
    };

    invoices.push(invoice);

    setJSON(
        INVOICES_KEY,
        invoices
    );

    table.items = [];

    saveTables(tables);

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    closeModal("paymentModal");

    showInvoice(invoice);

    renderTables();
    renderOrder();
    renderProducts();

    toast("Pagesa u krye.");
}

/* =========================================================
   INVOICE
========================================================= */

function showInvoice(invoice) {

    lastInvoice = invoice;

    const settings =
        getSettings();

    document.getElementById("invoiceBusiness")
        .textContent =
        invoice.businessName ||
        settings.businessName;

    document.getElementById("invoiceNumber")
        .textContent =
        "Faturë: " + invoice.number;

    document.getElementById("invoiceDate")
        .textContent =
        new Date(invoice.date)
            .toLocaleString("sq-AL");

    document.getElementById("invoiceTable")
        .textContent =
        invoice.tableName;

    document.getElementById("invoiceWaiter")
        .textContent =
        "Kamarier: " +
        (invoice.waiter || "");

    document.getElementById("invoicePayment")
        .textContent =
        "Pagesa: " +
        (invoice.payment === "cash"
            ? "Cash"
            : "Kartë");

    const items =
        document.getElementById("invoiceItems");

    items.innerHTML =
        invoice.items.map(item => {

            const line =
                Number(item.price) *
                Number(item.quantity);

            return `
                <div class="invoice-line">

                    <span>
                        ${esc(item.name)}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${money(line)}
                    </strong>

                </div>
            `;
        }).join("");

    document.getElementById("invoiceTotal")
        .textContent =
        money(invoice.total);

    document.getElementById("invoiceFooter")
        .innerHTML =
        `
        ${esc(settings.footer || "")}
        ${
            settings.nipt
                ? "<br>NIPT: " + esc(settings.nipt)
                : ""
        }
        `;

    openModal("invoiceModal");
}

function printInvoice() {

    if (!lastInvoice) return;

    const invoice =
        lastInvoice;

    const settings =
        getSettings();

    const rows =
        invoice.items.map(item => {

            const line =
                Number(item.price) *
                Number(item.quantity);

            return `
                <div class="row">
                    <span>
                        ${esc(item.name)}
                        × ${item.quantity}
                    </span>
                    <b>${money(line)}</b>
                </div>
            `;
        }).join("");

    const popup =
        window.open(
            "",
            "_blank",
            "width=420,height=700"
        );

    if (!popup) {

        toast(
            "Lejo popup-et për printim."
        );

        return;
    }

    popup.document.write(`
        <!DOCTYPE html>
        <html>
        <head>

        <meta charset="UTF-8">

        <title>${esc(invoice.number)}</title>

        <style>

        @page{
            size:80mm auto;
            margin:0;
        }

        *{
            box-sizing:border-box;
        }

        body{
            margin:0;
            width:80mm;
            font-family:Arial,sans-serif;
            color:#000;
            background:#fff;
            font-size:12px;
        }

        .paper{
            padding:5mm;
        }

        .center{
            text-align:center;
        }

        h1{
            font-size:21px;
            margin:0 0 5px;
        }

        .meta{
            font-size:10px;
            line-height:1.5;
        }

        hr{
            border:0;
            border-top:1px dashed #000;
            margin:8px 0;
        }

        .row{
            display:flex;
            justify-content:space-between;
            gap:8px;
            margin:6px 0;
        }

        .total{
            display:flex;
            justify-content:space-between;
            font-size:17px;
            font-weight:900;
            margin-top:10px;
        }

        .footer{
            text-align:center;
            font-size:10px;
            margin-top:12px;
        }

        </style>

        </head>

        <body>

        <div class="paper">

            <div class="center">

                <h1>
                    ${esc(
                        invoice.businessName ||
                        settings.businessName
                    )}
                </h1>

                <div class="meta">
                    ${esc(invoice.number)}<br>
                    ${new Date(invoice.date)
                        .toLocaleString("sq-AL")}<br>
                    ${esc(invoice.tableName)}<br>
                    Kamarier:
                    ${esc(invoice.waiter || "")}<br>
                    ${
                        settings.nipt
                            ? "NIPT: " +
                              esc(settings.nipt) +
                              "<br>"
                            : ""
                    }
                    ${
                        settings.address
                            ? esc(settings.address) +
                              "<br>"
                            : ""
                    }
                    ${
                        settings.phone
                            ? esc(settings.phone)
                            : ""
                    }
                </div>

            </div>

            <hr>

            ${rows}

            <hr>

            <div class="total">

                <span>TOTAL</span>

                <span>
                    ${money(invoice.total)}
                </span>

            </div>

            <div class="footer">
                ${esc(settings.footer || "")}
            </div>

        </div>

        <script>

        window.onload = function(){

            window.focus();

            setTimeout(function(){
                window.print();
            },300);

        };

        window.onafterprint = function(){

            if(window.opener &&
               window.opener.finishInvoice){

                window.opener.finishInvoice();

            }

            window.close();
        };

        </script>

        </body>
        </html>
    `);

    popup.document.close();
}

/* =========================================================
   FINISH / AUTO LOGOUT
========================================================= */

function finishInvoice() {

    closeModal("invoiceModal");

    lastInvoice = null;

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    localStorage.removeItem(
        SESSION_KEY
    );

    window.location.href =
        "login.html";
}

function closeCurrentInvoice() {

    const tableId =
        selectedTableId();

    if (!tableId) {

        logout();

        return;
    }

    const table =
        getTables().find(
            t => t.id === tableId
        );

    if (
        table &&
        table.items &&
        table.items.length
    ) {

        const ok =
            confirm(
                "Dëshiron ta mbyllësh tavolinën pa e paguar faturën?"
            );

        if (!ok) return;

        table.items = [];

        const tables =
            getTables();

        const saved =
            tables.find(
                t => t.id === tableId
            );

        if (saved) {
            saved.items = [];
        }

        saveTables(tables);
    }

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    localStorage.removeItem(
        SESSION_KEY
    );

    window.location.href =
        "login.html";
}

/* =========================================================
   SUMMARY
========================================================= */

function openSummary() {

    const invoices =
        getJSON(INVOICES_KEY,[]);

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
            (sum,i) =>
                sum + Number(i.total),
            0
        );

    const cash =
        todayInvoices
            .filter(i => i.payment === "cash")
            .reduce(
                (sum,i) =>
                    sum + Number(i.total),
                0
            );

    const card =
        todayInvoices
            .filter(i => i.payment === "card")
            .reduce(
                (sum,i) =>
                    sum + Number(i.total),
                0
            );

    showGeneral(
        "PËRMBLEDHJE",
        `
        <div class="admin-section">
            <h4>Sot</h4>

            <div class="admin-row">
                <span>Fatura</span>
                <strong>${todayInvoices.length}</strong>
            </div>

            <div class="admin-row">
                <span>Shitje</span>
                <strong>${money(total)}</strong>
            </div>

            <div class="admin-row">
                <span>Cash</span>
                <strong>${money(cash)}</strong>
            </div>

            <div class="admin-row">
                <span>Kartë</span>
                <strong>${money(card)}</strong>
            </div>
        </div>
        `
    );
}

function openMyInvoices() {

    const invoices =
        getJSON(INVOICES_KEY,[]);

    showGeneral(
        "FATURAT E MIA",
        `
        <div class="admin-list">

        ${
            invoices.length
                ? [...invoices]
                    .reverse()
                    .map(invoice => `
                        <div class="admin-row">

                            <div>
                                <strong>
                                    ${esc(invoice.number)}
                                </strong>

                                <small>
                                    ${esc(invoice.waiter || "")}
                                    •
                                    ${esc(invoice.tableName)}
                                    •
                                    ${money(invoice.total)}
                                </small>
                            </div>

                            <button
                                class="mini"
                                onclick="showInvoiceById(${invoice.id})">
                                Shiko
                            </button>

                        </div>
                    `).join("")
                :
                    `<div class="empty">
                        Nuk ka fatura.
                    </div>`
        }

        </div>
        `
    );
}

function showInvoiceById(id) {

    const invoice =
        getJSON(INVOICES_KEY,[])
            .find(i => Number(i.id) === Number(id));

    if (!invoice) return;

    closeModal("generalModal");

    showInvoice(invoice);
}

/* =========================================================
   TABLE DETAILS
========================================================= */

function tableDetails() {

    const tableId =
        selectedTableId();

    if (!tableId) {
        toast("Zgjidh një tavolinë.");
        return;
    }

    const table =
        getTables().find(
            t => t.id === tableId
        );

    if (!table) return;

    showGeneral(
        "DETAJE TAVOLINE",
        `
        <div class="admin-section">

            <h4>${esc(table.name)}</h4>

            <div class="admin-row">
                <span>Produkte</span>
                <strong>
                    ${(table.items || []).length}
                </strong>
            </div>

            <div class="admin-row">
                <span>Total</span>
                <strong>
                    ${money(getTableTotal(table))}
                </strong>
            </div>

        </div>
        `
    );
}

/* =========================================================
   TRANSFER
========================================================= */

function transferTable() {

    const current =
        selectedTableId();

    if (!current) {
        toast("Zgjidh tavolinën.");
        return;
    }

    const tables =
        getTables();

    showGeneral(
        "TRANSFERO TAVOLINË",
        `
        <div class="field">
            <label>Tavolina e re</label>

            <select id="transferTarget">

                ${
                    tables
                        .filter(t => t.id !== current)
                        .map(t => `
                            <option value="${t.id}">
                                ${esc(t.name)}
                            </option>
                        `).join("")
                }

            </select>
        </div>

        <br>

        <button
            class="action primary"
            onclick="doTransfer()">
            TRANSFERO
        </button>
        `
    );
}

function doTransfer() {

    const target =
        Number(
            document.getElementById(
                "transferTarget"
            ).value
        );

    const current =
        selectedTableId();

    if (!target || !current) return;

    const tables =
        getTables();

    const from =
        tables.find(t => t.id === current);

    const to =
        tables.find(t => t.id === target);

    if (!from || !to) return;

    if (
        to.items &&
        to.items.length
    ) {

        toast(
            "Tavolina e zgjedhur nuk është bosh."
        );

        return;
    }

    to.items =
        from.items || [];

    from.items = [];

    saveTables(tables);

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(target)
    );

    closeModal("generalModal");

    renderTables();
    renderOrder();

    toast("Tavolina u transferua.");
}

/* =========================================================
   CASH
========================================================= */

function openCash() {

    const invoices =
        getJSON(INVOICES_KEY,[]);

    const today =
        new Date().toDateString();

    const todayInvoices =
        invoices.filter(
            i =>
                new Date(i.date)
                    .toDateString() === today
        );

    const cash =
        todayInvoices
            .filter(i => i.payment === "cash")
            .reduce(
                (sum,i) =>
                    sum + Number(i.total),
                0
            );

    showGeneral(
        "ARKA",
        `
        <div class="admin-section">

            <div class="admin-row">
                <span>Cash sot</span>
                <strong>${money(cash)}</strong>
            </div>

            <div class="admin-row">
                <span>Fatura cash</span>
                <strong>
                    ${
                        todayInvoices
                            .filter(i =>
                                i.payment === "cash"
                            ).length
                    }
                </strong>
            </div>

        </div>
        `
    );
}

function cashReport() {
    openSummary();
}

/* =========================================================
   ADMIN — FULL CONTROL
========================================================= */

function openAdmin() {

    if (!isAdmin()) {
        toast("Vetëm ADMIN.");
        return;
    }

    renderAdminPanel();

    openModal("generalModal");
}

function renderAdminPanel() {

    const settings =
        getSettings();

    const users =
        getUsers();

    const products =
        getProducts();

    const categories =
        [
            ...new Set(
                products.map(p => p.category)
            )
        ];

    document.getElementById(
        "generalModalTitle"
    ).textContent =
        "ADMIN • KONTROLL I PLOTË";

    document.getElementById(
        "generalModalBody"
    ).innerHTML = `

        <!-- SETTINGS -->

        <div class="admin-section">

            <h4>Parametrat e biznesit</h4>

            <div class="form-grid">

                <div class="field">
                    <label>Emri i aplikacionit</label>
                    <input
                        id="adminAppName"
                        value="${esc(settings.appName)}">
                </div>

                <div class="field">
                    <label>Emri i biznesit</label>
                    <input
                        id="adminBusinessName"
                        value="${esc(settings.businessName)}">
                </div>

                <div class="field">
                    <label>NIPT</label>
                    <input
                        id="adminNipt"
                        value="${esc(settings.nipt)}">
                </div>

                <div class="field">
                    <label>Telefon</label>
                    <input
                        id="adminPhone"
                        value="${esc(settings.phone)}">
                </div>

                <div class="field full">
                    <label>Adresa</label>
                    <input
                        id="adminAddress"
                        value="${esc(settings.address)}">
                </div>

                <div class="field full">
                    <label>Footer i faturës</label>
                    <textarea id="adminFooter">${esc(settings.footer)}</textarea>
                </div>

                <div class="field">
                    <label>Numri i tavolinave</label>
                    <input
                        id="adminTableCount"
                        type="number"
                        min="1"
                        max="100"
                        value="${settings.tableCount}">
                </div>

            </div>

            <br>

            <button
                class="action primary"
                onclick="saveAdminSettings()">
                RUAJ PARAMETRAT
            </button>

        </div>

        <!-- USERS -->

        <div class="admin-section">

            <h4>Përdoruesit / Kamarierët</h4>

            <div class="form-grid">

                <div class="field">
                    <label>Emri</label>
                    <input id="newUserName">
                </div>

                <div class="field">
                    <label>Username</label>
                    <input id="newUsername">
                </div>

                <div class="field">
                    <label>PIN / Password</label>
                    <input id="newUserPassword">
                </div>

                <div class="field">
                    <label>Roli</label>

                    <select id="newUserRole">
                        <option value="waiter">
                            Kamarier
                        </option>
                        <option value="admin">
                            Admin
                        </option>
                    </select>

                </div>

            </div>

            <br>

            <button
                class="action primary"
                onclick="adminAddUser()">
                + SHTO PËRDORUES
            </button>

            <br><br>

            <div class="admin-list">

                ${
                    users.map((user,index) => `
                        <div class="admin-row">

                            <div>
                                <strong>
                                    ${esc(user.name)}
                                </strong>

                                <small>
                                    ${esc(user.username)}
                                    •
                                    ${esc(user.role)}
                                </small>
                            </div>

                            <div class="admin-buttons">

                                <button
                                    class="mini"
                                    onclick="adminEditUser(${index})">
                                    Ndrysho
                                </button>

                                ${
                                    user.username !== "admin"
                                        ? `
                                            <button
                                                class="mini red"
                                                onclick="adminDeleteUser(${index})">
                                                Fshi
                                            </button>
                                        `
                                        : ""
                                }

                            </div>

                        </div>
                    `).join("")
                }

            </div>

        </div>

        <!-- PRODUCTS -->

        <div class="admin-section">

            <h4>Produktet / Çmimet / Stoku</h4>

            <div class="form-grid">

                <div class="field">
                    <label>Produkt</label>
                    <input id="newProductName">
                </div>

                <div class="field">
                    <label>Kategoria</label>
                    <input id="newProductCategory">
                </div>

                <div class="field">
                    <label>Çmimi</label>
                    <input
                        id="newProductPrice"
                        type="number">
                </div>

                <div class="field">
                    <label>Stoku fillestar</label>
                    <input
                        id="newProductStock"
                        type="number"
                        value="20">
                </div>

            </div>

            <br>

            <button
                class="action primary"
                onclick="adminAddProduct()">
                + SHTO PRODUKT
            </button>

            <br><br>

            <div class="admin-list">

                ${
                    products.map((product,index) => `

                        <div class="admin-row">

                            <div>

                                <strong>
                                    ${esc(product.name)}
                                </strong>

                                <small>
                                    ${esc(product.category)}
                                    •
                                    ${money(product.price)}
                                    •
                                    Stok:
                                    ${getStock(product.id)}
                                </small>

                            </div>

                            <div class="admin-buttons">

                                <button
                                    class="mini"
                                    onclick="adminEditProduct(${index})">
                                    Ndrysho
                                </button>

                                <button
                                    class="mini red"
                                    onclick="adminDeleteProduct(${index})">
                                    Fshi
                                </button>

                            </div>

                        </div>

                    `).join("")
                }

            </div>

        </div>

        <!-- CATEGORIES -->

        <div class="admin-section">

            <h4>Kategoritë</h4>

            <div class="form-grid">

                <div class="field">
                    <label>Kategori e re</label>
                    <input id="newCategory">
                </div>

            </div>

            <br>

            <button
                class="action"
                onclick="adminAddCategory()">
                + SHTO KATEGORI
            </button>

            <br><br>

            <div class="admin-list">

                ${
                    categories.map(category => `
                        <div class="admin-row">
                            <strong>
                                ${esc(category)}
                            </strong>
                        </div>
                    `).join("")
                }

            </div>

        </div>

        <!-- INVOICES -->

        <div class="admin-section">

            <h4>Historiku i faturave</h4>

            <button
                class="action"
                onclick="adminInvoices()">
                SHIKO HISTORIKUN
            </button>

            <button
                class="action danger"
                onclick="adminDeleteInvoices()">
                FSHI HISTORIKUN
            </button>

        </div>
    `;
}

/* =========================================================
   ADMIN SETTINGS
========================================================= */

function saveAdminSettings() {

    const old =
        getSettings();

    const count =
        Math.max(
            1,
            Math.min(
                100,
                Number(
                    document.getElementById(
                        "adminTableCount"
                    ).value
                ) || old.tableCount
            )
        );

    const settings = {

        ...old,

        appName:
            document.getElementById(
                "adminAppName"
            ).value.trim() || "MY BAR",

        businessName:
            document.getElementById(
                "adminBusinessName"
            ).value.trim() || "MY BAR",

        nipt:
            document.getElementById(
                "adminNipt"
            ).value.trim(),

        phone:
            document.getElementById(
                "adminPhone"
            ).value.trim(),

        address:
            document.getElementById(
                "adminAddress"
            ).value.trim(),

        footer:
            document.getElementById(
                "adminFooter"
            ).value.trim(),

        tableCount:
            count
    };

    setJSON(
        SETTINGS_KEY,
        settings
    );

    initializeTables();

    renderHeader();
    renderTables();

    toast("Parametrat u ruajtën.");

    renderAdminPanel();
}

/* =========================================================
   ADMIN USERS
========================================================= */

function adminAddUser() {

    const name =
        document.getElementById(
            "newUserName"
        ).value.trim();

    const username =
        document.getElementById(
            "newUsername"
        ).value.trim();

    const password =
        document.getElementById(
            "newUserPassword"
        ).value.trim();

    const role =
        document.getElementById(
            "newUserRole"
        ).value;

    if (!name || !username || !password) {

        toast(
            "Plotëso emrin, username dhe password."
        );

        return;
    }

    const users =
        getUsers();

    if (
        users.some(
            u => u.username === username
        )
    ) {

        toast("Ky username ekziston.");

        return;
    }

    users.push({

        name,
        username,
        password,
        role
    });

    saveUsers(users);

    renderAdminPanel();

    toast("Përdoruesi u shtua.");
}

function adminEditUser(index) {

    const users =
        getUsers();

    const user =
        users[index];

    if (!user) return;

    const name =
        prompt(
            "Emri:",
            user.name
        );

    if (name === null) return;

    const password =
        prompt(
            "Password/PIN:",
            user.password
        );

    if (password === null) return;

    const role =
        prompt(
            "Roli: admin ose waiter",
            user.role
        );

    if (role === null) return;

    user.name =
        name.trim() || user.name;

    user.password =
        password.trim() || user.password;

    user.role =
        role.trim().toLowerCase() === "admin"
            ? "admin"
            : "waiter";

    saveUsers(users);

    renderAdminPanel();

    toast("Përdoruesi u ndryshua.");
}

function adminDeleteUser(index) {

    const users =
        getUsers();

    if (!users[index]) return;

    if (
        users[index].username === "admin"
    ) {
        toast("Admin kryesor nuk mund të fshihet.");
        return;
    }

    if (
        !confirm(
            "Dëshiron ta fshish këtë përdorues?"
        )
    ) return;

    users.splice(index,1);

    saveUsers(users);

    renderAdminPanel();

    toast("Përdoruesi u fshi.");
}

/* =========================================================
   ADMIN PRODUCTS
========================================================= */

function adminAddProduct() {

    const name =
        document.getElementById(
            "newProductName"
        ).value.trim();

    const category =
        document.getElementById(
            "newProductCategory"
        ).value.trim();

    const price =
        Number(
            document.getElementById(
                "newProductPrice"
            ).value
        );

    const stock =
        Number(
            document.getElementById(
                "newProductStock"
            ).value
        );

    if (!name || !category || price <= 0) {

        toast(
            "Plotëso produktin, kategorinë dhe çmimin."
        );

        return;
    }

    const products =
        getProducts();

    const id =
        Date.now();

    products.push({

        id,

        name,

        category,

        price
    });

    saveProducts(products);

    setStock(
        id,
        stock
    );

    renderCategories();
    renderProducts();

    renderAdminPanel();

    toast("Produkti u shtua.");
}

function adminEditProduct(index) {

    const products =
        getProducts();

    const product =
        products[index];

    if (!product) return;

    const name =
        prompt(
            "Emri i produktit:",
            product.name
        );

    if (name === null) return;

    const category =
        prompt(
            "Kategoria:",
            product.category
        );

    if (category === null) return;

    const price =
        prompt(
            "Çmimi:",
            product.price
        );

    if (price === null) return;

    const stock =
        prompt(
            "Stoku:",
            getStock(product.id)
        );

    if (stock === null) return;

    product.name =
        name.trim() || product.name;

    product.category =
        category.trim() || product.category;

    product.price =
        Number(price) > 0
            ? Number(price)
            : product.price;

    saveProducts(products);

    setStock(
        product.id,
        Number(stock)
    );

    renderCategories();
    renderProducts();
    renderAdminPanel();

    toast("Produkti u ndryshua.");
}

function adminDeleteProduct(index) {

    const products =
        getProducts();

    const product =
        products[index];

    if (!product) return;

    if (
        !confirm(
            "Dëshiron ta fshish produktin?"
        )
    ) return;

    products.splice(index,1);

    saveProducts(products);

    renderCategories();
    renderProducts();
    renderAdminPanel();

    toast("Produkti u fshi.");
}

/* =========================================================
   ADMIN CATEGORIES
========================================================= */

function adminAddCategory() {

    const input =
        document.getElementById(
            "newCategory"
        );

    const category =
        input.value.trim();

    if (!category) {
        toast("Shkruaj kategorinë.");
        return;
    }

    const products =
        getProducts();

    if (
        products.some(
            p => p.category === category
        )
    ) {
        toast("Kjo kategori ekziston.");
        return;
    }

    products.push({

        id:Date.now(),

        name:"Produkt i ri",

        category,

        price:0
    });

    saveProducts(products);

    renderCategories();
    renderProducts();
    renderAdminPanel();

    toast(
        "Kategoria u krijua. Ndrysho produktin e parë nga ADMIN."
    );
}

/* =========================================================
   ADMIN INVOICES
========================================================= */

function adminInvoices() {

    const invoices =
        getJSON(INVOICES_KEY,[]);

    document.getElementById(
        "generalModalBody"
    ).innerHTML = `

        <div class="admin-section">

            <h4>Historiku</h4>

            <div class="admin-list">

                ${
                    invoices.length
                        ? [...invoices]
                            .reverse()
                            .map(invoice => `

                                <div class="admin-row">

                                    <div>

                                        <strong>
                                            ${esc(invoice.number)}
                                        </strong>

                                        <small>
                                            ${new Date(invoice.date)
                                                .toLocaleString("sq-AL")}
                                            •
                                            ${esc(invoice.waiter || "")}
                                            •
                                            ${esc(invoice.payment)}
                                        </small>

                                    </div>

                                    <strong>
                                        ${money(invoice.total)}
                                    </strong>

                                </div>

                            `).join("")
                        :
                            `<div class="empty">
                                Nuk ka fatura.
                            </div>`
                }

            </div>

        </div>

        <button
            class="action"
            onclick="renderAdminPanel()">
            ← KTHEHU
        </button>
    `;
}

function adminDeleteInvoices() {

    if (
        !confirm(
            "Dëshiron të fshish të gjithë historikun?"
        )
    ) return;

    setJSON(
        INVOICES_KEY,
        []
    );

    renderAdminPanel();

    toast("Historiku u fshi.");
}

/* =========================================================
   LOCK / LOGOUT
========================================================= */

function lockScreen() {

    localStorage.removeItem(
        SESSION_KEY
    );

    window.location.href =
        "login.html";
}

function logout() {

    localStorage.removeItem(
        SESSION_KEY
    );

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    window.location.href =
        "login.html";
}

/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.style.display = "flex";
    }
}

function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {
        modal.style.display = "none";
    }
}

function showGeneral(title,body) {

    document.getElementById(
        "generalModalTitle"
    ).textContent = title;

    document.getElementById(
        "generalModalBody"
    ).innerHTML = body;

    openModal("generalModal");
}

/* =========================================================
   TOAST
========================================================= */

function toast(message) {

    const box =
        document.getElementById("toast");

    if (!box) return;

    box.textContent =
        message;

    box.style.display =
        "block";

    clearTimeout(
        window.myBarToast
    );

    window.myBarToast =
        setTimeout(() => {

            box.style.display =
                "none";

        },2300);
}

/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    clock.textContent =
        new Date()
            .toLocaleTimeString(
                "sq-AL",
                {
                    hour:"2-digit",
                    minute:"2-digit",
                    second:"2-digit"
                }
            );
}

/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const session =
            getSession();

        if (!session) {

            window.location.href =
                "login.html";

            return;
        }

        initialize();

        renderHeader();
        renderTables();
        renderCategories();
        renderProducts();
        renderOrder();

        const search =
            document.getElementById(
                "searchInput"
            );

        if (search) {

            search.addEventListener(
                "input",
                () => {
                    renderProducts(
                        search.value
                    );
                }
            );
        }

        updateClock();

        setInterval(
            updateClock,
            1000
        );
    }
);

/* =========================================================
   GLOBALS
========================================================= */

window.newInvoice = newInvoice;
window.selectTable = selectTable;
window.setCategory = setCategory;
window.addProduct = addProduct;

window.changeQuantity = changeQuantity;
window.removeItem = removeItem;
window.clearOrder = clearOrder;

window.openPayment = openPayment;
window.completePayment = completePayment;

window.closeCurrentInvoice =
    closeCurrentInvoice;

window.printInvoice =
    printInvoice;

window.finishInvoice =
    finishInvoice;

window.openSummary =
    openSummary;

window.openMyInvoices =
    openMyInvoices;

window.showInvoiceById =
    showInvoiceById;

window.tableDetails =
    tableDetails;

window.transferTable =
    transferTable;

window.doTransfer =
    doTransfer;

window.openCash =
    openCash;

window.cashReport =
    cashReport;

window.openAdmin =
    openAdmin;

window.saveAdminSettings =
    saveAdminSettings;

window.adminAddUser =
    adminAddUser;

window.adminEditUser =
    adminEditUser;

window.adminDeleteUser =
    adminDeleteUser;

window.adminAddProduct =
    adminAddProduct;

window.adminEditProduct =
    adminEditProduct;

window.adminDeleteProduct =
    adminDeleteProduct;

window.adminAddCategory =
    adminAddCategory;

window.adminInvoices =
    adminInvoices;

window.adminDeleteInvoices =
    adminDeleteInvoices;

window.lockScreen =
    lockScreen;

window.logout =
    logout;

window.openModal =
    openModal;

window.closeModal =
    closeModal;

window.toast =
    toast;
