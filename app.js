"use strict";

/* =========================================================
   MY BAR — APP.JS
========================================================= */

const USERS_KEY = "MYBAR_USERS_V2";
const SESSION_KEY = "MYBAR_SESSION_V2";
const CURRENT_USER_KEY = "MYBAR_CURRENT_USER";

const TABLES_KEY = "MYBAR_TABLES_V2";
const PRODUCTS_KEY = "MYBAR_PRODUCTS_V2";
const INVOICES_KEY = "MYBAR_INVOICES_V2";
const INVENTORY_KEY = "MYBAR_INVENTORY_V2";
const SETTINGS_KEY = "MYBAR_SETTINGS_V2";

const SELECTED_TABLE_KEY = "MYBAR_SELECTED_TABLE_V2";

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

/* =========================
   HELPERS
========================= */

function getJSON(key,fallback){

    try{

        const value=localStorage.getItem(key);

        return value ? JSON.parse(value) : fallback;

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

    return Number(value||0)
        .toLocaleString("sq-AL")+
        " L";
}

function escapeHTML(value){

    return String(value??"")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

function getCurrentUser(){

    return getJSON(
        CURRENT_USER_KEY,
        null
    );
}

/* =========================
   SESSION
========================= */

function checkSession(){

    const session=
        localStorage.getItem(SESSION_KEY);

    if(session!=="true"){

        window.location.href="./index.html";

        return false;
    }

    return true;
}

/* =========================
   INITIALIZE
========================= */

function initializeApp(){

    if(!localStorage.getItem(USERS_KEY)){
        setJSON(USERS_KEY,DEFAULT_USERS);
    }

    if(!localStorage.getItem(PRODUCTS_KEY)){
        setJSON(PRODUCTS_KEY,DEFAULT_PRODUCTS);
    }

    if(!localStorage.getItem(INVOICES_KEY)){
        setJSON(INVOICES_KEY,[]);
    }

    if(!localStorage.getItem(INVENTORY_KEY)){

        const stock={};

        DEFAULT_PRODUCTS.forEach(product=>{
            stock[product.id]=20;
        });

        setJSON(INVENTORY_KEY,stock);
    }

    if(!localStorage.getItem(SETTINGS_KEY)){

        setJSON(
            SETTINGS_KEY,
            {
                appName:"MY BAR",
                tableCount:12
            }
        );
    }

    initializeTables();
}

/* =========================
   TABLES
========================= */

function initializeTables(){

    const settings=
        getJSON(SETTINGS_KEY,{
            tableCount:12
        });

    const count=
        Number(settings.tableCount)||12;

    let tables=
        getJSON(TABLES_KEY,[]);

    if(!Array.isArray(tables)||tables.length!==count){

        const old=tables||[];

        tables=[];

        for(let i=1;i<=count;i++){

            const previous=
                old.find(t=>t.id===i);

            tables.push(
                previous||{
                    id:i,
                    name:"Tavolina "+i,
                    items:[]
                }
            );
        }

        setJSON(TABLES_KEY,tables);
    }
}

function getTables(){

    return getJSON(TABLES_KEY,[]);
}

function saveTables(tables){

    setJSON(TABLES_KEY,tables);
}

function getSelectedTable(){

    return Number(
        localStorage.getItem(
            SELECTED_TABLE_KEY
        )||0
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

function getFirstFreeTable(){

    const tables=getTables();

    return tables.find(
        table=>
            !table.items||
            table.items.length===0
    );
}

function ensureTableSelected(){

    let id=getSelectedTable();

    const tables=getTables();

    let table=
        tables.find(t=>t.id===id);

    if(!table){

        table=getFirstFreeTable();

        if(!table){

            toast("Nuk ka tavolinë të lirë.");

            return null;
        }

        id=table.id;

        localStorage.setItem(
            SELECTED_TABLE_KEY,
            String(id)
        );
    }

    return id;
}

/* =========================
   TIME / OFFER
========================= */

function currentHour(){

    return new Date().getHours();
}

function morningOfferActive(){

    const hour=currentHour();

    return hour>=7 && hour<10;
}

function coffeeHidden(){

    const hour=currentHour();

    return hour>=20 && hour<24;
}

function isCoffeeCategory(category){

    const value=
        String(category||"").toLowerCase();

    return(
        value==="kafe"||
        value==="kafeteria"||
        value==="kafe & çaj"
    );
}

function isFirstOrder(table){

    return(
        !table.items||
        table.items.length===0
    );
}

/* =========================
   INVENTORY
========================= */

function getStock(productId){

    const stock=
        getJSON(INVENTORY_KEY,{});

    return Number(
        stock[productId]??0
    );
}

function changeStock(productId,amount){

    const stock=
        getJSON(INVENTORY_KEY,{});

    stock[productId]=Math.max(
        0,
        Number(stock[productId]||0)+Number(amount)
    );

    setJSON(INVENTORY_KEY,stock);
}

/* =========================
   HEADER
========================= */

function renderHeader(){

    const user=getCurrentUser();

    const userInfo=
        document.getElementById("userInfo");

    if(userInfo&&user){

        userInfo.textContent=
            user.name+
            " • "+
            (
                user.role==="admin"
                    ?"ADMIN"
                    :"KAMARIER"
            );
    }
}

/* =========================
   TABLE UI
========================= */

function renderTables(){

    const grid=
        document.getElementById("tableGrid");

    if(!grid)return;

    const tables=getTables();

    const selected=
        getSelectedTable();

    grid.innerHTML=
        tables.map(table=>{

            const active=
                table.items&&
                table.items.length>0;

            const total=
                getOrderTotal(table);

            return `
            <button
                class="table ${
                    active?"active":""
                } ${
                    selected===table.id
                        ?"selected":""
                }"
                onclick="selectTable(${table.id})"
            >
                <strong>${escapeHTML(table.name)}</strong>
                <span>
                    ${
                        active
                            ?money(total)
                            :"E lirë"
                    }
                </span>
            </button>
            `;

        }).join("");
}

/* =========================
   MENU
========================= */

function renderMenu(category="Të gjitha"){

    const grid=
        document.getElementById("menuGrid");

    const categories=
        document.getElementById("categories");

    if(!grid)return;

    const products=
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    let allCategories=[
        "Të gjitha",
        ...new Set(
            products.map(p=>p.category)
        )
    ];

    if(coffeeHidden()){

        allCategories=
            allCategories.filter(
                cat=>
                    cat==="Të gjitha"||
                    !isCoffeeCategory(cat)
            );

        if(isCoffeeCategory(category)){
            category="Të gjitha";
        }
    }

    if(categories){

        categories.innerHTML=
            allCategories.map(cat=>`

            <button
                class="${
                    cat===category
                        ?"active":""
                }"
                onclick="renderMenu(${JSON.stringify(cat)})"
            >
                ${escapeHTML(cat)}
            </button>

            `).join("");
    }

    let filtered=
        category==="Të gjitha"
            ?products
            :products.filter(
                p=>p.category===category
            );

    if(coffeeHidden()){

        filtered=
            filtered.filter(
                p=>!isCoffeeCategory(p.category)
            );
    }

    grid.innerHTML=
        filtered.map(product=>{

            const stock=
                getStock(product.id);

            return `
            <button
                class="product ${
                    stock<=0?"disabled":""
                }"
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

/* =========================
   ADD PRODUCT
========================= */

function addProduct(productId){

    const tableId=
        ensureTableSelected();

    if(!tableId)return;

    const products=
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const product=
        products.find(
            p=>Number(p.id)===Number(productId)
        );

    if(!product)return;

    if(
        coffeeHidden()&&
        isCoffeeCategory(product.category)
    ){

        toast("Kafja nuk ofrohet pas orës 20:00.");

        return;
    }

    const stock=
        getStock(productId);

    if(stock<=0){

        toast("Ky produkt nuk ka stok.");

        return;
    }

    const tables=getTables();

    const table=
        tables.find(
            t=>t.id===tableId
        );

    if(!table)return;

    if(!Array.isArray(table.items)){
        table.items=[];
    }

    const firstOrder=
        isFirstOrder(table);

    const existing=
        table.items.find(
            item=>
                Number(item.productId)===
                Number(productId)
        );

    if(existing){

        if(existing.quantity>=stock){

            toast("Nuk ka më stok.");

            return;
        }

        existing.quantity++;

    }else{

        table.items.push({
            productId:product.id,
            name:product.name,
            price:Number(product.price),
            quantity:1
        });
    }

    if(firstOrder&&morningOfferActive()){

        table.morningOffer=true;

        toast(
            "Oferta e mëngjesit u aktivizua."
        );
    }

    saveTables(tables);

    renderTables();
    renderMenu();
    renderOrder();
}

/* =========================
   ORDER
========================= */

function getOrderTotal(table){

    if(!table||!table.items){
        return 0;
    }

    let total=0;

    table.items.forEach(item=>{

        total+=
            Number(item.price)*
            Number(item.quantity);

    });

    /*
      Oferta e mëngjesit:
      10% ulje vetëm nëse
      porosia e parë u hap 07:00–10:00.
    */

    if(table.morningOffer){

        total*=0.90;
    }

    return Math.round(total);
}

function renderOrder(){

    const container=
        document.getElementById("orderItems");

    const totalElement=
        document.getElementById("orderTotal");

    if(!container)return;

    const tableId=
        getSelectedTable();

    const tables=getTables();

    const table=
        tables.find(
            t=>t.id===tableId
        );

    if(
        !table||
        !table.items||
        !table.items.length
    ){

        container.innerHTML=
            `<div class="empty">
                Nuk ka produkte në porosi.
             </div>`;

        if(totalElement){
            totalElement.textContent=
                money(0);
        }

        return;
    }

    container.innerHTML=
        table.items.map((item,index)=>`

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
                    onclick="changeOrderQuantity(${index},-1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeOrderQuantity(${index},1)">
                    +
                </button>

                <button
                    onclick="removeOrderItem(${index})">
                    ×
                </button>

            </div>

        </div>

        `).join("");

    if(table.morningOffer){

        container.innerHTML+=`
            <div style="
                color:#d4af37;
                font-size:12px;
                padding:10px 0;
            ">
                OFERTË MËNGJESI −10%
            </div>
        `;
    }

    if(totalElement){

        totalElement.textContent=
            money(getOrderTotal(table));
    }
}

function changeOrderQuantity(index,amount){

    const tableId=
        getSelectedTable();

    const tables=getTables();

    const table=
        tables.find(
            t=>t.id===tableId
        );

    if(!table)return;

    const item=
        table.items[index];

    if(!item)return;

    const newQuantity=
        Number(item.quantity)+
        Number(amount);

    if(newQuantity<=0){

        table.items.splice(index,1);

    }else{

        const stock=
            getStock(item.productId);

        if(newQuantity>stock){

            toast("Nuk ka mjaftueshëm stok.");

            return;
        }

        item.quantity=newQuantity;
    }

    saveTables(tables);

    renderTables();
    renderOrder();
    renderMenu();
}

function removeOrderItem(index){

    const tableId=
        getSelectedTable();

    const tables=getTables();

    const table=
        tables.find(
            t=>t.id===tableId
        );

    if(!table)return;

    table.items.splice(index,1);

    if(!table.items.length){

        table.morningOffer=false;
    }

    saveTables(tables);

    renderTables();
    renderOrder();
}

/* =========================
   PAYMENT
========================= */

function openPayment(){

    const tableId=
        ensureTableSelected();

    if(!tableId)return;

    const tables=getTables();

    const table=
        tables.find(
            t=>t.id===tableId
        );

    if(
        !table||
        !table.items||
        !table.items.length
    ){

        toast("Porosia është bosh.");

        return;
    }

    const total=
        getOrderTotal(table);

    const modal=
        document.getElementById("paymentModal");

    if(modal){
        modal.style.display="flex";
    }

    const totalElement=
        document.getElementById("paymentTotal");

    if(totalElement){
        totalElement.textContent=
            money(total);
    }
}

function closePayment(){

    const modal=
        document.getElementById("paymentModal");

    if(modal){
        modal.style.display="none";
    }
}

/* =========================
   COMPLETE PAYMENT
========================= */

function completePayment(method){

    const tableId=
        getSelectedTable();

    if(!tableId)return;

    const tables=getTables();

    const table=
        tables.find(
            t=>t.id===tableId
        );

    if(
        !table||
        !table.items||
        !table.items.length
    ){

        toast("Porosia është bosh.");

        return;
    }

    for(const item of table.items){

        const stock=
            getStock(item.productId);

        if(item.quantity>stock){

            toast(
                "Stoku nuk është i mjaftueshëm për "+
                item.name
            );

            return;
        }
    }

    for(const item of table.items){

        changeStock(
            item.productId,
            -Number(item.quantity)
        );
    }

    const total=
        getOrderTotal(table);

    const user=
        getCurrentUser();

    const invoices=
        getJSON(
            INVOICES_KEY,
            []
        );

    const invoice={
        id:Date.now(),
        number:"INV-"+Date.now(),
        date:new Date().toISOString(),
        createdAt:Date.now(),

        table:tableId,
        tableName:"Tavolina "+tableId,

        items:JSON.parse(
            JSON.stringify(table.items)
        ),

        total,
        amount:total,

        payment:method,
        paymentMethod:method,

        waiterName:
            user?user.name:"Pa emër",

        userName:
            user?user.name:"Pa emër",

        user:
            user?user.username:"",

        morningOffer:
            !!table.morningOffer
    };

    invoices.push(invoice);

    setJSON(
        INVOICES_KEY,
        invoices
    );

    table.items=[];
    table.morningOffer=false;

    saveTables(tables);

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    closePayment();

    renderTables();
    renderOrder();
    renderMenu();
    updateDashboard();
    renderHistory();

    showInvoice(invoice);
}

/* =========================
   INVOICE
========================= */

function showInvoice(invoice){

    const modal=
        document.getElementById("invoiceModal");

    const number=
        document.getElementById("invoiceNumber");

    const date=
        document.getElementById("invoiceDate");

    const table=
        document.getElementById("invoiceTable");

    const waiter=
        document.getElementById("invoiceWaiter");

    const items=
        document.getElementById("invoiceItems");

    const total=
        document.getElementById("invoiceTotal");

    if(number){
        number.textContent=
            invoice.number;
    }

    if(date){
        date.textContent=
            new Date(invoice.date)
            .toLocaleString("sq-AL");
    }

    if(table){
        table.textContent=
            invoice.tableName;
    }

    if(waiter){
        waiter.textContent=
            invoice.waiterName;
    }

    if(items){

        items.innerHTML=
            invoice.items.map(item=>`

            <div class="invoice-row">

                <span>
                    ${escapeHTML(item.name)}
                    ×
                    ${item.quantity}
                </span>

                <strong>
                    ${money(
                        item.price*
                        item.quantity
                    )}
                </strong>

            </div>

            `).join("");

        if(invoice.morningOffer){

            items.innerHTML+=`
                <div class="invoice-row">
                    <span>
                        Ofertë mëngjesi −10%
                    </span>
                    <strong>
                        Aktivizuar
                    </strong>
                </div>
            `;
        }
    }

    if(total){
        total.textContent=
            money(invoice.total);
    }

    if(modal){
        modal.style.display="flex";
    }
}

/* =========================
   DASHBOARD
========================= */

function updateDashboard(){

    const invoices=
        getJSON(
            INVOICES_KEY,
            []
        );

    const todayString=
        new Date().toDateString();

    const todayInvoices=
        invoices.filter(invoice=>
            new Date(
                invoice.date||
                invoice.createdAt
            ).toDateString()===
            todayString
        );

    const sales=
        todayInvoices.reduce(
            (sum,invoice)=>
                sum+
                Number(invoice.total||0),
            0
        );

    const cash=
        todayInvoices
        .filter(i=>i.payment==="cash")
        .reduce(
            (sum,i)=>
                sum+
                Number(i.total||0),
            0
        );

    const card=
        todayInvoices
        .filter(i=>i.payment==="card")
        .reduce(
            (sum,i)=>
                sum+
                Number(i.total||0),
            0
        );

    const activeTables=
        getTables().filter(
            t=>t.items&&t.items.length
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

    renderPayments(todayInvoices);
}

function setText(id,value){

    const element=
        document.getElementById(id);

    if(element){
        element.textContent=value;
    }
}

/* =========================
   PAYMENTS
========================= */

function renderPayments(invoices){

    const list=
        document.getElementById(
            "paymentsList"
        );

    if(!list)return;

    if(!invoices.length){

        list.innerHTML=
            `<div class="empty">
                Nuk ka pagesa sot.
             </div>`;

        return;
    }

    list.innerHTML=
        [...invoices]
        .reverse()
        .map(invoice=>`

        <div class="row">

            <div>

                <strong>
                    ${escapeHTML(invoice.number)}
                </strong>

                <small>
                    ${escapeHTML(
                        invoice.waiterName||
                        "Pa emër"
                    )}
                    •
                    ${escapeHTML(
                        invoice.payment||
                        "cash"
                    )}
                </small>

            </div>

            <strong>
                ${money(invoice.total)}
            </strong>

        </div>

        `).join("");
}

/* =========================
   HISTORY
========================= */

function renderHistory(){

    const list=
        document.getElementById(
            "historyList"
        );

    if(!list)return;

    const invoices=
        getJSON(
            INVOICES_KEY,
            []
        );

    if(!invoices.length){

        list.innerHTML=
            `<div class="empty">
                Nuk ka histori.
             </div>`;

        return;
    }

    list.innerHTML=
        [...invoices]
        .reverse()
        .map(invoice=>`

        <div class="row">

            <div>

                <strong>
                    ${escapeHTML(invoice.number)}
                </strong>

                <small>
                    ${new Date(
                        invoice.date
                    ).toLocaleString("sq-AL")}
                </small>

            </div>

            <div>

                <strong>
                    ${money(invoice.total)}
                </strong>

                <small>
                    ${escapeHTML(
                        invoice.payment||
                        "cash"
                    )}
                </small>

            </div>

        </div>

        `).join("");
}

/* =========================
   ADMIN
========================= */

function renderAdmin(){

    const user=
        getCurrentUser();

    if(!user||user.role!=="admin"){
        return;
    }

    const usersList=
        document.getElementById(
            "usersList"
        );

    if(usersList){

        const users=
            getJSON(
                USERS_KEY,
                DEFAULT_USERS
            );

        usersList.innerHTML=
            users.map((u,index)=>`

            <div class="row">

                <div>

                    <strong>
                        ${escapeHTML(u.name)}
                    </strong>

                    <small>
                        ${escapeHTML(u.username)}
                        •
                        ${escapeHTML(u.role)}
                    </small>

                </div>

                ${
                    u.username!=="admin"
                        ?`
                        <button
                            onclick="deleteWaiter(${index})">
                            Fshi
                        </button>
                        `
                        :""
                }

            </div>

            `).join("");
    }

    const productsBox=
        document.getElementById(
            "adminProducts"
        );

    if(productsBox){

        const products=
            getJSON(
                PRODUCTS_KEY,
                DEFAULT_PRODUCTS
            );

        productsBox.innerHTML=
            products.map(product=>`

            <div class="row">

                <div>

                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <small>
                        ${escapeHTML(
                            product.category
                        )}
                        •
                        ${money(product.price)}
                        • Stok:
                        ${getStock(product.id)}
                    </small>

                </div>

                <div>

                    <button
                        onclick="changeStock(${product.id},1)">
                        +
                    </button>

                    <button
                        onclick="changeStock(${product.id},-1)">
                        −
                    </button>

                </div>

            </div>

            `).join("");
    }

    const settings=
        getJSON(
            SETTINGS_KEY,
            {
                appName:"MY BAR",
                tableCount:12
            }
        );

    const countInput=
        document.getElementById(
            "tableCountInput"
        );

    if(countInput){
        countInput.value=
            settings.tableCount||12;
    }

    const appNameInput=
        document.getElementById(
            "appNameInput"
        );

    if(appNameInput){
        appNameInput.value=
            settings.appName||"MY BAR";
    }
}

/* =========================
   ADMIN ACTIONS
========================= */

function deleteWaiter(index){

    const users=
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    if(!users[index])return;

    if(users[index].username==="admin"){
        return;
    }

    users.splice(index,1);

    setJSON(
        USERS_KEY,
        users
    );

    renderAdmin();

    toast("Kamarieri u fshi.");
}

function saveTableCount(){

    const input=
        document.getElementById(
            "tableCountInput"
        );

    if(!input)return;

    const count=
        Math.max(
            1,
            Math.min(
                100,
                Number(input.value)||12
            )
        );

    const settings=
        getJSON(
            SETTINGS_KEY,
            {}
        );

    settings.tableCount=count;

    setJSON(
        SETTINGS_KEY,
        settings
    );

    initializeTables();

    renderTables();

    toast("Tavolinat u ruajtën.");
}

function saveAppName(){

    const input=
        document.getElementById(
            "appNameInput"
        );

    if(!input)return;

    const settings=
        getJSON(
            SETTINGS_KEY,
            {}
        );

    settings.appName=
        input.value.trim()||
        "MY BAR";

    setJSON(
        SETTINGS_KEY,
        settings
    );

    toast("Emri u ruajt.");
}

function changeAdminPassword(){

    const input=
        document.getElementById(
            "newAdminPassword"
        );

    if(!input)return;

    const password=
        input.value.trim();

    if(!password){

        toast(
            "Shkruaj password-in."
        );

        return;
    }

    const users=
        getJSON(
            USERS_KEY,
            DEFAULT_USERS
        );

    const admin=
        users.find(
            u=>u.username==="admin"
        );

    if(!admin)return;

    admin.password=password;

    setJSON(
        USERS_KEY,
        users
    );

    input.value="";

    toast(
        "Password-i u ndryshua."
    );
}

function changeStock(productId,amount){

    const current=
        getStock(productId);

    if(
        amount<0&&
        current<=0
    ){
        return;
    }

    changeStockValue(
        productId,
        amount
    );

    renderAdmin();
    renderMenu();
}

function changeStockValue(productId,amount){

    const stock=
        getJSON(
            INVENTORY_KEY,
            {}
        );

    stock[productId]=Math.max(
        0,
        Number(stock[productId]||0)+
        Number(amount)
    );

    setJSON(
        INVENTORY_KEY,
        stock
    );
}

/* =========================
   LOGOUT
========================= */

function logout(){

    localStorage.removeItem(
        SESSION_KEY
    );

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    window.location.href="./index.html";
}

/* =========================
   ROLE
========================= */

function applyRole(){

    const user=
        getCurrentUser();

    document
        .querySelectorAll(".admin-only")
        .forEach(element=>{

            element.style.display=
                user&&user.role==="admin"
                    ?""
                    :"none";
        });
}

/* =========================
   TOAST
========================= */

function toast(message){

    let box=
        document.getElementById(
            "myBarToast"
        );

    if(!box){

        box=
            document.createElement("div");

        box.id="myBarToast";

        box.style.position="fixed";
        box.style.bottom="25px";
        box.style.left="50%";
        box.style.transform=
            "translateX(-50%)";
        box.style.zIndex="99999";
        box.style.padding=
            "12px 18px";
        box.style.borderRadius=
            "10px";
        box.style.background=
            "#111";
        box.style.color=
            "#fff";
        box.style.border=
            "1px solid #d4af37";
        box.style.boxShadow=
            "0 10px 30px rgba(0,0,0,.5)";

        document.body.appendChild(box);
    }

    box.textContent=message;
    box.style.display="block";

    clearTimeout(
        window.myBarToastTimer
    );

    window.myBarToastTimer=
        setTimeout(()=>{
            box.style.display="none";
        },2200);
}

/* =========================
   CLOCK / MENU REFRESH
========================= */

function refreshTimeSensitiveMenu(){

    renderMenu();

    setTimeout(
        refreshTimeSensitiveMenu,
        60000
    );
}

/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        if(!checkSession()){
            return;
        }

        initializeApp();

        renderHeader();
        renderTables();
        renderMenu();
        renderOrder();
        updateDashboard();
        renderHistory();
        renderAdmin();
        applyRole();

        refreshTimeSensitiveMenu();

        setInterval(
            updateDashboard,
            30000
        );

        /*
          Nëse nuk është zgjedhur tavolinë,
          zgjedhim automatikisht të parën
          e lirë kur hapet faqja.
        */

        if(!getSelectedTable()){
            ensureTableSelected();
            renderTables();
            renderOrder();
        }

        console.log(
            "MY BAR loaded successfully."
        );
    }
);

/* =========================
   GLOBALS
========================= */

window.selectTable=selectTable;
window.renderMenu=renderMenu;
window.addProduct=addProduct;

window.changeOrderQuantity=
    changeOrderQuantity;

window.removeOrderItem=
    removeOrderItem;

window.openPayment=
    openPayment;

window.closePayment=
    closePayment;

window.completePayment=
    completePayment;

window.renderHistory=
    renderHistory;

window.renderAdmin=
    renderAdmin;

window.deleteWaiter=
    deleteWaiter;

window.saveTableCount=
    saveTableCount;

window.saveAppName=
    saveAppName;

window.changeAdminPassword=
    changeAdminPassword;

window.changeStock=
    changeStock;

window.logout=
    logout;

window.toast=
    toast;
