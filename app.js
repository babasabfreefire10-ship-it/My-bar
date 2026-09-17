/* =========================
   AUTHENTICATION
========================= */

const currentUser = JSON.parse(
    localStorage.getItem("barCurrentUser")
);

if (!currentUser) {
    window.location.href = "login.html";
}


/* =========================
   DATA
========================= */

let tables = [
    { number: 1, busy: false },
    { number: 2, busy: false },
    { number: 3, busy: false },
    { number: 4, busy: false },
    { number: 5, busy: false },
    { number: 6, busy: false },
    { number: 7, busy: false },
    { number: 8, busy: false }
];

let orders = {};

let totalSales =
    Number(localStorage.getItem("barTotalSales")) || 0;

let completed =
    Number(localStorage.getItem("barCompleted")) || 0;

let selectedTable = null;


/* =========================
   PRODUCTS
========================= */

const defaultProducts = [
    {
        id: 1,
        name: "Espresso",
        price: 100,
        category: "Kafe"
    },
    {
        id: 2,
        name: "Coca Cola",
        price: 150,
        category: "Pije"
    },
    {
        id: 3,
        name: "Birrë",
        price: 200,
        category: "Alkool"
    },
    {
        id: 4,
        name: "Koktej",
        price: 500,
        category: "Koktej"
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
    }
];


function getProducts() {

    const saved =
        localStorage.getItem("barProducts");

    if (!saved) {

        localStorage.setItem(
            "barProducts",
            JSON.stringify(defaultProducts)
        );

        return defaultProducts;
    }

    return JSON.parse(saved);
}


function saveProducts(products) {

    localStorage.setItem(
        "barProducts",
        JSON.stringify(products)
    );
}


/* =========================
   USERS
========================= */

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
        localStorage.getItem("barUsers");

    if (!saved) {

        localStorage.setItem(
            "barUsers",
            JSON.stringify(defaultUsers)
        );

        return defaultUsers;
    }

    return JSON.parse(saved);
}


function saveUsers(users) {

    localStorage.setItem(
        "barUsers",
        JSON.stringify(users)
    );
}


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(page) {

    const adminPages = [
        "cash",
        "admin"
    ];

    if (
        adminPages.includes(page) &&
        currentUser.role !== "admin"
    ) {

        alert("⛔ Nuk ke akses në këtë faqe.");

        return;
    }


    document
        .querySelectorAll(".page")
        .forEach(section => {

            section.classList.remove(
                "active-page"
            );

        });


    const target =
        document.getElementById(page);

    if (target) {
        target.classList.add(
            "active-page"
        );
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    const button =
        [...document.querySelectorAll(".nav-btn")]
        .find(btn =>
            btn.getAttribute("onclick")
            ?.includes(`'${page}'`)
        );


    if (button) {
        button.classList.add("active");
    }


    if (page === "admin") {
        renderAdmin();
    }
}


/* =========================
   PERMISSIONS
========================= */

function setupPermissions() {

    document
        .querySelectorAll(".admin-only")
        .forEach(element => {

            if (currentUser.role !== "admin") {

                element.style.display =
                    "none";

            }

        });


    document.getElementById(
        "userInfo"
    ).textContent =
        `${currentUser.name} • ${
            currentUser.role === "admin"
                ? "Administrator"
                : "Kamarier"
        }`;
}


/* =========================
   TABLES
========================= */

function renderTables() {

    const containers = [
        document.getElementById(
            "tablesList"
        ),
        document.getElementById(
            "dashboardTables"
        )
    ];


    containers.forEach(container => {

        if (!container) return;

        container.innerHTML = "";


        tables.forEach(table => {

            const div =
                document.createElement("div");


            div.className =
                "table " +
                (
                    table.busy
                        ? "busy"
                        : "available"
                );


            div.innerHTML = `

                <h3>
                    🪑 Tavolina
                    ${table.number}
                </h3>

                <div class="status">

                    ${
                        table.busy
                            ? "🔴 E zënë"
                            : "🟢 E lirë"
                    }

                </div>

            `;


            div.onclick = () =>
                openTable(table.number);


            container.appendChild(div);

        });

    });


    updateDashboard();
}


/* =========================
   OPEN TABLE
========================= */

function openTable(number) {

    selectedTable = number;


    if (!orders[number]) {
        orders[number] = [];
    }


    const table =
        tables.find(
            t => t.number === number
        );


    if (table) {
        table.busy = true;
    }


    document.getElementById(
        "selectedTableTitle"
    ).textContent =
        `🪑 Tavolina ${number}`;


    renderOrder();

    renderTables();

    showPage("orders");
}


/* =========================
   MENU
========================= */

function renderMenu() {

    const container =
        document.getElementById(
            "menuGrid"
        );


    if (!container) return;


    container.innerHTML = "";


    const products =
        getProducts();


    products.forEach(product => {

        const div =
            document.createElement("div");


        div.className = "product";


        div.innerHTML = `

            <h3>
                🍹 ${product.name}
            </h3>

            <p>
                ${product.price} Lek
            </p>

            <p>
                <small>
                    ${product.category}
                </small>
            </p>

            <button
                onclick="addProduct(
                    ${product.id}
                )"
            >
                + Shto
            </button>

        `;


        container.appendChild(div);

    });
}


/* =========================
   ADD PRODUCT
========================= */

function addProduct(productId) {

    if (!selectedTable) {

        alert(
            "Zgjidh fillimisht një tavolinë!"
        );

        showPage("tables");

        return;
    }


    const products =
        getProducts();


    const product =
        products.find(
            p => p.id === productId
        );


    if (!product) return;


    if (!orders[selectedTable]) {
        orders[selectedTable] = [];
    }


    const existing =
        orders[selectedTable].find(
            item =>
                item.productId === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        orders[selectedTable].push({

            productId: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    renderOrder();
}


/* =========================
   ORDER
========================= */

function renderOrder() {

    const container =
        document.getElementById(
            "orderItems"
        );


    if (!container) return;


    if (!selectedTable) {

        container.innerHTML =
            `<p class="empty">
                Zgjidh një tavolinë.
            </p>`;

        document.getElementById(
            "orderTotal"
        ).textContent = "0 Lek";

        return;
    }


    const tableOrder =
        orders[selectedTable] || [];


    container.innerHTML = "";


    if (tableOrder.length === 0) {

        container.innerHTML =
            `<p class="empty">
                Nuk ka produkte.
            </p>`;

    } else {

        tableOrder.forEach(
            (item, index) => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "order-item";


                div.innerHTML = `

                    <div>

                        <strong>
                            ${item.name}
                        </strong>

                        <br>

                        <small>
                            ${item.price} Lek
                        </small>

                    </div>


                    <div class="qty">

                        <button
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
                            class="delete-btn"
                            onclick="
                                removeProduct(
                                    ${index}
                                )
                            "
                        >
                            ❌
                        </button>

                    </div>

                `;


                container.appendChild(
                    div
                );

            }
        );

    }


    const total =
        tableOrder.reduce(
            (sum, item) =>
                sum +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    document.getElementById(
        "orderTotal"
    ).textContent =
        total + " Lek";
}


/* =========================
   QUANTITY
========================= */

function changeQuantity(
    index,
    amount
) {

    if (!selectedTable) return;


    const order =
        orders[selectedTable];


    if (!order[index]) return;


    order[index].quantity += amount;


    if (
        order[index].quantity <= 0
    ) {

        order.splice(
            index,
            1
        );

    }


    renderOrder();
}


/* =========================
   REMOVE PRODUCT
========================= */

function removeProduct(index) {

    if (!selectedTable) return;


    orders[selectedTable].splice(
        index,
        1
    );


    renderOrder();
}


/* =========================
   COMPLETE ORDER
========================= */

function completeOrder() {

    if (!selectedTable) {

        alert(
            "Zgjidh një tavolinë!"
        );

        return;
    }


    const tableOrder =
        orders[selectedTable] || [];


    if (tableOrder.length === 0) {

        alert(
            "Nuk ka produkte!"
        );

        return;
    }


    const total =
        tableOrder.reduce(
            (sum, item) =>
                sum +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    totalSales += total;

    completed++;


    localStorage.setItem(
        "barTotalSales",
        totalSales
    );


    localStorage.setItem(
        "barCompleted",
        completed
    );


    orders[selectedTable] = [];


    const table =
        tables.find(
            t => t.number === selectedTable
        );


    if (table) {
        table.busy = false;
    }


    alert(
        `✅ Tavolina ${selectedTable}
u mbyll me sukses!

Total: ${total} Lek`
    );


    selectedTable = null;


    document.getElementById(
        "selectedTableTitle"
    ).textContent =
        "Zgjidh një tavolinë";


    renderOrder();

    renderTables();

    updateDashboard();

    showPage("tables");
}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    const active =
        tables.filter(
            t => t.busy
        ).length;


    document.getElementById(
        "todaySales"
    ).textContent =
        totalSales + " Lek";


    document.getElementById(
        "activeTables"
    ).textContent =
        active;


    document.getElementById(
        "orderCount"
    ).textContent =
        completed;


    document.getElementById(
        "cashTotal"
    ).textContent =
        totalSales + " Lek";


    document.getElementById(
        "completedOrders"
    ).textContent =
        completed;
}


/* =========================
   ADMIN PANEL
========================= */

function renderAdmin() {

    if (
        currentUser.role !== "admin"
    ) return;


    renderUsers();

    renderAdminProducts();
}


/* =========================
   USERS
========================= */

function renderUsers() {

    const container =
        document.getElementById(
            "usersList"
        );


    const users =
        getUsers();


    container.innerHTML = "";


    users
        .filter(
            user =>
                user.role === "waiter"
        )
        .forEach(user => {

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
                        class="small-btn danger-btn"
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

        });


    if (
        users.filter(
            u => u.role === "waiter"
        ).length === 0
    ) {

        container.innerHTML =
            `<p class="empty">
                Nuk ka kamarierë.
            </p>`;

    }
}


/* =========================
   ADD WAITER
========================= */

function openUserForm() {

    if (
        currentUser.role !== "admin"
    ) return;


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
                class="form-input"
                id="waiterName"
                placeholder="P.sh. Erion"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Username
            </label>

            <input
                class="form-input"
                id="waiterUsername"
                placeholder="P.sh. kamarier2"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Password
            </label>

            <input
                class="form-input"
                type="password"
                id="waiterPassword"
                placeholder="Password"
            >

        </div>


        <button
            class="modal-submit"
            onclick="createWaiter()"
        >
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
            "Plotëso të gjitha fushat!"
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

        alert(
            "Ky username ekziston!"
        );

        return;
    }


    users.push({

        id:
            "waiter_" +
            Date.now(),

        username,

        password,

        role: "waiter",

        name

    });


    saveUsers(users);

    closeModal();

    renderUsers();


    alert(
        "✅ Kamarieri u krijua!"
    );
}


/* =========================
   DELETE WAITER
========================= */

function deleteWaiter(id) {

    if (
        !confirm(
            "A je i sigurt që dëshiron ta fshish këtë kamarier?"
        )
    ) return;


    let users =
        getUsers();


    users =
        users.filter(
            user => user.id !== id
        );


    saveUsers(users);

    renderUsers();
}


/* =========================
   CHANGE WAITER PASSWORD
========================= */

function changeWaiterPassword(id) {

    const newPassword =
        prompt(
            "Vendos password-in e ri:"
        );


    if (!newPassword) return;


    const users =
        getUsers();


    const user =
        users.find(
            u => u.id === id
        );


    if (!user) return;


    user.password =
        newPassword;


    saveUsers(users);


    alert(
        "✅ Password-i u ndryshua!"
    );
}


/* =========================
   ADMIN PASSWORD
========================= */

function changeAdminPassword() {

    const newPassword =
        document.getElementById(
            "newAdminPassword"
        ).value;


    if (!newPassword) {

        alert(
            "Vendos password-in e ri!"
        );

        return;
    }


    const users =
        getUsers();


    const admin =
        users.find(
            u => u.role === "admin"
        );


    if (!admin) return;


    admin.password =
        newPassword;


    saveUsers(users);


    document.getElementById(
        "newAdminPassword"
    ).value = "";


    alert(
        "✅ Password-i i Adminit u ndryshua!"
    );
}


/* =========================
   ADMIN PRODUCTS
========================= */

function renderAdminProducts() {

    const container =
        document.getElementById(
            "adminProducts"
        );


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
                    class="small-btn danger-btn"
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

    });
}


/* =========================
   ADD PRODUCT
========================= */

function openProductForm() {

    if (
        currentUser.role !== "admin"
    ) return;


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
                class="form-input"
                id="productName"
                placeholder="P.sh. Red Bull"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Çmimi në Lek
            </label>

            <input
                class="form-input"
                type="number"
                id="productPrice"
                placeholder="200"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Kategoria
            </label>

            <input
                class="form-input"
                id="productCategory"
                placeholder="Pije"
            >

        </div>


        <button
            class="modal-submit"
            onclick="createProduct()"
        >
            Shto Produkt
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
        !price ||
        !category
    ) {

        alert(
            "Plotëso të gjitha fushat!"
        );

        return;
    }


    const products =
        getProducts();


    products.push({

        id:
            Date.now(),

        name,

        price,

        category

    });


    saveProducts(products);

    closeModal();

    renderMenu();

    renderAdminProducts();


    alert(
        "✅ Produkti u shtua!"
    );
}


/* =========================
   EDIT PRODUCT
========================= */

function editProduct(id) {

    const products =
        getProducts();


    const product =
        products.find(
            p => p.id === id
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
                class="form-input"
                id="editProductName"
                value="${product.name}"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Çmimi
            </label>

            <input
                class="form-input"
                type="number"
                id="editProductPrice"
                value="${product.price}"
            >

        </div>


        <div class="form-group">

            <label class="form-label">
                Kategoria
            </label>

            <input
                class="form-input"
                id="editProductCategory"
                value="${product.category}"
            >

        </div>


        <button
            class="modal-submit"
            onclick="
                saveEditedProduct(
                    ${id}
                )
            "
        >
            Ruaj ndryshimet
        </button>

    `;


    openModal();
}


function saveEditedProduct(id) {

    const products =
        getProducts();


    const product =
        products.find(
            p => p.id === id
        );


    if (!product) return;


    product.name =
        document.getElementById(
            "editProductName"
        ).value.trim();


    product.price =
        Number(
            document.getElementById(
                "editProductPrice"
            ).value
        );


    product.category =
        document.getElementById(
            "editProductCategory"
        ).value.trim();


    saveProducts(products);

    closeModal();

    renderMenu();

    renderAdminProducts();


    alert(
        "✅ Produkti u ndryshua!"
    );
}


/* =========================
   DELETE PRODUCT
========================= */

function deleteProduct(id) {

    if (
        !confirm(
            "A je i sigurt që dëshiron ta fshish produktin?"
        )
    ) return;


    let products =
        getProducts();


    products =
        products.filter(
            product =>
                product.id !== id
        );


    saveProducts(products);

    renderMenu();

    renderAdminProducts();
}


/* =========================
   MODAL
========================= */

function openModal() {

    document
        .getElementById("modal")
        .classList.add("show");
}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("show");
}


/* =========================
   LOGOUT
========================= */

function logout() {

    localStorage.removeItem(
        "barCurrentUser"
    );

    window.location.href =
        "login.html";
}


/* =========================
   CLOCK
========================= */

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


/* =========================
   START
========================= */

setupPermissions();

renderTables();

renderMenu();

renderOrder();

updateDashboard();

updateClock();


setInterval(
    updateClock,
    1000
);
