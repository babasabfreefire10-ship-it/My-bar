/* =====================================================
   BAR LULISHTJA V2
   MAIN APPLICATION
===================================================== */


/* =====================================================
   AUTH
===================================================== */

const currentUser =
    JSON.parse(
        localStorage.getItem("barCurrentUser")
    );

if (!currentUser) {
    window.location.href = "login.html";
}


/* =====================================================
   DATA
===================================================== */

const TABLE_COUNT = 12;

let tables = [];

for (let i = 1; i <= TABLE_COUNT; i++) {

    tables.push({
        number: i,
        busy: false,
        order: []
    });

}


/* =====================================================
   PRODUCTS
===================================================== */

const defaultProducts = [

    {
        id: 1,
        name: "Espresso",
        price: 100,
        category: "Kafe"
    },

    {
        id: 2,
        name: "Macchiato",
        price: 120,
        category: "Kafe"
    },

    {
        id: 3,
        name: "Cappuccino",
        price: 180,
        category: "Kafe"
    },

    {
        id: 4,
        name: "Coca Cola",
        price: 150,
        category: "Pije"
    },

    {
        id: 5,
        name: "Fanta",
        price: 150,
        category: "Pije"
    },

    {
        id: 6,
        name: "Ujë",
        price: 100,
        category: "Pije"
    },

    {
        id: 7,
        name: "Red Bull",
        price: 250,
        category: "Pije"
    },

    {
        id: 8,
        name: "Birrë",
        price: 200,
        category: "Alkool"
    },

    {
        id: 9,
        name: "Verë",
        price: 300,
        category: "Alkool"
    },

    {
        id: 10,
        name: "Koktej",
        price: 500,
        category: "Koktej"
    }

];


function getProducts() {

    const saved =
        localStorage.getItem(
            "barProductsV2"
        );

    if (!saved) {

        localStorage.setItem(
            "barProductsV2",
            JSON.stringify(defaultProducts)
        );

        return [...defaultProducts];
    }

    return JSON.parse(saved);
}


function saveProducts(products) {

    localStorage.setItem(
        "barProductsV2",
        JSON.stringify(products)
    );

}


/* =====================================================
   USERS
===================================================== */

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


function getUsers() {

    const saved =
        localStorage.getItem(
            "barUsersV2"
        );

    if (!saved) {

        localStorage.setItem(
            "barUsersV2",
            JSON.stringify(defaultUsers)
        );

        return [...defaultUsers];
    }

    return JSON.parse(saved);

}


function saveUsers(users) {

    localStorage.setItem(
        "barUsersV2",
        JSON.stringify(users)
    );

}


/* =====================================================
   INVOICES
===================================================== */

function getInvoices() {

    const saved =
        localStorage.getItem(
            "barInvoicesV2"
        );

    if (!saved) {
        return [];
    }

    return JSON.parse(saved);

}


function saveInvoices(invoices) {

    localStorage.setItem(
        "barInvoicesV2",
        JSON.stringify(invoices)
    );

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
            "⛔ Nuk ke akses në këtë faqe."
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


    if (page) {

        page.classList.add(
            "active"
        );

    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    const activeButton =
        [...document.querySelectorAll(".nav-btn")]
        .find(button =>
            button.getAttribute(
                "onclick"
            )?.includes(
                `'${pageName}'`
            )
        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

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


    const roleText =
        currentUser.role === "admin"
            ? "Administrator"
            : "Kamarier";


    document.getElementById(
        "loggedUser"
    ).textContent =
        `${currentUser.name} • ${roleText}`;

}


/* =====================================================
   TABLES
===================================================== */

function getTable(number) {

    return tables.find(
        table =>
            table.number === number
    );

}


function getTableTotal(table) {

    return table.order.reduce(
        (total, item) =>
            total +
            (
                item.price *
                item.quantity
            ),
        0
    );

}


function renderTables() {

    renderTableContainer(
        document.getElementById(
            "tableGrid"
        )
    );


    renderTableContainer(
        document.getElementById(
            "dashboardTableGrid"
        )
    );


    updateDashboard();

}


function renderTableContainer(container) {

    if (!container) return;

    container.innerHTML = "";


    tables.forEach(table => {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            "table-card " +
            (
                table.busy
                    ? "busy"
                    : "free"
            );


        const total =
            getTableTotal(table);


        div.innerHTML = `

            <div class="table-number">
                🪑 Tavolina ${table.number}
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


        div.onclick = () =>
            openTable(
                table.number
            );


        container.appendChild(
            div
        );

    });

}


/* =====================================================
   SELECTED TABLE
===================================================== */

let selectedTableNumber = null;


function openTable(number) {

    selectedTableNumber = number;


    const table =
        getTable(number);


    if (!table) return;


    table.busy = true;


    renderTables();

    renderOrderPage();

    showPage("orders");

}


/* =====================================================
   MENU
===================================================== */

let selectedCategory = "Të gjitha";


function renderCategories() {

    const container =
        document.getElementById(
            "categoryButtons"
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


    categories.forEach(
        category => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "category-btn " +
                (
                    selectedCategory === category
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

        }
    );

}


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
        selectedCategory === "Të gjitha"
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
                🍹 ${product.name}
            </div>

            <div class="product-category">
                ${product.category}
            </div>

            <div class="product-bottom">

                <div class="product-price">
                    ${product.price} Lek
                </div>

                <button
                    class="add-product-btn"
                    onclick="
                        addProductToSelectedTable(
                            ${product.id}
                        )
                    "
                >
                    + Shto
                </button>

            </div>

        `;


        container.appendChild(
            card
        );

    });

}


/* =====================================================
   ORDER PAGE
===================================================== */

function renderOrderPage() {

    const table =
        getTable(
            selectedTableNumber
        );


    if (!table) {

        document.getElementById(
            "orderTableText"
        ).textContent =
            "Zgjidh një tavolinë";


        return;
    }


    document.getElementById(
        "orderTableText"
    ).textContent =
        `Tavolina ${table.number}`;


    renderOrderMenu();

    renderOrderItems();

}


function renderOrderMenu() {

    const container =
        document.getElementById(
            "orderMenuGrid"
        );


    if (!container) return;


    container.innerHTML = "";


    getProducts().forEach(
        product => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "order-product-btn";


            button.innerHTML = `

                <strong>
                    ${product.name}
                </strong>

                <span>
                    ${product.price} Lek
                </span>

            `;


            button.onclick = () =>
                addProductToSelectedTable(
                    product.id
                );


            container.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   ADD PRODUCT
===================================================== */

function addProductToSelectedTable(
    productId
) {

    if (!selectedTableNumber) {

        alert(
            "Zgjidh një tavolinë fillimisht."
        );

        showPage("tables");

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


    if (!table || !product) return;


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

            quantity: 1

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


    if (!container || !totalElement)
        return;


    const table =
        getTable(
            selectedTableNumber
        );


    if (!table) {

        container.innerHTML =
            `<div class="empty-state">
                Zgjidh një tavolinë.
            </div>`;

        totalElement.textContent =
            "0 Lek";

        return;
    }


    if (table.order.length === 0) {

        container.innerHTML =
            `<div class="empty-state">
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


            const itemTotal =
                item.price *
                item.quantity;


            row.innerHTML = `

                <div class="order-item-info">

                    <strong>
                        ${item.name}
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
                        "
                    >
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
                        "
                    >
                        +
                    </button>

                    <button
                        class="remove-item-btn"
                        onclick="
                            removeOrderItem(
                                ${index}
                            )
                        "
                    >
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


    if (!table.order[index])
        return;


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


/* =====================================================
   REMOVE ITEM
===================================================== */

function removeOrderItem(index) {

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
   PAYMENT MODAL
===================================================== */

function openPaymentModal() {

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
            "Nuk ka produkte në porosi."
        );

        return;
    }


    const total =
        getTableTotal(table);


    document.getElementById(
        "paymentTotal"
    ).textContent =
        total + " Lek";


    document.getElementById(
        "paymentModal"
    ).classList.add(
        "show"
    );

}


function closePaymentModal() {

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
    paymentMethod
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


    const now =
        new Date();


    const invoice = {

        id:
            Date.now(),

        number:
            invoiceNumber,

        table:
            table.number,

        waiter:
            currentUser.name,

        waiterUsername:
            currentUser.username,

        date:
            now.toISOString(),

        payment:
            paymentMethod,

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


    closePaymentModal();


    renderTables();

    updateDashboard();

    renderCash();

    renderHistory();


    showInvoice(
        invoice
    );


    selectedTableNumber =
        null;

}


/* =====================================================
   SHOW INVOICE
===================================================== */

function showInvoice(
    invoice
) {

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


    invoice.items.forEach(
        item => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "invoice-item";


            const itemTotal =
                item.price *
                item.quantity;


            row.innerHTML = `

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${itemTotal} Lek
                </strong>

            `;


            container.appendChild(
                row
            );

        }
    );


    document.getElementById(
        "invoiceTotal"
    ).textContent =
        invoice.total +
        " Lek";


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
                    invoice.date
                );


            return (
                date.getFullYear() === year &&
                date.getMonth() === month &&
                date.getDate() === day
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
                (sum, invoice) =>
                    sum +
                    invoice.total,
                0
            );


    const activeTables =
        tables.filter(
            table =>
                table.busy
        ).length;


    document.getElementById(
        "dashboardSales"
    ).textContent =
        sales + " Lek";


    document.getElementById(
        "dashboardTables"
    ).textContent =
        activeTables;


    document.getElementById(
        "dashboardInvoices"
    ).textContent =
        invoices.length;


    document.getElementById(
        "dashboardCard"
    ).textContent =
        card + " Lek";

}


/* =====================================================
   CASH
===================================================== */

function renderCash() {

    if (
        currentUser.role !== "admin"
    ) return;


    const invoices =
        getTodayInvoices();


    const total =
        invoices.reduce(
            (sum, invoice) =>
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
                (sum, invoice) =>
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
                (sum, invoice) =>
                    sum +
                    invoice.total,
                0
            );


    document.getElementById(
        "cashSales"
    ).textContent =
        total + " Lek";


    document.getElementById(
        "cashCash"
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
            "cashPayments"
        );


    container.innerHTML = "";


    if (
        invoices.length === 0
    ) {

        container.innerHTML =
            `<div class="empty-state">
                Nuk ka pagesa sot.
            </div>`;

        return;
    }


    invoices.forEach(
        invoice => {

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
                        Tavolina ${invoice.table}
                        •
                        ${invoice.waiter}
                    </small>

                </div>


                <div>

                    <span class="payment-method">
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

        }
    );

}


/* =====================================================
   HISTORY
===================================================== */

function renderHistory() {

    if (
        currentUser.role !== "admin"
    ) return;


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
            `<div class="empty-state">
                Nuk ka fatura.
            </div>`;

        return;
    }


    invoices.forEach(
        invoice => {

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
                        Tavolina ${invoice.table}
                        •
                        ${invoice.waiter}
                    </small>

                </div>


                <div>

                    <span class="payment-method">
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
                        "
                    >
                        👁️ Shiko
                    </button>

                </div>

            `;


            container.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   VIEW OLD INVOICE
===================================================== */

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


/* =====================================================
   CLEAR HISTORY
===================================================== */

function clearHistory() {

    if (
        currentUser.role !== "admin"
    ) return;


    const confirmed =
        confirm(
            "A je i sigurt që dëshiron të fshish të gjithë historikun?"
        );


    if (!confirmed) return;


    localStorage.removeItem(
        "barInvoicesV2"
    );


    renderHistory();

    renderCash();

    updateDashboard();


    alert(
        "Historiku u fshi."
    );

}


/* =====================================================
   ADMIN
===================================================== */

function renderAdmin() {

    if (
        currentUser.role !== "admin"
    ) return;


    renderUsers();

    renderAdminProducts();

}


/* =====================================================
   USERS LIST
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


    users
        .filter(
            user =>
                user.role === "waiter"
        )
        .forEach(
            user => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "user-row";


                row.innerHTML = `

                    <div>

                        <strong>
                            👨‍🍳 ${user.name}
                        </strong>

                        <br>

                        <small>
                            @${user.username}
                        </small>

                    </div>


                    <div class="row-actions">

                        <button
                            class="small-btn"
                            onclick="
                                changeWaiterPassword(
                                    '${user.id}'
                                )
                            "
                        >
                            🔑 Password
                        </button>


                        <button
                            class="small-btn"
                            onclick="
                                deleteWaiter(
                                    '${user.id}'
                                )
                            "
                        >
                            🗑️ Fshi
                        </button>

                    </div>

                `;


                container.appendChild(
                    row
                );

            }
        );


    if (
        users.filter(
            user =>
                user.role === "waiter"
        ).length === 0
    ) {

        container.innerHTML =
            `<div class="empty-state">
                Nuk ka kamarierë.
            </div>`;

    }

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

        <div class="form-group">

            <label class="form-label">
                Emri
            </label>

            <input
                id="waiterName"
                class="form-input"
                placeholder="P.sh. Erion"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Username
            </label>

            <input
                id="waiterUsername"
                class="form-input"
                placeholder="P.sh. kamarier2"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Password
            </label>

            <input
                id="waiterPassword"
                class="form-input"
                type="password"
                placeholder="Password"
            >

        </div>


        <button
            class="primary-btn full-btn"
            onclick="createWaiter()"
        >
            Krijo Kamarier
        </button>

    `;


    openGeneralModal();

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


    closeGeneralModal();

    renderUsers();


    alert(
        "✅ Kamarieri u krijua."
    );

}


/* =====================================================
   CHANGE WAITER PASSWORD
===================================================== */

function changeWaiterPassword(
    id
) {

    const newPassword =
        prompt(
            "Vendos password-in e ri:"
        );


    if (!newPassword) return;


    const users =
        getUsers();


    const user =
        users.find(
            item =>
                item.id === id
        );


    if (!user) return;


    user.password =
        newPassword;


    saveUsers(
        users
    );


    alert(
        "✅ Password-i u ndryshua."
    );

}


/* =====================================================
   DELETE WAITER
===================================================== */

function deleteWaiter(
    id
) {

    const confirmed =
        confirm(
            "A je i sigurt që dëshiron ta fshish këtë kamarier?"
        );


    if (!confirmed) return;


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

    const newPassword =
        document.getElementById(
            "newAdminPassword"
        ).value;


    if (!newPassword) {

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
        newPassword;


    saveUsers(
        users
    );


    document.getElementById(
        "newAdminPassword"
    ).value = "";


    alert(
        "✅ Password-i i administratorit u ndryshua."
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


    products.forEach(
        product => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "admin-product-row";


            row.innerHTML = `

                <div>

                    <strong>
                        🍹 ${product.name}
                    </strong>

                    <br>

                    <small>
                        ${product.price} Lek
                        •
                        ${product.category}
                    </small>

                </div>


                <div class="row-actions">

                    <button
                        class="small-btn"
                        onclick="
                            editProduct(
                                ${product.id}
                            )
                        "
                    >
                        ✏️ Ndrysho
                    </button>


                    <button
                        class="small-btn"
                        onclick="
                            deleteProduct(
                                ${product.id}
                            )
                        "
                    >
                        🗑️ Fshi
                    </button>

                </div>

            `;


            container.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   PRODUCT MODAL
===================================================== */

function openProductModal() {

    document.getElementById(
        "modalTitle"
    ).textContent =
        "🍹 Shto Produkt";


    document.getElementById(
        "modalContent"
    ).innerHTML = `

        <div class="form-group">

            <label class="form-label">
                Emri
            </label>

            <input
                id="productName"
                class="form-input"
                placeholder="P.sh. Red Bull"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Çmimi
            </label>

            <input
                id="productPrice"
                class="form-input"
                type="number"
                placeholder="250"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Kategoria
            </label>

            <input
                id="productCategory"
                class="form-input"
                placeholder="Pije"
            >

        </div>


        <button
            class="primary-btn full-btn"
            onclick="createProduct()"
        >
            Shto Produkt
        </button>

    `;


    openGeneralModal();

}


/* =====================================================
   CREATE PRODUCT
===================================================== */

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
        !price ||
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


    closeGeneralModal();


    renderMenu();

    renderOrderMenu();

    renderAdminProducts();


    alert(
        "✅ Produkti u shtua."
    );

}


/* =====================================================
   EDIT PRODUCT
===================================================== */

function editProduct(
    id
) {

    const product =
        getProducts().find(
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

        <div class="form-group">

            <label class="form-label">
                Emri
            </label>

            <input
                id="editName"
                class="form-input"
                value="${product.name}"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Çmimi
            </label>

            <input
                id="editPrice"
                class="form-input"
                type="number"
                value="${product.price}"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Kategoria
            </label>

            <input
                id="editCategory"
                class="form-input"
                value="${product.category}"
            >

        </div>


        <button
            class="primary-btn full-btn"
            onclick="
                saveEditedProduct(
                    ${id}
                )
            "
        >
            Ruaj ndryshimet
        </button>

    `;


    openGeneralModal();

}


/* =====================================================
   SAVE EDITED PRODUCT
===================================================== */

function saveEditedProduct(
    id
) {

    const products =
        getProducts();


    const product =
        products.find(
            item =>
                item.id === id
        );


    if (!product) return;


    product.name =
        document.getElementById(
            "editName"
        ).value.trim();


    product.price =
        Number(
            document.getElementById(
                "editPrice"
            ).value
        );


    product.category =
        document.getElementById(
            "editCategory"
        ).value.trim();


    if (
        !product.name ||
        !product.price ||
        !product.category
    ) {

        alert(
            "Plotëso të gjitha fushat."
        );

        return;
    }


    saveProducts(
        products
    );


    closeGeneralModal();


    renderMenu();

    renderOrderMenu();

    renderAdminProducts();

}


/* =====================================================
   DELETE PRODUCT
===================================================== */

function deleteProduct(
    id
) {

    const confirmed =
        confirm(
            "A je i sigurt që dëshiron ta fshish këtë produkt?"
        );


    if (!confirmed) return;


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

    renderOrderMenu();

    renderAdminProducts();

}


/* =====================================================
   GENERAL MODAL
===================================================== */

function openGeneralModal() {

    document
        .getElementById(
            "generalModal"
        )
        .classList.add(
            "show"
        );

}


function closeGeneralModal() {

    document
        .getElementById(
            "generalModal"
        )
        .classList.remove(
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

function formatDate(
    dateString
) {

    const date =
        new Date(
            dateString
        );


    return date.toLocaleString(
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
   CLOCK
===================================================== */

function updateClock() {

    const now =
        new Date();


    document.getElementById(
        "clock"
    ).textContent =
        now.toLocaleTimeString(
            "sq-AL",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


/* =====================================================
   START APPLICATION
===================================================== */

setupPermissions();

renderTables();

renderMenu();

renderOrderPage();

updateDashboard();

updateClock();


setInterval(
    updateClock,
    1000
);
