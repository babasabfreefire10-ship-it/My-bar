/* =========================================================
   SABI BAR LULISHTJA
   APP.JS V5
   MENU COMPLETE
========================================================= */

const USERS_KEY = "barUsersV3";
const PRODUCTS_KEY = "barProductsV3";
const INVOICES_KEY = "barInvoicesV3";
const APP_NAME_KEY = "barAppNameV3";
const TABLE_COUNT_KEY = "barTableCountV3";
const TABLES_KEY = "barTablesV4";

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
   COMPLETE BAR MENU
========================================================= */

const DEFAULT_PRODUCTS = [

    /* ================= KAFE ================= */

    {id:"coffee-1", name:"Espresso", price:100, category:"Kafe"},
    {id:"coffee-2", name:"Espresso Dopio", price:150, category:"Kafe"},
    {id:"coffee-3", name:"Macchiato", price:120, category:"Kafe"},
    {id:"coffee-4", name:"Macchiato Dopio", price:160, category:"Kafe"},
    {id:"coffee-5", name:"Cappuccino", price:180, category:"Kafe"},
    {id:"coffee-6", name:"Americano", price:150, category:"Kafe"},
    {id:"coffee-7", name:"Latte", price:200, category:"Kafe"},
    {id:"coffee-8", name:"Latte Macchiato", price:220, category:"Kafe"},
    {id:"coffee-9", name:"Frappe", price:200, category:"Kafe"},
    {id:"coffee-10", name:"Kafe Turke", price:100, category:"Kafe"},
    {id:"coffee-11", name:"Decaf", price:150, category:"Kafe"},
    {id:"coffee-12", name:"Hot Chocolate", price:220, category:"Kafe"},

    /* ================= PIJE ================= */

    {id:"soft-1", name:"Coca Cola", price:150, category:"Pije Freskuese"},
    {id:"soft-2", name:"Coca Cola Zero", price:150, category:"Pije Freskuese"},
    {id:"soft-3", name:"Fanta", price:150, category:"Pije Freskuese"},
    {id:"soft-4", name:"Sprite", price:150, category:"Pije Freskuese"},
    {id:"soft-5", name:"Schweppes", price:150, category:"Pije Freskuese"},
    {id:"soft-6", name:"Ice Tea", price:180, category:"Pije Freskuese"},
    {id:"soft-7", name:"Bravo", price:180, category:"Pije Freskuese"},
    {id:"soft-8", name:"Amita", price:180, category:"Pije Freskuese"},
    {id:"soft-9", name:"Lëng Portokalli", price:180, category:"Pije Freskuese"},
    {id:"soft-10", name:"Limonatë", price:200, category:"Pije Freskuese"},
    {id:"soft-11", name:"Fresh Portokalli", price:300, category:"Pije Freskuese"},
    {id:"soft-12", name:"Red Bull", price:250, category:"Pije Freskuese"},

    /* ================= UJE ================= */

    {id:"water-1", name:"Ujë Natyral 0.5L", price:100, category:"Ujë"},
    {id:"water-2", name:"Ujë Natyral 0.75L", price:150, category:"Ujë"},
    {id:"water-3", name:"Ujë Gazuar", price:150, category:"Ujë"},
    {id:"water-4", name:"Ujë Premium", price:250, category:"Ujë"},

    /* ================= BIRRA ================= */

    {id:"beer-1", name:"Birrë Tirana", price:200, category:"Birra"},
    {id:"beer-2", name:"Birrë Korça", price:200, category:"Birra"},
    {id:"beer-3", name:"Birrë Peja", price:250, category:"Birra"},
    {id:"beer-4", name:"Heineken", price:300, category:"Birra"},
    {id:"beer-5", name:"Corona", price:400, category:"Birra"},
    {id:"beer-6", name:"Stella Artois", price:350, category:"Birra"},
    {id:"beer-7", name:"Peroni", price:350, category:"Birra"},
    {id:"beer-8", name:"Budweiser", price:350, category:"Birra"},
    {id:"beer-9", name:"Erdinger", price:450, category:"Birra"},
    {id:"beer-10", name:"Birrë Pa Alkool", price:250, category:"Birra"},

    /* ================= WHISKY ================= */

    {id:"whisky-1", name:"Johnnie Walker Red", price:400, category:"Whisky"},
    {id:"whisky-2", name:"Johnnie Walker Black", price:600, category:"Whisky"},
    {id:"whisky-3", name:"Jack Daniel's", price:500, category:"Whisky"},
    {id:"whisky-4", name:"Jameson", price:500, category:"Whisky"},
    {id:"whisky-5", name:"Chivas Regal 12", price:600, category:"Whisky"},
    {id:"whisky-6", name:"Chivas Regal 18", price:1000, category:"Whisky"},
    {id:"whisky-7", name:"J&B", price:400, category:"Whisky"},
    {id:"whisky-8", name:"Ballantine's", price:400, category:"Whisky"},
    {id:"whisky-9", name:"Grant's", price:400, category:"Whisky"},
    {id:"whisky-10", name:"Glenfiddich", price:700, category:"Whisky"},

    /* ================= GIN ================= */

    {id:"gin-1", name:"Gordon's Gin", price:400, category:"Gin"},
    {id:"gin-2", name:"Bombay Sapphire", price:500, category:"Gin"},
    {id:"gin-3", name:"Tanqueray", price:550, category:"Gin"},
    {id:"gin-4", name:"Tanqueray Ten", price:700, category:"Gin"},
    {id:"gin-5", name:"Hendrick's", price:700, category:"Gin"},
    {id:"gin-6", name:"Gin Mare", price:750, category:"Gin"},
    {id:"gin-7", name:"Monkey 47", price:900, category:"Gin"},

    /* ================= VODKA ================= */

    {id:"vodka-1", name:"Absolut", price:400, category:"Vodka"},
    {id:"vodka-2", name:"Smirnoff", price:400, category:"Vodka"},
    {id:"vodka-3", name:"Grey Goose", price:800, category:"Vodka"},
    {id:"vodka-4", name:"Belvedere", price:800, category:"Vodka"},
    {id:"vodka-5", name:"Beluga", price:900, category:"Vodka"},

    /* ================= RUM ================= */

    {id:"rum-1", name:"Bacardi", price:400, category:"Rum"},
    {id:"rum-2", name:"Havana Club", price:400, category:"Rum"},
    {id:"rum-3", name:"Captain Morgan", price:400, category:"Rum"},
    {id:"rum-4", name:"Malibu", price:400, category:"Rum"},

    /* ================= TEQUILA ================= */

    {id:"tequila-1", name:"Jose Cuervo", price:450, category:"Tequila"},
    {id:"tequila-2", name:"Olmeca", price:450, category:"Tequila"},
    {id:"tequila-3", name:"Patrón", price:900, category:"Tequila"},

    /* ================= LIQUEUR ================= */

    {id:"liqueur-1", name:"Jägermeister", price:400, category:"Liqueur & Amaro"},
    {id:"liqueur-2", name:"Baileys", price:400, category:"Liqueur & Amaro"},
    {id:"liqueur-3", name:"Disaronno", price:450, category:"Liqueur & Amaro"},
    {id:"liqueur-4", name:"Kahlúa", price:450, category:"Liqueur & Amaro"},
    {id:"liqueur-5", name:"Campari", price:350, category:"Liqueur & Amaro"},
    {id:"liqueur-6", name:"Aperol", price:350, category:"Liqueur & Amaro"},
    {id:"liqueur-7", name:"Martini", price:350, category:"Liqueur & Amaro"},
    {id:"liqueur-8", name:"Montenegro", price:400, category:"Liqueur & Amaro"},
    {id:"liqueur-9", name:"Fernet Branca", price:400, category:"Liqueur & Amaro"},
    {id:"liqueur-10", name:"Amaro del Capo", price:400, category:"Liqueur & Amaro"},
    {id:"liqueur-11", name:"Sambuca", price:400, category:"Liqueur & Amaro"},

    /* ================= VERË ================= */

    {id:"wine-1", name:"Verë e Kuqe - Gotë", price:300, category:"Verë"},
    {id:"wine-2", name:"Verë e Bardhë - Gotë", price:300, category:"Verë"},
    {id:"wine-3", name:"Verë Rosé - Gotë", price:300, category:"Verë"},
    {id:"wine-4", name:"Verë Shtëpie - Shishe", price:1200, category:"Verë"},
    {id:"wine-5", name:"Verë e Kuqe Premium", price:1800, category:"Verë"},
    {id:"wine-6", name:"Verë e Bardhë Premium", price:1800, category:"Verë"},
    {id:"wine-7", name:"Rosé Premium", price:1800, category:"Verë"},
    {id:"wine-8", name:"Prosecco", price:1800, category:"Verë"},

    /* ================= COCKTAIL ================= */

    {id:"cocktail-1", name:"Mojito", price:600, category:"Cocktails"},
    {id:"cocktail-2", name:"Margarita", price:700, category:"Cocktails"},
    {id:"cocktail-3", name:"Aperol Spritz", price:650, category:"Cocktails"},
    {id:"cocktail-4", name:"Campari Spritz", price:650, category:"Cocktails"},
    {id:"cocktail-5", name:"Hugo Spritz", price:650, category:"Cocktails"},
    {id:"cocktail-6", name:"Negroni", price:700, category:"Cocktails"},
    {id:"cocktail-7", name:"Cosmopolitan", price:700, category:"Cocktails"},
    {id:"cocktail-8", name:"Moscow Mule", price:700, category:"Cocktails"},
    {id:"cocktail-9", name:"Piña Colada", price:700, category:"Cocktails"},
    {id:"cocktail-10", name:"Daiquiri", price:650, category:"Cocktails"},
    {id:"cocktail-11", name:"Mai Tai", price:750, category:"Cocktails"},
    {id:"cocktail-12", name:"Pornstar Martini", price:800, category:"Cocktails"},
    {id:"cocktail-13", name:"Espresso Martini", price:750, category:"Cocktails"},
    {id:"cocktail-14", name:"Whiskey Sour", price:700, category:"Cocktails"},
    {id:"cocktail-15", name:"Amaretto Sour", price:700, category:"Cocktails"},
    {id:"cocktail-16", name:"Gin Basil Smash", price:750, category:"Cocktails"},
    {id:"cocktail-17", name:"Long Island Iced Tea", price:800, category:"Cocktails"},
    {id:"cocktail-18", name:"Sex on the Beach", price:700, category:"Cocktails"},
    {id:"cocktail-19", name:"Tequila Sunrise", price:650, category:"Cocktails"},
    {id:"cocktail-20", name:"Bloody Mary", price:700, category:"Cocktails"},
    {id:"cocktail-21", name:"Old Fashioned", price:750, category:"Cocktails"},

    /* ================= LONG DRINK ================= */

    {id:"long-1", name:"Gin Tonic", price:600, category:"Long Drinks"},
    {id:"long-2", name:"Gin Lemon", price:600, category:"Long Drinks"},
    {id:"long-3", name:"Vodka Tonic", price:550, category:"Long Drinks"},
    {id:"long-4", name:"Vodka Lemon", price:550, category:"Long Drinks"},
    {id:"long-5", name:"Vodka Red Bull", price:650, category:"Long Drinks"},
    {id:"long-6", name:"Whisky Cola", price:550, category:"Long Drinks"},
    {id:"long-7", name:"Jack Daniel's Cola", price:650, category:"Long Drinks"},
    {id:"long-8", name:"Rum Cola", price:500, category:"Long Drinks"},
    {id:"long-9", name:"Jägermeister Red Bull", price:650, category:"Long Drinks"},
    {id:"long-10", name:"Cuba Libre", price:550, category:"Long Drinks"},

    /* ================= SHOTS ================= */

    {id:"shot-1", name:"Tequila Shot", price:300, category:"Shots"},
    {id:"shot-2", name:"Jägermeister Shot", price:300, category:"Shots"},
    {id:"shot-3", name:"Vodka Shot", price:250, category:"Shots"},
    {id:"shot-4", name:"Sambuca Shot", price:300, category:"Shots"},
    {id:"shot-5", name:"Rum Shot", price:250, category:"Shots"},
    {id:"shot-6", name:"Whisky Shot", price:300, category:"Shots"},

    /* ================= SNACKS ================= */

    {id:"snack-1", name:"Chips", price:200, category:"Snacks"},
    {id:"snack-2", name:"Kikirikë", price:200, category:"Snacks"},
    {id:"snack-3", name:"Ullinj", price:250, category:"Snacks"},
    {id:"snack-4", name:"Mix Arra", price:350, category:"Snacks"},
    {id:"snack-5", name:"Patate Frita", price:350, category:"Snacks"},
    {id:"snack-6", name:"Tost", price:400, category:"Snacks"},
    {id:"snack-7", name:"Sanduiç", price:450, category:"Snacks"},
    {id:"snack-8", name:"Croissant", price:250, category:"Snacks"},
    {id:"snack-9", name:"Brioche", price:300, category:"Snacks"}
];

/* =========================================================
   STORAGE
========================================================= */

function getProducts(){

    let products =
        JSON.parse(
            localStorage.getItem(PRODUCTS_KEY) || "null"
        );

    if(!Array.isArray(products) || products.length === 0){

        products = DEFAULT_PRODUCTS;

        localStorage.setItem(
            PRODUCTS_KEY,
            JSON.stringify(products)
        );

    }

    return products;
}

function saveProducts(products){

    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );

}

function getUsers(){

    let users =
        JSON.parse(
            localStorage.getItem(USERS_KEY) || "null"
        );

    if(!Array.isArray(users) || users.length === 0){

        users = DEFAULT_USERS;

        localStorage.setItem(
            USERS_KEY,
            JSON.stringify(users)
        );

    }

    return users;
}

function saveUsers(users){

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}

function getInvoices(){

    return JSON.parse(
        localStorage.getItem(INVOICES_KEY) || "[]"
    );

}

function saveInvoices(invoices){

    localStorage.setItem(
        INVOICES_KEY,
        JSON.stringify(invoices)
    );

}

/* =========================================================
   APP NAME
========================================================= */

function getAppName(){

    return localStorage.getItem(APP_NAME_KEY)
        || "Bar Lulishtja";

}

function saveAppName(){

    const input =
        document.getElementById("appNameInput");

    if(!input) return;

    const name =
        input.value.trim();

    if(!name) return;

    localStorage.setItem(
        APP_NAME_KEY,
        name
    );

    updateAppName();

    alert("Emri u ruajt.");

}

function updateAppName(){

    const name = getAppName();

    const elements =
        document.querySelectorAll(
            "#appName"
        );

    elements.forEach(el=>{
        el.textContent = name;
    });

}

/* =========================================================
   TABLES
========================================================= */

function getTableCount(){

    return Number(
        localStorage.getItem(TABLE_COUNT_KEY) || 10
    );

}

function getTables(){

    let tables =
        JSON.parse(
            localStorage.getItem(TABLES_KEY) || "null"
        );

    const count = getTableCount();

    if(!Array.isArray(tables) || tables.length !== count){

        const old =
            Array.isArray(tables)
            ? tables
            : [];

        tables = [];

        for(let i=1;i<=count;i++){

            const existing =
                old.find(
                    t => Number(t.number) === i
                );

            tables.push(
                existing || {
                    number:i,
                    busy:false,
                    items:[]
                }
            );

        }

        saveTables();

    }

    return tables;

}

function saveTables(tables){

    localStorage.setItem(
        TABLES_KEY,
        JSON.stringify(tables)
    );

}

function getTable(number){

    return getTables().find(
        t => Number(t.number) === Number(number)
    );

}

function getTableName(number){

    return localStorage.getItem(
        "barTableNameV3_" + number
    ) || "Tavolina " + number;

}

/* =========================================================
   CURRENT USER
========================================================= */

function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem("barCurrentUser") || "null"
    );

}

/* =========================================================
   LOGIN CHECK
========================================================= */

function requireLogin(){

    const user = getCurrentUser();

    if(!user){

        window.location.href = "login.html";

        return null;
    }

    return user;

}

/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value){

    return String(value ?? "")
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}

/* =========================================================
   MONEY
========================================================= */

function money(value){

    return Number(value || 0).toLocaleString(
        "sq-AL"
    ) + " L";

}

/* =========================================================
   CLOCK
========================================================= */

function updateClock(){

    const clock =
        document.getElementById("clock");

    if(!clock) return;

    const now = new Date();

    clock.textContent =
        now.toLocaleTimeString(
            "sq-AL",
            {
                hour:"2-digit",
                minute:"2-digit",
                second:"2-digit"
            }
        );

}

/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(page){

    document
        .querySelectorAll(".page")
        .forEach(p=>{
            p.classList.remove("active");
        });

    const target =
        document.getElementById(page);

    if(target){
        target.classList.add("active");
    }

    document
        .querySelectorAll(".nav-btn")
        .forEach(btn=>{
            btn.classList.remove("active");
        });

    const nav =
        document.querySelector(
            `[data-page="${page}"]`
        );

    if(nav){
        nav.classList.add("active");
    }

    if(page === "dashboard"){
        updateDashboard();
    }

    if(page === "tables"){
        renderTables();
    }

    if(page === "menu"){
        renderMenu();
    }

    if(page === "orders"){
        renderOrderPage();
    }

    if(page === "cash"){
        renderCash();
    }

    if(page === "history"){
        renderHistory();
    }

    if(page === "admin"){
        renderAdmin();
    }

}

/* =========================================================
   PERMISSIONS
========================================================= */

function applyPermissions(){

    const user = getCurrentUser();

    if(!user) return;

    document
        .querySelectorAll(".admin-only")
        .forEach(el=>{

            el.style.display =
                user.role === "admin"
                ? ""
                : "none";

        });

    const userInfo =
        document.getElementById("userInfo");

    if(userInfo){

        userInfo.textContent =
            user.name +
            " • " +
            (
                user.role === "admin"
                ? "Administrator"
                : "Kamarier"
            );

    }

}

/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard(){

    const invoices = getInvoices();

    const today =
        new Date().toISOString().slice(0,10);

    const todayInvoices =
        invoices.filter(i=>{

            const date =
                i.date ||
                (
                    i.createdAt
                    ? new Date(i.createdAt)
                        .toISOString()
                        .slice(0,10)
                    : ""
                );

            return date === today;

        });

    const sales =
        todayInvoices.reduce(
            (sum,i)=>
                sum + Number(
                    i.total ||
                    i.amount ||
                    0
                ),
            0
        );

    const card =
        todayInvoices
            .filter(i=>
                (i.payment || "")
                .toLowerCase()
                === "card"
            )
            .reduce(
                (sum,i)=>
                    sum + Number(i.total || 0),
                0
            );

    const cash =
        sales - card;

    const activeTables =
        getTables()
            .filter(t=>
                t.busy &&
                Array.isArray(t.items) &&
                t.items.length
            )
            .length;

    const salesEl =
        document.getElementById("salesToday");

    const activeEl =
        document.getElementById("activeTables");

    const invoiceEl =
        document.getElementById("invoiceToday");

    const cardEl =
        document.getElementById("cardToday");

    if(salesEl)
        salesEl.textContent = money(sales);

    if(activeEl)
        activeEl.textContent = activeTables;

    if(invoiceEl)
        invoiceEl.textContent =
            todayInvoices.length;

    if(cardEl)
        cardEl.textContent = money(card);

    renderDashboardTables();

}

/* =========================================================
   DASHBOARD TABLES
========================================================= */

function renderDashboardTables(){

    const container =
        document.getElementById(
            "dashboardTables"
        );

    if(!container) return;

    container.innerHTML =
        getTables()
        .map(table=>{

            const total =
                (table.items || [])
                .reduce(
                    (sum,item)=>
                        sum +
                        Number(item.price || 0) *
                        Number(item.quantity || 1),
                    0
                );

            return `
                <div class="table-card ${
                    table.busy ? "busy" : ""
                }"
                onclick="openTable(${table.number})">

                    <strong>
                        ${escapeHTML(
                            getTableName(table.number)
                        )}
                    </strong>

                    <span>
                        ${
                            table.busy
                            ? money(total)
                            : "E lirë"
                        }
                    </span>

                </div>
            `;

        })
        .join("");

}

/* =========================================================
   TABLES PAGE
========================================================= */

function renderTables(){

    const container =
        document.getElementById(
            "tableGrid"
        );

    if(!container) return;

    container.innerHTML =
        getTables()
        .map(table=>{

            const total =
                (table.items || [])
                .reduce(
                    (sum,item)=>
                        sum +
                        Number(item.price || 0) *
                        Number(item.quantity || 1),
                    0
                );

            return `
                <div class="table-card ${
                    table.busy ? "busy" : ""
                }"
                onclick="openTable(${table.number})">

                    <div class="table-number">
                        ${table.number}
                    </div>

                    <strong>
                        ${escapeHTML(
                            getTableName(table.number)
                        )}
                    </strong>

                    <span>
                        ${
                            table.busy
                            ? money(total)
                            : "E lirë"
                        }
                    </span>

                </div>
            `;

        })
        .join("");

}

/* =========================================================
   OPEN TABLE
========================================================= */

function openTable(number){

    const table = getTable(number);

    if(!table){

        alert("Tavolina nuk u gjet.");

        return;
    }

    selectedTableNumber =
        Number(number);

    table.busy = true;

    saveTables(
        getTables()
    );

    showPage("orders");

    renderOrderPage();

    renderTables();

    updateDashboard();

}

/* =========================================================
   MENU CATEGORIES
========================================================= */

function renderCategories(){

    const container =
        document.getElementById(
            "categories"
        );

    if(!container) return;

    const products =
        getProducts();

    const categories = [
        "Të gjitha",
        ...new Set(
            products.map(
                p=>p.category
            )
        )
    ];

    container.innerHTML =
        categories
        .map(category=>`

            <button
                class="${
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

function selectCategory(category){

    selectedCategory =
        category;

    renderMenu();

}

/* =========================================================
   MENU
========================================================= */

function renderMenu(){

    renderCategories();

    const container =
        document.getElementById(
            "menuGrid"
        );

    if(!container) return;

    let products =
        getProducts();

    if(selectedCategory !== "Të gjitha"){

        products =
            products.filter(
                p =>
                    p.category ===
                    selectedCategory
            );

    }

    container.innerHTML =
        products
        .map(product=>`

            <div
                class="menu-item"
                data-product-id="${escapeHTML(product.id)}"
            >

                <div>
                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <small>
                        ${escapeHTML(product.category)}
                    </small>
                </div>

                <div class="menu-price">
                    ${money(product.price)}
                </div>

            </div>

        `)
        .join("");

    container
        .querySelectorAll(".menu-item")
        .forEach(card=>{

            card.addEventListener(
                "click",
                ()=>{

                    if(selectedTableNumber){

                        addProductToOrder(
                            card.dataset.productId
                        );

                    }else{

                        alert(
                            "Zgjidhni fillimisht një tavolinë."
                        );

                    }

                }
            );

        });

}

/* =========================================================
   ORDER PAGE
========================================================= */

function renderOrderPage(){

    const tableText =
        document.getElementById(
            "selectedTableText"
        );

    const orderItems =
        document.getElementById(
            "orderItems"
        );

    const totalEl =
        document.getElementById(
            "orderTotal"
        );

    if(!selectedTableNumber){

        if(tableText)
            tableText.textContent =
                "Zgjidhni tavolinën";

        return;

    }

    const table =
        getTable(selectedTableNumber);

    if(!table) return;

    if(tableText){

        tableText.textContent =
            getTableName(
                selectedTableNumber
            );

    }

    const items =
        table.items || [];

    let total = 0;

    if(orderItems){

        orderItems.innerHTML =
            items
            .map((item,index)=>{

                const qty =
                    Number(item.quantity || 1);

                const itemTotal =
                    Number(item.price || 0) *
                    qty;

                total += itemTotal;

                return `
                    <div class="order-row">

                        <div>
                            <strong>
                                ${escapeHTML(item.name)}
                            </strong>

                            <small>
                                ${money(item.price)}
                            </small>
                        </div>

                        <div class="order-controls">

                            <button
                                onclick="changeOrderQuantity(${index},-1)"
                            >
                                −
                            </button>

                            <span>
                                ${qty}
                            </span>

                            <button
                                onclick="changeOrderQuantity(${index},1)"
                            >
                                +
                            </button>

                            <strong>
                                ${money(itemTotal)}
                            </strong>

                        </div>

                    </div>
                `;

            })
            .join("");

    }else{

        items.forEach(item=>{

            total +=
                Number(item.price || 0) *
                Number(item.quantity || 1);

        });

    }

    if(totalEl)
        totalEl.textContent =
            money(total);

}

/* =========================================================
   ADD PRODUCT
========================================================= */

function addProductToOrder(productId){

    if(!selectedTableNumber){

        alert("Zgjidhni një tavolinë.");

        return;

    }

    const products =
        getProducts();

    const product =
        products.find(
            p => String(p.id) ===
                 String(productId)
        );

    if(!product) return;

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.number) ===
                Number(selectedTableNumber)
        );

    if(!table) return;

    if(!Array.isArray(table.items))
        table.items = [];

    const existing =
        table.items.find(
            item =>
                String(item.productId) ===
                String(product.id)
        );

    if(existing){

        existing.quantity =
            Number(existing.quantity || 1) + 1;

    }else{

        table.items.push({

            productId:product.id,
            name:product.name,
            price:Number(product.price),
            quantity:1

        });

    }

    table.busy = true;

    saveTables(tables);

    renderOrderPage();

    renderTables();

    updateDashboard();

}

/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeOrderQuantity(index,change){

    if(!selectedTableNumber)
        return;

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.number) ===
                Number(selectedTableNumber)
        );

    if(!table || !table.items[index])
        return;

    table.items[index].quantity =
        Number(
            table.items[index].quantity || 1
        ) + Number(change);

    if(table.items[index].quantity <= 0){

        table.items.splice(index,1);

    }

    if(table.items.length === 0){

        table.busy = false;

    }

    saveTables(tables);

    renderOrderPage();

    renderTables();

    updateDashboard();

}

/* =========================================================
   PAYMENT
========================================================= */

function openPayment(){

    if(!selectedTableNumber){

        alert("Zgjidhni një tavolinë.");

        return;

    }

    const table =
        getTable(selectedTableNumber);

    if(!table || !table.items.length){

        alert("Kjo tavolinë nuk ka porosi.");

        return;

    }

    const modal =
        document.getElementById(
            "paymentModal"
        );

    if(modal)
        modal.classList.add("active");

}

/* =========================================================
   COMPLETE PAYMENT
========================================================= */

function completePayment(method){

    if(!selectedTableNumber)
        return;

    const tables =
        getTables();

    const table =
        tables.find(
            t =>
                Number(t.number) ===
                Number(selectedTableNumber)
        );

    if(!table || !table.items.length){

        alert("Nuk ka produkte në porosi.");

        return;

    }

    const items =
        table.items;

    const total =
        items.reduce(
            (sum,item)=>
                sum +
                Number(item.price || 0) *
                Number(item.quantity || 1),
            0
        );

    const user =
        getCurrentUser();

    const now =
        new Date();

    const invoice = {

        id:
            "INV-" +
            Date.now(),

        number:
            "BL-" +
            String(Date.now())
                .slice(-6),

        date:
            now.toISOString()
                .slice(0,10),

        createdAt:
            now.toISOString(),

        timestamp:
            Date.now(),

        table:
            selectedTableNumber,

        tableName:
            getTableName(
                selectedTableNumber
            ),

        items:
            JSON.parse(
                JSON.stringify(items)
            ),

        total:total,

        amount:total,

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
            : "Pa emër"

    };

    const invoices =
        getInvoices();

    invoices.push(invoice);

    saveInvoices(invoices);

    /* CLEAR TABLE */

    table.items = [];

    table.busy = false;

    saveTables(tables);

    closePayment();

    selectedTableNumber = null;

    renderOrderPage();

    renderTables();

    updateDashboard();

    renderCash();

    renderHistory();

    /* INVOICE */

    openInvoice(invoice);

}

/* =========================================================
   PAYMENT SHORTCUTS
========================================================= */

function payCash(){

    completePayment("cash");

}

function payCard(){

    completePayment("card");

}

/* =========================================================
   CLOSE PAYMENT
========================================================= */

function closePayment(){

    const modal =
        document.getElementById(
            "paymentModal"
        );

    if(modal)
        modal.classList.remove("active");

}

/* =========================================================
   INVOICE
========================================================= */

function openInvoice(invoice){

    const modal =
        document.getElementById(
            "invoiceModal"
        );

    if(!modal) return;

    const content =
        modal.querySelector(
            ".invoice-content"
        ) ||
        modal.querySelector(
            ".modal-content"
        );

    if(!content) return;

    const rows =
        invoice.items
        .map(item=>`

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

        `)
        .join("");

    content.innerHTML = `

        <h2>
            BAR LULISHTJA
        </h2>

        <p>
            Faturë ${escapeHTML(invoice.number)}
        </p>

        <p>
            Tavolina ${invoice.table}
        </p>

        <hr>

        ${rows}

        <hr>

        <h3>
            TOTAL:
            ${money(invoice.total)}
        </h3>

        <p>
            Pagesa:
            ${escapeHTML(invoice.payment)}
        </p>

        <p>
            Kamarieri:
            ${escapeHTML(invoice.waiterName)}
        </p>

        <button onclick="printInvoice()">
            PRINT
        </button>

        <button onclick="closeInvoice()">
            MBYLL
        </button>

    `;

    modal.classList.add("active");

}

function closeInvoice(){

    const modal =
        document.getElementById(
            "invoiceModal"
        );

    if(modal)
        modal.classList.remove("active");

}

function printInvoice(){

    window.print();

}

/* =========================================================
   CASH
========================================================= */

function renderCash(){

    const invoices =
        getInvoices();

    const today =
        new Date()
        .toISOString()
        .slice(0,10);

    const todayInvoices =
        invoices.filter(
            i =>
                (
                    i.date ||
                    ""
                ) === today
        );

    const total =
        todayInvoices.reduce(
            (sum,i)=>
                sum +
                Number(i.total || 0),
            0
        );

    const cash =
        todayInvoices
        .filter(
            i =>
                i.payment === "cash"
        )
        .reduce(
            (sum,i)=>
                sum +
                Number(i.total || 0),
            0
        );

    const card =
        todayInvoices
        .filter(
            i =>
                i.payment === "card"
        )
        .reduce(
            (sum,i)=>
                sum +
                Number(i.total || 0),
            0
        );

    const totalEl =
        document.getElementById(
            "cashTotal"
        );

    const cashEl =
        document.getElementById(
            "cashMoney"
        );

    const cardEl =
        document.getElementById(
            "cashCard"
        );

    const invoiceEl =
        document.getElementById(
            "cashInvoices"
        );

    if(totalEl)
        totalEl.textContent =
            money(total);

    if(cashEl)
        cashEl.textContent =
            money(cash);

    if(cardEl)
        cardEl.textContent =
            money(card);

    if(invoiceEl)
        invoiceEl.textContent =
            todayInvoices.length;

    const list =
        document.getElementById(
            "paymentsList"
        );

    if(list){

        list.innerHTML =
            todayInvoices
            .slice()
            .reverse()
            .map(i=>`

                <div class="payment-row">

                    <strong>
                        ${escapeHTML(i.number)}
                    </strong>

                    <span>
                        ${money(i.total)}
                    </span>

                    <small>
                        ${escapeHTML(
                            i.payment
                        )}
                    </small>

                </div>

            `)
            .join("");

    }

}

/* =========================================================
   HISTORY
========================================================= */

function renderHistory(){

    const container =
        document.getElementById(
            "historyList"
        );

    if(!container) return;

    const invoices =
        getInvoices()
        .slice()
        .reverse();

    container.innerHTML =
        invoices
        .map(i=>`

            <div class="history-row">

                <div>

                    <strong>
                        ${escapeHTML(i.number)}
                    </strong>

                    <small>
                        Tavolina ${i.table}
                    </small>

                </div>

                <div>

                    <strong>
                        ${money(i.total)}
                    </strong>

                    <small>
                        ${escapeHTML(
                            i.waiterName ||
                            "Pa emër"
                        )}
                    </small>

                </div>

            </div>

        `)
        .join("");

}

function deleteHistory(){

    if(
        !confirm(
            "Jeni të sigurt që dëshironi të fshini historikun?"
        )
    )
        return;

    localStorage.removeItem(
        INVOICES_KEY
    );

    renderHistory();

    renderCash();

    updateDashboard();

}

/* =========================================================
   ADMIN
========================================================= */

function renderAdmin(){

    const user =
        getCurrentUser();

    if(!user || user.role !== "admin")
        return;

    const appNameInput =
        document.getElementById(
            "appNameInput"
        );

    if(appNameInput)
        appNameInput.value =
            getAppName();

    renderAdminUsers();

    renderAdminProducts();

    renderAdminTables();

    const countInput =
        document.getElementById(
            "tableCountInput"
        );

    if(countInput)
        countInput.value =
            getTableCount();

}

/* =========================================================
   ADMIN USERS
========================================================= */

function renderAdminUsers(){

    const container =
        document.getElementById(
            "usersList"
        );

    if(!container) return;

    container.innerHTML =
        getUsers()
        .map(user=>`

            <div class="admin-row">

                <div>

                    <strong>
                        ${escapeHTML(user.name)}
                    </strong>

                    <small>
                        @${escapeHTML(user.username)}
                        •
                        ${escapeHTML(user.role)}
                    </small>

                </div>

                <button
                    onclick="deleteUser('${escapeHTML(user.id)}')"
                >
                    Fshi
                </button>

            </div>

        `)
        .join("");

}

function openWaiterModal(){

    const username =
        prompt("Username i kamarierit:");

    if(!username) return;

    const password =
        prompt("Password:");

    if(!password) return;

    const name =
        prompt("Emri i kamarierit:");

    if(!name) return;

    const users =
        getUsers();

    if(
        users.some(
            u =>
                u.username === username
        )
    ){

        alert("Ky username ekziston.");

        return;

    }

    users.push({

        id:
            "user-" +
            Date.now(),

        username,
        password,

        role:"waiter",

        name

    });

    saveUsers(users);

    renderAdminUsers();

}

function deleteUser(id){

    const users =
        getUsers()
        .filter(
            u =>
                u.id !== id
        );

    saveUsers(users);

    renderAdminUsers();

}

/* =========================================================
   ADMIN PRODUCTS
========================================================= */

function renderAdminProducts(){

    const container =
        document.getElementById(
            "adminProducts"
        );

    if(!container) return;

    container.innerHTML =
        getProducts()
        .map(product=>`

            <div class="admin-row">

                <div>

                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <small>
                        ${escapeHTML(product.category)}
                        •
                        ${money(product.price)}
                    </small>

                </div>

                <button
                    onclick="editProduct('${escapeHTML(product.id)}')"
                >
                    Ndrysho
                </button>

                <button
                    onclick="deleteProduct('${escapeHTML(product.id)}')"
                >
                    Fshi
                </button>

            </div>

        `)
        .join("");

}

function openProductModal(){

    const name =
        prompt("Emri i produktit:");

    if(!name) return;

    const price =
        Number(
            prompt("Çmimi në lek:")
        );

    if(!price) return;

    const category =
        prompt(
            "Kategoria:",
            "Kafe"
        );

    if(!category) return;

    const products =
        getProducts();

    products.push({

        id:
            "product-" +
            Date.now(),

        name,

        price,

        category

    });

    saveProducts(products);

    renderMenu();

    renderAdminProducts();

}

function editProduct(id){

    const products =
        getProducts();

    const product =
        products.find(
            p =>
                String(p.id) ===
                String(id)
        );

    if(!product) return;

    const name =
        prompt(
            "Emri:",
            product.name
        );

    if(name)
        product.name = name;

    const price =
        prompt(
            "Çmimi:",
            product.price
        );

    if(price)
        product.price =
            Number(price);

    const category =
        prompt(
            "Kategoria:",
            product.category
        );

    if(category)
        product.category =
            category;

    saveProducts(products);

    renderMenu();

    renderAdminProducts();

}

function deleteProduct(id){

    if(
        !confirm(
            "Fshi këtë produkt?"
        )
    )
        return;

    const products =
        getProducts()
        .filter(
            p =>
                String(p.id) !==
                String(id)
        );

    saveProducts(products);

    renderMenu();

    renderAdminProducts();

}

/* =========================================================
   TABLE COUNT
========================================================= */

function saveTableCount(){

    const input =
        document.getElementById(
            "tableCountInput"
        );

    if(!input) return;

    const count =
        Math.max(
            1,
            Number(input.value || 1)
        );

    const active =
        getTables()
        .some(
            t =>
                t.busy &&
                t.items &&
                t.items.length
        );

    if(active){

        if(
            !confirm(
                "Ka tavolina me porosi aktive. Vazhdoni?"
            )
        )
            return;

    }

    localStorage.setItem(
        TABLE_COUNT_KEY,
        String(count)
    );

    getTables();

    renderTables();

    renderAdminTables();

    updateDashboard();

    alert(
        "Numri i tavolinave u ruajt."
    );

}

function renderAdminTables(){

    const container =
        document.getElementById(
            "adminTables"
        );

    if(!container) return;

    container.innerHTML =
        getTables()
        .map(table=>`

            <div class="admin-row">

                <div>

                    <strong>
                        Tavolina ${table.number}
                    </strong>

                    <small>
                        ${escapeHTML(
                            getTableName(
                                table.number
                            )
                        )}
                    </small>

                </div>

                <button
                    onclick="renameTable(${table.number})"
                >
                    Emërto
                </button>

            </div>

        `)
        .join("");

}

function renameTable(number){

    const current =
        getTableName(number);

    const name =
        prompt(
            "Emri i tavolinës:",
            current
        );

    if(!name) return;

    localStorage.setItem(
        "barTableNameV3_" + number,
        name
    );

    renderTables();

    renderAdminTables();

    renderDashboardTables();

}

/* =========================================================
   CHANGE ADMIN PASSWORD
========================================================= */

function changeAdminPassword(){

    const user =
        getCurrentUser();

    if(!user || user.role !== "admin")
        return;

    const newPassword =
        document.getElementById(
            "newAdminPassword"
        );

    if(!newPassword)
        return;

    const password =
        newPassword.value.trim();

    if(!password){

        alert("Vendosni password-in.");

        return;

    }

    const users =
        getUsers();

    const admin =
        users.find(
            u =>
                u.username === "admin"
        );

    if(admin)
        admin.password = password;

    saveUsers(users);

    newPassword.value = "";

    alert(
        "Password-i u ndryshua."
    );

}

/* =========================================================
   LOGOUT
========================================================= */

function logout(){

    localStorage.removeItem(
        "barCurrentUser"
    );

    window.location.href =
        "login.html";

}

/* =========================================================
   MODALS
========================================================= */

function closeGeneralModal(){

    const modal =
        document.getElementById(
            "generalModal"
        );

    if(modal)
        modal.classList.remove("active");

}

/* =========================================================
   MENU SEARCH
========================================================= */

function searchMenu(){

    const input =
        document.getElementById(
            "menuSearch"
        );

    if(!input) return;

    const query =
        input.value
        .trim()
        .toLowerCase();

    const products =
        getProducts()
        .filter(product=>{

            if(
                selectedCategory !==
                "Të gjitha" &&
                product.category !==
                selectedCategory
            )
                return false;

            return (
                product.name
                    .toLowerCase()
                    .includes(query)
                ||
                product.category
                    .toLowerCase()
                    .includes(query)
            );

        });

    const container =
        document.getElementById(
            "menuGrid"
        );

    if(!container) return;

    container.innerHTML =
        products
        .map(product=>`

            <div
                class="menu-item"
                data-product-id="${escapeHTML(product.id)}"
            >

                <div>

                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <small>
                        ${escapeHTML(product.category)}
                    </small>

                </div>

                <div class="menu-price">
                    ${money(product.price)}
                </div>

            </div>

        `)
        .join("");

    container
        .querySelectorAll(".menu-item")
        .forEach(card=>{

            card.addEventListener(
                "click",
                ()=>{

                    if(!selectedTableNumber){

                        alert(
                            "Zgjidhni fillimisht një tavolinë."
                        );

                        return;

                    }

                    addProductToOrder(
                        card.dataset.productId
                    );

                }
            );

        });

}

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const user =
            requireLogin();

        if(!user)
            return;

        getProducts();
        getUsers();
        getTables();

        updateAppName();

        applyPermissions();

        updateClock();

        setInterval(
            updateClock,
            1000
        );

        /* NAVIGATION */

        document
            .querySelectorAll(".nav-btn")
            .forEach(button=>{

                button.addEventListener(
                    "click",
                    ()=>{

                        const page =
                            button.dataset.page;

                        if(page)
                            showPage(page);

                    }
                );

            });

        /* MENU SEARCH */

        const search =
            document.getElementById(
                "menuSearch"
            );

        if(search){

            search.addEventListener(
                "input",
                searchMenu
            );

        }

        /* INITIAL PAGE */

        showPage("dashboard");

        renderMenu();

        renderTables();

        renderOrderPage();

        renderCash();

        renderHistory();

        renderAdmin();

        updateDashboard();

    }
);
