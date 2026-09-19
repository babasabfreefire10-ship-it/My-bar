"use strict";

/* =====================================================

   MY BAR — SYSTEM FROM ZERO

===================================================== */

const USERS_KEY = "MYBAR_USERS_V2";

const SESSION_KEY = "MYBAR_SESSION_V2";

const TABLES_KEY = "MYBAR_TABLES_V2";

const PRODUCTS_KEY = "MYBAR_PRODUCTS_V2";

const INVOICES_KEY = "MYBAR_INVOICES_V2";

const SELECTED_TABLE_KEY = "MYBAR_SELECTED_TABLE_V2";

const INVENTORY_KEY = "MYBAR_INVENTORY_V2";

const DEFAULT_USERS = [

    {

        username:"admin",

        password:"1234",

        role:"admin",

        name:"ADMIN"

    },

    {

        username:"sabi",

        password:"1234",

        role:"waiter",

        name:"SABI"

    },

    {

        username:"mondi",

        password:"1234",

        role:"waiter",

        name:"MONDI"

    }

];

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

/* =====================================================

   HELPERS

===================================================== */

function getJSON(key,fallback){

    try{

        const value =

            localStorage.getItem(key);

        return value

            ? JSON.parse(value)

            : fallback;

    }catch{

        return fallback;

    }

}

function setJSON(key,value){

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function money(value){

    return Number(value || 0)

        .toLocaleString("sq-AL") + " L";

}

function escapeHTML(value){

    return String(value ?? "")

        .replaceAll("&","&amp;")

        .replaceAll("<","&lt;")

        .replaceAll(">","&gt;")

        .replaceAll('"',"&quot;")

        .replaceAll("'","&#039;");

}

/* =====================================================

   SESSION

===================================================== */

function getSession(){

    return getJSON(

        SESSION_KEY,

        null

    );

}

function requireLogin(){

    if(!getSession()){

        window.location.href =

            "login.html";

        return false;

    }

    return true;

}

/* =====================================================

   INITIALIZE

===================================================== */

function initialize(){

    if(!localStorage.getItem(USERS_KEY)){

        setJSON(

            USERS_KEY,

            DEFAULT_USERS

        );

    }

    if(!localStorage.getItem(PRODUCTS_KEY)){

        setJSON(

            PRODUCTS_KEY,

            DEFAULT_PRODUCTS

        );

    }

    if(!localStorage.getItem(INVOICES_KEY)){

        setJSON(

            INVOICES_KEY,

            []

        );

    }

    initializeTables();

    initializeInventory();

}

function initializeTables(){

    let tables =

        getJSON(TABLES_KEY,null);

    if(!Array.isArray(tables) ||

       tables.length !== 12){

        tables = [];

        for(let i=1;i<=12;i++){

            tables.push({

                id:i,

                name:"Tavolina "+i,

                items:[],

                opened:false,

                openedAt:null,

                waiter:""

            });

        }

        setJSON(

            TABLES_KEY,

            tables

        );

    }

}

function initializeInventory(){

    const products =

        getJSON(

            PRODUCTS_KEY,

            DEFAULT_PRODUCTS

        );

    let inventory =

        getJSON(

            INVENTORY_KEY,

            {}

        );

    products.forEach(product=>{

        if(inventory[product.id] === undefined){

            inventory[product.id] = 50;

        }

    });

    setJSON(

        INVENTORY_KEY,

        inventory

    );

}

/* =====================================================

   TABLES

===================================================== */

function getTables(){

    return getJSON(

        TABLES_KEY,

        []

    );

}

function saveTables(tables){

    setJSON(

        TABLES_KEY,

        tables

    );

}

function getSelectedTable(){

    return Number(

        localStorage.getItem(

            SELECTED_TABLE_KEY

        ) || 0

    );

}

function selectTable(id){

    localStorage.setItem(

        SELECTED_TABLE_KEY,

        String(id)

    );

    renderTables();

    renderOrder();

}

function renderTables(){

    const container =

        document.getElementById("tables");

    if(!container) return;

    const tables =

        getTables();

    const selected =

        getSelectedTable();

    container.innerHTML =

        tables.map(table=>{

            const total =

                getTableTotal(table);

            const active =

                table.items &&

                table.items.length > 0;

            return `

                <button

                    class="table ${active ? "active":""} ${selected === table.id ? "selected":""}"

                    onclick="selectTable(${table.id})"

                >

                    <span class="tableName">

                        ${escapeHTML(table.name)}

                    </span>

                    <span class="tableStatus">

                        ${

                            active

                            ? money(total)

                            : "E LIRË"

                        }

                    </span>

                </button>

            `;

        }).join("");

}

/* =====================================================

   PRODUCTS

===================================================== */

function getProducts(){

    return getJSON(

        PRODUCTS_KEY,

        DEFAULT_PRODUCTS

    );

}

let currentCategory = "Të gjitha";

function renderCategories(){

    const container =

        document.getElementById("categories");

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

        categories.map(category=>`

        <button

            class="category ${category === currentCategory ? "active":""}"

            onclick="setCategory('${escapeHTML(category)}')"

        >

            ${escapeHTML(category)}

        </button>

    `).join("");

}

function setCategory(category){

    currentCategory =

        category;

    renderCategories();

    renderProducts();

}

function renderProducts(){

    const container =

        document.getElementById("products");

    if(!container) return;

    const products =

        getProducts();

    const query =

        (

            document.getElementById("search")

                ?.value || ""

        )

        .trim()

        .toLowerCase();

    let filtered =

        products.filter(product=>{

            const categoryOK =

                currentCategory === "Të gjitha" ||

                product.category === currentCategory;

            const searchOK =

                !query ||

                product.name

                    .toLowerCase()

                    .includes(query);

            return categoryOK && searchOK;

        });

    container.innerHTML =

        filtered.map(product=>{

            const stock =

                getStock(product.id);

            return `

                <button

                    class="product"

                    onclick="addProduct(${product.id})"

                    ${stock <= 0 ? "disabled":""}

                >

                    <span class="productName">

                        ${escapeHTML(product.name)}

                    </span>

                    <span class="productPrice">

                        ${money(product.price)}

                    </span>

                    <span class="stock">

                        Stok: ${stock}

                    </span>

                </button>

            `;

        }).join("");

}

function getStock(productId){

    const inventory =

        getJSON(

            INVENTORY_KEY,

            {}

        );

    return Number(

        inventory[productId] ?? 0

    );

}

function changeStock(productId,amount){

    const inventory =

        getJSON(

            INVENTORY_KEY,

            {}

        );

    inventory[productId] =

        Math.max(

            0,

            Number(

                inventory[productId] || 0

            ) + amount

        );

    setJSON(

        INVENTORY_KEY,

        inventory

    );

    renderProducts();

}

/* =====================================================

   NEW INVOICE

===================================================== */

function newInvoice(){

    const tables =

        getTables();

    const free =

        tables.find(

            table =>

                !table.items ||

                table.items.length === 0

        );

    if(!free){

        toast(

            "Nuk ka tavolinë të lirë."

        );

        return;

    }

    selectTable(free.id);

    const session =

        getSession();

    free.opened = true;

    free.openedAt =

        Date.now();

    free.waiter =

        session

            ? session.name

            : "";

    saveTables(tables);

    renderTables();

    renderOrder();

    toast(

        free.name +

        " u hap për faturë."

    );

}

/* =====================================================

   ORDER

===================================================== */

function getCurrentTable(){

    const id =

        getSelectedTable();

    return getTables()

        .find(

            table =>

                table.id === id

        );

}

function addProduct(productId){

    const table =

        getCurrentTable();

    if(!table){

        toast(

            "Hap një FATURË E RE."

        );

        return;

    }

    const products =

        getProducts();

    const product =

        products.find(

            p =>

                Number(p.id) ===

                Number(productId)

        );

    if(!product) return;

    const stock =

        getStock(productId);

    const existing =

        table.items.find(

            item =>

                Number(item.productId) ===

                Number(productId)

        );

    const currentQty =

        existing

        ? Number(existing.quantity)

        : 0;

    if(currentQty >= stock){

        toast(

            "Nuk ka më stok."

        );

        return;

    }

    if(existing){

        existing.quantity++;

    }else{

        table.items.push({

            productId:product.id,

            name:product.name,

            price:Number(product.price),

            quantity:1

        });

    }

    table.opened = true;

    saveTables(

        getTables()

    );

    renderTables();

    renderProducts();

    renderOrder();

}

function changeQuantity(index,amount){

    const tables =

        getTables();

    const id =

        getSelectedTable();

    const table =

        tables.find(

            t => t.id === id

        );

    if(!table) return;

    const item =

        table.items[index];

    if(!item) return;

    const newQty =

        Number(item.quantity) +

        Number(amount);

    if(newQty <= 0){

        table.items.splice(

            index,

            1

        );

    }else{

        const stock =

            getStock(

                item.productId

            );

        if(newQty > stock){

            toast(

                "Stoku nuk mjafton."

            );

            return;

        }

        item.quantity =

            newQty;

    }

    saveTables(tables);

    renderTables();

    renderProducts();

    renderOrder();

}

function removeItem(index){

    const tables =

        getTables();

    const id =

        getSelectedTable();

    const table =

        tables.find(

            t => t.id === id

        );

    if(!table) return;

    table.items.splice(

        index,

        1

    );

    saveTables(tables);

    renderTables();

    renderProducts();

    renderOrder();

}

function clearOrder(){

    const table =

        getCurrentTable();

    if(!table ||

       !table.items.length){

        return;

    }

    if(!confirm(

        "Dëshiron të pastrosh faturën?"

    )) return;

    table.items = [];

    table.opened = false;

    table.openedAt = null;

    saveTables(

        getTables()

    );

    renderTables();

    renderOrder();

}

/* =====================================================

   ORDER RENDER

===================================================== */

function getTableTotal(table){

    if(!table) return 0;

    return (table.items || [])

        .reduce(

            (sum,item)=>

                sum +

                Number(item.price) *

                Number(item.quantity),

            0

        );

}

function renderOrder(){

    const container =

        document.getElementById(

            "orderItems"

        );

    const totalElement =

        document.getElementById(

            "total"

        );

    const tableElement =

        document.getElementById(

            "orderTable"

        );

    if(!container) return;

    const table =

        getCurrentTable();

    if(!table){

        container.innerHTML =

            `<div class="empty">

                Zgjidh një tavolinë.

             </div>`;

        if(totalElement)

            totalElement.textContent =

                money(0);

        if(tableElement)

            tableElement.textContent =

                "Nuk është zgjedhur tavolinë";

        return;

    }

    if(tableElement){

        tableElement.textContent =

            table.name;

    }

    if(!table.items.length){

        container.innerHTML =

            `<div class="empty">

                Nuk ka produkte në faturë.

             </div>`;

        if(totalElement)

            totalElement.textContent =

                money(0);

        return;

    }

    let total = 0;

    container.innerHTML =

        table.items.map(

            (item,index)=>{

                const itemTotal =

                    Number(item.price) *

                    Number(item.quantity);

                total += itemTotal;

                return `

                <div class="orderItem">

                    <div class="orderTop">

                        <div class="orderName">

                            ${escapeHTML(item.name)}

                        </div>

                        <div class="orderPrice">

                            ${money(itemTotal)}

                        </div>

                    </div>

                    <div class="orderBottom">

                        <div class="qty">

                            <button

                                onclick="changeQuantity(${index},-1)"

                            >

                                −

                            </button>

                            <span>

                                ${item.quantity}

                            </span>

                            <button

                                onclick="changeQuantity(${index},1)"

                            >

                                +

                            </button>

                        </div>

                        <button

                            class="delete"

                            onclick="removeItem(${index})"

                        >

                            ×

                        </button>

                    </div>

                </div>

                `;

            }

        ).join("");

    if(totalElement){

        totalElement.textContent =

            money(total);

    }

}

/* =====================================================

   PAYMENT

===================================================== */

function openPayment(){

    const table =

        getCurrentTable();

    if(!table ||

       !table.items.length){

        toast(

            "Fatura është bosh."

        );

        return;

    }

    document.getElementById(

        "paymentAmount"

    ).textContent =

        money(

            getTableTotal(table)

        );

    openModal(

        "paymentModal"

    );

}

function completePayment(method){

    const tables =

        getTables();

    const id =

        getSelectedTable();

    const table =

        tables.find(

            t => t.id === id

        );

    if(!table ||

       !table.items.length){

        toast(

            "Fatura është bosh."

        );

        return;

    }

    /* STOCK CHECK */

    for(const item of table.items){

        if(

            item.quantity >

            getStock(item.productId)

        ){

            toast(

                "Stoku nuk mjafton për " +

                item.name

            );

            return;

        }

    }

    /* REMOVE STOCK */

    for(const item of table.items){

        changeStock(

            item.productId,

            -Number(item.quantity)

        );

    }

    const session =

        getSession();

    const invoices =

        getJSON(

            INVOICES_KEY,

            []

        );

    const total =

        getTableTotal(table);

    const invoice = {

        id:Date.now(),

        number:

            "MY-" +

            new Date()

                .getFullYear() +

            "-" +

            String(

                invoices.length + 1

            ).padStart(5,"0"),

        date:

            new Date().toISOString(),

        table:

            table.id,

        tableName:

            table.name,

        waiter:

            session

            ? session.name

            : "",

        payment:

            method,

        items:

            JSON.parse(

                JSON.stringify(

                    table.items

                )

            ),

        total:total

    };

    invoices.push(invoice);

    setJSON(

        INVOICES_KEY,

        invoices

    );

    /* CLEAR TABLE */

    table.items = [];

    table.opened = false;

    table.openedAt = null;

    saveTables(tables);

    closeModal(

        "paymentModal"

    );

    localStorage.removeItem(

        SELECTED_TABLE_KEY

    );

    renderTables();

    renderProducts();

    renderOrder();

    showInvoice(invoice);

}

/* =====================================================

   INVOICE

===================================================== */

let lastInvoice = null;

function showInvoice(invoice){

    lastInvoice =

        invoice;

    const info =

        document.getElementById(

            "invoiceInfo"

        );

    const items =

        document.getElementById(

            "invoiceItems"

        );

    const total =

        document.getElementById(

            "invoiceTotal"

        );

    if(info){

        info.innerHTML = `

            <strong>

                Nr: ${escapeHTML(invoice.number)}

            </strong><br>

            Datë:

            ${new Date(invoice.date)

                .toLocaleString("sq-AL")}<br>

            Tavolinë:

            ${escapeHTML(invoice.tableName)}<br>

            Kamarier:

            ${escapeHTML(invoice.waiter)}<br>

            Pagesa:

            ${invoice.payment === "cash"

                ? "CASH"

                : "CARD"}

        `;

    }

    if(items){

        items.innerHTML = `

            <div class="invoiceRow">

                <strong>Produkt</strong>

                <strong>Sasi</strong>

                <strong>Çmim</strong>

                <strong>Total</strong>

            </div>

            ${

                invoice.items.map(item=>`

                    <div class="invoiceRow">

                        <span>

                            ${escapeHTML(item.name)}

                        </span>

                        <span>

                            ${item.quantity}

                        </span>

                        <span>

                            ${money(item.price)}

                        </span>

                        <strong>

                            ${money(

                                item.price *

                                item.quantity

                            )}

                        </strong>

                    </div>

                `).join("")

            }

        `;

    }

    if(total){

        total.textContent =

            money(invoice.total);

    }

    openModal(

        "invoiceModal"

    );

}

/* =====================================================

   PRINT

===================================================== */

function printInvoice(tax){

    if(!lastInvoice) return;

    const invoice =

        lastInvoice;

    const rows =

        invoice.items.map(item=>`

            <tr>

                <td>

                    ${escapeHTML(item.name)}

                </td>

                <td>

                    ${item.quantity}

                </td>

                <td>

                    ${money(item.price)}

                </td>

                <td>

                    ${money(

                        item.price *

                        item.quantity

                    )}

                </td>

            </tr>

        `).join("");

    const taxText =

        tax

        ? `

            <hr>

            <p>

                <strong>FATURË TATIMORE</strong>

            </p>

            <p>

                TVSH / të dhëna fiskale:

                kërkon integrim real fiskal

            </p>

          `

        : "";

    const html = `

<!DOCTYPE html>

<html lang="sq">

<head>

<meta charset="UTF-8">

<title>${invoice.number}</title>

<style>

body{

    font-family:Arial,sans-serif;

    width:80mm;

    margin:auto;

    color:#000;

    font-size:11px;

}

h2{

    text-align:center;

    margin:5px 0;

}

.center{

    text-align:center;

}

table{

    width:100%;

    border-collapse:collapse;

}

td,th{

    padding:5px 2px;

    border-bottom:1px dotted #555;

    text-align:left;

}

.total{

    border-top:2px solid #000;

    margin-top:10px;

    padding-top:8px;

    font-size:16px;

    font-weight:bold;

    display:flex;

    justify-content:space-between;

}

small{

    font-size:9px;

}

</style>

</head>

<body>

<h2>MY BAR</h2>

<div class="center">

    BAR & RESTAURANT

</div>

<hr>

<p>

Nr: ${invoice.number}<br>

Datë: ${new Date(invoice.date)

    .toLocaleString("sq-AL")}<br>

Tavolinë: ${escapeHTML(invoice.tableName)}<br>

Kamarier: ${escapeHTML(invoice.waiter)}<br>

Pagesa: ${invoice.payment.toUpperCase()}

</p>

<hr>

<table>

<thead>

<tr>

<th>Produkt</th>

<th>S</th>

<th>Çm</th>

<th>Total</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

<div class="total">

<span>TOTAL</span>

<span>${money(invoice.total)}</span>

</div>

${taxText}

<br>

<div class="center">

<small>

Faleminderit për vizitën!

</small>

</div>

</body>

</html>

`;

    const printWindow =

        window.open(

            "",

            "_blank",

            "width=420,height=700"

        );

    if(!printWindow){

        toast(

            "Lejo pop-up për printim."

        );

        return;

    }

    printWindow.document.write(

        html

    );

    printWindow.document.close();

    printWindow.focus();

    printWindow.onload = () => {

        printWindow.print();

        /*

          Pas printimit kthehemi automatikisht

          te LOGIN.

        */

        printWindow.onafterprint =

            () => {

                try{

                    printWindow.close();

                }catch{}

                finishInvoice();

            };

    };

}

/* =====================================================

   FINISH INVOICE

===================================================== */

function finishInvoice(){

    closeModal(

        "invoiceModal"

    );

    localStorage.removeItem(

        SELECTED_TABLE_KEY

    );

    localStorage.removeItem(

        SESSION_KEY

    );

    localStorage.removeItem(

        "barCurrentUser"

    );

    /*

      Fatura është ruajtur.

      Përdoruesi kthehet te faqja e parë.

    */

    window.location.href =

        "login.html";

}

function closeCurrentInvoice(){

    const table =

        getCurrentTable();

    if(!table ||

       !table.items.length){

        toast(

            "Nuk ka faturë aktive."

        );

        return;

    }

    openPayment();

}

function printCurrentPreview(){

    if(lastInvoice){

        printInvoice(false);

        return;

    }

    toast(

        "Mbyll faturën përpara printimit."

    );

}

/* =====================================================

   TABLE DETAILS

===================================================== */

function tableDetails(){

    const table =

        getCurrentTable();

    if(!table){

        toast(

            "Zgjidh një tavolinë."

        );

        return;

    }

    const total =

        getTableTotal(table);

    openGeneral(

        "DETAJE TAVOLINE",

        `

        <div class="list">

            <div class="listRow">

                <div>

                    <strong>${escapeHTML(table.name)}</strong>

                    <small>

                        ${

                            table.opened

                            ? "E hapur"

                            : "E lirë"

                        }

                    </small>

                </div>

                <strong>

                    ${money(total)}

                </strong>

            </div>

            <div class="listRow">

                <div>

                    Produkte

                    <small>

                        ${table.items.length}

                    </small>

                </div>

            </div>

            <div class="listRow">

                <div>

                    Kamarier

                    <small>

                        ${escapeHTML(table.waiter || "-")}

                    </small>

                </div>

            </div>

        </div>

        `

    );

}

/* =====================================================

   TRANSFER TABLE

===================================================== */

function transferTable(){

    const table =

        getCurrentTable();

    if(!table ||

       !table.items.length){

        toast(

            "Nuk ka porosi për transferim."

        );

        return;

    }

    const tables =

        getTables();

    const options =

        tables

        .filter(

            t =>

                t.id !== table.id &&

                (!t.items || !t.items.length)

        )

        .map(

            t =>

                `<option value="${t.id}">

                    ${escapeHTML(t.name)}

                 </option>`

        )

        .join("");

    if(!options){

        toast(

            "Nuk ka tavolinë të lirë."

        );

        return;

    }

    openGeneral(

        "TRANSFERO TAVOLINË",

        `

        <div class="form">

            <select id="transferTarget">

                ${options}

            </select>

            <button

                class="action green"

                onclick="doTransfer()"

            >

                TRANSFERO TANI

            </button>

        </div>

        `

    );

}

function doTransfer(){

    const target =

        Number(

            document.getElementById(

                "transferTarget"

            ).value

        );

    const tables =

        getTables();

    const from =

        tables.find(

            t =>

                t.id ===

                getSelectedTable()

        );

    const to =

        tables.find(

            t =>

                t.id === target

        );

    if(!from || !to) return;

    to.items =

        JSON.parse(

            JSON.stringify(

                from.items

            )

        );

    to.opened =

        from.opened;

    to.openedAt =

        from.openedAt;

    to.waiter =

        from.waiter;

    from.items = [];

    from.opened = false;

    from.openedAt = null;

    saveTables(tables);

    selectTable(target);

    closeModal(

        "generalModal"

    );

    renderTables();

    renderOrder();

    toast(

        "Tavolina u transferua."

    );

}

/* =====================================================

   SUMMARY

===================================================== */

function openSummary(){

    const invoices =

        getJSON(

            INVOICES_KEY,

            []

        );

    const today =

        new Date()

            .toDateString();

    const todayInvoices =

        invoices.filter(

            invoice =>

                new Date(

                    invoice.date

                ).toDateString()

                === today

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

    openGeneral(

        "PËRMBLEDHJE",

        `

        <div class="list">

            <div class="listRow">

                <div>

                    SHITJE SOT

                </div>

                <strong>

                    ${money(total)}

                </strong>

            </div>

            <div class="listRow">

                <div>

                    CASH

                </div>

                <strong>

                    ${money(cash)}

                </strong>

            </div>

            <div class="listRow">

                <div>

                    CARD

                </div>

                <strong>

                    ${money(card)}

                </strong>

            </div>

            <div class="listRow">

                <div>

                    FATURA

                </div>

                <strong>

                    ${todayInvoices.length}

                </strong>

            </div>

        </div>

        `

    );

}

/* =====================================================

   MY INVOICES

===================================================== */

function openMyInvoices(){

    const session =

        getSession();

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

            i =>

                i.waiter ===

                session?.name

        );

    const html =

        mine.length

        ? mine

            .slice()

            .reverse()

            .map(

                invoice => `

                <div class="listRow">

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

                            ${escapeHTML(

                                invoice.waiter

                            )}

                            •

                            ${invoice.payment}

                        </small>

                    </div>

                    <strong>

                        ${money(invoice.total)}

                    </strong>

                </div>

                `

            ).join("")

        : `<div class="empty">

             Nuk ka fatura.

           </div>`;

    openGeneral(

        "FATURAT E MIA",

        `<div class="list">${html}</div>`

    );

}

/* =====================================================

   CASH

===================================================== */

function openCash(){

    openGeneral(

        "HAP ARKËN",

        `

        <div style="

            text-align:center;

            padding:25px;

        ">

            <div style="

                font-size:36px;

                margin-bottom:10px;

            ">

                💰

            </div>

            <strong>

                Arka është aktive

            </strong>

            <p style="

                color:#65736c;

                margin-top:10px;

                font-size:12px;

            ">

                Pagesat CASH regjistrohen

                automatikisht në sistem.

            </p>

        </div>

        `

    );

}

function cashReport(){

    openSummary();

}

/* =====================================================

   ADMIN

===================================================== */

function openAdmin(){

    const session =

        getSession();

    if(!session ||

       session.role !== "admin"){

        toast(

            "Vetëm ADMIN ka akses."

        );

        return;

    }

    const users =

        getJSON(

            USERS_KEY,

            DEFAULT_USERS

        );

    const html =

        users.map(

            (user,index)=>`

            <div class="listRow">

                <div>

                    <strong>

                        ${escapeHTML(user.name)}

                    </strong>

                    <small>

                        ${escapeHTML(

                            user.username

                        )}

                        •

                        ${user.role}

                    </small>

                </div>

                ${

                    user.username !== "admin"

                    ? `

                        <button

                            class="action red"

                            onclick="deleteWaiter(${index})"

                        >

                            FSHI

                        </button>

                    `

                    : ""

                }

            </div>

            `

        ).join("");

    openGeneral(

        "ADMIN",

        `

        <div class="form">

            <strong>

                KAMARIERËT

            </strong>

            <div class="list">

                ${html}

            </div>

            <hr style="

                border-color:#1b2c22;

                margin:10px 0;

            ">

            <strong>

                SHTO KAMARIER

            </strong>

            <input

                id="newWaiterName"

                placeholder="Emri"

            >

            <input

                id="newWaiterUsername"

                placeholder="Username"

            >

            <input

                id="newWaiterPassword"

                placeholder="PIN"

            >

            <button

                class="action green"

                onclick="addWaiter()"

            >

                SHTO KAMARIER

            </button>

        </div>

        `

    );

}

function addWaiter(){

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

        ).value.trim();

    if(!name ||

       !username ||

       !password){

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

    if(

        users.some(

            u =>

                u.username ===

                username

        )

    ){

        toast(

            "Ky username ekziston."

        );

        return;

    }

    users.push({

        name:name,

        username:username,

        password:password,

        role:"waiter"

    });

    setJSON(

        USERS_KEY,

        users

    );

    closeModal(

        "generalModal"

    );

    toast(

        "Kamarieri u shtua."

    );

}

function deleteWaiter(index){

    const users =

        getJSON(

            USERS_KEY,

            DEFAULT_USERS

        );

    if(!users[index]) return;

    if(

        users[index].username ===

        "admin"

    ) return;

    users.splice(

        index,

        1

    );

    setJSON(

        USERS_KEY,

        users

    );

    openAdmin();

    toast(

        "Kamarieri u fshi."

    );

}

/* =====================================================

   LOCK / LOGOUT

===================================================== */

function lockScreen(){

    const session =

        getSession();

    if(!session) return;

    localStorage.removeItem(

        SESSION_KEY

    );

    localStorage.removeItem(

        "barCurrentUser"

    );

    window.location.href =

        "login.html";

}

function logout(){

    localStorage.removeItem(

        SESSION_KEY

    );

    localStorage.removeItem(

        SELECTED_TABLE_KEY

    );

    localStorage.removeItem(

        "barCurrentUser"

    );

    window.location.href =

        "login.html";

}

/* =====================================================

   MODALS

===================================================== */

function openModal(id){

    const modal =

        document.getElementById(id);

    if(modal)

        modal.style.display =

            "flex";

}

function closeModal(id){

    const modal =

        document.getElementById(id);

    if(modal)

        modal.style.display =

            "none";

}

function openGeneral(title,body){

    document.getElementById(

        "generalTitle"

    ).textContent =

        title;

    document.getElementById(

        "generalBody"

    ).innerHTML =

        body;

    openModal(

        "generalModal"

    );

}

/* =====================================================

   ORDER PANEL

===================================================== */

function toggleOrder(){

    const panel =

        document.getElementById(

            "orderPanel"

        );

    if(panel)

        panel.classList.toggle(

            "open"

        );

}

/* =====================================================

   TOAST

===================================================== */

function toast(message){

    let box =

        document.getElementById(

            "toast"

        );

    if(!box){

        box =

            document.createElement(

                "div"

            );

        box.id =

            "toast";

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

        box.style.background =

            "#101812";

        box.style.border =

            "1px solid #20d678";

        box.style.color =

            "#fff";

        box.style.padding =

            "12px 18px";

        box.style.borderRadius =

            "5px";

        box.style.fontSize =

            "12px";

        document.body.appendChild(

            box

        );

    }

    box.textContent =

        message;

    box.style.display =

        "block";

    clearTimeout(

        window.toastTimer

    );

    window.toastTimer =

        setTimeout(

            ()=>{

                box.style.display =

                    "none";

            },

            2500

        );

}

/* =====================================================

   CLOCK

===================================================== */

function updateClock(){

    const clock =

        document.getElementById(

            "clock"

        );

    if(clock){

        clock.textContent =

            new Date()

            .toLocaleTimeString(

                "sq-AL"

            );

    }

}

/* =====================================================

   START

===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        if(!requireLogin())

            return;

        initialize();

        const session =

            getSession();

        if(session){

            document.getElementById(

                "userInfo"

            ).textContent =

                session.name +

                " • " +

                (

                    session.role === "admin"

                    ? "ADMIN"

                    : "KAMARIER"

                );

            if(

                session.role === "admin"

            ){

                document.querySelectorAll(

                    ".adminOnly"

                ).forEach(

                    el =>

                        el.style.display =

                            "block"

                );

            }

        }

        renderTables();

        renderCategories();

        renderProducts();

        renderOrder();

        const search =

            document.getElementById(

                "search"

            );

        if(search){

            search.addEventListener(

                "input",

                renderProducts

            );

        }

        updateClock();

        setInterval(

            updateClock,

            1000

        );

    }

);

/* =====================================================

   GLOBAL

===================================================== */

window.selectTable = selectTable;

window.newInvoice = newInvoice;

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

window.printCurrentPreview =

    printCurrentPreview;

window.finishInvoice =

    finishInvoice;

window.tableDetails =

    tableDetails;

window.transferTable =

    transferTable;

window.doTransfer =

    doTransfer;

window.openSummary =

    openSummary;

window.openMyInvoices =

    openMyInvoices;

window.openCash =

    openCash;

window.cashReport =

    cashReport;

window.openAdmin =

    openAdmin;

window.addWaiter =

    addWaiter;

window.deleteWaiter =

    deleteWaiter;

window.lockScreen =

    lockScreen;

window.logout =

    logout;

window.openModal =

    openModal;

window.closeModal =

    closeModal;

window.toggleOrder =

    toggleOrder;

window.changeStock =

    changeStock;
