"use strict";

/* =====================================================
   MY BAR — APP.JS
===================================================== */

const USERS_KEY = "MYBAR_USERS_V2";
const SESSION_KEY = "MYBAR_SESSION_V2";
const TABLES_KEY = "MYBAR_TABLES_V2";
const PRODUCTS_KEY = "MYBAR_PRODUCTS_V2";
const INVOICES_KEY = "MYBAR_INVOICES_V2";
const SELECTED_TABLE_KEY = "MYBAR_SELECTED_TABLE_V2";
const INVENTORY_KEY = "MYBAR_INVENTORY_V2";


/* =====================================================
   USERS
===================================================== */

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


/* =====================================================
   PRODUCTS
===================================================== */

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

        if(!value){
            return fallback;
        }

        return JSON.parse(value);

    }catch(error){

        console.error(error);

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

    const number =
        Number(value);

    if(!Number.isFinite(number)){
        return "0 L";
    }

    return number.toLocaleString("sq-AL") + " L";
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
   INITIALIZATION
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
        getJSON(
            TABLES_KEY,
            null
        );

    if(
        !Array.isArray(tables) ||
        tables.length !== 12
    ){

        tables = [];

        for(let i=1;i<=12;i++){

            tables.push({

                id:i,

                name:
                    "Tavolina " + i,

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

        if(
            inventory[product.id] ===
            undefined
        ){

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
        document.getElementById(
            "tables"
        );

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
                Array.isArray(table.items) &&
                table.items.length > 0;

            return `

                <button
                    class="table
                    ${active ? "active" : ""}
                    ${selected === table.id ? "selected" : ""}"
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

let currentCategory =
    "Të gjitha";

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
                product =>
                    product.category
            )
        )
    ];

    container.innerHTML =
        categories.map(category=>`

            <button
                class="category
                ${category === currentCategory ? "active" : ""}"
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
        document.getElementById(
            "products"
        );

    if(!container) return;

    const products =
        getProducts();

    const search =
        document.getElementById(
            "search"
        );

    const query =
        search
        ? search.value
            .trim()
            .toLowerCase()
        : "";

    const filtered =
        products.filter(product=>{

            const categoryOK =
                currentCategory === "Të gjitha" ||
                product.category ===
                    currentCategory;

            const searchOK =
                !query ||
                product.name
                    .toLowerCase()
                    .includes(query);

            return categoryOK &&
                   searchOK;
        });

    container.innerHTML =
        filtered.map(product=>{

            const stock =
                getStock(product.id);

            return `

                <button
                    class="product"
                    onclick="addProduct(${product.id})"
                    ${stock <= 0 ? "disabled" : ""}
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
            ) + Number(amount)
        );

    setJSON(
        INVENTORY_KEY,
        inventory
    );

    renderProducts();
}


/* =====================================================
   CURRENT TABLE
===================================================== */

function getCurrentTable(){

    const id =
        getSelectedTable();

    if(!id){
        return null;
    }

    return getTables().find(
        table =>
            Number(table.id) ===
            Number(id)
    ) || null;
}

function getTableTotal(table){

    if(!table ||
       !Array.isArray(table.items)){

        return 0;
    }

    return table.items.reduce(
        (sum,item)=>{

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 0;

            return sum +
                price * quantity;

        },
        0
    );
}


/* =====================================================
   NEW INVOICE
===================================================== */

function newInvoice(){

    const tables =
        getTables();

    const selected =
        getSelectedTable();

    if(selected){

        const selectedTable =
            tables.find(
                table =>
                    table.id === selected
            );

        if(
            selectedTable &&
            selectedTable.items.length
        ){

            toast(
                "Ka tashmë një faturë aktive."
            );

            return;
        }
    }

    const freeTable =
        tables.find(
            table =>
                !table.items ||
                table.items.length === 0
        );

    if(!freeTable){

        toast(
            "Nuk ka tavolinë të lirë."
        );

        return;
    }

    const session =
        getSession();

    freeTable.items = [];
    freeTable.opened = true;
    freeTable.openedAt = Date.now();
    freeTable.waiter =
        session
        ? session.name
        : "";

    saveTables(tables);

    selectTable(
        freeTable.id
    );

    toast(
        freeTable.name +
        " u hap."
    );
}


/* =====================================================
   ADD PRODUCT
===================================================== */

function addProduct(productId){

    let table =
        getCurrentTable();

    if(!table){

        toast(
            "Shtyp FATURË E RE fillimisht."
        );

        return;
    }

    const products =
        getProducts();

    const product =
        products.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );

    if(!product) return;

    const stock =
        getStock(product.id);

    const existing =
        table.items.find(
            item =>
                Number(item.productId) ===
                Number(product.id)
        );

    const quantity =
        existing
        ? Number(existing.quantity)
        : 0;

    if(
        quantity >= stock
    ){

        toast(
            "Nuk ka më stok."
        );

        return;
    }

    if(existing){

        existing.quantity =
            Number(existing.quantity) + 1;

    }else{

        table.items.push({

            productId:
                Number(product.id),

            name:
                product.name,

            price:
                Number(product.price),

            quantity:1
        });
    }

    table.opened = true;

    const tables =
        getTables();

    const index =
        tables.findIndex(
            item =>
                item.id ===
                table.id
        );

    if(index !== -1){

        tables[index] =
            table;

        saveTables(tables);
    }

    renderTables();
    renderProducts();
    renderOrder();
}


/* =====================================================
   QUANTITY
===================================================== */

function changeQuantity(index,amount){

    const tables =
        getTables();

    const id =
        getSelectedTable();

    const table =
        tables.find(
            item =>
                item.id === id
        );

    if(!table) return;

    const item =
        table.items[index];

    if(!item) return;

    const newQuantity =
        Number(item.quantity) +
        Number(amount);

    if(newQuantity <= 0){

        table.items.splice(
            index,
            1
        );

    }else{

        const stock =
            getStock(
                item.productId
            );

        if(
            newQuantity > stock
        ){

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
            item =>
                item.id === id
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

        toast(
            "Fatura është bosh."
        );

        return;
    }

    if(!confirm(
        "Dëshiron të pastrosh faturën?"
    )){
        return;
    }

    table.items = [];
    table.opened = false;
    table.openedAt = null;
    table.waiter = "";

    saveTables(
        getTables()
    );

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    renderTables();
    renderOrder();

    toast(
        "Fatura u pastrua."
    );
}


/* =====================================================
   RENDER ORDER
===================================================== */

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

        if(totalElement){
            totalElement.textContent =
                money(0);
        }

        if(tableElement){
            tableElement.textContent =
                "Nuk është zgjedhur tavolinë";
        }

        return;
    }

    if(tableElement){

        tableElement.textContent =
            table.name;
    }

    if(
        !Array.isArray(table.items) ||
        table.items.length === 0
    ){

        container.innerHTML =
            `<div class="empty">
                Nuk ka produkte në faturë.
             </div>`;

        if(totalElement){
            totalElement.textContent =
                money(0);
        }

        return;
    }

    let total = 0;

    container.innerHTML =
        table.items.map(
            (item,index)=>{

                const price =
                    Number(item.price) || 0;

                const quantity =
                    Number(item.quantity) || 0;

                const itemTotal =
                    price * quantity;

                total +=
                    itemTotal;

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
                                onclick="changeQuantity(${index},-1)">
                                −
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                onclick="changeQuantity(${index},1)">
                                +
                            </button>

                        </div>

                        <button
                            class="delete"
                            onclick="removeItem(${index})">
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

    if(
        !table ||
        !table.items ||
        !table.items.length
    ){

        toast(
            "Fatura është bosh."
        );

        return;
    }

    const total =
        getTableTotal(table);

    document.getElementById(
        "paymentAmount"
    ).textContent =
        money(total);

    openModal(
        "paymentModal"
    );
}

function completePayment(method){

    const tables =
        getTables();

    const tableId =
        getSelectedTable();

    const table =
        tables.find(
            item =>
                item.id ===
                tableId
        );

    if(
        !table ||
        !table.items ||
        !table.items.length
    ){

        toast(
            "Fatura është bosh."
        );

        return;
    }

    /* STOCK CHECK */

    for(
        const item of table.items
    ){

        const stock =
            getStock(
                item.productId
            );

        if(
            Number(item.quantity) >
            stock
        ){

            toast(
                "Stoku nuk mjafton për " +
                item.name
            );

            return;
        }
    }

    /* TOTAL BEFORE CLEARING TABLE */

    const total =
        getTableTotal(table);

    /*
       Kjo është pika kryesore:
       total ruhet para se tabela të pastrohet.
    */

    const finalTotal =
        Number(total);

    if(
        !Number.isFinite(finalTotal) ||
        finalTotal <= 0
    ){

        toast(
            "Gabim në totalin e faturës."
        );

        return;
    }

    /* REMOVE STOCK */

    for(
        const item of table.items
    ){

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

    const invoiceNumber =
        "MY-" +
        new Date().getFullYear() +
        "-" +
        String(
            invoices.length + 1
        ).padStart(5,"0");

    const invoice = {

        id:
            Date.now(),

        number:
            invoiceNumber,

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

        total:
            finalTotal
    };

    invoices.push(
        invoice
    );

    setJSON(
        INVOICES_KEY,
        invoices
    );

    /* CLEAR TABLE AFTER SAVING INVOICE */

    table.items = [];
    table.opened = false;
    table.openedAt = null;
    table.waiter = "";

    saveTables(
        tables
    );

    closeModal(
        "paymentModal"
    );

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    renderTables();
    renderProducts();
    renderOrder();

    showInvoice(
        invoice
    );
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

    const totalElement =
        document.getElementById(
            "invoiceTotal"
        );

    if(info){

        info.innerHTML = `

            <strong>
                Nr. Fature:
            </strong>
            ${escapeHTML(invoice.number)}
            <br>

            <strong>
                Datë:
            </strong>
            ${new Date(invoice.date)
                .toLocaleString("sq-AL")}
            <br>

            <strong>
                Tavolinë:
            </strong>
            ${escapeHTML(invoice.tableName)}
            <br>

            <strong>
                Kamarier:
            </strong>
            ${escapeHTML(
                invoice.waiter || "-"
            )}
            <br>

            <strong>
                Pagesa:
            </strong>
            ${
                invoice.payment === "cash"
                ? "CASH"
                : "CARD"
            }

        `;
    }

    if(items){

        const rows =
            invoice.items.map(
                item=>{

                    const quantity =
                        Number(
                            item.quantity
                        ) || 0;

                    const price =
                        Number(
                            item.price
                        ) || 0;

                    const itemTotal =
                        quantity * price;

                    return `

                        <div class="invoiceRow">

                            <span>
                                ${escapeHTML(item.name)}
                            </span>

                            <span>
                                ${quantity}
                            </span>

                            <span>
                                ${money(price)}
                            </span>

                            <strong>
                                ${money(itemTotal)}
                            </strong>

                        </div>

                    `;
                }
            ).join("");

        items.innerHTML = `

            <div class="invoiceRow">

                <strong>
                    Produkt
                </strong>

                <strong>
                    S
                </strong>

                <strong>
                    Çmimi
                </strong>

                <strong>
                    Total
                </strong>

            </div>

            ${rows}

        `;
    }

    if(totalElement){

        totalElement.textContent =
            money(
                Number(invoice.total)
            );
    }

    openModal(
        "invoiceModal"
    );
}


/* =====================================================
   PRINT RECEIPT
===================================================== */

function printInvoice(isTaxInvoice){

    if(!lastInvoice){

        toast(
            "Nuk ka faturë për printim."
        );

        return;
    }

    const invoice =
        lastInvoice;

    const total =
        Number(invoice.total) || 0;

    if(total <= 0){

        toast(
            "Totali i faturës është 0."
        );

        return;
    }

    const rows =
        invoice.items.map(item=>{

            const quantity =
                Number(
                    item.quantity
                ) || 0;

            const price =
                Number(
                    item.price
                ) || 0;

            const itemTotal =
                quantity * price;

            return `

                <tr>

                    <td>
                        ${escapeHTML(item.name)}
                    </td>

                    <td>
                        ${quantity}
                    </td>

                    <td>
                        ${price.toLocaleString("sq-AL")}
                    </td>

                    <td>
                        ${itemTotal.toLocaleString("sq-AL")}
                    </td>

                </tr>

            `;
        }).join("");

    const payment =
        invoice.payment === "cash"
        ? "CASH"
        : "CARD";

    const taxSection =
        isTaxInvoice
        ? `

            <div class="tax">

                <strong>
                    FATURË TATIMORE
                </strong>

                <br><br>

                Dokument fiskal.
                Integrimi real me sistemin
                fiskal kërkon konfigurim
                të backend-it dhe shërbimit
                fiskal.

            </div>

        `
        : "";

    const printWindow =
        window.open(
            "",
            "_blank",
            "width=420,height=700"
        );

    if(!printWindow){

        toast(
            "Lejo popup për printim."
        );

        return;
    }

    printWindow.document.open();

    printWindow.document.write(`

<!DOCTYPE html>

<html lang="sq">

<head>

<meta charset="UTF-8">

<title>
${escapeHTML(invoice.number)}
</title>

<style>

*{
    box-sizing:border-box;
}

html,
body{
    margin:0;
    padding:0;
    background:#fff;
    color:#000;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    width:80mm;
    margin:0 auto;
    font-size:10px;
}

.receipt{

    width:80mm;

    padding:
        5mm;

    background:#fff;
    color:#000;
}

.center{
    text-align:center;
}

.logo{
    font-size:22px;
    font-weight:900;
    letter-spacing:2px;
}

.title{
    font-size:11px;
    font-weight:bold;
    margin-top:3px;
}

hr{
    border:0;
    border-top:1px solid #000;
    margin:8px 0;
}

.info{
    font-size:10px;
    line-height:1.7;
}

table{
    width:100%;
    border-collapse:collapse;
    margin-top:8px;
}

th{
    padding:4px 1px;
    border-bottom:1px solid #000;
    text-align:left;
    font-size:9px;
}

td{
    padding:5px 1px;
    border-bottom:1px dotted #777;
    font-size:9px;
    vertical-align:top;
}

th:nth-child(2),
td:nth-child(2){
    width:10%;
    text-align:center;
}

th:nth-child(3),
td:nth-child(3){
    width:21%;
    text-align:right;
}

th:nth-child(4),
td:nth-child(4){
    width:24%;
    text-align:right;
}

.total{

    display:flex;

    justify-content:
        space-between;

    border-top:
        2px solid #000;

    margin-top:
        10px;

    padding-top:
        8px;

    font-size:
        17px;

    font-weight:
        900;
}

.tax{

    margin-top:
        10px;

    padding-top:
        8px;

    border-top:
        1px solid #000;

    font-size:
        9px;

    line-height:
        1.4;
}

.footer{

    text-align:center;

    margin-top:
        15px;

    font-size:
        9px;
}

@page{

    size:
        80mm auto;

    margin:
        0;
}

@media print{

    html,
    body{

        width:
            80mm;

        margin:
            0;

        padding:
            0;

        background:
            #fff;
    }

    .receipt{

        width:
            80mm;

        padding:
            5mm;
    }
}

</style>

</head>

<body>

<div class="receipt">

    <div class="center">

        <div class="logo">
            MY BAR
        </div>

        <div class="title">
            BAR & RESTAURANT
        </div>

    </div>

    <hr>

    <div class="info">

        <strong>
            Nr. Fature:
        </strong>

        ${escapeHTML(invoice.number)}

        <br>

        <strong>
            Data:
        </strong>

        ${new Date(invoice.date)
            .toLocaleString("sq-AL")}

        <br>

        <strong>
            Tavolina:
        </strong>

        ${escapeHTML(invoice.tableName)}

        <br>

        <strong>
            Kamarier:
        </strong>

        ${escapeHTML(
            invoice.waiter || "-"
        )}

        <br>

        <strong>
            Pagesa:
        </strong>

        ${payment}

    </div>

    <hr>

    <table>

        <thead>

            <tr>

                <th>
                    Produkt
                </th>

                <th>
                    S
                </th>

                <th>
                    Çmimi
                </th>

                <th>
                    Total
                </th>

            </tr>

        </thead>

        <tbody>

            ${rows}

        </tbody>

    </table>

    <div class="total">

        <span>
            TOTAL
        </span>

        <span>
            ${total.toLocaleString("sq-AL")} L
        </span>

    </div>

    ${taxSection}

    <div class="footer">

        Faleminderit për vizitën!

        <br><br>

        MY BAR

    </div>

</div>

<script>

window.onload = function(){

    setTimeout(function(){

        window.focus();

        window.print();

    },400);

};

window.onafterprint = function(){

    window.close();

};

<\/script>

</body>

</html>

`);

    printWindow.document.close();

    /*
       Kur printimi mbaron,
       kthehemi automatikisht te LOGIN.
    */

    printWindow.onafterprint =
        function(){

            try{
                printWindow.close();
            }catch(error){}

            finishInvoice();
        };
}


/* =====================================================
   FINISH / RETURN TO LOGIN
===================================================== */

function finishInvoice(){

    closeModal(
        "invoiceModal"
    );

    lastInvoice =
        null;

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    localStorage.removeItem(
        SESSION_KEY
    );

    localStorage.removeItem(
        "barCurrentUser"
    );

    window.location.href =
        "login.html";
}


/* =====================================================
   CURRENT INVOICE
===================================================== */

function closeCurrentInvoice(){

    const table =
        getCurrentTable();

    if(
        !table ||
        !table.items ||
        !table.items.length
    ){

        toast(
            "Nuk ka faturë aktive."
        );

        return;
    }

    openPayment();
}

function printCurrentPreview(){

    if(!lastInvoice){

        toast(
            "Mbyll faturën përpara printimit."
        );

        return;
    }

    printInvoice(false);
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

    openGeneral(
        "DETAJE TAVOLINE",
        `

        <div class="list">

            <div class="listRow">

                <div>

                    <strong>
                        ${escapeHTML(table.name)}
                    </strong>

                    <small>
                        ${
                            table.items.length
                            ? "E hapur"
                            : "E lirë"
                        }
                    </small>

                </div>

                <strong>
                    ${money(
                        getTableTotal(table)
                    )}
                </strong>

            </div>

            <div class="listRow">

                <div>
                    Produkte
                </div>

                <strong>
                    ${table.items.length}
                </strong>

            </div>

            <div class="listRow">

                <div>
                    Kamarier
                </div>

                <strong>
                    ${escapeHTML(
                        table.waiter || "-"
                    )}
                </strong>

            </div>

        </div>

        `
    );
}


/* =====================================================
   TRANSFER
===================================================== */

function transferTable(){

    const table =
        getCurrentTable();

    if(
        !table ||
        !table.items ||
        !table.items.length
    ){

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
            item =>
                item.id !== table.id &&
                (!item.items ||
                 item.items.length === 0)
        )
        .map(
            item =>
                `
                <option value="${item.id}">
                    ${escapeHTML(item.name)}
                </option>
                `
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

            <select
                id="transferTarget">
                ${options}
            </select>

            <button
                class="action green"
                onclick="doTransfer()">
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
            item =>
                item.id ===
                getSelectedTable()
        );

    const to =
        tables.find(
            item =>
                item.id ===
                target
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
    from.waiter = "";

    saveTables(
        tables
    );

    selectTable(
        target
    );

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
        new Date().toDateString();

    const todayInvoices =
        invoices.filter(
            invoice =>
                new Date(
                    invoice.date
                ).toDateString() ===
                today
        );

    const total =
        todayInvoices.reduce(
            (sum,invoice)=>
                sum +
                Number(
                    invoice.total
                ),
            0
        );

    const cash =
        todayInvoices
        .filter(
            invoice =>
                invoice.payment ===
                "cash"
        )
        .reduce(
            (sum,invoice)=>
                sum +
                Number(
                    invoice.total
                ),
            0
        );

    const card =
        todayInvoices
        .filter(
            invoice =>
                invoice.payment ===
                "card"
        )
        .reduce(
            (sum,invoice)=>
                sum +
                Number(
                    invoice.total
                ),
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
            invoice =>
                invoice.waiter ===
                session?.name
        );

    const html =
        mine.length

        ? mine
            .slice()
            .reverse()
            .map(
                invoice=>`

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
                        ${money(
                            invoice.total
                        )}
                    </strong>

                </div>

                `
            )
            .join("")

        : `
            <div class="empty">
                Nuk ka fatura.
            </div>
          `;

    openGeneral(
        "FATURAT E MIA",
        `<div class="list">
            ${html}
         </div>`
    );
}


/* =====================================================
   CASH
===================================================== */

function openCash(){

    openGeneral(
        "HAP ARKËN",
        `

        <div
            style="
                text-align:center;
                padding:25px;
            "
        >

            <div
                style="
                    font-size:36px;
                    margin-bottom:10px;
                "
            >
                💰
            </div>

            <strong>
                Arka është aktive
            </strong>

            <p
                style="
                    color:#65736c;
                    margin-top:10px;
                    font-size:12px;
                "
            >
                Pagesat CASH regjistrohen
                automatikisht.
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

    if(
        !session ||
        session.role !== "admin"
    ){

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
                        ${escapeHTML(
                            user.name
                        )}
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

            <hr
                style="
                    border-color:#1b2c22;
                    margin:10px 0;
                "
            >

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

    if(
        !name ||
        !username ||
        !password
    ){

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
            user =>
                user.username ===
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
    ){
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

    openAdmin();

    toast(
        "Kamarieri u fshi."
    );
}


/* =====================================================
   LOCK / LOGOUT
===================================================== */

function lockScreen(){

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

    if(modal){

        modal.style.display =
            "flex";
    }
}

function closeModal(id){

    const modal =
        document.getElementById(id);

    if(modal){

        modal.style.display =
            "none";
    }
}

function openGeneral(title,body){

    const titleElement =
        document.getElementById(
            "generalTitle"
        );

    const bodyElement =
        document.getElementById(
            "generalBody"
        );

    if(titleElement){
        titleElement.textContent =
            title;
    }

    if(bodyElement){
        bodyElement.innerHTML =
            body;
    }

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

    if(panel){

        panel.classList.toggle(
            "open"
        );
    }
}


/* =====================================================
   TOAST
===================================================== */

function toast(message){

    let box =
        document.getElementById(
            "myBarToast"
        );

    if(!box){

        box =
            document.createElement(
                "div"
            );

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
            "6px";

        box.style.background =
            "#101812";

        box.style.color =
            "#fff";

        box.style.border =
            "1px solid #20d678";

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
        window.myBarToastTimer
    );

    window.myBarToastTimer =
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

        if(!requireLogin()){
            return;
        }

        initialize();

        const session =
            getSession();

        if(session){

            const userInfo =
                document.getElementById(
                    "userInfo"
                );

            if(userInfo){

                userInfo.textContent =
                    session.name +
                    " • " +
                    (
                        session.role ===
                        "admin"
                        ? "ADMIN"
                        : "KAMARIER"
                    );
            }

            if(
                session.role ===
                "admin"
            ){

                document
                    .querySelectorAll(
                        ".adminOnly"
                    )
                    .forEach(
                        element =>
                            element.style.display =
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
   GLOBAL FUNCTIONS
===================================================== */

window.selectTable =
    selectTable;

window.newInvoice =
    newInvoice;

window.setCategory =
    setCategory;

window.addProduct =
    addProduct;

window.changeQuantity =
    changeQuantity;

window.removeItem =
    removeItem;

window.clearOrder =
    clearOrder;

window.openPayment =
    openPayment;

window.completePayment =
    completePayment;

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
