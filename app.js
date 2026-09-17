// ============================================
// BAR LULISHTJA - COMPLETE APP
// ============================================

const USERS_KEY = "barUsersV3";
const PRODUCTS_KEY = "barProductsV3";
const INVOICES_KEY = "barInvoicesV3";
const TABLES_KEY = "barTablesV4";
const TABLE_COUNT_KEY = "barTableCountV3";
const TABLE_NAMES_KEY = "barTableNameV3_";
const APP_NAME_KEY = "barAppNameV3";
const CURRENT_USER_KEY = "barCurrentUser";
const STOCK_KEY = "barInventoryV1";

let selectedTableNumber = null;
let currentCategory = "Të gjitha";


// ============================================
// DEFAULT DATA
// ============================================

const defaultProducts = [
    { id: "p1", name: "Espresso", price: 100, category: "Kafe" },
    { id: "p2", name: "Macchiato", price: 120, category: "Kafe" },
    { id: "p3", name: "Cappuccino", price: 180, category: "Kafe" },

    { id: "p4", name: "Coca Cola", price: 150, category: "Pije" },
    { id: "p5", name: "Fanta", price: 150, category: "Pije" },
    { id: "p6", name: "Ujë", price: 100, category: "Pije" },
    { id: "p7", name: "Red Bull", price: 250, category: "Pije" },

    { id: "p8", name: "Birrë", price: 200, category: "Alkool" },
    { id: "p9", name: "Verë", price: 300, category: "Alkool" },

    { id: "p10", name: "Koktej", price: 500, category: "Koktej" }
];


const defaultUsers = [
    {
        id: "u1",
        username: "admin",
        password: "1234",
        role: "admin",
        name: "Administrator"
    },

    {
        id: "u2",
        username: "kamarier1",
        password: "1234",
        role: "waiter",
        name: "Kamarier 1"
    }
];


// ============================================
// LOCAL STORAGE HELPERS
// ============================================

function getProducts() {

    let products =
        JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "null");

    if (!Array.isArray(products) || products.length === 0) {

        products = defaultProducts;

        localStorage.setItem(
            PRODUCTS_KEY,
            JSON.stringify(products)
        );
    }

    return products;
}


function saveProducts(products) {

    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );
}


function getUsers() {

    let users =
        JSON.parse(localStorage.getItem(USERS_KEY) || "null");

    if (!Array.isArray(users) || users.length === 0) {

        users = defaultUsers;

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );
    }

    return users;
}


function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );
}


function getInvoices() {

    return JSON.parse(
        localStorage.getItem(INVOICES_KEY) || "[]"
    );
}


function saveInvoices(invoices) {

    localStorage.setItem(
        INVOICES_KEY,
        JSON.stringify(invoices)
    );
}


function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(CURRENT_USER_KEY) || "null"
    );
}


// ============================================
// APP START
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    if (!getCurrentUser()) {

        window.location.href = "login.html";

        return;
    }

    getProducts();
    getUsers();

    initializeTables();
    initializeStock();

    updateAppName();
    updateClock();
    setupPermissions();

    renderDashboard();
    renderTables();
    renderMenu();
    renderAdmin();
    renderCash();
    renderHistory();

    setInterval(updateClock, 1000);

});


// ============================================
// APP NAME
// ============================================

function updateAppName() {

    const name =
        localStorage.getItem(APP_NAME_KEY) ||
        "Bar Lulishtja";

    const el =
        document.getElementById("appName");

    if (el) {
        el.textContent = name;
    }
}


// ============================================
// CLOCK
// ============================================

function updateClock() {

    const el =
        document.getElementById("clock");

    if (!el) return;

    const now = new Date();

    el.textContent =
        now.toLocaleTimeString("sq-AL", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
}


// ============================================
// PERMISSIONS
// ============================================

function setupPermissions() {

    const user = getCurrentUser();

    if (!user) return;

    const userInfo =
        document.getElementById("userInfo");

    if (userInfo) {

        userInfo.textContent =
            user.name + " • " +
            (user.role === "admin"
                ? "Administrator"
                : "Kamarier");
    }

    if (user.role !== "admin") {

        document
            .querySelectorAll(".admin-only")
            .forEach(el => {
                el.style.display = "none";
            });
    }
}


// ============================================
// PAGE NAVIGATION
// ============================================

function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(section => {

            section.classList.remove("active");

        });


    const target =
        document.getElementById(page);

    if (!target) return;

    target.classList.add("active");


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

    if (page === "stock") {

        renderStock();

    }

    if (page === "reports") {

        renderReports();

    }

}


// ============================================
// TABLES
// ============================================

function getTableCount() {

    return Number(
        localStorage.getItem(TABLE_COUNT_KEY) || 10
    );
}


function initializeTables() {

    let tables =
        JSON.parse(
            localStorage.getItem(TABLES_KEY) || "null"
        );

    const count = getTableCount();

    if (!Array.isArray(tables)) {

        tables = [];

        for (let i = 1; i <= count; i++) {

            tables.push({
                number: i,
                busy: false,
                items: []
            });
        }

        localStorage.setItem(
            TABLES_KEY,
            JSON.stringify(tables)
        );

        return;
    }


    for (let i = 1; i <= count; i++) {

        if (!tables.find(t => Number(t.number) === i)) {

            tables.push({
                number: i,
                busy: false,
                items: []
            });
        }
    }


    tables = tables.filter(
        t => Number(t.number) <= count
    );


    localStorage.setItem(
        TABLES_KEY,
        JSON.stringify(tables)
    );
}


function getTables() {

    initializeTables();

    return JSON.parse(
        localStorage.getItem(TABLES_KEY) || "[]"
    );
}


function saveTables(tables) {

    localStorage.setItem(
        TABLES_KEY,
        JSON.stringify(tables)
    );
}


function getTable(number) {

    return getTables().find(
        t => Number(t.number) === Number(number)
    );
}


function getTableName(number) {

    return (
        localStorage.getItem(
            TABLE_NAMES_KEY + number
        ) ||
        "Tavolina " + number
    );
}


function openTable(number) {

    const table = getTable(number);

    if (!table) {

        alert("Tavolina nuk u gjet.");

        return;
    }

    selectedTableNumber = Number(number);

    table.busy = true;

    saveTables(getTables());

    showPage("orders");

    renderOrderPage();
    renderTables();
    renderDashboard();
}


function renderTables() {

    const container =
        document.getElementById("tableGrid");

    if (!container) return;

    const tables = getTables();

    container.innerHTML = "";

    tables.forEach(table => {

        const card =
            document.createElement("div");

        card.className =
            "table-card " +
            (table.busy ? "busy" : "free");

        card.innerHTML = `

            <div>

                <div class="table-number">
                    🪑 ${escapeHtml(getTableName(table.number))}
                </div>

                <div class="table-status">

                    ${table.busy
                        ? "🔴 E zënë"
                        : "🟢 E lirë"}

                </div>

            </div>

            <button class="primary-btn">

                ${table.busy
                    ? "Hap porosinë"
                    : "Hap tavolinën"}

            </button>
        `;


        card
            .querySelector("button")
            .addEventListener(
                "click",
                () => openTable(table.number)
            );


        container.appendChild(card);

    });


    renderDashboardTables();
}


function renderDashboardTables() {

    const container =
        document.getElementById("dashboardTables");

    if (!container) return;

    const tables = getTables();

    container.innerHTML = "";

    tables.forEach(table => {

        const card =
            document.createElement("div");

        card.className =
            "table-card " +
            (table.busy ? "busy" : "free");

        card.innerHTML = `

            <div>

                <div class="table-number">
                    ${escapeHtml(getTableName(table.number))}
                </div>

                <div class="table-status">
                    ${table.busy
                        ? "🔴 E zënë"
                        : "🟢 E lirë"}
                </div>

            </div>

        `;


        card.onclick =
            () => openTable(table.number);


        container.appendChild(card);

    });
}


// ============================================
// MENU
// ============================================

function renderMenu() {

    const products = getProducts();

    const categories =
        ["Të gjitha", ...new Set(
            products.map(p => p.category)
        )];


    const catContainer =
        document.getElementById("categories");

    const menuContainer =
        document.getElementById("menuGrid");


    if (!catContainer || !menuContainer) return;


    catContainer.innerHTML = "";

    categories.forEach(category => {

        const button =
            document.createElement("button");

        button.className =
            "category-btn " +
            (currentCategory === category
                ? "active"
                : "");

        button.textContent = category;

        button.onclick = () => {

            currentCategory = category;

            renderMenu();

        };


        catContainer.appendChild(button);

    });


    menuContainer.innerHTML = "";


    products
        .filter(product =>
            currentCategory === "Të gjitha" ||
            product.category === currentCategory
        )
        .forEach(product => {

            const card =
                document.createElement("div");

            card.className = "menu-card";


            card.innerHTML = `

                <h3>
                    ${escapeHtml(product.name)}
                </h3>

                <div class="menu-category">
                    ${escapeHtml(product.category)}
                </div>

                <div class="menu-price">
                    ${Number(product.price).toLocaleString()} L
                </div>

                <button class="primary-btn">
                    + Shto
                </button>

            `;


            card
                .querySelector("button")
                .onclick = () =>
                    addProductToOrder(product.id);


            menuContainer.appendChild(card);

        });
}


// ============================================
// ORDERS
// ============================================

function renderOrderPage() {

    const text =
        document.getElementById(
            "selectedTableText"
        );

    if (!selectedTableNumber) {

        if (text) {
            text.textContent =
                "Zgjidh një tavolinë.";
        }

        return;
    }


    if (text) {

        text.textContent =
            getTableName(selectedTableNumber);
    }


    renderOrderProducts();
    renderOrderItems();
}


function renderOrderProducts() {

    const container =
        document.getElementById("orderProducts");

    if (!container) return;

    container.innerHTML = "";


    getProducts().forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "order-product";


        card.innerHTML = `

            <strong>
                ${escapeHtml(product.name)}
            </strong>

            <div>
                ${Number(product.price).toLocaleString()} L
            </div>

            <br>

            <button class="small-btn">
                + Shto
            </button>

        `;


        card
            .querySelector("button")
            .onclick = () =>
                addProductToOrder(product.id);


        container.appendChild(card);

    });
}


function addProductToOrder(productId) {

    if (!selectedTableNumber) {

        alert("Zgjidh fillimisht një tavolinë.");

        return;
    }


    const tables = getTables();

    const table =
        tables.find(
            t =>
                Number(t.number) ===
                Number(selectedTableNumber)
        );


    if (!table) return;


    if (!Array.isArray(table.items)) {
        table.items = [];
    }


    const product =
        getProducts().find(
            p => p.id === productId
        );


    if (!product) return;


    const existing =
        table.items.find(
            item => item.productId === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        table.items.push({

            productId: product.id,

            name: product.name,

            price: Number(product.price),

            quantity: 1

        });

    }


    table.busy = true;

    saveTables(tables);

    renderOrderItems();
    renderTables();
    renderDashboard();
}


function renderOrderItems() {

    const container =
        document.getElementById("orderItems");

    const totalElement =
        document.getElementById("orderTotal");


    if (!container) return;


    container.innerHTML = "";


    if (!selectedTableNumber) {

        if (totalElement)
            totalElement.textContent = "0 L";

        return;
    }


    const table =
        getTable(selectedTableNumber);


    if (!table) return;


    let total = 0;


    table.items.forEach((item, index) => {

        const quantity =
            Number(item.quantity || 0);

        const subtotal =
            Number(item.price) * quantity;

        total += subtotal;


        const row =
            document.createElement("div");

        row.className = "order-item";


        row.innerHTML = `

            <div>

                <strong>
                    ${escapeHtml(item.name)}
                </strong>

                <div>
                    ${Number(item.price).toLocaleString()} L
                </div>

            </div>

            <div class="qty-controls">

                <button class="small-btn">−</button>

                <strong>${quantity}</strong>

                <button class="small-btn">+</button>

            </div>

            <strong>
                ${subtotal.toLocaleString()} L
            </strong>

        `;


        const buttons =
            row.querySelectorAll("button");


        buttons[0].onclick =
            () => changeOrderQuantity(index, -1);

        buttons[1].onclick =
            () => changeOrderQuantity(index, 1);


        container.appendChild(row);

    });


    if (!table.items.length) {

        container.innerHTML =
            `<p style="opacity:.6">
                Nuk ka produkte në porosi.
            </p>`;

    }


    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString() + " L";
    }
}


function changeOrderQuantity(index, change) {

    const tables = getTables();

    const table =
        tables.find(
            t =>
                Number(t.number) ===
                Number(selectedTableNumber)
        );


    if (!table) return;


    table.items[index].quantity += change;


    if (table.items[index].quantity <= 0) {

        table.items.splice(index, 1);

    }


    table.busy =
        table.items.length > 0;


    saveTables(tables);

    renderOrderItems();
    renderTables();
    renderDashboard();
}


// ============================================
// PAYMENT
// ============================================

function openPayment() {

    if (!selectedTableNumber) {

        alert("Zgjidh një tavolinë.");

        return;
    }


    const table =
        getTable(selectedTableNumber);


    if (!table || !table.items.length) {

        alert("Porosia është bosh.");

        return;
    }


    const total =
        table.items.reduce(
            (sum, item) =>
                sum +
                Number(item.price) *
                Number(item.quantity),
            0
        );


    document.getElementById(
        "paymentTotal"
    ).textContent =
        total.toLocaleString() + " L";


    openModal("paymentModal");
}


function completePayment(method) {

    const tables = getTables();

    const table =
        tables.find(
            t =>
                Number(t.number) ===
                Number(selectedTableNumber)
        );


    if (!table || !table.items.length) {

        closeModal("paymentModal");

        return;
    }


    const total =
        table.items.reduce(
            (sum, item) =>
                sum +
                Number(item.price) *
                Number(item.quantity),
            0
        );


    const user =
        getCurrentUser();


    const invoice = {

        id:
            "BL-" +
            Date.now(),

        date:
            new Date().toISOString(),

        table:
            selectedTableNumber,

        tableName:
            getTableName(selectedTableNumber),

        items:
            JSON.parse(
                JSON.stringify(table.items)
            ),

        total:

            total,

        paymentMethod:
            method,

        userName:
            user
                ? user.name
                : "Pa emër"

    };


    const invoices =
        getInvoices();


    invoices.unshift(invoice);

    saveInvoices(invoices);


    // UL STOKUN AUTOMATIKISHT

    decreaseStockForInvoice(
        invoice.items
    );


    // EMPTY TABLE

    table.items = [];

    table.busy = false;

    saveTables(tables);


    closeModal("paymentModal");


    showInvoice(invoice);


    selectedTableNumber = null;


    renderTables();
    renderDashboard();
    renderCash();
    renderHistory();
    renderStock();
    renderReports();

}


// ============================================
// STOCK
// ============================================

function initializeStock() {

    let stock =
        JSON.parse(
            localStorage.getItem(STOCK_KEY) || "null"
        );


    if (!stock || typeof stock !== "object") {

        stock = {};

    }


    getProducts().forEach(product => {

        if (
            stock[product.id] === undefined
        ) {

            stock[product.id] = 0;

        }

    });


    localStorage.setItem(
        STOCK_KEY,
        JSON.stringify(stock)
    );
}


function getStock() {

    initializeStock();

    return JSON.parse(
        localStorage.getItem(STOCK_KEY) || "{}"
    );
}


function saveStock(stock) {

    localStorage.setItem(
        STOCK_KEY,
        JSON.stringify(stock)
    );
}


function changeStock(productId, amount) {

    const stock = getStock();

    const current =
        Number(stock[productId] || 0);


    stock[productId] =
        Math.max(
            0,
            current + Number(amount)
        );


    saveStock(stock);

    renderStock();

}


function decreaseStockForInvoice(items) {

    const stock = getStock();


    items.forEach(item => {

        if (
            stock[item.productId] !== undefined
        ) {

            stock[item.productId] =
                Math.max(
                    0,
                    Number(stock[item.productId]) -
                    Number(item.quantity)
                );

        }

    });


    saveStock(stock);

}


function renderStock() {

    const container =
        document.getElementById("stockList");

    if (!container) return;


    const products =
        getProducts();

    const stock =
        getStock();


    let total = 0;
    let low = 0;
    let empty = 0;


    container.innerHTML = "";


    products.forEach(product => {

        const quantity =
            Number(stock[product.id] || 0);


        total += quantity;


        if (quantity === 0) {

            empty++;

        }


        if (quantity > 0 && quantity <= 5) {

            low++;

        }


        let statusClass =
            "stock-ok";

        let status =
            "🟢 Në rregull";


        if (quantity === 0) {

            statusClass =
                "stock-empty";

            status =
                "🔴 Mbaruar";

        } else if (quantity <= 5) {

            statusClass =
                "stock-low";

            status =
                "🟡 Stok i ulët";

        }


        const row =
            document.createElement("div");

        row.className =
            "stock-row";


        row.innerHTML = `

            <div class="stock-info">

                <strong>
                    ${escapeHtml(product.name)}
                </strong>

                <span>
                    ${escapeHtml(product.category)}
                </span>

            </div>


            <div class="${statusClass}">
                ${status}
            </div>


            <div class="stock-controls">

                <button class="small-btn">
                    −
                </button>

                <div class="stock-number">
                    ${quantity}
                </div>

                <button class="small-btn">
                    +
                </button>

            </div>

        `;


        const buttons =
            row.querySelectorAll("button");


        buttons[0].onclick =
            () => changeStock(product.id, -1);


        buttons[1].onclick =
            () => changeStock(product.id, 1);


        container.appendChild(row);

    });


    const productsEl =
        document.getElementById(
            "stockProducts"
        );

    const totalEl =
        document.getElementById(
            "stockTotal"
        );

    const lowEl =
        document.getElementById(
            "stockLow"
        );

    const emptyEl =
        document.getElementById(
            "stockEmpty"
        );


    if (productsEl)
        productsEl.textContent =
            products.length;


    if (totalEl)
        totalEl.textContent =
            total;


    if (lowEl)
        lowEl.textContent =
            low;


    if (emptyEl)
        emptyEl.textContent =
            empty;

}


// ============================================
// DASHBOARD
// ============================================

function renderDashboard() {

    const invoices =
        getInvoices();

    const today =
        new Date();


    let sales = 0;
    let card = 0;
    let invoiceCount = 0;


    invoices.forEach(invoice => {

        const date =
            new Date(invoice.date);


        if (isSameDay(date, today)) {

            sales +=
                Number(invoice.total || 0);

            invoiceCount++;


            if (
                invoice.paymentMethod ===
                "card"
            ) {

                card +=
                    Number(invoice.total || 0);

            }

        }

    });


    const active =
        getTables()
            .filter(t => t.busy)
            .length;


    document.getElementById(
        "salesToday"
    ).textContent =
        sales.toLocaleString() + " L";


    document.getElementById(
        "activeTables"
    ).textContent =
        active;


    document.getElementById(
        "invoiceToday"
    ).textContent =
        invoiceCount;


    document.getElementById(
        "cardToday"
    ).textContent =
        card.toLocaleString() + " L";


    renderDashboardTables();
}


// ============================================
// CASH
// ============================================

function renderCash() {

    const invoices =
        getInvoices();


    let total = 0;
    let cash = 0;
    let card = 0;


    invoices.forEach(invoice => {

        const amount =
            Number(invoice.total || 0);


        total += amount;


        if (
            invoice.paymentMethod === "card"
        ) {

            card += amount;

        } else {

            cash += amount;

        }

    });


    const cashTotal =
        document.getElementById("cashTotal");

    const cashMoney =
        document.getElementById("cashMoney");

    const cashCard =
        document.getElementById("cashCard");

    const cashInvoices =
        document.getElementById("cashInvoices");


    if (cashTotal)
        cashTotal.textContent =
            total.toLocaleString() + " L";


    if (cashMoney)
        cashMoney.textContent =
            cash.toLocaleString() + " L";


    if (cashCard)
        cashCard.textContent =
            card.toLocaleString() + " L";


    if (cashInvoices)
        cashInvoices.textContent =
            invoices.length;


    const list =
        document.getElementById(
            "paymentsList"
        );


    if (!list) return;


    list.innerHTML = "";


    invoices.slice(0, 20)
        .forEach(invoice => {

            const row =
                document.createElement("div");

            row.className =
                "history-row";


            row.innerHTML = `

                <div>

                    <strong>
                        ${invoice.id}
                    </strong>

                    <div>
                        ${formatDate(invoice.date)}
                    </div>

                </div>

                <strong>
                    ${Number(invoice.total).toLocaleString()} L
                </strong>

                <span>
                    ${invoice.paymentMethod === "card"
                        ? "💳 Kartë"
                        : "💵 Cash"}
                </span>

            `;


            list.appendChild(row);

        });

}


// ============================================
// HISTORY
// ============================================

function renderHistory() {

    const container =
        document.getElementById(
            "historyList"
        );


    if (!container) return;


    const invoices =
        getInvoices();


    container.innerHTML = "";


    if (!invoices.length) {

        container.innerHTML =
            `<p style="opacity:.6">
                Nuk ka fatura.
            </p>`;

        return;
    }


    invoices.forEach(invoice => {

        const row =
            document.createElement("div");

        row.className =
            "history-row";


        row.innerHTML = `

            <div>

                <strong>
                    ${invoice.id}
                </strong>

                <div>
                    Tavolina ${invoice.table}
                </div>

            </div>

            <div>
                ${formatDate(invoice.date)}
            </div>

            <strong>
                ${Number(invoice.total).toLocaleString()} L
            </strong>

            <div>
                ${invoice.paymentMethod === "card"
                    ? "💳 Kartë"
                    : "💵 Cash"}
            </div>

        `;


        row.onclick =
            () => showInvoice(invoice);


        container.appendChild(row);

    });

}


function deleteHistory() {

    if (
        !confirm(
            "Je i sigurt që dëshiron të fshish historikun?"
        )
    ) {

        return;

    }


    localStorage.removeItem(
        INVOICES_KEY
    );


    renderHistory();
    renderCash();
    renderDashboard();
    renderReports();

}


// ============================================
// REPORTS
// ============================================

function renderReports() {

    const invoices =
        getInvoices();


    const now =
        new Date();


    let today = 0;
    let week = 0;
    let month = 0;

    let cash = 0;
    let card = 0;


    const productSales = {};
    const waiterSales = {};


    invoices.forEach(invoice => {

        const date =
            new Date(invoice.date);


        const total =
            Number(invoice.total || 0);


        if (isSameDay(date, now)) {

            today += total;

        }


        if (isThisWeek(date)) {

            week += total;

        }


        if (isThisMonth(date)) {

            month += total;

        }


        if (
            invoice.paymentMethod ===
            "card"
        ) {

            card += total;

        } else {

            cash += total;

        }


        const waiter =
            invoice.userName ||
            "Pa emër";


        waiterSales[waiter] =
            (waiterSales[waiter] || 0) +
            total;


        (invoice.items || [])
            .forEach(item => {

                const name =
                    item.name;


                if (!productSales[name]) {

                    productSales[name] = {

                        quantity: 0,

                        revenue: 0

                    };

                }


                productSales[name].quantity +=
                    Number(item.quantity || 0);


                productSales[name].revenue +=
                    Number(item.price || 0) *
                    Number(item.quantity || 0);

            });

    });


    setText(
        "reportToday",
        today.toLocaleString() + " L"
    );

    setText(
        "reportWeek",
        week.toLocaleString() + " L"
    );

    setText(
        "reportMonth",
        month.toLocaleString() + " L"
    );

    setText(
        "reportInvoices",
        invoices.length
    );

    setText(
        "reportCash",
        cash.toLocaleString() + " L"
    );

    setText(
        "reportCard",
        card.toLocaleString() + " L"
    );


    // TOP PRODUCTS

    const top =
        document.getElementById(
            "topProducts"
        );


    if (top) {

        const products =
            Object.entries(productSales)
                .sort(
                    (a, b) =>
                        b[1].quantity -
                        a[1].quantity
                )
                .slice(0, 10);


        top.innerHTML = "";


        if (!products.length) {

            top.innerHTML =
                `<p style="opacity:.6">
                    Nuk ka shitje akoma.
                </p>`;

        }


        products.forEach(
            ([name, data], index) => {

                const row =
                    document.createElement("div");

                row.className =
                    "report-row";


                row.innerHTML = `

                    <div class="report-info">

                        <strong>
                            ${index + 1}. 
                            ${escapeHtml(name)}
                        </strong>

                        <span>
                            ${data.quantity} copë
                        </span>

                    </div>

                    <strong>
                        ${data.revenue.toLocaleString()} L
                    </strong>

                `;


                top.appendChild(row);

            }
        );

    }


    // WAITER REPORTS

    const waiterContainer =
        document.getElementById(
            "waiterReports"
        );


    if (waiterContainer) {

        const waiters =
            Object.entries(waiterSales)
                .sort(
                    (a, b) =>
                        b[1] - a[1]
                );


        waiterContainer.innerHTML = "";


        if (!waiters.length) {

            waiterContainer.innerHTML =
                `<p style="opacity:.6">
                    Nuk ka shitje akoma.
                </p>`;

        }


        waiters.forEach(
            ([name, amount]) => {

                const row =
                    document.createElement("div");

                row.className =
                    "report-row";


                row.innerHTML = `

                    <div class="report-info">

                        <strong>
                            ${escapeHtml(name)}
                        </strong>

                        <span>
                            Shitje
                        </span>

                    </div>

                    <strong>
                        ${amount.toLocaleString()} L
                    </strong>

                `;


                waiterContainer.appendChild(row);

            }
        );

    }

}


// ============================================
// ADMIN
// ============================================

function renderAdmin() {

    const nameInput =
        document.getElementById(
            "appNameInput"
        );


    if (nameInput) {

        nameInput.value =
            localStorage.getItem(
                APP_NAME_KEY
            ) ||
            "Bar Lulishtja";

    }


    renderUsers();
    renderAdminProducts();
    renderAdminTables();

}


function saveAppName() {

    const input =
        document.getElementById(
            "appNameInput"
        );


    const name =
        input.value.trim();


    if (!name) {

        alert("Shkruaj emrin.");

        return;
    }


    localStorage.setItem(
        APP_NAME_KEY,
        name
    );


    updateAppName();


    alert("Emri u ruajt.");
}


function renderUsers() {

    const container =
        document.getElementById(
            "usersList"
        );


    if (!container) return;


    const users =
        getUsers();


    container.innerHTML = "";


    users.forEach(user => {

        const row =
            document.createElement("div");

        row.className =
            "admin-row";


        row.innerHTML = `

            <div>

                <strong>
                    ${escapeHtml(user.name)}
                </strong>

                <div>
                    @${escapeHtml(user.username)}
                </div>

            </div>

            <span>
                ${user.role === "admin"
                    ? "Admin"
                    : "Kamarier"}
            </span>

            ${
                user.username !== "admin"
                ? `
                    <button class="danger-btn">
                        Fshi
                    </button>
                  `
                : ""
            }

        `;


        const deleteButton =
            row.querySelector("button");


        if (deleteButton) {

            deleteButton.onclick = () =>
                deleteUser(user.id);

        }


        container.appendChild(row);

    });

}


function openWaiterModal() {

    const content =
        document.getElementById(
            "generalModalContent"
        );


    content.innerHTML = `

        <h2>👨‍🍳 Shto kamarier</h2>

        <input
            id="newWaiterName"
            class="input"
            placeholder="Emri">

        <input
            id="newWaiterUsername"
            class="input"
            placeholder="Username">

        <input
            id="newWaiterPassword"
            class="input"
            type="password"
            placeholder="Password">

        <button class="primary-btn"
                onclick="createWaiter()">
            Shto
        </button>

    `;


    openModal("generalModal");
}


function createWaiter() {

    const name =
        document.getElementById(
            "newWaiterName"
        ).value.trim();


    const username =
        document.getElementById(
            "newWaiterUsername"
        ).value.trim();


    const password =
        document.getElementById(
            "newWaiterPassword"
        ).value;


    if (!name || !username || !password) {

        alert("Plotëso të gjitha fushat.");

        return;
    }


    const users =
        getUsers();


    if (
        users.some(
            u => u.username === username
        )
    ) {

        alert("Ky username ekziston.");

        return;
    }


    users.push({

        id:
            "u" +
            Date.now(),

        name,

        username,

        password,

        role:
            "waiter"

    });


    saveUsers(users);


    closeModal("generalModal");

    renderUsers();

}


function deleteUser(id) {

    if (
        !confirm(
            "Fshi këtë kamarier?"
        )
    ) {

        return;

    }


    const users =
        getUsers()
            .filter(
                u => u.id !== id
            );


    saveUsers(users);

    renderUsers();

}


// ============================================
// PRODUCTS ADMIN
// ============================================

function renderAdminProducts() {

    const container =
        document.getElementById(
            "adminProducts"
        );


    if (!container) return;


    container.innerHTML = "";


    getProducts()
        .forEach(product => {

            const row =
                document.createElement("div");

            row.className =
                "admin-row";


            row.innerHTML = `

                <div>

                    <strong>
                        ${escapeHtml(product.name)}
                    </strong>

                    <div>
                        ${Number(product.price).toLocaleString()} L
                    </div>

                </div>

                <span>
                    ${escapeHtml(product.category)}
                </span>

                <button class="danger-btn">
                    Fshi
                </button>

            `;


            row
                .querySelector("button")
                .onclick =
                () =>
                    deleteProduct(product.id);


            container.appendChild(row);

        });

}


function openProductModal() {

    const content =
        document.getElementById(
            "generalModalContent"
        );


    content.innerHTML = `

        <h2>🍔 Shto produkt</h2>

        <input
            id="newProductName"
            class="input"
            placeholder="Emri">

        <input
            id="newProductPrice"
            class="input"
            type="number"
            placeholder="Çmimi">

        <input
            id="newProductCategory"
            class="input"
            placeholder="Kategoria">

        <input
            id="newProductStock"
            class="input"
            type="number"
            min="0"
            placeholder="Stoku fillestar">

        <button class="primary-btn"
                onclick="createProduct()">
            Shto produkt
        </button>

    `;


    openModal("generalModal");
}


function createProduct() {

    const name =
        document.getElementById(
            "newProductName"
        ).value.trim();


    const price =
        Number(
            document.getElementById(
                "newProductPrice"
            ).value
        );


    const category =
        document.getElementById(
            "newProductCategory"
        ).value.trim();


    const stock =
        Number(
            document.getElementById(
                "newProductStock"
            ).value || 0
        );


    if (
        !name ||
        !price ||
        !category
    ) {

        alert("Plotëso të gjitha fushat.");

        return;
    }


    const product = {

        id:
            "p" +
            Date.now(),

        name,

        price,

        category

    };


    const products =
        getProducts();


    products.push(product);

    saveProducts(products);


    const inventory =
        getStock();


    inventory[product.id] =
        Math.max(0, stock);


    saveStock(inventory);


    closeModal("generalModal");


    renderMenu();
    renderAdminProducts();
    renderStock();

}


function deleteProduct(id) {

    if (
        !confirm(
            "Fshi këtë produkt?"
        )
    ) {

        return;
    }


    const products =
        getProducts()
            .filter(
                p => p.id !== id
            );


    saveProducts(products);


    const stock =
        getStock();


    delete stock[id];

    saveStock(stock);


    renderMenu();
    renderAdminProducts();
    renderStock();

}


// ============================================
// TABLE ADMIN
// ============================================

function renderAdminTables() {

    const container =
        document.getElementById(
            "adminTables"
        );


    if (!container) return;


    const count =
        getTableCount();


    const input =
        document.getElementById(
            "tableCountInput"
        );


    if (input) {

        input.value = count;

    }


    container.innerHTML = "";


    for (let i = 1; i <= count; i++) {

        const row =
            document.createElement("div");

        row.className =
            "admin-row";


        row.innerHTML = `

            <strong>
                Tavolina ${i}
            </strong>

            <input
                class="input"
                style="max-width:220px"
                value="${escapeHtml(
                    getTableName(i)
                )}"
                id="tableName_${i}"
            >

            <button class="primary-btn">
                Ruaj
            </button>

        `;


        row
            .querySelector("button")
            .onclick =
            () => saveTableName(i);


        container.appendChild(row);

    }

}


function saveTableName(number) {

    const input =
        document.getElementById(
            "tableName_" + number
        );


    if (!input) return;


    localStorage.setItem(
        TABLE_NAMES_KEY + number,
        input.value.trim() ||
        "Tavolina " + number
    );


    renderTables();
    renderAdminTables();

}


function saveTableCount() {

    const input =
        document.getElementById(
            "tableCountInput"
        );


    const count =
        Number(input.value);


    if (!count || count < 1) {

        alert(
            "Numri duhet të jetë të paktën 1."
        );

        return;
    }


    const tables =
        getTables();


    const hasActive =
        tables.some(
            table =>
                table.busy &&
                table.items &&
                table.items.length
        );


    if (
        hasActive &&
        !confirm(
            "Ka tavolina me porosi aktive. Vazhdo?"
        )
    ) {

        return;

    }


    localStorage.setItem(
        TABLE_COUNT_KEY,
        count
    );


    initializeTables();


    renderTables();
    renderAdminTables();
    renderDashboard();

}


// ============================================
// ADMIN PASSWORD
// ============================================

function changeAdminPassword() {

    const input =
        document.getElementById(
            "newAdminPassword"
        );


    const password =
        input.value;


    if (!password) {

        alert("Shkruaj password-in e ri.");

        return;
    }


    const users =
        getUsers();


    const admin =
        users.find(
            u => u.username === "admin"
        );


    if (admin) {

        admin.password =
            password;

    }


    saveUsers(users);


    input.value = "";


    alert(
        "Password-i u ndryshua."
    );

}


// ============================================
// INVOICE
// ============================================

let currentInvoice = null;


function showInvoice(invoice) {

    currentInvoice = invoice;


    const content =
        document.getElementById(
            "invoiceContent"
        );


    let html = `

        <div class="invoice">

            <div class="invoice-header">

                <h2>
                    ${escapeHtml(
                        localStorage.getItem(
                            APP_NAME_KEY
                        ) ||
                        "Bar Lulishtja"
                    )}
                </h2>

                <div>
                    Faturë
                </div>

                <div>
                    ${escapeHtml(invoice.id)}
                </div>

                <div>
                    ${formatDate(invoice.date)}
                </div>

                <div>
                    Tavolina ${invoice.table}
                </div>

                <hr>

            </div>

    `;


    invoice.items.forEach(item => {

        const subtotal =
            Number(item.price) *
            Number(item.quantity);


        html += `

            <div class="invoice-line">

                <span>
                    ${escapeHtml(item.name)}
                    × ${item.quantity}
                </span>

                <span>
                    ${subtotal.toLocaleString()} L
                </span>

            </div>

        `;

    });


    html += `

            <div class="invoice-total">

                <span>Total</span>

                <span>
                    ${Number(
                        invoice.total
                    ).toLocaleString()} L
                </span>

            </div>


            <p>
                Pagesa:
                ${
                    invoice.paymentMethod === "card"
                    ? "💳 Kartë"
                    : "💵 Cash"
                }
            </p>


            <p>
                Kamarieri:
                ${escapeHtml(
                    invoice.userName
                )}
            </p>


            <p style="text-align:center">
                Faleminderit! ❤️
            </p>

        </div>

    `;


    content.innerHTML = html;


    openModal("invoiceModal");

}


function printInvoice() {

    window.print();

}


// ============================================
// MODALS
// ============================================

function openModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.add("show");

    }

}


function closeModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.remove("show");

    }

}


// ============================================
// LOGOUT
// ============================================

function logout() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );


    window.location.href =
        "login.html";

}


// ============================================
// HELPERS
// ============================================

function setText(id, text) {

    const el =
        document.getElementById(id);

    if (el) {

        el.textContent = text;

    }

}


function isSameDay(a, b) {

    return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
    );

}


function isThisWeek(date) {

    const now =
        new Date();


    const start =
        new Date(now);


    const day =
        start.getDay();


    const difference =
        day === 0
            ? 6
            : day - 1;


    start.setDate(
        start.getDate() - difference
    );


    start.setHours(
        0,
        0,
        0,
        0
    );


    return date >= start;

}


function isThisMonth(date) {

    const now =
        new Date();


    return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
    );

}


function formatDate(value) {

    return new Date(value)
        .toLocaleString(
            "sq-AL",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}
