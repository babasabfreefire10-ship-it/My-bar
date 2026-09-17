"use strict";

/* =========================
   MY BAR V2
   PC STYLE / TOUCH SAFE
========================= */

const KEYS = {
  users: "barUsersV4",
  products: "barProductsV4",
  invoices: "barInvoicesV4",
  tables: "barTablesV5",
  tableCount: "barTableCountV4",
  currentUser: "barCurrentUserV4",
  appName: "barAppNameV4"
};

const DEFAULT_PRODUCTS = [
  ["Espresso","Kafe",100],
  ["Macchiato","Kafe",120],
  ["Cappuccino","Kafe",150],
  ["Americano","Kafe",130],
  ["Ujë","Pije",80],
  ["Coca Cola","Pije",150],
  ["Fanta","Pije",150],
  ["Sprite","Pije",150],
  ["Red Bull","Pije",250],
  ["Birrë","Alkool",200],
  ["Verë","Alkool",300],
  ["Vodka","Alkool",350],
  ["Pizza","Ushqim",500],
  ["Burger","Ushqim",450],
  ["Patate","Ushqim",250]
];

let state = {
  currentSection: "dashboard",
  selectedTable: null,
  category: "Të gjitha",
  search: "",
  order: []
};

function get(key, fallback){
  try{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  }catch{
    return fallback;
  }
}

function set(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function money(value){
  return Number(value || 0).toLocaleString("sq-AL") + " L";
}

function toast(message){
  const el = document.getElementById("toast");
  if(!el) return;

  el.textContent = message;
  el.classList.add("show");

  clearTimeout(window.__toastTimer);

  window.__toastTimer = setTimeout(()=>{
    el.classList.remove("show");
  },2200);
}

/* =========================
   DEFAULT DATA
========================= */

function ensureData(){

  if(!localStorage.getItem(KEYS.users)){
    set(KEYS.users,[
      {
        username:"admin",
        password:"1234",
        role:"admin",
        name:"Administrator"
      },
      {
        username:"kamarier1",
        password:"1234",
        role:"waiter",
        name:"Kamarier 1"
      }
    ]);
  }

  if(!localStorage.getItem(KEYS.products)){

    const products = DEFAULT_PRODUCTS.map((p,i)=>({
      id:"p"+(i+1),
      name:p[0],
      category:p[1],
      price:p[2],
      image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80"
    }));

    set(KEYS.products,products);
  }

  if(!localStorage.getItem(KEYS.invoices)){
    set(KEYS.invoices,[]);
  }

  if(!localStorage.getItem(KEYS.tableCount)){
    set(KEYS.tableCount,12);
  }

  if(!localStorage.getItem(KEYS.tables)){
    createTables(12);
  }

  if(!localStorage.getItem(KEYS.appName)){
    set(KEYS.appName,"MY BAR");
  }
}

function createTables(count){

  const tables = [];

  for(let i=1;i<=count;i++){
    tables.push({
      id:"table-"+i,
      number:i,
      items:[],
      total:0
    });
  }

  set(KEYS.tables,tables);
}

/* =========================
   CURRENT USER
========================= */

function getCurrentUser(){
  return get(KEYS.currentUser,null);
}

function isAdmin(){
  const user = getCurrentUser();
  return user && user.role === "admin";
}

function checkLogin(){

  const user = getCurrentUser();

  if(!user){
    window.location.href="login.html";
    return false;
  }

  return true;
}

/* =========================
   NAVIGATION
========================= */

function showSection(section){

  const restricted = ["cash","history","admin"];

  if(restricted.includes(section) && !isAdmin()){
    toast("Kjo pjesë është vetëm për administratorin.");
    return;
  }

  document.querySelectorAll(".section").forEach(el=>{
    el.classList.remove("active");
  });

  const target = document.getElementById(section);

  if(target){
    target.classList.add("active");
  }

  document.querySelectorAll(".nav-btn").forEach(btn=>{
    btn.classList.toggle(
      "active",
      btn.dataset.section === section
    );
  });

  state.currentSection = section;

  if(section==="dashboard") renderDashboard();
  if(section==="tables") renderTables();
  if(section==="menu") renderMenu();
  if(section==="orders") renderOrder();
  if(section==="cash") renderCash();
  if(section==="history") renderHistory();
  if(section==="admin") renderAdmin();
}

/* =========================
   TABLES
========================= */

function getTables(){
  return get(KEYS.tables,[]);
}

function saveTables(tables){
  set(KEYS.tables,tables);
}

function getSelectedTable(){
  return getTables().find(t=>t.id===state.selectedTable) || null;
}

function selectTable(id){

  state.selectedTable = id;

  const table = getTables().find(t=>t.id===id);

  if(!table) return;

  saveTables(getTables());

  showSection("menu");

  updateSelectedTableUI();

  toast("Tavolina "+table.number+" u zgjodh.");
}

function updateSelectedTableUI(){

  const table = getSelectedTable();

  const menuText = document.getElementById("menuSelectedTable");
  const orderText = document.getElementById("selectedTableText");

  if(table){
    if(menuText) menuText.textContent = "#"+table.number;
    if(orderText) orderText.textContent =
      "Tavolina #"+table.number;
  }else{
    if(menuText) menuText.textContent = "Asnjë";
    if(orderText) orderText.textContent =
      "Zgjidh një tavolinë";
  }
}

function renderTables(){

  const grid = document.getElementById("tableGrid");
  if(!grid) return;

  const tables = getTables();

  grid.innerHTML = "";

  tables.forEach(table=>{

    const busy = table.items && table.items.length > 0;

    const card = document.createElement("div");
    card.className = "table-card"+(busy?" busy":"");

    card.innerHTML = `
      <div>
        <div class="table-number">#${table.number}</div>
        <div class="table-status">
          ${busy ? "E ZËNË" : "E LIRË"}
        </div>
      </div>

      <div class="table-total">
        ${busy ? money(table.total) : "—"}
      </div>

      <button class="table-open">
        ${busy ? "HAP POROSINË" : "HAP TAVOLINË"}
      </button>
    `;

    card.querySelector(".table-open")
      .addEventListener("click",e=>{
        e.stopPropagation();
        selectTable(table.id);
      });

    card.addEventListener("click",()=>{
      selectTable(table.id);
    });

    grid.appendChild(card);
  });
}

function renderDashboardTables(){

  const box = document.getElementById("dashboardTables");
  if(!box) return;

  box.innerHTML="";

  getTables().slice(0,6).forEach(table=>{

    const busy = table.items && table.items.length;

    const el = document.createElement("button");

    el.className="mini-table"+(busy?" busy":"");

    el.innerHTML=`
      <b>#${table.number}</b>
      <small>${busy ? money(table.total) : "E lirë"}</small>
    `;

    el.addEventListener("click",()=>{
      selectTable(table.id);
    });

    box.appendChild(el);
  });
}

/* =========================
   PRODUCTS / MENU
========================= */

function getProducts(){
  return get(KEYS.products,[]);
}

function renderCategories(){

  const box = document.getElementById("categories");
  if(!box) return;

  const products = getProducts();

  const cats = [
    "Të gjitha",
    ...new Set(products.map(p=>p.category))
  ];

  box.innerHTML="";

  cats.forEach(cat=>{

    const btn=document.createElement("button");

    btn.className=
      "category-btn"+
      (state.category===cat?" active":"");

    btn.textContent=cat;

    btn.addEventListener("click",()=>{
      state.category=cat;
      renderMenu();
    });

    box.appendChild(btn);
  });
}

function renderMenu(){

  renderCategories();

  const grid=document.getElementById("menuGrid");

  if(!grid) return;

  const products=getProducts();

  const filtered=products.filter(product=>{

    const categoryOK =
      state.category==="Të gjitha" ||
      product.category===state.category;

    const searchOK =
      product.name
        .toLowerCase()
        .includes(state.search.toLowerCase());

    return categoryOK && searchOK;
  });

  grid.innerHTML="";

  filtered.forEach(product=>{

    const card=document.createElement("div");
    card.className="product-card";

    card.innerHTML=`
      <img
        class="product-img"
        src="${product.image}"
        alt="${product.name}"
        onerror="this.style.display='none'"
      >

      <div class="product-body">
        <div class="product-category">
          ${product.category}
        </div>

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-bottom">
          <span class="product-price">
            ${money(product.price)}
          </span>

          <button class="add-product">
            +
          </button>
        </div>
      </div>
    `;

    card.querySelector(".add-product")
      .addEventListener("click",e=>{
        e.stopPropagation();
        addProduct(product.id);
      });

    grid.appendChild(card);
  });

  updateSelectedTableUI();
}

function addProduct(productId){

  const table=getSelectedTable();

  if(!table){
    toast("Zgjidh fillimisht një tavolinë.");
    showSection("tables");
    return;
  }

  const product=getProducts().find(p=>p.id===productId);

  if(!product) return;

  const existing=table.items.find(
    item=>item.productId===productId
  );

  if(existing){
    existing.qty++;
  }else{
    table.items.push({
      productId:product.id,
      name:product.name,
      price:product.price,
      qty:1
    });
  }

  table.total=calculateTableTotal(table);

  const tables=getTables();
  const index=tables.findIndex(t=>t.id===table.id);

  tables[index]=table;
  saveTables(tables);

  toast(product.name+" u shtua.");

  renderMenu();
  renderOrder();
  renderTables();
  renderDashboardTables();
}

function calculateTableTotal(table){

  return (table.items||[]).reduce(
    (sum,item)=>sum+(item.price*item.qty),
    0
  );
}

/* =========================
   ORDER
========================= */

function renderOrder(){

  const table=getSelectedTable();
  const box=document.getElementById("orderItems");

  if(!box) return;

  updateSelectedTableUI();

  if(!table){

    box.innerHTML=`
      <div class="empty">
        Zgjidh një tavolinë për të parë porosinë.
      </div>
    `;

    updateOrderTotals(0);
    return;
  }

  if(!table.items.length){

    box.innerHTML=`
      <div class="empty">
        Nuk ka produkte në porosi.
      </div>
    `;

    updateOrderTotals(0);
    return;
  }

  box.innerHTML="";

  table.items.forEach(item=>{

    const row=document.createElement("div");
    row.className="order-row";

    row.innerHTML=`
      <div>
        <div class="order-name">${item.name}</div>
        <small class="muted">
          ${money(item.price)} / copë
        </small>
      </div>

      <div class="order-price">
        ${money(item.price*item.qty)}
      </div>

      <div class="qty">
        <button class="minus">−</button>
        <b>${item.qty}</b>
        <button class="plus">+</button>
      </div>

      <button class="remove">×</button>
    `;

    row.querySelector(".minus")
      .addEventListener("click",()=>{
        changeQty(item.productId,-1);
      });

    row.querySelector(".plus")
      .addEventListener("click",()=>{
        changeQty(item.productId,1);
      });

    row.querySelector(".remove")
      .addEventListener("click",()=>{
        removeItem(item.productId);
      });

    box.appendChild(row);
  });

  updateOrderTotals(table.total);
}

function updateOrderTotals(subtotal){

  const service=0;
  const total=subtotal+service;

  const sub=document.getElementById("orderSubtotal");
  const srv=document.getElementById("orderService");
  const tot=document.getElementById("orderTotal");

  if(sub) sub.textContent=money(subtotal);
  if(srv) srv.textContent=money(service);
  if(tot) tot.textContent=money(total);
}

function changeQty(productId,amount){

  const table=getSelectedTable();

  if(!table) return;

  const item=table.items.find(
    i=>i.productId===productId
  );

  if(!item) return;

  item.qty+=amount;

  if(item.qty<=0){
    table.items=table.items.filter(
      i=>i.productId!==productId
    );
  }

  table.total=calculateTableTotal(table);

  saveTables(getTables());

  renderOrder();
  renderTables();
  renderDashboardTables();
}

function removeItem(productId){

  const table=getSelectedTable();

  if(!table) return;

  table.items=table.items.filter(
    i=>i.productId!==productId
  );

  table.total=calculateTableTotal(table);

  saveTables(getTables());

  renderOrder();
  renderTables();
  renderDashboardTables();

  toast("Produkti u hoq.");
}

function clearOrder(){

  const table=getSelectedTable();

  if(!table) return;

  if(!table.items.length){
    toast("Porosia është bosh.");
    return;
  }

  if(!confirm("Dëshiron të fshish të gjithë porosinë?")){
    return;
  }

  table.items=[];
  table.total=0;

  saveTables(getTables());

  renderOrder();
  renderTables();
  renderDashboardTables();

  toast("Porosia u pastrua.");
}

/* =========================
   PAYMENT
========================= */

function openPayment(){

  const table=getSelectedTable();

  if(!table || !table.items.length){
    toast("Nuk ka porosi për pagesë.");
    return;
  }

  document
    .getElementById("paymentModal")
    .classList.add("show");
}

function closeModal(id){
  const modal=document.getElementById(id);
  if(modal) modal.classList.remove("show");
}

function pay(method){

  const table=getSelectedTable();

  if(!table || !table.items.length){
    toast("Porosia është bosh.");
    closeModal("paymentModal");
    return;
  }

  const invoices=get(KEYS.invoices,[]);

  const invoice={
    id:"INV-"+Date.now(),
    createdAt:new Date().toISOString(),
    tableId:table.id,
    tableName:"#"+table.number,
    items:table.items,
    total:table.total,
    amount:table.total,
    grandTotal:table.total,
    paymentMethod:method,
    payment:method,
    method:method
  };

  invoices.push(invoice);
  set(KEYS.invoices,invoices);

  const tables=getTables();
  const index=tables.findIndex(t=>t.id===table.id);

  tables[index]={
    ...tables[index],
    items:[],
    total:0
  };

  saveTables(tables);

  closeModal("paymentModal");

  renderAll();

  openInvoice(invoice);

  toast("Pagesa u regjistrua.");
}

/* =========================
   INVOICE
========================= */

function openInvoice(invoice){

  const box=document.getElementById("invoiceContent");

  const rows=(invoice.items||[])
    .map(item=>`
      <div class="invoice-line">
        <span>${item.name} × ${item.qty}</span>
        <b>${money(item.price*item.qty)}</b>
      </div>
    `)
    .join("");

  box.innerHTML=`
    <div class="invoice-head">
      <h2>MY BAR</h2>
      <div>FATURË</div>
      <small>${invoice.id}</small>
    </div>

    <div class="invoice-line">
      <span>Tavolina</span>
      <b>${invoice.tableName}</b>
    </div>

    ${rows}

    <div class="invoice-total">
      <span>TOTAL</span>
      <strong>${money(invoice.total)}</strong>
    </div>

    <div class="invoice-line">
      <span>Pagesa</span>
      <b>${invoice.paymentMethod}</b>
    </div>
  `;

  document
    .getElementById("invoiceModal")
    .classList.add("show");
}

/* =========================
   DASHBOARD
========================= */

function todayInvoices(){

  const invoices=get(KEYS.invoices,[]);

  const now=new Date();

  return invoices.filter(invoice=>{

    const date=new Date(invoice.createdAt);

    return date.toDateString()===now.toDateString();
  });
}

function renderDashboard(){

  const invoices=todayInvoices();

  const sales=invoices.reduce(
    (sum,i)=>sum+Number(i.total||0),
    0
  );

  const card=invoices
    .filter(i=>i.paymentMethod==="KARTË")
    .reduce(
      (sum,i)=>sum+Number(i.total||0),
      0
    );

  const active=getTables()
    .filter(t=>t.items&&t.items.length)
    .length;

  document.getElementById("salesToday").textContent=money(sales);
  document.getElementById("activeTables").textContent=active;
  document.getElementById("invoiceToday").textContent=invoices.length;
  document.getElementById("cardToday").textContent=money(card);

  renderDashboardTables();

  const date=document.getElementById("todayDate");

  if(date){
    date.textContent=new Date().toLocaleDateString(
      "sq-AL",
      {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
      }
    );
  }
}

/* =========================
   CASH
========================= */

function renderCash(){

  const invoices=todayInvoices();

  const total=invoices.reduce(
    (sum,i)=>sum+Number(i.total||0),
    0
  );

  const cash=invoices
    .filter(i=>i.paymentMethod==="CASH")
    .reduce(
      (sum,i)=>sum+Number(i.total||0),
      0
    );

  const card=invoices
    .filter(i=>i.paymentMethod==="KARTË")
    .reduce(
      (sum,i)=>sum+Number(i.total||0),
      0
    );

  document.getElementById("cashTotal").textContent=money(total);
  document.getElementById("cashMoney").textContent=money(cash);
  document.getElementById("cashCard").textContent=money(card);
  document.getElementById("cashInvoices").textContent=invoices.length;

  const list=document.getElementById("paymentsList");

  list.innerHTML="";

  invoices.slice().reverse().forEach(invoice=>{

    const row=document.createElement("div");
    row.className="payment-row";

    row.innerHTML=`
      <div>
        <b>${invoice.id}</b>
        <div class="muted">${invoice.tableName}</div>
      </div>

      <b>${money(invoice.total)}</b>

      <span>${invoice.paymentMethod}</span>
    `;

    list.appendChild(row);
  });

  if(!invoices.length){
    list.innerHTML='<div class="empty">Nuk ka pagesa sot.</div>';
  }
}

/* =========================
   HISTORY
========================= */

function renderHistory(){

  const invoices=get(KEYS.invoices,[]);
  const box=document.getElementById("historyList");

  box.innerHTML="";

  invoices.slice().reverse().forEach(invoice=>{

    const row=document.createElement("div");
    row.className="history-row";

    row.innerHTML=`
      <div>
        <b>${invoice.id}</b>
        <div class="muted">
          ${new Date(invoice.createdAt).toLocaleString("sq-AL")}
        </div>
      </div>

      <span>${invoice.tableName}</span>

      <span>${invoice.paymentMethod}</span>

      <b>${money(invoice.total)}</b>
    `;

    box.appendChild(row);
  });

  if(!invoices.length){
    box.innerHTML='<div class="empty">Nuk ka histori.</div>';
  }
}

function deleteHistory(){

  if(!confirm("Dëshiron të fshish të gjithë historikun?")){
    return;
  }

  set(KEYS.invoices,[]);

  renderAll();

  toast("Historiku u fshi.");
}

/* =========================
   ADMIN
========================= */

function renderAdmin(){

  const name=get(KEYS.appName,"MY BAR");

  document.getElementById("appNameInput").value=name;

  document.getElementById("tableCountInput").value=
    get(KEYS.tableCount,12);

  renderUsers();
  renderAdminProducts();
}

function renderUsers(){

  const box=document.getElementById("usersList");
  const users=get(KEYS.users,[]);

  box.innerHTML="";

  users.forEach(user=>{

    const row=document.createElement("div");
    row.className="user-row";

    row.innerHTML=`
      <div>
        <b>${user.name}</b>
        <div class="muted">
          ${user.username} · ${user.role}
        </div>
      </div>
    `;

    box.appendChild(row);
  });
}

function renderAdminProducts(){

  const box=document.getElementById("adminProducts");
  const products=getProducts();

  box.innerHTML="";

  products.forEach(product=>{

    const row=document.createElement("div");
    row.className="admin-product-row";

    row.innerHTML=`
      <div>
        <b>${product.name}</b>
        <div class="muted">${product.category}</div>
      </div>

      <b>${money(product.price)}</b>
    `;

    box.appendChild(row);
  });
}

function saveAppName(){

  const input=document.getElementById("appNameInput");
  const value=input.value.trim();

  if(!value){
    toast("Vendos një emër.");
    return;
  }

  set(KEYS.appName,value);

  document.title=value;

  toast("Emri u ruajt.");
}

function saveTableCount(){

  const input=document.getElementById("tableCountInput");
  let count=Number(input.value);

  if(count<1) count=1;
  if(count>100) count=100;

  set(KEYS.tableCount,count);

  const old=getTables();
  const tables=[];

  for(let i=1;i<=count;i++){

    const existing=old.find(
      t=>t.number===i
    );

    tables.push(
      existing || {
        id:"table-"+i,
        number:i,
        items:[],
        total:0
      }
    );
  }

  saveTables(tables);

  renderAll();

  toast("Tavolinat u përditësuan.");
}

function saveAdminPassword(){

  const password=
    document.getElementById("newAdminPassword").value.trim();

  if(password.length<4){
    toast("Fjalëkalimi duhet të ketë të paktën 4 karaktere.");
    return;
  }

  const users=get(KEYS.users,[]);
  const admin=users.find(u=>u.role==="admin");

  if(admin){
    admin.password=password;
  }

  set(KEYS.users,users);

  document.getElementById("newAdminPassword").value="";

  toast("Fjalëkalimi u ndryshua.");
}

function backup(){

  const data={
    users:get(KEYS.users,[]),
    products:get(KEYS.products,[]),
    invoices:get(KEYS.invoices,[]),
    tables:get(KEYS.tables,[]),
    tableCount:get(KEYS.tableCount,12),
    appName:get(KEYS.appName,"MY BAR")
  };

  const blob=new Blob(
    [JSON.stringify(data,null,2)],
    {type:"application/json"}
  );

  const url=URL.createObjectURL(blob);

  const a=document.createElement("a");

  a.href=url;
  a.download="my-bar-backup.json";

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);

  toast("Backup u shkarkua.");
}

/* =========================
   CLOCK
========================= */

function updateClock(){

  const clock=document.getElementById("clock");

  if(clock){
    clock.textContent=new Date().toLocaleTimeString(
      "sq-AL"
    );
  }
}

/* =========================
   EVENTS
========================= */

function setupEvents(){

  /* NAV */
  document.querySelectorAll("[data-section]")
    .forEach(btn=>{

      btn.addEventListener("click",()=>{
        showSection(btn.dataset.section);
      });

    });

  /* LOGOUT */
  document
    .getElementById("logoutBtn")
    .addEventListener("click",()=>{

      if(confirm("Dëshiron të dalësh nga sistemi?")){

        localStorage.removeItem(KEYS.currentUser);

        window.location.href="login.html";
      }

    });

  /* SEARCH */
  document
    .getElementById("menuSearch")
    .addEventListener("input",e=>{

      state.search=e.target.value;

      renderMenu();

    });

  /* ORDER */
  document
    .getElementById("clearOrderBtn")
    .addEventListener("click",clearOrder);

  document
    .getElementById("paymentBtn")
    .addEventListener("click",openPayment);

  /* PAYMENT */
  document
    .getElementById("cashPaymentBtn")
    .addEventListener("click",()=>{
      pay("CASH");
    });

  document
    .getElementById("cardPaymentBtn")
    .addEventListener("click",()=>{
      pay("KARTË");
    });

  /* MODAL CLOSE */
  document.querySelectorAll("[data-close]")
    .forEach(btn=>{

      btn.addEventListener("click",()=>{
        closeModal(btn.dataset.close);
      });

    });

  document.querySelectorAll(".modal")
    .forEach(modal=>{

      modal.addEventListener("click",e=>{

        if(e.target===modal){
          modal.classList.remove("show");
        }

      });

    });

  /* PRINT */
  document
    .getElementById("printInvoiceBtn")
    .addEventListener("click",()=>{
      window.print();
    });

  /* HISTORY */
  document
    .getElementById("deleteHistoryBtn")
    .addEventListener("click",deleteHistory);

  /* ADMIN */
  document
    .getElementById("saveAppNameBtn")
    .addEventListener("click",saveAppName);

  document
    .getElementById("saveTableCountBtn")
    .addEventListener("click",saveTableCount);

  document
    .getElementById("saveAdminPasswordBtn")
    .addEventListener("click",saveAdminPassword);

  document
    .getElementById("backupBtn")
    .addEventListener("click",backup);
}

/* =========================
   ROLE UI
========================= */

function applyRole(){

  const user=getCurrentUser();

  document.getElementById("userInfo").textContent=
    user ? user.name : "---";

  if(!isAdmin()){

    document.querySelectorAll(".admin-only")
      .forEach(el=>{
        el.style.display="none";
      });

    document.querySelectorAll(".admin-only-section")
      .forEach(el=>{
        el.style.display="none";
      });

  }
}

/* =========================
   RENDER ALL
========================= */

function renderAll(){

  renderDashboard();
  renderTables();
  renderMenu();
  renderOrder();

  if(isAdmin()){
    renderCash();
    renderHistory();
    renderAdmin();
  }
}

/* =========================
   INIT
========================= */

function init(){

  ensureData();

  if(!checkLogin()) return;

  setupEvents();
  applyRole();
  renderAll();

  showSection("dashboard");

  updateClock();

  setInterval(updateClock,1000);
}

document.addEventListener("DOMContentLoaded",init);
