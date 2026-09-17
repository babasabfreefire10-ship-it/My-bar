/* =====================================================
   BAR LULISHTJA - APP V3
   ADMIN + KAMARIER + MENU + TAVOLINA + FATURA
===================================================== */


/* =====================================================
   LOGIN CHECK
===================================================== */

const currentUser = JSON.parse(
    localStorage.getItem("barCurrentUser")
);

if (!currentUser) {
    window.location.href = "login.html";
}


/* =====================================================
   DEFAULT DATA
===================================================== */

const defaultProducts = [
    { id: 1, name: "Espresso", price: 100, category: "Kafe" },
    { id: 2, name: "Macchiato", price: 120, category: "Kafe" },
    { id: 3, name: "Cappuccino", price: 180, category: "Kafe" },
    { id: 4, name: "Coca Cola", price: 150, category: "Pije" },
    { id: 5, name: "Fanta", price: 150, category: "Pije" },
    { id: 6, name: "Ujë", price: 100, category: "Pije" },
    { id: 7, name: "Red Bull", price: 250, category: "Pije" },
    { id: 8, name: "Birrë", price: 200, category: "Alkool" },
    { id: 9, name: "Verë", price: 300, category: "Alkool" },
    { id: 10, name: "Koktej", price: 500, category: "Koktej" }
];


const defaultUsers = [
    {
        id: "admin",
        username: "admin",
        password: "1234",
        role: "admin",
        name: "Administrator"
    },
    {
        id: "waiter1",
        username: "kamarier1",
        password: "1234",
        role: "waiter",
        name: "Kamarier 1"
    }
];


/* =====================================================
   STORAGE HELPERS
===================================================== */

function getProducts() {

    const saved =
        localStorage.getItem("barProductsV3");

    if (!saved) {

        localStorage.setItem(
            "barProductsV3",
            JSON.stringify(defaultProducts)
        );

        return JSON.parse(
            JSON.stringify(defaultProducts)
        );
    }

    return JSON.parse(saved);
}


function saveProducts(products) {

    localStorage.setItem(
        "barProductsV3",
        JSON.stringify(products)
    );
}


function getUsers() {

    const saved =
        localStorage.getItem("barUsersV3");

    if (!saved) {

        localStorage.setItem(
            "barUsersV3",
            JSON.stringify(defaultUsers)
        );

        return JSON.parse(
            JSON.stringify(defaultUsers)
        );
    }

    return JSON.parse(saved);
}


function saveUsers(users) {

    localStorage.setItem(
        "barUsersV3",
        JSON.stringify(users)
    );
}


function getInvoices() {

    const saved =
        localStorage.getItem("barInvoicesV3");

    if (!saved) {
        return [];
    }

    return JSON.parse(saved);
}


function saveInvoices(invoices) {

    localStorage.setItem(
        "barInvoicesV3",
        JSON.stringify(invoices)
    );
}


/* =====================================================
   APP SETTINGS
===================================================== */

function getAppName() {

    return (
        localStorage.getItem("barAppNameV3")
        ||
        "Bar Lulishtja"
    );
}


function saveAppNameValue(name) {

    localStorage.setItem(
        "barAppNameV3",
        name
    );
}


/* =====================================================
   TABLE SETTINGS
===================================================== */

function getTableCount() {

    return Number(
        localStorage.getItem("barTableCountV3")
        ||
        12
    );
}


function saveTableCountValue(count) {

    localStorage.setItem(
        "barTableCountV3",
        String(count)
    );
}


/* =====================================================
   TABLES
===================================================== */

let tables = [];

let selectedTableNumber = null;


function loadTables() {

    const count =
        getTableCount();

    tables = [];

    for (
        let i = 1;
        i <= count;
        i++
    ) {

        tables.push({

            number: i,

            name:
                localStorage.getItem(
                    "barTableNameV3_" + i
                )
                ||
                "Tavolina " + i,

            busy: false,

            order: []

        });
    }
}


/* =====================================================
   APP NAME
===================================================== */

function updateAppName() {

    const name =
        getAppName();

    const appName =
        document.getElementById(
            "appName"
        );

    if (appName) {

        appName.textContent =
            "🍸 " + name;
    }


    const invoiceAppName =
        document.getElementById(
            "invoiceAppName"
        );

    if (invoiceAppName) {

        invoiceAppName.textContent =
            name;
    }


    const invoiceFooterName =
        document.getElementById(
            "invoiceFooterName"
        );

    if (invoiceFooterName) {

        invoiceFooterName.textContent =
            name;
    }


    const input =
        document.getElementById(
            "appNameInput"
        );

    if (input) {

        input.value =
            name;
    }
}


function saveAppName() {

    if (
        currentUser.role !== "admin"
    ) {
        return;
    }

    const input =
        document.getElementById(
            "appNameInput"
        );

    const name =
        input.value.trim();

    if (!name) {

        alert(
            "Shkruaj një emër."
        );

        return;
    }

    saveAppNameValue(
        name
    );

    updateAppName();

    alert(
        "✅ Emri u ndryshua."
    );
}


/* =====================================================
   CLOCK
===================================================== */

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
                minute: "2-digit"
            }
        );
}


/* =====================================================
   PERMISSIONS
===================================================== */

function setupPermissions() {

    document
        .querySelectorAll(".admin-only")
        .forEach(element => {

            if (
                currentUser.role !== "admin"
            ) {

                element.style.display =
                    "none";
            }
        });


    const userInfo =
        document.getElementById(
            "userInfo"
        );

    if (userInfo) {

        userInfo.textContent =
            currentUser.role === "admin"
                ? currentUser.name + " • Administrator"
                : currentUser.name + " • Kamarier";
    }
}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageName) {

    const adminPages = [
        "cash",
        "history",
        "admin"
    ];


    if (
        adminPages.includes(pageName) &&
        currentUser.role !== "admin"
    ) {

        alert(
            "⛔ Nuk ke akses."
        );

        return;
    }


    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active"
            );
        });


    const page =
        document.getElementById(
            pageName
        );

    if (!page) return;

    page.classList.add(
        "active"
    );


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );
        });


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            const action =
                button.getAttribute(
                    "onclick"
                );

            if (
                action &&
                action.includes(
                    "'" + pageName + "'"
                )
            ) {

                button.classList.add(
                    "active"
                );
            }
        });


    if (pageName === "dashboard") {
        updateDashboard();
        renderDashboardTables();
    }

    if (pageName === "tables") {
        renderTables();
    }

    if (pageName === "menu") {
        renderMenu();
    }

    if (pageName === "orders") {
        renderOrderPage();
    }

    if (pageName === "cash") {
        renderCash();
    }

    if (pageName === "history") {
        renderHistory();
    }

    if (pageName === "admin") {
        renderAdmin();
    }
}


/* =====================================================
   TABLE FUNCTIONS
===================================================== */

function getTable(number) {

    return tables.find(
        table =>
            table.number === number
    );
}


function getTableTotal(table) {

    return table.order.reduce(
        (total, item) => {

            return (
                total +
                item.price *
                item.quantity
            );

        },
        0
    );
}


function renderTables() {

    const container =
        document.getElementById(
            "tableGrid"
        );

    if (!container) return;

    renderTableContainer(
        container
    );

    renderDashboardTables();

    updateDashboard();
}


function renderDashboardTables() {

    const container =
        document.getElementById(
            "dashboardTables"
        );

    if (!container) return;

    renderTableContainer(
        container
    );
}


function renderTableContainer(
    container
) {

    container.innerHTML = "";

    tables.forEach(table => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "table-card " +
            (
                table.busy
                    ? "busy"
                    : "free"
            );


        const total =
            getTableTotal(
                table
            );


        card.innerHTML = `

            <div class="table-number">
                🪑 ${escapeHtml(table.name)}
            </div>

            <div class="table-status">
                ${
                    table.busy
                        ? "🔴 E zënë"
                        : "🟢 E lirë"
                }
            </div>

            ${
                table.busy
                    ? `
                        <div class="table-total">
                            ${total} Lek
                        </div>
                    `
                    : ""
            }

        `;


        card.onclick = () => {

            openTable(
                table.number
            );
        };


        container.appendChild(
            card
        );
    });
}


function openTable(number) {

    const table =
        getTable(number);

    if (!table) return;

    selectedTableNumber =
        number;

    table.busy = true;

    renderTables();

    renderOrderPage();

    showPage(
        "orders"
    );
}


/* =====================================================
   ORDER PAGE
===================================================== */

function renderOrderPage() {

    const text =
        document.getElementById(
            "selectedTableText"
        );

    if (
        selectedTableNumber === null
    ) {

        if (text) {

            text.textContent =
                "Zgjidh një tavolinë";
        }

        renderOrderProducts();

        renderOrderItems();

        return;
    }


    const table =
        getTable(
            selectedTableNumber
        );

    if (!table) return;


    if (text) {

        text.textContent =
            table.name;
    }


    renderOrderProducts();

    renderOrderItems();
}


/* =====================================================
   ORDER PRODUCTS
===================================================== */

function renderOrderProducts() {

    const container =
        document.getElementById(
            "orderProducts"
        );

    if (!container) return;

    container.innerHTML = "";


    getProducts().forEach(product => {

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "order-product";


        button.innerHTML = `

            <strong>
                ${escapeHtml(product.name)}
            </strong>

            <span>
                ${product.price} Lek
            </span>

        `;


        button.onclick = () => {

            addProduct(
                product.id
            );
        };


        container.appendChild(
            button
        );
    });
}


/* =====================================================
   ADD PRODUCT TO ORDER
===================================================== */

function addProduct(productId) {

    if (
        selectedTableNumber === null
    ) {

        alert(
            "Zgjidh një tavolinë fillimisht."
        );

        showPage(
            "tables"
        );

        return;
    }


    const table =
        getTable(
            selectedTableNumber
        );


    const product =
        getProducts().find(
            item =>
                item.id === productId
        );


    if (
        !table ||
        !product
    ) {
        return;
    }


    const existing =
        table.order.find(
            item =>
                item.productId ===
                productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        table.order.push({

            productId:
                product.id,

            name:
                product.name,

            price:
                product.price,

            quantity:
                1
        });
    }


    table.busy = true;


    renderOrderPage();

    renderTables();
}


/* =====================================================
   ORDER ITEMS
===================================================== */

function renderOrderItems() {

    const container =
        document.getElementById(
            "orderItems"
        );

    const totalElement =
        document.getElementById(
            "orderTotal"
        );


    if (
        !container ||
        !totalElement
    ) {
        return;
    }


    if (
        selectedTableNumber === null
    ) {

        container.innerHTML =
            `<div class="empty">
                Zgjidh një tavolinë.
            </div>`;

        totalElement.textContent =
            "0 Lek";

        return;
    }


    const table =
        getTable(
            selectedTableNumber
        );


    if (!table) return;


    if (
        table.order.length === 0
    ) {

        container.innerHTML =
            `<div class="empty">
                Nuk ka produkte.
            </div>`;

        totalElement.textContent =
            "0 Lek";

        return;
    }


    container.innerHTML = "";


    table.order.forEach(
        (item, index) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "order-item";


            row.innerHTML = `

                <div class="order-item-info">

                    <strong>
                        ${escapeHtml(item.name)}
                    </strong>

                    <span>
                        ${item.price} Lek ×
                        ${item.quantity}
                    </span>

                </div>


                <div class="order-controls">

                    <button
                        class="qty-btn"
                        onclick="
                            changeQuantity(
                                ${index},
                                -1
                            )
                        ">
                        −
                    </button>


                    <strong>
                        ${item.quantity}
                    </strong>


                    <button
                        class="qty-btn"
                        onclick="
                            changeQuantity(
                                ${index},
                                1
                            )
                        ">
                        +
                    </button>


                    <button
                        class="remove-btn"
                        onclick="
                            removeItem(
                                ${index}
                            )
                        ">
                        ×
                    </button>

                </div>
            `;


            container.appendChild(
                row
            );
        }
    );


    totalElement.textContent =
        getTableTotal(table) +
        " Lek";
}


/* =====================================================
   QUANTITY
===================================================== */

function changeQuantity(
    index,
    amount
) {

    const table =
        getTable(
            selectedTableNumber
        );

    if (!table) return;


    if (!table.order[index]) {
        return;
    }


    table.order[index].quantity +=
        amount;


    if (
        table.order[index].quantity <=
        0
    ) {

        table.order.splice(
            index,
            1
        );
    }


    if (
        table.order.length === 0
    ) {

        table.busy = false;
    }


    renderOrderPage();

    renderTables();
}


function removeItem(index) {

    const table =
        getTable(
            selectedTableNumber
        );

    if (!table) return;


    table.order.splice(
        index,
        1
    );


    if (
        table.order.length === 0
    ) {

        table.busy = false;
    }


    renderOrderPage();

    renderTables();
}


/* =====================================================
   PAYMENT
===================================================== */

function openPayment() {

    const table =
        getTable(
            selectedTableNumber
        );


    if (!table) {

        alert(
            "Zgjidh një tavolinë."
        );

        return;
    }


    if (
        table.order.length === 0
    ) {

        alert(
            "Porosia është bosh."
        );

        return;
    }


    document.getElementById(
        "paymentAmount"
    ).textContent =
        getTableTotal(table) +
        " Lek";


    document.getElementById(
        "paymentModal"
    ).classList.add(
        "show"
    );
}


function closePayment() {

    document.getElementById(
        "paymentModal"
    ).classList.remove(
        "show"
    );
}


/* =====================================================
   COMPLETE PAYMENT
===================================================== */

function completePayment(
    method
) {

    const table =
        getTable(
            selectedTableNumber
        );


    if (!table) return;


    const total =
        getTableTotal(table);


    if (total <= 0) {

        alert(
            "Porosia është bosh."
        );

        return;
    }


    const invoices =
        getInvoices();


    const invoiceNumber =
        "BL-" +
        String(
            invoices.length + 1
        ).padStart(
            5,
            "0"
        );


    const invoice = {

        id:
            Date.now(),

        number:
            invoiceNumber,

        table:
            table.name,

        tableNumber:
            table.number,

        waiter:
            currentUser.name,

        date:
            new Date().toISOString(),

        payment:
            method,

        items:
            JSON.parse(
                JSON.stringify(
                    table.order
                )
            ),

        total:
            total
    };


    invoices.unshift(
        invoice
    );


    saveInvoices(
        invoices
    );


    table.order = [];

    table.busy = false;


    closePayment();


    showInvoice(
        invoice
    );


    selectedTableNumber =
        null;


    renderTables();

    updateDashboard();
}


/* =====================================================
   INVOICE
===================================================== */

function showInvoice(invoice) {

    document.getElementById(
        "invoiceNumber"
    ).textContent =
        invoice.number;


    document.getElementById(
        "invoiceTable"
    ).textContent =
        invoice.table;


    document.getElementById(
        "invoiceWaiter"
    ).textContent =
        invoice.waiter;


    document.getElementById(
        "invoiceDate"
    ).textContent =
        formatDate(
            invoice.date
        );


    document.getElementById(
        "invoicePayment"
    ).textContent =
        invoice.payment === "cash"
            ? "💵 Cash"
            : "💳 Kartë";


    const container =
        document.getElementById(
            "invoiceItems"
        );


    container.innerHTML = "";


    invoice.items.forEach(item => {

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "invoice-item";


        row.innerHTML = `

            <span>
                ${escapeHtml(item.name)}
                × ${item.quantity}
            </span>

            <strong>
                ${
                    item.price *
                    item.quantity
                } Lek
            </strong>

        `;


        container.appendChild(
            row
        );
    });


    document.getElementById(
        "invoiceTotal"
    ).textContent =
        invoice.total +
        " Lek";


    updateAppName();


    document.getElementById(
        "invoiceModal"
    ).classList.add(
        "show"
    );
}


function closeInvoice() {

    document.getElementById(
        "invoiceModal"
    ).classList.remove(
        "show"
    );


    showPage(
        "tables"
    );
}


function printInvoice() {

    window.print();
}


/* =====================================================
   DASHBOARD
===================================================== */

function getTodayInvoices() {

    const today =
        new Date();


    return getInvoices().filter(
        invoice => {

            const date =
                new Date(
                    invoice.date
                );


            return (
                date.getFullYear() ===
                    today.getFullYear()

                &&

                date.getMonth() ===
                    today.getMonth()

                &&

                date.getDate() ===
                    today.getDate()
            );
        }
    );
}


function updateDashboard() {

    const invoices =
        getTodayInvoices();


    const sales =
        invoices.reduce(
            (
                sum,
                invoice
            ) =>
                sum +
                invoice.total,
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
                (
                    sum,
                    invoice
                ) =>
                    sum +
                    invoice.total,
                0
            );


    const active =
        tables.filter(
            table =>
                table.busy
        ).length;


    document.getElementById(
        "salesToday"
    ).textContent =
        sales + " Lek";


    document.getElementById(
        "activeTables"
    ).textContent =
        active;


    document.getElementById(
        "invoiceToday"
    ).textContent =
        invoices.length;


    document.getElementById(
        "cardToday"
    ).textContent =
        card + " Lek";
}


/* =====================================================
   CASH
===================================================== */

function renderCash() {

    if (
        currentUser.role !== "admin"
    ) {
        return;
    }


    const invoices =
        getTodayInvoices();


    const total =
        invoices.reduce(
            (
                sum,
                invoice
            ) =>
                sum +
                invoice.total,
            0
        );


    const cash =
        invoices
            .filter(
                invoice =>
                    invoice.payment ===
                    "cash"
            )
            .reduce(
                (
                    sum,
                    invoice
                ) =>
                    sum +
                    invoice.total,
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
                (
                    sum,
                    invoice
                ) =>
                    sum +
                    invoice.total,
                0
            );


    document.getElementById(
        "cashTotal"
    ).textContent =
        total + " Lek";


    document.getElementById(
        "cashMoney"
    ).textContent =
        cash + " Lek";


    document.getElementById(
        "cashCard"
    ).textContent =
        card + " Lek";


    document.getElementById(
        "cashInvoices"
    ).textContent =
        invoices.length;


    const container =
        document.getElementById(
            "paymentsList"
        );


    container.innerHTML = "";


    if (
        invoices.length === 0
    ) {

        container.innerHTML =
            `<div class="empty">
                Nuk ka pagesa sot.
            </div>`;

        return;
    }


    invoices.forEach(invoice => {

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "payment-row";


        row.innerHTML = `

            <div>

                <strong>
                    ${invoice.number}
                </strong>

                <br>

                <small>
                    ${escapeHtml(invoice.table)}
                    •
                    ${escapeHtml(invoice.waiter)}
                </small>

            </div>


            <div>

                <span>
                    ${
                        invoice.payment === "cash"
                            ? "💵 Cash"
                            : "💳 Kartë"
                    }
                </span>

                <strong>
                    ${invoice.total} Lek
                </strong>

            </div>
        `;


        container.appendChild(
            row
        );
    });
}


/* =====================================================
   HISTORY
===================================================== */

function renderHistory() {

    if (
        currentUser.role !== "admin"
    ) {
        return;
    }


    const invoices =
        getInvoices();


    const container =
        document.getElementById(
            "historyList"
        );


    container.innerHTML = "";


    if (
        invoices.length === 0
    ) {

        container.innerHTML =
            `<div class="empty">
                Nuk ka fatura.
            </div>`;

        return;
    }


    invoices.forEach(invoice => {

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "history-row";


        row.innerHTML = `

            <div>

                <strong>
                    ${invoice.number}
                </strong>

                <br>

                <small>
                    ${formatDate(invoice.date)}
                </small>

            </div>


            <div>

                <small>
                    ${escapeHtml(invoice.table)}
                    •
                    ${escapeHtml(invoice.waiter)}
                </small>

            </div>


            <div>

                <span>
                    ${
                        invoice.payment === "cash"
                            ? "💵 Cash"
                            : "💳 Kartë"
                    }
                </span>

                <strong>
                    ${invoice.total} Lek
                </strong>

            </div>


            <div>

                <button
                    class="small-btn"
                    onclick="
                        viewInvoice(
                            ${invoice.id}
                        )
                    ">
                    👁️ Shiko
                </button>

            </div>
        `;


        container.appendChild(
            row
        );
    });
}


function viewInvoice(id) {

    const invoice =
        getInvoices().find(
            item =>
                item.id === id
        );


    if (!invoice) return;


    showInvoice(
        invoice
    );
}


function deleteHistory() {

    if (
        currentUser.role !== "admin"
    ) {
        return;
    }


    if (
        !confirm(
            "A je i sigurt që dëshiron të fshish historikun?"
        )
    ) {
        return;
    }


    localStorage.removeItem(
        "barInvoicesV3"
    );


    renderHistory();

    renderCash();

    updateDashboard();


    alert(
        "✅ Historiku u fshi."
    );
}


/* =====================================================
   ADMIN
===================================================== */

function renderAdmin() {

    if (
        currentUser.role !== "admin"
    ) {
        return;
    }


    updateAppName();

    renderUsers();

    renderAdminProducts();

    renderAdminTables();
}


/* =====================================================
   USERS
===================================================== */

function renderUsers() {

    const container =
        document.getElementById(
            "usersList"
        );


    if (!container) return;


    const users =
        getUsers();


    container.innerHTML = "";


    const waiters =
        users.filter(
            user =>
                user.role === "waiter"
        );


    if (
        waiters.length === 0
    ) {

        container.innerHTML =
            `<div class="empty">
                Nuk ka kamarierë.
            </div>`;

        return;
    }


    waiters.forEach(user => {

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "user-row";


        row.innerHTML = `

            <div>

                <strong>
                    👨‍🍳 ${escapeHtml(user.name)}
                </strong>

                <br>

                <small>
                    @${escapeHtml(user.username)}
                </small>

            </div>


            <div class="row-actions">

                <button
                    class="small-btn"
                    onclick="
                        changeWaiterPassword(
                            '${user.id}'
                        )
                    ">
                    🔑 Password
                </button>


                <button
                    class="small-btn"
                    onclick="
                        renameWaiter(
                            '${user.id}'
                        )
                    ">
                    ✏️ Emri
                </button>


                <button
                    class="small-btn"
                    onclick="
                        deleteWaiter(
                            '${user.id}'
                        )
                    ">
                    🗑️ Fshi
                </button>

            </div>
        `;


        container.appendChild(
            row
        );
    });
}


/* =====================================================
   ADD WAITER
===================================================== */

function openWaiterModal() {

    document.getElementById(
        "modalTitle"
    ).textContent =
        "👨‍🍳 Shto Kamarier";


    document.getElementById(
        "modalContent"
    ).innerHTML = `

        <label>
            Emri
        </label>

        <input
            id="waiterName"
            class="input"
            placeholder="P.sh. Erion"
        >

        <br><br>


        <label>
            Username
        </label>

        <input
            id="waiterUsername"
            class="input"
            placeholder="P.sh. kamarier2"
        >

        <br><br>


        <label>
            Password
        </label>

        <input
            id="waiterPassword"
            class="input"
            type="password"
            placeholder="Password"
        >

        <br><br>


        <button
            class="primary-btn full"
            onclick="createWaiter()">
            Krijo Kamarier
        </button>
    `;


    openModal();
}


function createWaiter() {

    const name =
        document.getElementById(
            "waiterName"
        ).value.trim();


    const username =
        document.getElementById(
            "waiterUsername"
        ).value.trim();


    const password =
        document.getElementById(
            "waiterPassword"
        ).value;


    if (
        !name ||
        !username ||
        !password
    ) {

        alert(
            "Plotëso të gjitha fushat."
        );

        return;
    }


    const users =
        getUsers();


    if (
        users.some(
            user =>
                user.username ===
                username
        )
    ) {

        alert(
            "Ky username ekziston."
        );

        return;
    }


    users.push({

        id:
            "waiter_" +
            Date.now(),

        username:
            username,

        password:
            password,

        role:
            "waiter",

        name:
            name

    });


    saveUsers(
        users
    );


    closeModal();

    renderUsers();


    alert(
        "✅ Kamarieri u krijua."
    );
}


/* =====================================================
   WAITER PASSWORD
===================================================== */

function changeWaiterPassword(id) {

    if (
        currentUser.role !== "admin"
    ) {
        return;
    }


    const password =
        prompt(
            "Vendos password-in e ri:"
        );


    if (!password) return;


    const users =
        getUsers();


    const user =
        users.find(
            item =>
                item.id === id
        );


    if (!user) return;


    user.password =
        password;


    saveUsers(
        users
    );


    alert(
        "✅ Password-i u ndryshua."
    );
}


/* =====================================================
   RENAME WAITER
===================================================== */

function renameWaiter(id) {

    const users =
        getUsers();


    const user =
        users.find(
            item =>
                item.id === id
        );


    if (!user) return;


    const name =
        prompt(
            "Emri i ri:",
            user.name
        );


    if (!name) return;


    user.name =
        name.trim();


    saveUsers(
        users
    );


    renderUsers();
}


/* =====================================================
   DELETE WAITER
===================================================== */

function deleteWaiter(id) {

    if (
        !confirm(
            "A je i sigurt që dëshiron ta fshish këtë kamarier?"
        )
    ) {
        return;
    }


    let users =
        getUsers();


    users =
        users.filter(
            user =>
                user.id !== id
        );


    saveUsers(
        users
    );


    renderUsers();
}


/* =====================================================
   ADMIN PASSWORD
===================================================== */

function changeAdminPassword() {

    if (
        currentUser.role !== "admin"
    ) {
        return;
    }


    const input =
        document.getElementById(
            "newAdminPassword"
        );


    const password =
        input.value;


    if (!password) {

        alert(
            "Vendos password-in e ri."
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


    saveUsers(
        users
    );


    input.value = "";


    alert(
        "✅ Password-i i Administratorit u ndryshua."
    );
}


/* =====================================================
   PRODUCTS
===================================================== */

function renderMenu() {

    renderCategories();


    const container =
        document.getElementById(
            "menuGrid"
        );


    if (!container) return;


    const products =
        getProducts();


    const filtered =
        selectedCategory ===
        "Të gjitha"

            ? products

            : products.filter(
                product =>
                    product.category ===
                    selectedCategory
            );


    container.innerHTML = "";


    filtered.forEach(product => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-name">
                🍹 ${escapeHtml(product.name)}
            </div>

            <div class="product-category">
                ${escapeHtml(product.category)}
            </div>

            <div class="product-bottom">

                <div class="product-price">
                    ${product.price} Lek
                </div>

                <button
                    class="add-product-btn"
                    onclick="
                        addProduct(
                            ${product.id}
                        )
                    ">
                    + Shto
                </button>

            </div>
        `;


        container.appendChild(
            card
        );
    });
}


let selectedCategory =
    "Të gjitha";


function renderCategories() {

    const container =
        document.getElementById(
            "categories"
        );


    if (!container) return;


    const products =
        getProducts();


    const categories = [
        "Të gjitha",
        ...new Set(
            products.map(
                product =>
                    product.category
            )
        )
    ];


    container.innerHTML = "";


    categories.forEach(category => {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "category-btn " +
            (
                selectedCategory ===
                category
                    ? "active"
                    : ""
            );


        button.textContent =
            category;


        button.onclick = () => {

            selectedCategory =
                category;

            renderMenu();
        };


        container.appendChild(
            button
        );
    });
}


/* =====================================================
   ADD PRODUCT
===================================================== */

function openProductModal() {

    document.getElementById(
        "modalTitle"
    ).textContent =
        "🍹 Shto Produkt";


    document.getElementById(
        "modalContent"
    ).innerHTML = `

        <label>
            Emri
        </label>

        <input
            id="productName"
            class="input"
            placeholder="P.sh. Red Bull"
        >

        <br><br>


        <label>
            Çmimi
        </label>

        <input
            id="productPrice"
            class="input"
            type="number"
            placeholder="250"
        >

        <br><br>


        <label>
            Kategoria
        </label>

        <input
            id="productCategory"
            class="input"
            placeholder="Pije"
        >

        <br><br>


        <button
            class="primary-btn full"
            onclick="createProduct()">
            + Shto Produkt
        </button>
    `;


    openModal();
}


function createProduct() {

    const name =
        document.getElementById(
            "productName"
        ).value.trim();


    const price =
        Number(
            document.getElementById(
                "productPrice"
            ).value
        );


    const category =
        document.getElementById(
            "productCategory"
        ).value.trim();


    if (
        !name ||
        price <= 0 ||
        !category
    ) {

        alert(
            "Plotëso të gjitha fushat."
        );

        return;
    }


    const products =
        getProducts();


    products.push({

        id:
            Date.now(),

        name:
            name,

        price:
            price,

        category:
            category
    });


    saveProducts(
        products
    );


    closeModal();


    renderMenu();

    renderOrderProducts();

    renderAdminProducts();


    alert(
        "✅ Produkti u shtua."
    );
}


/* =====================================================
   ADMIN PRODUCTS
===================================================== */

function renderAdminProducts() {

    const container =
        document.getElementById(
            "adminProducts"
        );


    if (!container) return;


    const products =
        getProducts();


    container.innerHTML = "";


    products.forEach(product => {

        const row =
            document.createElement(
                "div"
            );


        row.className =
            "admin-product-row";


        row.innerHTML = `

            <div>

                <strong>
                    🍹 ${escapeHtml(product.name)}
                </strong>

                <br>

                <small>
                    ${product.price} Lek
                    •
                    ${escapeHtml(product.category)}
                </small>

            </div>


            <div class="row-actions">

                <button
                    class="small-btn"
                    onclick="
                        editProduct(
                            ${product.id}
                        )
                    ">
                    ✏️ Ndrysho
                </button>


                <button
                    class="small-btn"
                    onclick="
                        deleteProduct(
                            ${product.id}
                        )
                    ">
                    🗑️ Fshi
                </button>

            </div>
        `;


        container.appendChild(
            row
        );
    });
}


/* =====================================================
   EDIT PRODUCT
===================================================== */

function editProduct(id) {

    const products =
        getProducts();


    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    document.getElementById(
        "modalTitle"
    ).textContent =
        "✏️ Ndrysho Produkt";


    document.getElementById(
        "modalContent"
    ).innerHTML = `

        <label>
            Emri
        </label>

        <input
            id="editName"
            class="input"
            value="${escapeAttribute(product.name)}"
        >

        <br><br>


        <label>
            Çmimi
        </label>

        <input
            id="editPrice"
            class="input"
            type="number"
            value="${product.price}"
        >

        <br><br>


        <label>
            Kategoria
        </label>

        <input
            id="editCategory"
            class="input"
            value="${escapeAttribute(product.category)}"
        >

        <br><br>


        <button
            class="primary-btn full"
            onclick="
                saveEditedProduct(
                    ${id}
                )
            ">
            💾 Ruaj
        </button>
    `;


    openModal();
}


function saveEditedProduct(id) {

    const products =
        getProducts();


    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    const name =
        document.getElementById(
            "editName"
        ).value.trim();


    const price =
        Number(
            document.getElementById(
                "editPrice"
            ).value
        );


    const category =
        document.getElementById(
            "editCategory"
        ).value.trim();


    if (
        !name ||
        price <= 0 ||
        !category
    ) {

        alert(
            "Plotëso të gjitha fushat."
        );

        return;
    }


    product.name =
        name;

    product.price =
        price;

    product.category =
        category;


    saveProducts(
        products
    );


    closeModal();


    renderMenu();

    renderOrderProducts();

    renderAdminProducts();
}


/* =====================================================
   DELETE PRODUCT
===================================================== */

function deleteProduct(id) {

    if (
        !confirm(
            "A je i sigurt që dëshiron ta fshish produktin?"
        )
    ) {
        return;
    }


    let products =
        getProducts();


    products =
        products.filter(
            product =>
                product.id !== id
        );


    saveProducts(
        products
    );


    renderMenu();

    renderOrderProducts();

    renderAdminProducts();
}


/* =====================================================
   TABLE ADMIN
===================================================== */

function openTableManager() {

    showPage(
        "admin"
    );

    setTimeout(
        () => {

            const input =
                document.getElementById(
                    "tableCountInput"
                );

            if (input) {

                input.focus();
            }

        },
        100
    );
}


function renderAdminTables() {

    const container =
        document.getElementById(
            "adminTables"
        );


    if (!container) return;


    const input =
        document.getElementById(
            "tableCountInput"
        );


    if (input) {

        input.value =
            getTableCount();
    }


    container.innerHTML = "";


    tables.forEach(table => {

        const row =
            document.createElement(
                "div"
            );


        row.className =
            "admin-table-row";


        row.innerHTML = `

            <div>

                <strong>
                    🪑 ${escapeHtml(table.name)}
                </strong>

                <br>

                <small>
                    Numri ${table.number}
                </small>

            </div>


            <div class="row-actions">

                <button
                    class="small-btn"
                    onclick="
                        renameTable(
                            ${table.number}
                        )
                    ">
                    ✏️ Riemërto
                </button>

            </div>
        `;


        container.appendChild(
            row
        );
    });
}


function saveTableCount() {

    if (
        currentUser.role !== "admin"
    ) {
        return;
    }


    const input =
        document.getElementById(
            "tableCountInput"
        );


    const count =
        Number(
            input.value
        );


    if (
        !count ||
        count < 1 ||
        count > 100
    ) {

        alert(
            "Vendos një numër nga 1 deri në 100."
        );

        return;
    }


    saveTableCountValue(
        count
    );


    loadTables();


    renderTables();

    renderAdminTables();


    alert(
        "✅ Tavolinat u ndryshuan."
    );
}


function renameTable(number) {

    const table =
        getTable(number);


    if (!table) return;


    const name =
        prompt(
            "Emri i tavolinës:",
            table.name
        );


    if (!name) return;


    const cleanName =
        name.trim();


    if (!cleanName) return;


    localStorage.setItem(
        "barTableNameV3_" + number,
        cleanName
    );


    table.name =
        cleanName;


    renderTables();

    renderAdminTables();
}


/* =====================================================
   GENERAL MODAL
===================================================== */

function openModal() {

    document.getElementById(
        "generalModal"
    ).classList.add(
        "show"
    );
}


function closeModal() {

    document.getElementById(
        "generalModal"
    ).classList.remove(
        "show"
    );
}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "barCurrentUser"
    );

    window.location.href =
        "login.html";
}


/* =====================================================
   DATE
===================================================== */

function formatDate(value) {

    return new Date(
        value
    ).toLocaleString(
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


/* =====================================================
   SECURITY / HTML
===================================================== */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {

    return escapeHtml(
        value
    );
}


/* =====================================================
   START
===================================================== */

loadTables();

setupPermissions();

updateAppName();

renderTables();

renderMenu();

renderOrderPage();

updateDashboard();

updateClock();

setInterval(
    updateClock,
    1000
);
