"use strict";

/* =========================
   STORAGE
========================= */

const USERS_KEY = "MYBAR_V2_USERS";
const PRODUCTS_KEY = "MYBAR_V2_PRODUCTS";
const TABLES_KEY = "MYBAR_V2_TABLES";
const INVOICES_KEY = "MYBAR_V2_INVOICES";
const STOCK_KEY = "MYBAR_V2_STOCK";
const SESSION_KEY = "MYBAR_V2_SESSION";
const SELECTED_TABLE_KEY = "MYBAR_V2_SELECTED";
const SHIFT_KEY = "MYBAR_V2_SHIFT";

/* =========================
   PRODUCTS
========================= */

const PRODUCTS = [
    ["Espresso","Kafe",100],
    ["Espresso Dopio","Kafe",150],
    ["Macchiato","Kafe",120],
    ["Cappuccino","Kafe",180],
    ["Latte","Kafe",200],
    ["Freddo Espresso","Kafe",200],
    ["Freddo Cappuccino","Kafe",220],
    ["Çaj","Kafe",120],

    ["Coca Cola","Pije Freskuese",150],
    ["Coca Cola Zero","Pije Freskuese",150],
    ["Fanta","Pije Freskuese",150],
    ["Sprite","Pije Freskuese",150],
    ["Schweppes","Pije Freskuese",150],
    ["Red Bull","Pije Freskuese",250],
    ["Fresh Orange","Pije Freskuese",250],
    ["Fresh Lemon","Pije Freskuese",250],

    ["Ujë 0.5L","Ujë",100],
    ["Ujë 0.75L","Ujë",150],
    ["Ujë 1.5L","Ujë",150],

    ["Birra Tirana","Birra",200],
    ["Birra Korça","Birra",200],
    ["Heineken","Birra",250],
    ["Corona","Birra",300],
    ["Tuborg","Birra",250],

    ["Jack Daniel's","Whisky",500],
    ["Johnnie Walker Red","Whisky",450],
    ["Johnnie Walker Black","Whisky",650],
    ["Chivas Regal","Whisky",700],

    ["Gordon's Gin","Gin",450],
    ["Bombay Sapphire","Gin",550],
    ["Hendrick's","Gin",800],

    ["Absolut Vodka","Vodka",450],
    ["Smirnoff","Vodka",450],
    ["Grey Goose","Vodka",800],

    ["Bacardi","Rum",450],
    ["Captain Morgan","Rum",500],

    ["Jose Cuervo","Tequila",500],
    ["Olmeca","Tequila",550],

    ["Baileys","Liqueur & Amaro",450],
    ["Jägermeister","Liqueur & Amaro",450],
    ["Aperol","Liqueur & Amaro",400],

    ["Verë e Kuqe","Verë",300],
    ["Verë e Bardhë","Verë",300],
    ["Prosecco","Verë",600],

    ["Mojito","Cocktails",600],
    ["Margarita","Cocktails",650],
    ["Aperol Spritz","Cocktails",650],
    ["Sex on the Beach","Cocktails",700],
    ["Long Island","Cocktails",800],

    ["Gin Tonic","Long Drinks",550],
    ["Vodka Red Bull","Long Drinks",600],
    ["Whisky Cola","Long Drinks",550],

    ["Shot Tequila","Shots",300],
    ["Shot Jägermeister","Shots",300],
    ["Shot Vodka","Shots",250],

    ["Patatina","Snacks",200],
    ["Kikirikë","Snacks",200],
    ["Ullinj","Snacks",250],
    ["Mix Nuts","Snacks",350]
].map((p,i)=>({
    id:i+1,
    name:p[0],
    category:p[1],
    price:p[2]
}));

/* =========================
   STORAGE HELPERS
========================= */

function read(key,fallback){
    try{
        const value=localStorage.getItem(key);
        return value===null
            ? fallback
            : JSON.parse(value);
    }catch{
        return fallback;
    }
}

function write(key,value){
    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

function money(value){
    return (
        Number(value)||0
    ).toLocaleString("sq-AL")+" L";
}

function esc(value){
    return String(value??"")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}

/* =========================
   TOAST
========================= */

function toast(message){

    let box=document.getElementById(
        "myBarToast"
    );

    if(!box){

        box=document.createElement("div");

        box.id="myBarToast";

        Object.assign(
            box.style,
            {
                position:"fixed",
                bottom:"22px",
                left:"50%",
                transform:"translateX(-50%)",
                background:"#101820",
                color:"#fff",
                border:"1px solid #147cff",
                padding:"13px 20px",
                borderRadius:"10px",
                zIndex:"999999",
                fontWeight:"700"
            }
        );

        document.body.appendChild(box);
    }

    box.textContent=message;
    box.style.display="block";

    clearTimeout(
        window.__toastTimer
    );

    window.__toastTimer=setTimeout(()=>{
        box.style.display="none";
    },2200);
}

/* =========================
   SESSION
========================= */

function session(){
    return read(
        SESSION_KEY,
        read("MY_BAR_SESSION",null)
    );
}

/* =========================
   INITIALIZE
========================= */

function initialize(){

    if(!localStorage.getItem(USERS_KEY)){

        write(
            USERS_KEY,
            [
                {
                    username:"admin",
                    password:"1234",
                    role:"admin",
                    name:"Administrator"
                },
                {
                    username:"kamarier",
                    password:"1234",
                    role:"waiter",
                    name:"Kamarier"
                }
            ]
        );
    }

    if(!localStorage.getItem(PRODUCTS_KEY)){
        write(
            PRODUCTS_KEY,
            PRODUCTS
        );
    }

    if(!localStorage.getItem(INVOICES_KEY)){
        write(
            INVOICES_KEY,
            []
        );
    }

    if(!localStorage.getItem(STOCK_KEY)){

        const stock={};

        PRODUCTS.forEach(p=>{
            stock[p.id]=20;
        });

        write(
            STOCK_KEY,
            stock
        );
    }

    if(!localStorage.getItem(TABLES_KEY)){

        const tables=[];

        for(let i=1;i<=12;i++){

            tables.push({
                id:i,
                name:"Tavolina "+i,
                items:[]
            });
        }

        write(
            TABLES_KEY,
            tables
        );
    }
}

/* =========================
   TABLES
========================= */

function tables(){
    return read(
        TABLES_KEY,
        []
    );
}

function selectedId(){
    return Number(
        localStorage.getItem(
            SELECTED_TABLE_KEY
        )||0
    );
}

function selectedTable(){

    const id=selectedId();

    return tables().find(
        t=>Number(t.id)===id
    )||null;
}

function selectTable(id){

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(id)
    );

    renderAll();

    showPage("newBill");
}

/* =========================
   STOCK
========================= */

function stock(id){

    const s=read(
        STOCK_KEY,
        {}
    );

    return Number(
        s[id]??0
    );
}

function changeStock(id,amount){

    const s=read(
        STOCK_KEY,
        {}
    );

    s[id]=Math.max(
        0,
        Number(s[id]||0)+Number(amount)
    );

    write(
        STOCK_KEY,
        s
    );
}

/* =========================
   BILL TOTAL
========================= */

function billTotal(table){

    if(
        !table||
        !Array.isArray(table.items)
    ){
        return 0;
    }

    return table.items.reduce(
        (sum,item)=>
            sum+
            Number(item.price||0)*
            Number(item.quantity||0),
        0
    );
}

/* =========================
   MENU
========================= */

let activeCategory="Të gjitha";

function renderMenu(){

    const grid=
        document.getElementById(
            "productGrid"
        );

    if(!grid)return;

    const products=read(
        PRODUCTS_KEY,
        PRODUCTS
    );

    const categories=[
        "Të gjitha",
        ...new Set(
            products.map(
                p=>p.category
            )
        )
    ];

    document.getElementById(
        "categoryBar"
    ).innerHTML=
        categories.map(cat=>`
            <button
                class="${
                    cat===activeCategory
                        ?"active"
                        :""
                }"
                onclick="setCategory('${esc(cat)}')"
            >
                ${esc(cat)}
            </button>
        `).join("");

    const search=
        document.getElementById(
            "productSearch"
        );

    const query=
        search
            ?search.value.toLowerCase().trim()
            :"";

    let filtered=products;

    if(activeCategory!=="Të gjitha"){

        filtered=filtered.filter(
            p=>p.category===activeCategory
        );
    }

    if(query){

        filtered=filtered.filter(
            p=>p.name
                .toLowerCase()
                .includes(query)
        );
    }

    grid.innerHTML=
        filtered.map(p=>{

            const available=
                stock(p.id);

            return `
                <button
                    class="product"
                    ${
                        available<=0
                            ?"disabled"
                            :""
                    }
                    onclick="addProduct(${p.id})"
                >
                    <strong>
                        ${esc(p.name)}
                    </strong>

                    <div class="price">
                        ${money(p.price)}
                    </div>

                    <small>
                        Stok: ${available}
                    </small>
                </button>
            `;
        }).join("");
}

function setCategory(category){

    activeCategory=category;

    renderMenu();
}

/* =========================
   ADD PRODUCT
========================= */

function addProduct(id){

    const table=
        selectedTable();

    if(!table){

        toast(
            "Zgjidh një tavolinë."
        );

        return;
    }

    const product=
        read(
            PRODUCTS_KEY,
            PRODUCTS
        ).find(
            p=>Number(p.id)===Number(id)
        );

    if(!product)return;

    const available=
        stock(product.id);

    if(available<=0){

        toast(
            "Nuk ka stok."
        );

        return;
    }

    if(!Array.isArray(table.items)){
        table.items=[];
    }

    const existing=
        table.items.find(
            i=>Number(i.productId)===Number(id)
        );

    if(existing){

        if(
            Number(existing.quantity)+1>
            available
        ){

            toast(
                "Nuk ka më stok."
            );

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

    write(
        TABLES_KEY,
        tables()
    );

    renderAll();

    toast(
        product.name+" u shtua."
    );
}

/* =========================
   QUANTITY
========================= */

function changeQuantity(index,amount){

    const all=tables();

    const id=selectedId();

    const table=
        all.find(
            t=>Number(t.id)===id
        );

    if(!table)return;

    const item=
        table.items[index];

    if(!item)return;

    const next=
        Number(item.quantity)+
        Number(amount);

    if(next<=0){

        table.items.splice(
            index,
            1
        );

    }else{

        if(
            next>
            stock(item.productId)
        ){

            toast(
                "Nuk ka mjaftueshëm stok."
            );

            return;
        }

        item.quantity=next;
    }

    write(
        TABLES_KEY,
        all
    );

    renderAll();
}

function removeItem(index){

    const all=tables();

    const table=
        all.find(
            t=>Number(t.id)===selectedId()
        );

    if(!table)return;

    table.items.splice(
        index,
        1
    );

    write(
        TABLES_KEY,
        all
    );

    renderAll();
}

/* =========================
   RENDER TABLES
========================= */

function renderTables(){

    const grid=
        document.getElementById(
            "tableGrid"
        );

    if(!grid)return;

    const all=tables();
    const selected=selectedId();

    grid.innerHTML=
        all.map(table=>{

            const total=
                billTotal(table);

            const active=
                table.items.length>0;

            return `
                <button
                    class="
                        table-card
                        ${
                            active
                                ?"active"
                                :""
                        }
                        ${
                            Number(table.id)===selected
                                ?"selected"
                                :""
                        }
                    "
                    onclick="selectTable(${table.id})"
                >
                    <strong>
                        ${esc(table.name)}
                    </strong>

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

    const text=
        document.getElementById(
            "selectedTableText"
        );

    const table=
        selectedTable();

    if(text){

        text.textContent=
            table
                ?table.name
                :"Zgjidh një tavolinë";
    }

    renderFullTables();
}

function renderFullTables(){

    const grid=
        document.getElementById(
            "tableGridFull"
        );

    if(!grid)return;

    grid.innerHTML=
        tables().map(t=>`

            <button
                class="table-card ${
                    t.items.length
                        ?"active"
                        :""
                }"
                onclick="selectTable(${t.id})"
            >
                <strong>
                    ${esc(t.name)}
                </strong>

                <span>
                    ${
                        t.items.length
                            ?money(billTotal(t))
                            :"E lirë"
                    }
                </span>
            </button>

        `).join("");
}

/* =========================
   BILL UI
========================= */

function renderBill(){

    const container=
        document.getElementById(
            "billItems"
        );

    const totalElement=
        document.getElementById(
            "billTotal"
        );

    const table=
        selectedTable();

    if(
        !table||
        !table.items||
        !table.items.length
    ){

        container.innerHTML=`
            <div class="empty">
                Nuk ka produkte në faturë.
            </div>
        `;

        totalElement.textContent="0 L";

        return;
    }

    container.innerHTML=
        table.items.map(
            (item,index)=>{

                const itemTotal=
                    Number(item.price)*
                    Number(item.quantity);

                return `
                    <div class="bill-item">

                        <div>
                            <strong>
                                ${esc(item.name)}
                            </strong>

                            <small>
                                ${money(item.price)}
                                ×
                                ${item.quantity}
                            </small>
                        </div>

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
            }
        ).join("");

    totalElement.textContent=
        money(
            billTotal(table)
        );
}

/* =========================
   PAYMENT
========================= */

function openPayment(method){

    const table=
        selectedTable();

    if(!table){

        toast(
            "Zgjidh një tavolinë."
        );

        return;
    }

    const total=
        billTotal(table);

    if(total<=0){

        toast(
            "Fatura është bosh."
        );

        return;
    }

    window.paymentMethod=
        method||"cash";

    document.getElementById(
        "paymentTotal"
    ).textContent=
        money(total);

    document.getElementById(
        "paymentModal"
    ).style.display="flex";
}

function closePayment(){

    document.getElementById(
        "paymentModal"
    ).style.display="none";
}

function completePayment(method){

    const all=tables();

    const id=selectedId();

    const table=
        all.find(
            t=>Number(t.id)===id
        );

    if(!table)return;

    const items=
        JSON.parse(
            JSON.stringify(
                table.items||[]
            )
        );

    const total=
        items.reduce(
            (sum,item)=>
                sum+
                Number(item.price||0)*
                Number(item.quantity||0),
            0
        );

    if(total<=0){

        toast(
            "Fatura është bosh."
        );

        return;
    }

    /*
       Check stock before payment.
    */

    for(const item of items){

        if(
            Number(item.quantity)>
            stock(item.productId)
        ){

            toast(
                "Stoku nuk mjafton për "+
                item.name
            );

            return;
        }
    }

    /*
       Remove stock.
    */

    for(const item of items){

        changeStock(
            item.productId,
            -Number(item.quantity)
        );
    }

    const current=session();

    const invoice={
        id:Date.now(),

        number:
            "INV-"+Date.now(),

        date:
            new Date().toISOString(),

        table:
            table.id,

        tableName:
            table.name,

        items:

            items,

        total:
            total,

        payment:
            method||"cash",

        waiterName:
            current
                ?current.name
                :"Pa emër"
    };

    const invoices=
        read(
            INVOICES_KEY,
            []
        );

    invoices.push(invoice);

    write(
        INVOICES_KEY,
        invoices
    );

    /*
       Clear table only AFTER
       invoice has been saved.
    */

    table.items=[];

    write(
        TABLES_KEY,
        all
    );

    closePayment();

    showInvoice(invoice);

    localStorage.removeItem(
        SELECTED_TABLE_KEY
    );

    renderAll();

    toast(
        "Pagesa u krye: "+
        money(total)
    );
}

/* =========================
   CLOSE TABLE
========================= */

function openCloseTable(){

    const table=
        selectedTable();

    if(!table){

        toast(
            "Zgjidh një tavolinë."
        );

        return;
    }

    const total=
        billTotal(table);

    if(total<=0){

        toast(
            "Tavolina është bosh."
        );

        return;
    }

    document.getElementById(
        "closeTableTotal"
    ).textContent=
        money(total);

    document.getElementById(
        "closeTableModal"
    ).style.display="flex";
}

function closeCloseTable(){

    document.getElementById(
        "closeTableModal"
    ).style.display="none";
}

function confirmCloseTable(){

    closeCloseTable();

    completePayment("cash");
}

/* =========================
   TRANSFER
========================= */

function openTransfer(){

    const source=
        selectedTable();

    if(!source){

        toast(
            "Zgjidh një tavolinë."
        );

        return;
    }

    if(!source.items.length){

        toast(
            "Fatura është bosh."
        );

        return;
    }

    const select=
        document.getElementById(
            "transferTableSelect"
        );

    select.innerHTML=
        tables()
            .filter(
                t=>t.id!==source.id
            )
            .map(
                t=>`
                    <option value="${t.id}">
                        ${esc(t.name)}
                    </option>
                `
            )
            .join("");

    document.getElementById(
        "transferModal"
    ).style.display="flex";
}

function closeTransfer(){

    document.getElementById(
        "transferModal"
    ).style.display="none";
}

function confirmTransfer(){

    const source=
        selectedTable();

    const targetId=
        Number(
            document.getElementById(
                "transferTableSelect"
            ).value
        );

    const all=tables();

    const target=
        all.find(
            t=>Number(t.id)===targetId
        );

    if(
        !source||
        !target
    ){

        toast(
            "Tavolina nuk u gjet."
        );

        return;
    }

    if(target.id===source.id){

        toast(
            "Zgjidh një tavolinë tjetër."
        );

        return;
    }

    if(!Array.isArray(target.items)){
        target.items=[];
    }

    source.items.forEach(item=>{

        const existing=
            target.items.find(
                x=>
                    Number(x.productId)===
                    Number(item.productId)
            );

        if(existing){

            existing.quantity+=
                Number(item.quantity);

        }else{

            target.items.push(
                JSON.parse(
                    JSON.stringify(item)
                )
            );
        }
    });

    source.items=[];

    write(
        TABLES_KEY,
        all
    );

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(target.id)
    );

    closeTransfer();

    renderAll();

    toast(
        "Fatura u transferua."
    );
}

/* =========================
   INVOICES
========================= */

function renderInvoices(){

    const list=
        document.getElementById(
            "invoiceList"
        );

    if(!list)return;

    const invoices=
        read(
            INVOICES_KEY,
            []
        );

    if(!invoices.length){

        list.innerHTML=`
            <div class="empty">
                Nuk ka fatura.
            </div>
        `;

        return;
    }

    list.innerHTML=
        [...invoices]
            .reverse()
            .map(
                invoice=>`
                    <div class="row">

                        <div>
                            <strong>
                                ${esc(invoice.number)}
                            </strong>

                            <small>
                                ${esc(invoice.tableName)}
                                •
                                ${esc(invoice.waiterName)}
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
                                ${money(invoice.total)}
                            </strong>

                            <small>
                                ${esc(invoice.payment)}
                            </small>
                        </div>

                    </div>
                `
            )
            .join("");
}

/* =========================
   CASH
========================= */

function renderCash(){

    const invoices=
        read(
            INVOICES_KEY,
            []
        );

    const today=
        new Date();

    const todayInvoices=
        invoices.filter(i=>{

            const d=
                new Date(i.date);

            return(
                d.getFullYear()===
                today.getFullYear()&&
                d.getMonth()===
                today.getMonth()&&
                d.getDate()===
                today.getDate()
            );
        });

    const total=
        todayInvoices.reduce(
            (s,i)=>
                s+Number(i.total||0),
            0
        );

    const cash=
        todayInvoices
            .filter(
                i=>i.payment==="cash"
            )
            .reduce(
                (s,i)=>
                    s+Number(i.total||0),
                0
            );

    const card=
        todayInvoices
            .filter(
                i=>i.payment==="card"
            )
            .reduce(
                (s,i)=>
                    s+Number(i.total||0),
                0
            );

    document.getElementById(
        "cashSummary"
    ).innerHTML=`

        <div class="row">
            <strong>SHITJE SOT</strong>
            <strong>${money(total)}</strong>
        </div>

        <div class="row">
            <strong>CASH</strong>
            <strong>${money(cash)}</strong>
        </div>

        <div class="row">
            <strong>CARD</strong>
            <strong>${money(card)}</strong>
        </div>

        <div class="row">
            <strong>FATURA</strong>
            <strong>${todayInvoices.length}</strong>
        </div>

    `;
}

/* =========================
   SHIFT
========================= */

function renderShift(){

    const box=
        document.getElementById(
            "shiftContent"
        );

    if(!box)return;

    const shift=
        read(
            SHIFT_KEY,
            null
        );

    if(!shift){

        box.innerHTML=`

            <div class="row">
                <div>
                    <strong>
                        Turni i mbyllur
                    </strong>

                    <small>
                        Hap turnin për të filluar.
                    </small>
                </div>

                <button
                    class="primary"
                    onclick="openShift()"
                >
                    HAP TURNIN
                </button>
            </div>

        `;

        return;
    }

    box.innerHTML=`

        <div class="row">

            <div>
                <strong>
                    TURNI I HAPUR
                </strong>

                <small>
                    Hapur:
                    ${
                        new Date(
                            shift.openedAt
                        ).toLocaleString(
                            "sq-AL"
                        )
                    }
                </small>
            </div>

            <button
                class="primary"
                onclick="closeShift()"
            >
                MBYLL TURNIN
            </button>

        </div>

    `;
}

function openShift(){

    if(
        read(
            SHIFT_KEY,
            null
        )
    ){

        toast(
            "Turni është tashmë i hapur."
        );

        return;
    }

    const current=session();

    write(
        SHIFT_KEY,
        {
            id:Date.now(),

            openedAt:
                new Date().toISOString(),

            openedBy:
                current
                    ?current.name
                    :"Pa emër"
        }
    );

    renderAll();

    toast(
        "Turni u hap."
    );
}

function closeShift(){

    if(
        !read(
            SHIFT_KEY,
            null
        )
    ){

        toast(
            "Nuk ka turn të hapur."
        );

        return;
    }

    localStorage.removeItem(
        SHIFT_KEY
    );

    renderAll();

    toast(
        "Turni u mbyll."
    );
}

/* =========================
   FISCAL
========================= */

function fiscalizeSelected(){

    const table=
        selectedTable();

    if(!table){

        toast(
            "Zgjidh një tavolinë."
        );

        return;
    }

    if(!table.items.length){

        toast(
            "Fatura është bosh."
        );

        return;
    }

    toast(
        "Fatura u përgatit. Fiskalizimi real kërkon backend zyrtar."
    );
}

/* =========================
   INVOICE MODAL
========================= */

let currentInvoice=null;

function showInvoice(invoice){

    currentInvoice=invoice;

    document.getElementById(
        "invoiceNumber"
    ).textContent=
        invoice.number;

    document.getElementById(
        "invoiceDate"
    ).textContent=
        new Date(
            invoice.date
        ).toLocaleString(
            "sq-AL"
        );

    document.getElementById(
        "invoiceTable"
    ).textContent=
        invoice.tableName;

    document.getElementById(
        "invoiceWaiter"
    ).textContent=
        invoice.waiterName;

    document.getElementById(
        "invoiceTotal"
    ).textContent=
        money(invoice.total);

    document.getElementById(
        "invoiceItems"
    ).innerHTML=
        invoice.items.map(
            item=>`
                <div class="row">
                    <span>
                        ${esc(item.name)}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${money(
                            item.price*
                            item.quantity
                        )}
                    </strong>
                </div>
            `
        ).join("");

    document.getElementById(
        "invoiceModal"
    ).style.display="flex";
}

function closeInvoice(){

    document.getElementById(
        "invoiceModal"
    ).style.display="none";
}

function printCurrentInvoice(){

    if(!currentInvoice)return;

    const invoice=currentInvoice;

    const popup=
        window.open(
            "",
            "_blank",
            "width=500,height=700"
        );

    if(!popup){

        toast(
            "Lejo popup për printim."
        );

        return;
    }

    popup.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${invoice.number}</title>

            <style>
                body{
                    font-family:Arial;
                    padding:25px;
                }

                h1{
                    text-align:center;
                }

                .line{
                    display:flex;
                    justify-content:space-between;
                    margin:8px 0;
                }

                hr{
                    margin:15px 0;
                }
            </style>
        </head>

        <body>

            <h1>MY BAR</h1>

            <p>
                ${invoice.number}
            </p>

            <p>
                ${new Date(
                    invoice.date
                ).toLocaleString("sq-AL")}
            </p>

            <p>
                ${esc(invoice.tableName)}
            </p>

            <hr>

            ${
                invoice.items.map(
                    item=>`
                        <div class="line">
                            <span>
                                ${esc(item.name)}
                                ×${item.quantity}
                            </span>

                            <strong>
                                ${money(
                                    item.price*
                                    item.quantity
                                )}
                            </strong>
                        </div>
                    `
                ).join("")
            }

            <hr>

            <h2>
                TOTAL:
                ${money(invoice.total)}
            </h2>

            <p>
                Pagesa:
                ${esc(invoice.payment)}
            </p>

            <script>
                window.onload=function(){
                    window.print();
                };
            <\/script>

        </body>
        </html>
    `);

    popup.document.close();
}

/* =========================
   NAVIGATION
========================= */

function showPage(page){

    document.querySelectorAll(
        ".page"
    ).forEach(
        p=>p.classList.remove("active")
    );

    document.querySelectorAll(
        ".nav button"
    ).forEach(
        b=>b.classList.remove("active")
    );

    const target=
        document.getElementById(
            page+"Page"
        );

    if(target){
        target.classList.add("active");
    }

    const button=
        document.querySelector(
            `.nav button[data-page="${page}"]`
        );

    if(button){
        button.classList.add("active");
    }

    if(page==="tables"){
        renderFullTables();
    }

    if(page==="invoices"){
        renderInvoices();
    }

    if(page==="cash"){
        renderCash();
    }

    if(page==="shift"){
        renderShift();
    }
}

function startNewBill(){

    showPage(
        "newBill"
    );

    const table=
        selectedTable();

    if(!table){

        const first=
            tables()[0];

        if(first){
            selectTable(first.id);
        }
    }
}

/* =========================
   LOCK
========================= */

function lockScreen(){

    document.getElementById(
        "lockModal"
    ).style.display="flex";
}

function unlockScreen(){

    const password=
        document.getElementById(
            "lockPassword"
        ).value;

    const current=
        session();

    if(!current){

        toast(
            "Nuk ka përdorues aktiv."
        );

        return;
    }

    const users=
        read(
            USERS_KEY,
            []
        );

    const user=
        users.find(
            u=>
                String(
                    u.username
                ).toLowerCase()===
                String(
                    current.username
                ).toLowerCase()
        );

    if(
        user&&
        String(user.password)===
        String(password)
    ){

        document.getElementById(
            "lockPassword"
        ).value="";

        document.getElementById(
            "lockModal"
        ).style.display="none";

        toast(
            "MY BAR u zhbllokua."
        );

    }else{

        toast(
            "Fjalëkalim i gabuar."
        );
    }
}

/* =========================
   LOGOUT
========================= */

function logout(){

    localStorage.removeItem(
        SESSION_KEY
    );

    localStorage.removeItem(
        "MY_BAR_SESSION"
    );

    localStorage.removeItem(
        "barCurrentUser"
    );

    location.href=
        "login.html";
}

/* =========================
   RENDER ALL
========================= */

function renderAll(){

    renderTables();
    renderMenu();
    renderBill();
    renderInvoices();
    renderCash();
    renderShift();
}

/* =========================
   SEARCH
========================= */

function setupSearch(){

    const input=
        document.getElementById(
            "productSearch"
        );

    if(!input)return;

    input.addEventListener(
        "input",
        renderMenu
    );
}

/* =========================
   EVENTS
========================= */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        initialize();

        document.querySelectorAll(
            ".nav button"
        ).forEach(button=>{

            button.addEventListener(
                "click",
                ()=>{

                    showPage(
                        button.dataset.page
                    );
                }
            );
        });

        setupSearch();

        renderAll();

        console.log(
            "MY BAR V2 READY"
        );
    }
);

/* =========================
   GLOBALS
========================= */

window.startNewBill=startNewBill;
window.showPage=showPage;

window.selectTable=selectTable;

window.setCategory=setCategory;
window.renderMenu=renderMenu;

window.addProduct=addProduct;
window.changeQuantity=changeQuantity;
window.removeItem=removeItem;

window.openPayment=openPayment;
window.closePayment=closePayment;
window.completePayment=completePayment;

window.openCloseTable=openCloseTable;
window.closeCloseTable=closeCloseTable;
window.confirmCloseTable=confirmCloseTable;

window.openTransfer=openTransfer;
window.closeTransfer=closeTransfer;
window.confirmTransfer=confirmTransfer;

window.openShift=openShift;
window.closeShift=closeShift;

window.fiscalizeSelected=
    fiscalizeSelected;

window.closeInvoice=closeInvoice;
window.printCurrentInvoice=
    printCurrentInvoice;

window.lockScreen=lockScreen;
window.unlockScreen=unlockScreen;

window.logout=logout;

window.renderAll=renderAll;
