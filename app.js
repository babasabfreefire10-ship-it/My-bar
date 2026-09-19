<!DOCTYPE html>
<html lang="sq">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#050505">
<title>MY BAR • POS</title>

<style>
*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

:root{
    --bg:#050505;
    --panel:#0b0b0b;
    --panel2:#101010;
    --gold:#c9a55c;
    --gold2:#e0c27a;
    --line:#242424;
    --text:#f5f5f5;
    --muted:#777;
    --green:#3ca66a;
    --red:#b94c4c;
}

body{
    min-height:100vh;
    background:
        radial-gradient(circle at 50% 0%,rgba(201,165,92,.08),transparent 35%),
        var(--bg);
    color:var(--text);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
}

/* =========================
   HEADER
========================= */

header{
    height:72px;
    border-bottom:1px solid var(--line);
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 24px;
    position:sticky;
    top:0;
    z-index:50;
    background:rgba(5,5,5,.96);
    backdrop-filter:blur(15px);
}

.brand{
    display:flex;
    align-items:center;
    gap:12px;
}

.logo{
    width:38px;
    height:38px;
    border:1px solid var(--gold);
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    color:var(--gold2);
    font-weight:800;
}

.brand strong{
    letter-spacing:3px;
    font-size:14px;
}

.brand small{
    display:block;
    color:#666;
    font-size:8px;
    letter-spacing:2px;
    margin-top:3px;
}

.header-right{
    display:flex;
    align-items:center;
    gap:10px;
}

.user-badge{
    border:1px solid var(--line);
    background:#0a0a0a;
    padding:9px 12px;
    border-radius:10px;
    color:#bbb;
    font-size:10px;
    letter-spacing:1px;
}

.clock{
    color:var(--gold2);
    font-size:11px;
    font-variant-numeric:tabular-nums;
}

.logout{
    border:1px solid #332424;
    background:#120909;
    color:#d98585;
    padding:9px 12px;
    border-radius:10px;
    cursor:pointer;
    font-size:10px;
}

/* =========================
   NAV
========================= */

nav{
    padding:12px 20px;
    display:flex;
    gap:8px;
    overflow-x:auto;
    border-bottom:1px solid #171717;
}

.nav-btn{
    white-space:nowrap;
    border:1px solid var(--line);
    background:#090909;
    color:#888;
    padding:10px 15px;
    border-radius:10px;
    cursor:pointer;
    font-size:10px;
    letter-spacing:1px;
}

.nav-btn.active,
.nav-btn:hover{
    color:#080808;
    background:var(--gold);
    border-color:var(--gold);
}

/* =========================
   MAIN
========================= */

main{
    padding:22px;
}

.page{
    display:none;
}

.page.active{
    display:block;
}

/* =========================
   DASHBOARD
========================= */

.dashboard-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:12px;
    margin-bottom:20px;
}

.stat{
    background:var(--panel);
    border:1px solid var(--line);
    border-radius:15px;
    padding:18px;
}

.stat small{
    color:#666;
    font-size:8px;
    letter-spacing:2px;
}

.stat strong{
    display:block;
    color:var(--gold2);
    font-size:22px;
    margin-top:8px;
}

/* =========================
   TABLES
========================= */

.section-title{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:13px;
}

.section-title h2{
    font-size:16px;
    font-weight:500;
}

.section-title span{
    color:#666;
    font-size:10px;
}

.tables{
    display:grid;
    grid-template-columns:repeat(6,1fr);
    gap:10px;
}

.table{
    min-height:90px;
    border:1px solid var(--line);
    background:#090909;
    border-radius:14px;
    padding:15px;
    cursor:pointer;
    transition:.2s;
}

.table:hover{
    border-color:#66532d;
    transform:translateY(-2px);
}

.table.open{
    border-color:rgba(201,165,92,.65);
    background:rgba(201,165,92,.06);
}

.table.selected{
    border-color:var(--gold);
    box-shadow:0 0 20px rgba(201,165,92,.1);
}

.table-number{
    font-size:15px;
    color:#fff;
}

.table-status{
    margin-top:10px;
    font-size:9px;
    color:#666;
}

.table.open .table-status{
    color:var(--gold2);
}

/* =========================
   POS
========================= */

.pos-layout{
    display:grid;
    grid-template-columns:1fr 360px;
    gap:18px;
}

.panel{
    background:var(--panel);
    border:1px solid var(--line);
    border-radius:17px;
    padding:18px;
}

.top-actions{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
}

.new-invoice{
    background:var(--gold);
    color:#080808;
    border:0;
    padding:12px 16px;
    border-radius:10px;
    font-weight:800;
    font-size:10px;
    letter-spacing:1px;
    cursor:pointer;
}

.search{
    width:100%;
    border:1px solid var(--line);
    background:#070707;
    color:#fff;
    border-radius:11px;
    padding:13px;
    outline:none;
    margin-bottom:13px;
}

.search:focus{
    border-color:var(--gold);
}

.categories{
    display:flex;
    gap:7px;
    overflow-x:auto;
    margin-bottom:15px;
}

.category{
    white-space:nowrap;
    padding:9px 12px;
    border:1px solid var(--line);
    background:#090909;
    color:#777;
    border-radius:9px;
    cursor:pointer;
    font-size:9px;
}

.category.active{
    background:var(--gold);
    color:#070707;
    border-color:var(--gold);
}

.products{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:9px;
}

.product{
    min-height:95px;
    border:1px solid var(--line);
    background:#090909;
    color:#fff;
    border-radius:12px;
    padding:13px;
    text-align:left;
    cursor:pointer;
    transition:.18s;
}

.product:hover{
    border-color:#776137;
    transform:translateY(-2px);
}

.product.disabled{
    opacity:.35;
    cursor:not-allowed;
}

.product strong{
    display:block;
    font-size:11px;
    line-height:1.3;
}

.product-price{
    display:block;
    margin-top:9px;
    color:var(--gold2);
    font-size:11px;
}

.product-stock{
    display:block;
    margin-top:5px;
    color:#555;
    font-size:8px;
}

/* =========================
   ORDER
========================= */

.order-panel{
    position:sticky;
    top:95px;
    height:max-content;
}

.order-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:15px;
}

.order-header h2{
    font-size:15px;
    font-weight:500;
}

.order-table{
    color:var(--gold2);
    font-size:10px;
}

.order-items{
    max-height:430px;
    overflow-y:auto;
}

.empty{
    text-align:center;
    padding:50px 10px;
    color:#555;
    font-size:11px;
}

.order-item{
    border-bottom:1px solid #181818;
    padding:12px 0;
    display:flex;
    justify-content:space-between;
    gap:10px;
}

.order-name{
    font-size:11px;
}

.order-price{
    color:#666;
    font-size:9px;
    margin-top:4px;
}

.order-controls{
    display:flex;
    align-items:center;
    gap:5px;
}

.qty-btn{
    width:26px;
    height:26px;
    border:1px solid var(--line);
    background:#111;
    color:#fff;
    border-radius:7px;
    cursor:pointer;
}

.qty{
    min-width:20px;
    text-align:center;
    font-size:10px;
}

.remove{
    color:#c76e6e;
    border-color:#382222;
}

.total-box{
    border-top:1px solid #292929;
    margin-top:12px;
    padding-top:17px;
}

.total-line{
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.total-line span{
    color:#777;
    font-size:10px;
}

.total-line strong{
    color:var(--gold2);
    font-size:25px;
}

.pay-btn{
    width:100%;
    margin-top:14px;
    border:0;
    border-radius:11px;
    padding:15px;
    background:var(--gold);
    color:#070707;
    font-weight:800;
    cursor:pointer;
}

.clear-btn{
    width:100%;
    margin-top:8px;
    border:1px solid #302020;
    border-radius:11px;
    padding:12px;
    background:#100909;
    color:#bd7777;
    cursor:pointer;
}

/* =========================
   SUMMARY
========================= */

.summary-box{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:12px;
}

.summary-card{
    border:1px solid var(--line);
    border-radius:15px;
    background:var(--panel);
    padding:20px;
}

.summary-card small{
    color:#666;
    font-size:8px;
    letter-spacing:2px;
}

.summary-card strong{
    display:block;
    margin-top:8px;
    font-size:24px;
    color:var(--gold2);
}

.list{
    margin-top:18px;
}

.list-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:15px;
    padding:15px;
    border:1px solid var(--line);
    background:#090909;
    border-radius:12px;
    margin-bottom:8px;
}

.list-row strong{
    font-size:11px;
}

.list-row small{
    display:block;
    margin-top:5px;
    color:#666;
    font-size:9px;
}

/* =========================
   ADMIN
========================= */

.admin-grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:15px;
}

.admin-card{
    background:var(--panel);
    border:1px solid var(--line);
    border-radius:16px;
    padding:18px;
}

.admin-card h3{
    font-size:13px;
    font-weight:500;
    color:var(--gold2);
    margin-bottom:15px;
}

.admin-row{
    border-bottom:1px solid #181818;
    padding:12px 0;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:10px;
}

.admin-row:last-child{
    border-bottom:0;
}

.admin-row strong{
    font-size:10px;
}

.admin-row small{
    display:block;
    color:#666;
    margin-top:4px;
    font-size:8px;
}

.admin-input{
    width:100%;
    border:1px solid var(--line);
    background:#070707;
    color:#fff;
    padding:11px;
    border-radius:9px;
    outline:none;
    margin-bottom:8px;
}

.admin-button{
    border:1px solid #5a4928;
    background:#151108;
    color:var(--gold2);
    padding:10px 12px;
    border-radius:8px;
    cursor:pointer;
    font-size:9px;
}

.admin-button.red{
    border-color:#3a2020;
    background:#100909;
    color:#c97979;
}

/* =========================
   MODALS
========================= */

.overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.82);
    backdrop-filter:blur(10px);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:100;
    padding:20px;
}

.overlay.show{
    display:flex;
}

.modal{
    width:min(100%,440px);
    max-height:90vh;
    overflow-y:auto;
    background:#0b0b0b;
    border:1px solid rgba(201,165,92,.4);
    border-radius:19px;
    padding:25px;
    box-shadow:0 30px 100px rgba(0,0,0,.8);
}

.modal h2{
    font-size:20px;
    font-weight:400;
}

.modal-sub{
    color:#666;
    font-size:10px;
    margin-top:5px;
    margin-bottom:20px;
}

.close{
    float:right;
    width:30px;
    height:30px;
    border:1px solid var(--line);
    background:#111;
    color:#999;
    border-radius:50%;
    cursor:pointer;
}

.pay-options{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:10px;
}

.pay-option{
    border:1px solid var(--line);
    background:#090909;
    color:#fff;
    border-radius:12px;
    padding:18px 10px;
    cursor:pointer;
}

.pay-option:hover{
    border-color:var(--gold);
}

.pay-option strong{
    display:block;
    color:var(--gold2);
    font-size:12px;
}

.pay-option small{
    color:#666;
    font-size:8px;
    display:block;
    margin-top:5px;
}

.invoice{
    background:#fff;
    color:#111;
    padding:20px;
    border-radius:5px;
}

.invoice-head{
    text-align:center;
    border-bottom:1px dashed #999;
    padding-bottom:12px;
    margin-bottom:12px;
}

.invoice-head h2{
    color:#111;
}

.invoice-head small{
    color:#555;
}

.invoice-row{
    display:flex;
    justify-content:space-between;
    gap:10px;
    padding:7px 0;
    font-size:11px;
    border-bottom:1px dotted #ccc;
}

.invoice-total{
    border-top:1px solid #111;
    margin-top:10px;
    padding-top:10px;
    display:flex;
    justify-content:space-between;
    font-weight:800;
    font-size:16px;
}

.modal-actions{
    display:flex;
    gap:8px;
    margin-top:15px;
}

.modal-actions button{
    flex:1;
    padding:12px;
    border-radius:10px;
    cursor:pointer;
}

.print{
    background:var(--gold);
    border:0;
    color:#070707;
    font-weight:800;
}

.close-modal{
    background:#111;
    border:1px solid var(--line);
    color:#aaa;
}

/* =========================
   TOAST
========================= */

.toast{
    position:fixed;
    left:50%;
    bottom:25px;
    transform:translateX(-50%) translateY(20px);
    opacity:0;
    pointer-events:none;
    z-index:300;
    background:#111;
    border:1px solid #574826;
    color:#eee;
    padding:12px 17px;
    border-radius:11px;
    font-size:10px;
    transition:.25s;
}

.toast.show{
    opacity:1;
    transform:translateX(-50%) translateY(0);
}

/* =========================
   MOBILE
========================= */

@media(max-width:950px){

    .tables{
        grid-template-columns:repeat(4,1fr);
    }

    .products{
        grid-template-columns:repeat(3,1fr);
    }

    .pos-layout{
        grid-template-columns:1fr;
    }

    .order-panel{
        position:static;
    }

}

@media(max-width:650px){

    header{
        padding:0 13px;
        height:65px;
    }

    .user-badge{
        display:none;
    }

    main{
        padding:14px;
    }

    .dashboard-grid{
        grid-template-columns:1fr 1fr;
    }

    .tables{
        grid-template-columns:repeat(3,1fr);
    }

    .products{
        grid-template-columns:repeat(2,1fr);
    }

    .admin-grid{
        grid-template-columns:1fr;
    }

    .summary-box{
        grid-template-columns:1fr 1fr;
    }

}

@media(max-width:420px){

    .tables{
        grid-template-columns:repeat(2,1fr);
    }

    .summary-box{
        grid-template-columns:1fr;
    }

    .products{
        gap:7px;
    }

    .product{
        min-height:90px;
        padding:11px;
    }
}
</style>
</head>

<body>

<header>

    <div class="brand">

        <div class="logo">S</div>

        <div>
            <strong id="appName">MY BAR</strong>
            <small>BAR MANAGEMENT</small>
        </div>

    </div>

    <div class="header-right">

        <div class="clock" id="clock">
            00:00:00
        </div>

        <div class="user-badge" id="userBadge">
            USER
        </div>

        <button
            class="logout"
            onclick="logout()"
        >
            DIL
        </button>

    </div>

</header>

<nav>

    <button
        class="nav-btn active"
        data-page="home"
        onclick="showPage('home',this)"
    >
        PËRMBLEDHJE
    </button>

    <button
        class="nav-btn"
        data-page="pos"
        onclick="showPage('pos',this)"
    >
        FATURË E RE
    </button>

    <button
        class="nav-btn"
        data-page="invoices"
        onclick="showPage('invoices',this)"
    >
        FATURAT E MIA
    </button>

    <button
        class="nav-btn admin-only"
        data-page="admin"
        onclick="showPage('admin',this)"
    >
        ADMIN
    </button>

</nav>

<main>

<!-- =========================
     HOME
========================= -->

<section
    class="page active"
    id="page-home"
>

    <div class="dashboard-grid">

        <div class="stat">
            <small>SHITJE SOT</small>
            <strong id="todaySales">0 L</strong>
        </div>

        <div class="stat">
            <small>FATURA SOT</small>
            <strong id="todayInvoices">0</strong>
        </div>

        <div class="stat">
            <small>TAVOLINA AKTIVE</small>
            <strong id="activeTables">0</strong>
        </div>

        <div class="stat">
            <small>ARKA CASH</small>
            <strong id="cashSales">0 L</strong>
        </div>

    </div>

    <div class="section-title">

        <h2>Tavolinat</h2>

        <span id="tableInfo">
            12 tavolina
        </span>

    </div>

    <div
        class="tables"
        id="homeTables"
    ></div>

</section>


<!-- =========================
     POS
========================= -->

<section
    class="page"
    id="page-pos"
>

    <div class="pos-layout">

        <div class="panel">

            <div class="top-actions">

                <div>
                    <strong id="posTitle">
                        Faturë e re
                    </strong>

                    <div
                        id="selectedTableLabel"
                        style="color:#666;font-size:9px;margin-top:4px;"
                    >
                        Zgjidh tavolinën
                    </div>
                </div>

                <button
                    class="new-invoice"
                    onclick="startNewInvoice()"
                >
                    FATURË E RE
                </button>

            </div>

            <input
                class="search"
                id="searchInput"
                placeholder="Kërko produkt..."
                oninput="renderProducts()"
            >

            <div
                class="categories"
                id="categories"
            ></div>

            <div
                class="products"
                id="products"
            ></div>

        </div>


        <div class="panel order-panel">

            <div class="order-header">

                <h2>Porosia</h2>

                <span
                    class="order-table"
                    id="orderTable"
                >
                    —
                </span>

            </div>

            <div
                class="order-items"
                id="orderItems"
            >
                <div class="empty">
                    Zgjidh një tavolinë dhe nis faturën.
                </div>
            </div>

            <div class="total-box">

                <div class="total-line">

                    <span>TOTALI</span>

                    <strong id="orderTotal">
                        0 L
                    </strong>

                </div>

                <button
                    class="pay-btn"
                    onclick="openPayment()"
                >
                    PËRFUNDO PAGESËN
                </button>

                <button
                    class="clear-btn"
                    onclick="clearOrder()"
                >
                    PASTRO POROSINË
                </button>

            </div>

        </div>

    </div>

</section>


<!-- =========================
     INVOICES
========================= -->

<section
    class="page"
    id="page-invoices"
>

    <div class="section-title">

        <h2>Faturat e mia</h2>

        <span>
            Historiku i shitjeve
        </span>

    </div>

    <div
        class="summary-box"
        id="invoiceSummary"
    ></div>

    <div
        class="list"
        id="invoiceList"
    ></div>

</section>


<!-- =========================
     ADMIN
========================= -->

<section
    class="page"
    id="page-admin"
    data-admin-page
>

    <div class="section-title">

        <h2>Administrimi</h2>

        <span>
            Kontroll i plotë i sistemit
        </span>

    </div>

    <div class="admin-grid">

        <!-- USERS -->

        <div class="admin-card">

            <h3>Përdoruesit</h3>

            <input
                class="admin-input"
                id="newUsername"
                placeholder="Username i ri"
            >

            <input
                class="admin-input"
                id="newUserName"
                placeholder="Emri"
            >

            <input
                class="admin-input"
                id="newUserPassword"
                placeholder="Fjalëkalimi"
                type="password"
            >

            <button
                class="admin-button"
                onclick="addWaiter()"
            >
                + SHTO PËRDORUES
            </button>

            <div id="usersList"></div>

        </div>


        <!-- PRODUCTS -->

        <div class="admin-card">

            <h3>Produktet</h3>

            <input
                class="admin-input"
                id="newProductName"
                placeholder="Emri i produktit"
            >

            <input
                class="admin-input"
                id="newProductCategory"
                placeholder="Kategoria"
            >

            <input
                class="admin-input"
                id="newProductPrice"
                placeholder="Çmimi"
                type="number"
            >

            <input
                class="admin-input"
                id="newProductStock"
                placeholder="Stoku"
                type="number"
            >

            <button
                class="admin-button"
                onclick="addProductAdmin()"
            >
                + SHTO PRODUKT
            </button>

            <div id="productsAdminList"></div>

        </div>


        <!-- TABLES -->

        <div class="admin-card">

            <h3>Tavolinat</h3>

            <input
                class="admin-input"
                id="tableCount"
                type="number"
                min="1"
                max="100"
                placeholder="Numri i tavolinave"
            >

            <button
                class="admin-button"
                onclick="saveTableCount()"
            >
                RUAJ TAVOLINAT
            </button>

        </div>


        <!-- SETTINGS -->

        <div class="admin-card">

            <h3>Emri i aplikacionit</h3>

            <input
                class="admin-input"
                id="appNameInput"
                placeholder="Emri i barit"
            >

            <button
                class="admin-button"
                onclick="saveAppName()"
            >
                RUAJ EMRIN
            </button>

        </div>

    </div>

</section>

</main>


<!-- =========================
     PAYMENT MODAL
========================= -->

<div
    class="overlay"
    id="paymentOverlay"
>

    <div class="modal">

        <button
            class="close"
            onclick="closePayment()"
        >
            ×
        </button>

        <h2>Zgjidh pagesën</h2>

        <div class="modal-sub">
            Totali:
            <strong
                id="paymentTotal"
                style="color:#d8b76d;"
            >
                0 L
            </strong>
        </div>

        <div class="pay-options">

            <button
                class="pay-option"
                onclick="completePayment('cash')"
            >
                <strong>CASH</strong>
                <small>Pagesë me para</small>
            </button>

            <button
                class="pay-option"
                onclick="completePayment('card')"
            >
                <strong>KARTË</strong>
                <small>Pagesë me kartë</small>
            </button>

        </div>

    </div>

</div>


<!-- =========================
     INVOICE MODAL
========================= -->

<div
    class="overlay"
    id="invoiceOverlay"
>

    <div class="modal">

        <button
            class="close"
            onclick="finishInvoice()"
        >
            ×
        </button>

        <div
            class="invoice"
            id="invoicePrint"
        >

            <div class="invoice-head">

                <h2>MY BAR</h2>

                <small>
                    Faturë
                </small>

                <br>

                <small id="invoiceNumber">
                    —
                </small>

                <br>

                <small id="invoiceDate">
                    —
                </small>

            </div>

            <div
                class="invoice-row"
                style="border-bottom:0;"
            >
                <span>Tavolina</span>
                <strong id="invoiceTable">—</strong>
            </div>

            <div
                class="invoice-row"
                style="border-bottom:0;"
            >
                <span>Kamarieri</span>
                <strong id="invoiceWaiter">—</strong>
            </div>

            <div id="invoiceItems"></div>

            <div class="invoice-total">

                <span>TOTAL</span>

                <span id="invoiceTotal">
                    0 L
                </span>

            </div>

        </div>

        <div class="modal-actions">

            <button
                class="print"
                onclick="printInvoice()"
            >
                PRINT
            </button>

            <button
                class="close-modal"
                onclick="finishInvoice()"
            >
                MBYLLE
            </button>

        </div>

    </div>

</div>


<div
    class="toast"
    id="toast"
></div>


<script>

/* =========================================================
   MY BAR APP
========================================================= */

"use strict";


/* =========================
   STORAGE KEYS
========================= */

const USERS_KEY =
    "MYBAR_USERS_V2";

const SESSION_KEY =
    "MYBAR_SESSION_V2";

const TABLES_KEY =
    "MYBAR_TABLES_V2";

const PRODUCTS_KEY =
    "MYBAR_PRODUCTS_V2";

const INVOICES_KEY =
    "MYBAR_INVOICES_V2";

const INVENTORY_KEY =
    "MYBAR_INVENTORY_V2";

const SETTINGS_KEY =
    "MYBAR_SETTINGS_V2";

const SELECTED_TABLE_KEY =
    "MYBAR_SELECTED_TABLE_V2";


/* =========================
   DEFAULT PRODUCTS
========================= */

const DEFAULT_PRODUCTS = [

    {id:1,name:"Espresso",category:"Kafe",price:100,stock:30},
    {id:2,name:"Espresso Dopio",category:"Kafe",price:150,stock:30},
    {id:3,name:"Macchiato",category:"Kafe",price:120,stock:30},
    {id:4,name:"Cappuccino",category:"Kafe",price:180,stock:30},
    {id:5,name:"Latte",category:"Kafe",price:200,stock:30},
    {id:6,name:"Freddo Espresso",category:"Kafe",price:200,stock:30},
    {id:7,name:"Freddo Cappuccino",category:"Kafe",price:220,stock:30},
    {id:8,name:"Çaj",category:"Kafe",price:120,stock:30},

    {id:20,name:"Coca Cola",category:"Pije Freskuese",price:150,stock:30},
    {id:21,name:"Coca Cola Zero",category:"Pije Freskuese",price:150,stock:30},
    {id:22,name:"Fanta",category:"Pije Freskuese",price:150,stock:30},
    {id:23,name:"Sprite",category:"Pije Freskuese",price:150,stock:30},
    {id:24,name:"Schweppes",category:"Pije Freskuese",price:150,stock:30},
    {id:25,name:"Red Bull",category:"Pije Freskuese",price:250,stock:30},
    {id:26,name:"Fresh Orange",category:"Pije Freskuese",price:250,stock:30},
    {id:27,name:"Fresh Lemon",category:"Pije Freskuese",price:250,stock:30},

    {id:40,name:"Ujë 0.5L",category:"Ujë",price:100,stock:30},
    {id:41,name:"Ujë 0.75L",category:"Ujë",price:150,stock:30},
    {id:42,name:"Ujë 1.5L",category:"Ujë",price:150,stock:30},

    {id:50,name:"Birra Tirana",category:"Birra",price:200,stock:30},
    {id:51,name:"Birra Korça",category:"Birra",price:200,stock:30},
    {id:52,name:"Heineken",category:"Birra",price:250,stock:30},
    {id:53,name:"Corona",category:"Birra",price:300,stock:30},
    {id:54,name:"Tuborg",category:"Birra",price:250,stock:30},

    {id:60,name:"Jack Daniel's",category:"Whisky",price:500,stock:30},
    {id:61,name:"Johnnie Walker Red",category:"Whisky",price:450,stock:30},
    {id:62,name:"Johnnie Walker Black",category:"Whisky",price:650,stock:30},
    {id:63,name:"Chivas Regal",category:"Whisky",price:700,stock:30},

    {id:70,name:"Gordon's Gin",category:"Gin",price:450,stock:30},
    {id:71,name:"Bombay Sapphire",category:"Gin",price:550,stock:30},
    {id:72,name:"Hendrick's",category:"Gin",price:800,stock:30},

    {id:80,name:"Absolut Vodka",category:"Vodka",price:450,stock:30},
    {id:81,name:"Smirnoff",category:"Vodka",price:450,stock:30},
    {id:82,name:"Grey Goose",category:"Vodka",price:800,stock:30},

    {id:90,name:"Bacardi",category:"Rum",price:450,stock:30},
    {id:91,name:"Captain Morgan",category:"Rum",price:500,stock:30},

    {id:100,name:"Jose Cuervo",category:"Tequila",price:500,stock:30},
    {id:101,name:"Olmeca",category:"Tequila",price:550,stock:30},

    {id:110,name:"Baileys",category:"Liqueur & Amaro",price:450,stock:30},
    {id:111,name:"Jägermeister",category:"Liqueur & Amaro",price:450,stock:30},
    {id:112,name:"Aperol",category:"Liqueur & Amaro",price:400,stock:30},

    {id:120,name:"Verë e Kuqe",category:"Verë",price:300,stock:30},
    {id:121,name:"Verë e Bardhë",category:"Verë",price:300,stock:30},
    {id:122,name:"Prosecco",category:"Verë",price:600,stock:30},

    {id:130,name:"Mojito",category:"Cocktails",price:600,stock:30},
    {id:131,name:"Margarita",category:"Cocktails",price:650,stock:30},
    {id:132,name:"Aperol Spritz",category:"Cocktails",price:650,stock:30},
    {id:133,name:"Sex on the Beach",category:"Cocktails",price:700,stock:30},
    {id:134,name:"Long Island",category:"Cocktails",price:800,stock:30},

    {id:140,name:"Gin Tonic",category:"Long Drinks",price:550,stock:30},
    {id:141,name:"Vodka Red Bull",category:"Long Drinks",price:600,stock:30},
    {id:142,name:"Whisky Cola",category:"Long Drinks",price:550,stock:30},

    {id:150,name:"Shot Tequila",category:"Shots",price:300,stock:30},
    {id:151,name:"Shot Jägermeister",category:"Shots",price:300,stock:30},
    {id:152,name:"Shot Vodka",category:"Shots",price:250,stock:30},

    {id:160,name:"Patatina",category:"Snacks",price:200,stock:30},
    {id:161,name:"Kikirikë",category:"Snacks",price:200,stock:30},
    {id:162,name:"Ullinj",category:"Snacks",price:250,stock:30},
    {id:163,name:"Mix Nuts",category:"Snacks",price:350,stock:30}

];


/* =========================
   DEFAULT SETTINGS
========================= */

const DEFAULT_SETTINGS = {

    appName:"MY BAR",

    tableCount:12

};


/* =========================
   HELPERS
========================= */

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
        .toLocaleString("sq-AL")
        + " L";

}

function escapeHTML(value){

    return String(value ?? "")
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


/* =========================
   SESSION
========================= */

function getSession(){

    return getJSON(
        SESSION_KEY,
        null
    );

}

function requireLogin(){

    const session =
        getSession();

    if(!session){

        window.location.href =
            "login.html";

        return null;

    }

    return session;

}


/* =========================
   INITIALIZE
========================= */

function initialize(){

    const session =
        requireLogin();

    if(!session) return;

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

    if(!localStorage.getItem(SETTINGS_KEY)){

        setJSON(
            SETTINGS_KEY,
            DEFAULT_SETTINGS
        );

    }

    initializeTables();

    initializeInventory();

    renderHeader();

    renderTables();

    renderCategories();

    renderProducts();

    renderOrder();

    updateDashboard();

    renderInvoices();

    renderAdmin();

    updateClock();

    applyRole();

}


/* =========================
   TABLES
========================= */

function initializeTables(){

    const settings =
        getJSON(
            SETTINGS_KEY,
            DEFAULT_SETTINGS
        );

    const count =
        Number(settings.tableCount) || 12;

    let tables =
        getJSON(
            TABLES_KEY,
            null
        );

    if(!Array.isArray(tables)){

        tables = [];

        for(let i=1;i<=count;i++){

            tables.push({

                id:i,

                name:"Tavolina " + i,

                items:[],

                active:false

            });

        }

        setJSON(
            TABLES_KEY,
            tables
        );

        return;

    }

    if(tables.length !== count){

        const oldTables = tables;

        tables = [];

        for(let i=1;i<=count;i++){

            const old =
                oldTables.find(
                    t => Number(t.id) === i
                );

            tables.push(
                old || {

                    id:i,

                    name:"Tavolina " + i,

                    items:[],

                    active:false

                }
            );

        }

        setJSON(
            TABLES_KEY,
            tables
        );

    }

}

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


/* =========================
   INVENTORY
========================= */

function initializeInventory(){

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    let stock =
        getJSON(
            INVENTORY_KEY,
            {}
        );

    products.forEach(product => {

        if(stock[product.id] === undefined){

            stock[product.id] =
                Number(product.stock ?? 30);

        }

    });

    setJSON(
        INVENTORY_KEY,
        stock
    );

}

function getStock(id){

    const stock =
        getJSON(
            INVENTORY_KEY,
            {}
        );

    return Number(
        stock[id] ?? 0
    );

}

function setStock(id,value){

    const stock =
        getJSON(
            INVENTORY_KEY,
            {}
        );

    stock[id] =
        Math.max(
            0,
            Number(value || 0)
        );

    setJSON(
        INVENTORY_KEY,
        stock
    );

}


/* =========================
   HEADER
========================= */

function renderHeader(){

    const session =
        getSession();

    const settings =
        getJSON(
            SETTINGS_KEY,
            DEFAULT_SETTINGS
        );

    document
        .getElementById("appName")
        .textContent =
        settings.appName || "MY BAR";

    document
        .getElementById("userBadge")
        .textContent =
        session
            ? session.name + " • " +
              (
                  session.role === "admin"
                      ? "ADMIN"
                      : "KAMARIER"
              )
            : "USER";

}


/* =========================
   CLOCK
========================= */

function updateClock(){

    const clock =
        document.getElementById("clock");

    if(!clock) return;

    clock.textContent =
        new Date()
        .toLocaleTimeString(
            "sq-AL",
            {
                hour:"2-digit",
                minute:"2-digit",
                second:"2-digit"
            }
        );

}


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(page,button){

    document
        .querySelectorAll(".page")
        .forEach(el => {

            el.classList.remove("active");

        });

    const target =
        document.getElementById(
            "page-" + page
        );

    if(target){

        target.classList.add("active");

    }

    document
        .querySelectorAll(".nav-btn")
        .forEach(el => {

            el.classList.remove("active");

        });

    if(button){

        button.classList.add("active");

    }

    if(page === "home"){

        renderTables();

        updateDashboard();

    }

    if(page === "pos"){

        renderCategories();

        renderProducts();

        renderOrder();

    }

    if(page === "invoices"){

        renderInvoices();

    }

    if(page === "admin"){

        renderAdmin();

    }

}


/* =========================
   TABLE RENDER
========================= */

function renderTables(){

    const tables =
        getTables();

    const containers = [

        document.getElementById("homeTables")

    ];

    const selected =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    containers.forEach(container => {

        if(!container) return;

        container.innerHTML =
            tables.map(table => {

                const open =
                    Array.isArray(table.items)
                    &&
                    table.items.length > 0;

                return `

                    <button
                        class="table
                        ${open ? "open" : ""}
                        ${selected === Number(table.id) ? "selected" : ""}"
                        onclick="selectTable(${Number(table.id)})"
                    >

                        <div class="table-number">
                            ${escapeHTML(table.name)}
                        </div>

                        <div class="table-status">
                            ${
                                open
                                    ? money(getOrderTotal(table))
                                    : "E LIRË"
                            }
                        </div>

                    </button>

                `;

            }).join("");

    });

    const info =
        document.getElementById("tableInfo");

    if(info){

        info.textContent =
            tables.length + " tavolina";

    }

}


/* =========================
   SELECT TABLE
========================= */

function selectTable(id){

    localStorage.setItem(
        SELECTED_TABLE_KEY,
        String(id)
    );

    showPage(
        "pos",
        document.querySelector(
            '.nav-btn[data-page="pos"]'
        )
    );

    const table =
        getTables()
        .find(
            t => Number(t.id) === Number(id)
        );

    if(table && table.items.length){

        toast(
            table.name +
            " u hap."
        );

    }else{

        toast(
            table
                ? table.name + " është gati."
                : "Tavolina u zgjodh."
        );

    }

    renderTables();

    renderOrder();

}


/* =========================
   NEW INVOICE
========================= */

function startNewInvoice(){

    let selected =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    /*
       Nëse nuk ka tavolinë të zgjedhur,
       zgjedh automatikisht tavolinën e parë
       të lirë.
    */

    if(!selected){

        const free =
            getTables().find(
                t =>
                    !t.items ||
                    t.items.length === 0
            );

        if(free){

            selected =
                Number(free.id);

            localStorage.setItem(
                SELECTED_TABLE_KEY,
                String(selected)
            );

        }

    }

    if(!selected){

        toast(
            "Nuk ka tavolina të lira."
        );

        return;

    }

    renderOrder();

    toast(
        "Faturë e re u hap."
    );

}


/* =========================
   CATEGORIES
========================= */

let selectedCategory =
    "Të gjitha";

function getVisibleCategories(){

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const categories =
        [
            "Të gjitha",
            ...new Set(
                products.map(
                    p => p.category
                )
            )
        ];

    /*
       Nga 20:00 deri 00:00
       hiqet kategoria Kafe.
    */

    const hour =
        new Date().getHours();

    const hideCoffee =
        hour >= 20 || hour < 0;

    return hideCoffee
        ? categories.filter(
            c => c !== "Kafe"
        )
        : categories;

}

function renderCategories(){

    const container =
        document.getElementById(
            "categories"
        );

    if(!container) return;

    const categories =
        getVisibleCategories();

    if(
        selectedCategory === "Kafe"
        &&
        !categories.includes("Kafe")
    ){

        selectedCategory =
            "Të gjitha";

    }

    container.innerHTML =
        categories.map(category => `

            <button
                class="category ${
                    category === selectedCategory
                        ? "active"
                        : ""
                }"
                onclick="selectCategory('${escapeHTML(category)}')"
            >
                ${escapeHTML(category)}
            </button>

        `).join("");

}

function selectCategory(category){

    selectedCategory =
        category;

    renderCategories();

    renderProducts();

}


/* =========================
   PRODUCTS
========================= */

function renderProducts(){

    const container =
        document.getElementById(
            "products"
        );

    if(!container) return;

    const query =
        document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const hour =
        new Date().getHours();

    const hideCoffee =
        hour >= 20;

    let filtered =
        products.filter(product => {

            if(
                hideCoffee
                &&
                product.category === "Kafe"
            ){

                return false;

            }

            const categoryMatch =
                selectedCategory === "Të gjitha"
                ||
                product.category === selectedCategory;

            const searchMatch =
                !query
                ||
                product.name
                    .toLowerCase()
                    .includes(query);

            return categoryMatch
                &&
                searchMatch;

        });


    /* =========================
       MORNING OFFER
       06:40 - 09:40
    ========================= */

    const now =
        new Date();

    const minutes =
        now.getHours() * 60
        +
        now.getMinutes();

    const offerStart =
        6 * 60 + 40;

    const offerEnd =
        9 * 60 + 40;

    const offerActive =
        minutes >= offerStart
        &&
        minutes <= offerEnd;


    container.innerHTML =
        filtered.map(product => {

            const stock =
                getStock(product.id);

            let price =
                Number(product.price);

            let offerText = "";

            if(
                offerActive
                &&
                product.category === "Kafe"
            ){

                price =
                    Math.max(
                        0,
                        Math.round(price * 0.9)
                    );

                offerText =
                    `<small style="
                        display:block;
                        color:#69b987;
                        margin-top:5px;
                    ">OFERTË MËNGJESI</small>`;

            }

            return `

                <button
                    class="product ${
                        stock <= 0
                            ? "disabled"
                            : ""
                    }"
                    onclick="${
                        stock > 0
                            ? `addProduct(${product.id},${price})`
                            : ""
                    }"
                >

                    <strong>
                        ${escapeHTML(product.name)}
                    </strong>

                    <span class="product-price">
                        ${money(price)}
                    </span>

                    ${offerText}

                    <span class="product-stock">
                        Stok: ${stock}
                    </span>

                </button>

            `;

        }).join("");


}


/* =========================
   ADD PRODUCT
========================= */

function addProduct(productId,priceOverride){

    const tableId =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    if(!tableId){

        toast(
            "Zgjidh një tavolinë."
        );

        return;

    }

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    const product =
        products.find(
            p => Number(p.id) === Number(productId)
        );

    if(!product) return;

    const stock =
        getStock(productId);

    if(stock <= 0){

        toast(
            "Ky produkt nuk ka stok."
        );

        return;

    }

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
        );

    if(!table) return;

    if(!Array.isArray(table.items)){

        table.items = [];

    }

    const existing =
        table.items.find(
            item =>
                Number(item.productId)
                ===
                Number(productId)
        );

    const currentQuantity =
        existing
            ? Number(existing.quantity)
            : 0;

    if(currentQuantity >= stock){

        toast(
            "Nuk ka më stok."
        );

        return;

    }

    const price =
        priceOverride !== undefined
            ? Number(priceOverride)
            : Number(product.price);

    if(existing){

        existing.quantity++;

        existing.price =
            price;

    }else{

        table.items.push({

            productId:product.id,

            name:product.name,

            price:price,

            originalPrice:Number(product.price),

            quantity:1

        });

    }

    saveTables(tables);

    renderTables();

    renderOrder();

    renderProducts();

    updateDashboard();

    toast(
        product.name +
        " u shtua."
    );

}


/* =========================
   ORDER
========================= */

function getOrderTotal(table){

    return (table.items || [])
        .reduce(
            (sum,item) =>
                sum
                +
                Number(item.price)
                *
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
            "orderTotal"
        );

    const tableLabel =
        document.getElementById(
            "orderTable"
        );

    const selectedLabel =
        document.getElementById(
            "selectedTableLabel"
        );

    if(!container) return;

    const tableId =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    const table =
        getTables().find(
            t => Number(t.id) === tableId
        );

    if(tableLabel){

        tableLabel.textContent =
            table
                ? table.name
                : "—";

    }

    if(selectedLabel){

        selectedLabel.textContent =
            table
                ? table.name
                : "Zgjidh tavolinën";

    }

    if(
        !table
        ||
        !table.items
        ||
        !table.items.length
    ){

        container.innerHTML = `

            <div class="empty">
                Nuk ka produkte në porosi.
            </div>

        `;

        if(totalElement){

            totalElement.textContent =
                money(0);

        }

        return;

    }

    let total = 0;

    container.innerHTML =
        table.items.map(
            (item,index) => {

                const itemTotal =
                    Number(item.price)
                    *
                    Number(item.quantity);

                total += itemTotal;

                return `

                    <div class="order-item">

                        <div>

                            <div class="order-name">
                                ${escapeHTML(item.name)}
                            </div>

                            <div class="order-price">
                                ${money(item.price)}
                                × ${item.quantity}
                            </div>

                        </div>

                        <div class="order-controls">

                            <button
                                class="qty-btn"
                                onclick="changeQuantity(${index},-1)"
                            >
                                −
                            </button>

                            <span class="qty">
                                ${item.quantity}
                            </span>

                            <button
                                class="qty-btn"
                                onclick="changeQuantity(${index},1)"
                            >
                                +
                            </button>

                            <button
                                class="qty-btn remove"
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


/* =========================
   QUANTITY
========================= */

function changeQuantity(index,amount){

    const tableId =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
        );

    if(!table) return;

    const item =
        table.items[index];

    if(!item) return;

    const newQuantity =
        Number(item.quantity)
        +
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

        if(newQuantity > stock){

            toast(
                "Stoku nuk është i mjaftueshëm."
            );

            return;

        }

        item.quantity =
            newQuantity;

    }

    saveTables(tables);

    renderTables();

    renderOrder();

    renderProducts();

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

    const tableId =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
        );

    if(!table) return;

    table.items.splice(
        index,
        1
    );

    saveTables(tables);

    renderTables();

    renderOrder();

    renderProducts();

}


/* =========================
   CLEAR ORDER
========================= */

function clearOrder(){

    const tableId =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
        );

    if(!table) return;

    table.items = [];

    saveTables(tables);

    renderTables();

    renderOrder();

    renderProducts();

    toast(
        "Porosia u pastrua."
    );

}


/* =========================
   PAYMENT
========================= */

function openPayment(){

    const tableId =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    const table =
        getTables().find(
            t => Number(t.id) === tableId
        );

    if(
        !table
        ||
        !table.items
        ||
        !table.items.length
    ){

        toast(
            "Porosia është bosh."
        );

        return;

    }

    document
        .getElementById("paymentTotal")
        .textContent =
        money(
            getOrderTotal(table)
        );

    document
        .getElementById("paymentOverlay")
        .classList.add("show");

}

function closePayment(){

    document
        .getElementById("paymentOverlay")
        .classList.remove("show");

}


/* =========================
   COMPLETE PAYMENT
========================= */

function completePayment(method){

    const tableId =
        Number(
            localStorage.getItem(
                SELECTED_TABLE_KEY
            ) || 0
        );

    const tables =
        getTables();

    const table =
        tables.find(
            t => Number(t.id) === tableId
        );

    if(
        !table
        ||
        !table.items
        ||
        !table.items.length
    ){

        closePayment();

        return;

    }


    /* CHECK STOCK */

    for(const item of table.items){

        const stock =
            getStock(
                item.productId
            );

        if(
            Number(item.quantity)
            >
            stock
        ){

            toast(
                "Stoku nuk mjafton për " +
                item.name
            );

            return;

        }

    }


    /* REDUCE STOCK */

    for(const item of table.items){

        setStock(
            item.productId,
            getStock(item.productId)
            -
            Number(item.quantity)
        );

    }


    const session =
        getSession();

    const total =
        getOrderTotal(table);

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    const invoice = {

        id:Date.now(),

        number:
            "INV-" +
            Date.now(),

        date:
            new Date().toISOString(),

        table:
            table.id,

        tableName:
            table.name,

        items:
            JSON.parse(
                JSON.stringify(
                    table.items
                )
            ),

        total:total,

        payment:method,

        waiterName:
            session
                ? session.name
                : "Pa emër",

        user:
            session
                ? session.username
                : ""

    };

    invoices.push(invoice);

    setJSON(
        INVOICES_KEY,
        invoices
    );


    /* CLEAR TABLE */

    table.items = [];

    saveTables(tables);

    closePayment();

    renderTables();

    renderProducts();

    renderOrder();

    updateDashboard();

    renderInvoices();

    showInvoice(invoice);

    toast(
        "Pagesa u krye."
    );

}


/* =========================
   INVOICE
========================= */

function showInvoice(invoice){

    document
        .getElementById("invoiceNumber")
        .textContent =
        invoice.number;

    document
        .getElementById("invoiceDate")
        .textContent =
        new Date(
            invoice.date
        ).toLocaleString(
            "sq-AL"
        );

    document
        .getElementById("invoiceTable")
        .textContent =
        invoice.tableName;

    document
        .getElementById("invoiceWaiter")
        .textContent =
        invoice.waiterName;

    document
        .getElementById("invoiceItems")
        .innerHTML =
        invoice.items.map(
            item => `

                <div class="invoice-row">

                    <span>
                        ${escapeHTML(item.name)}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${money(
                            item.price
                            *
                            item.quantity
                        )}
                    </strong>

                </div>

            `
        ).join("");

    document
        .getElementById("invoiceTotal")
        .textContent =
        money(invoice.total);

    document
        .getElementById("invoiceOverlay")
        .classList.add("show");

}


/* =========================
   PRINT
========================= */

function printInvoice(){

    const invoice =
        document.getElementById(
            "invoicePrint"
        );

    if(!invoice) return;

    const win =
        window.open(
            "",
            "_blank",
            "width=420,height=700"
        );

    if(!win){

        toast(
            "Lejo pop-up për printim."
        );

        return;

    }

    win.document.write(`

        <!DOCTYPE html>

        <html lang="sq">

        <head>

            <meta charset="UTF-8">

            <title>MY BAR</title>

            <style>

                body{
                    font-family:Arial,sans-serif;
                    width:280px;
                    margin:0 auto;
                    color:#111;
                }

                h2{
                    text-align:center;
                    margin-bottom:4px;
                }

                small{
                    color:#555;
                }

                .row{
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    border-bottom:1px dotted #aaa;
                    padding:7px 0;
                    font-size:11px;
                }

                .total{
                    display:flex;
                    justify-content:space-between;
                    font-weight:bold;
                    border-top:1px solid #111;
                    padding-top:10px;
                    margin-top:10px;
                }

            </style>

        </head>

        <body>

            ${invoice.innerHTML}

        </body>

        </html>

    `);

    win.document.close();

    win.focus();

    setTimeout(
        () => {

            win.print();

        },
        300
    );

}


/* =========================
   FINISH INVOICE
========================= */

function finishInvoice(){

    document
        .getElementById("invoiceOverlay")
        .classList.remove("show");

    /*
       Pas mbylljes së faturës,
       kamarieri kthehet automatikisht
       te login.
    */

    logout();

}


/* =========================
   DASHBOARD
========================= */

function updateDashboard(){

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
                ===
                today
        );

    const sales =
        todayInvoices.reduce(
            (sum,invoice) =>
                sum
                +
                Number(invoice.total || 0),
            0
        );

    const cash =
        todayInvoices
        .filter(
            i => i.payment === "cash"
        )
        .reduce(
            (sum,i) =>
                sum
                +
                Number(i.total || 0),
            0
        );

    const active =
        getTables().filter(
            t =>
                t.items
                &&
                t.items.length
        ).length;


    document
        .getElementById("todaySales")
        .textContent =
        money(sales);

    document
        .getElementById("todayInvoices")
        .textContent =
        todayInvoices.length;

    document
        .getElementById("activeTables")
        .textContent =
        active;

    document
        .getElementById("cashSales")
        .textContent =
        money(cash);

}


/* =========================
   INVOICES
========================= */

function renderInvoices(){

    const list =
        document.getElementById(
            "invoiceList"
        );

    const summary =
        document.getElementById(
            "invoiceSummary"
        );

    if(!list) return;

    const session =
        getSession();

    const invoices =
        getJSON(
            INVOICES_KEY,
            []
        );

    const mine =
        session
            ? invoices.filter(
                invoice =>
                    invoice.user
                    ===
                    session.username
            )
            : invoices;

    const total =
        mine.reduce(
            (sum,i) =>
                sum
                +
                Number(i.total || 0),
            0
        );

    const cash =
        mine.filter(
            i => i.payment === "cash"
        ).reduce(
            (sum,i) =>
                sum
                +
                Number(i.total || 0),
            0
        );

    const card =
        mine.filter(
            i => i.payment === "card"
        ).reduce(
            (sum,i) =>
                sum
                +
                Number(i.total || 0),
            0
        );

    if(summary){

        summary.innerHTML = `

            <div class="summary-card">

                <small>FATURA</small>

                <strong>
                    ${mine.length}
                </strong>

            </div>

            <div class="summary-card">

                <small>SHITJE</small>

                <strong>
                    ${money(total)}
                </strong>

            </div>

            <div class="summary-card">

                <small>CASH / KARTË</small>

                <strong style="font-size:15px;">
                    ${money(cash)}
                    /
                    ${money(card)}
                </strong>

            </div>

        `;

    }

    if(!mine.length){

        list.innerHTML = `

            <div class="empty">
                Nuk ka fatura.
            </div>

        `;

        return;

    }

    list.innerHTML =
        [...mine]
        .reverse()
        .map(
            invoice => `

                <div class="list-row">

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
                            ${new Date(
                                invoice.date
                            ).toLocaleString(
                                "sq-AL"
                            )}
                        </small>

                    </div>

                    <div style="text-align:right;">

                        <strong>
                            ${money(invoice.total)}
                        </strong>

                        <small>
                            ${invoice.payment}
                        </small>

                    </div>

                </div>

            `
        )
        .join("");

}


/* =========================
   ADMIN ROLE
========================= */

function applyRole(){

    const session =
        getSession();

    const admin =
        session
        &&
        session.role === "admin";

    document
        .querySelectorAll(".admin-only")
        .forEach(
            el => {

                el.style.display =
                    admin
                        ? ""
                        : "none";

            }
        );

    const adminPage =
        document.getElementById(
            "page-admin"
        );

    if(
        adminPage
        &&
        !admin
    ){

        adminPage.remove();

    }

}


/* =========================
   ADMIN USERS
========================= */

function renderAdmin(){

    const session =
        getSession();

    if(
        !session
        ||
        session.role !== "admin"
    ) return;

    const list =
        document.getElementById(
            "usersList"
        );

    if(!list) return;

    const users =
        getJSON(
            USERS_KEY,
            []
        );

    list.innerHTML =
        users.map(
            (user,index) => `

                <div class="admin-row">

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
                        ?
                        `
                        <button
                            class="admin-button red"
                            onclick="deleteUser(${index})"
                        >
                            FSHI
                        </button>
                        `
                        :
                        ""
                    }

                </div>

            `
        )
        .join("");


    renderAdminProducts();


    const settings =
        getJSON(
            SETTINGS_KEY,
            DEFAULT_SETTINGS
        );

    const tableInput =
        document.getElementById(
            "tableCount"
        );

    const appNameInput =
        document.getElementById(
            "appNameInput"
        );

    if(tableInput){

        tableInput.value =
            settings.tableCount || 12;

    }

    if(appNameInput){

        appNameInput.value =
            settings.appName || "MY BAR";

    }

}


/* =========================
   ADD WAITER
========================= */

function addWaiter(){

    const username =
        document
        .getElementById(
            "newUsername"
        )
        .value
        .trim()
        .toLowerCase();

    const name =
        document
        .getElementById(
            "newUserName"
        )
        .value
        .trim();

    const password =
        document
        .getElementById(
            "newUserPassword"
        )
        .value
        .trim();

    if(!username || !name || !password){

        toast(
            "Plotëso të gjitha fushat."
        );

        return;

    }

    const users =
        getJSON(
            USERS_KEY,
            []
        );

    if(
        users.some(
            u =>
                u.username
                .toLowerCase()
                ===
                username
        )
    ){

        toast(
            "Ky username ekziston."
        );

        return;

    }

    users.push({

        username:username,

        password:password,

        role:"waiter",

        name:name

    });

    setJSON(
        USERS_KEY,
        users
    );

    document
        .getElementById("newUsername")
        .value = "";

    document
        .getElementById("newUserName")
        .value = "";

    document
        .getElementById("newUserPassword")
        .value = "";

    renderAdmin();

    toast(
        "Përdoruesi u shtua."
    );

}


/* =========================
   DELETE USER
========================= */

function deleteUser(index){

    const users =
        getJSON(
            USERS_KEY,
            []
        );

    if(!users[index]) return;

    if(
        users[index].username
        ===
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

    renderAdmin();

    toast(
        "Përdoruesi u fshi."
    );

}


/* =========================
   ADMIN PRODUCTS
========================= */

function renderAdminProducts(){

    const list =
        document.getElementById(
            "productsAdminList"
        );

    if(!list) return;

    const products =
        getJSON(
            PRODUCTS_KEY,
            DEFAULT_PRODUCTS
        );

    list.innerHTML =
        products.map(
            product => `

                <div class="admin-row">

                    <div>

                        <strong>
                            ${escapeHTML(
                                product.name
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                product.category
                            )}
                            •
                            ${money(
                                product.price
                            )}
                            • Stok:
                            ${getStock(
                                product.id
                            )}
                        </small>

                    </div>

                    <div style="display:flex;gap:5px;">

                        <button
                            class="admin-button"
                            onclick="changeStock(${product.id},1)"
                        >
                            +
                        </button>

                        <button
                            class="admin-button red"
                            onclick="changeStock(${product.id},-1)"
                        >
                            −
                        </button>

                    </div>

                </div>

            `
        )
        .join("");

}


/* =========================
   ADD PRODUCT ADMIN
========================= */

function addProductAdmin(){

    const name =
        document
        .getElementById(
            "newProductName"
        )
        .value
        .trim();

    const category =
        document
        .getElementById(
            "newProductCategory"
        )
        .value
        .trim();

    const price =
        Number(
            document
            .getElementById(
                "newProductPrice"
            )
            .value
        );

    const stock =
        Number(
            document
            .getElementById(
                "newProductStock"
            )
            .value
        );


    if(
        !name
        ||
        !category
        ||
        !price
    ){

        toast(
            "Plotëso të dhënat e produktit."
        );

        return;

    }

    const products =
        getJSON(
            PRODUCTS_KEY,
            []
        );

    const id =
        Date.now();

    products.push({

        id:id,

        name:name,

        category:category,

        price:price,

        stock:
            stock >= 0
                ? stock
                : 0

    });

    setJSON(
        PRODUCTS_KEY,
        products
    );

    setStock(
        id,
        stock >= 0
            ? stock
            : 0
    );

    document
        .getElementById(
            "newProductName"
        )
        .value = "";

    document
        .getElementById(
            "newProductCategory"
        )
        .value = "";

    document
        .getElementById(
            "newProductPrice"
        )
        .value = "";

    document
        .getElementById(
            "newProductStock"
        )
        .value = "";

    renderCategories();

    renderProducts();

    renderAdmin();

    toast(
        "Produkti u shtua."
    );

}


/* =========================
   CHANGE STOCK
========================= */

function changeStock(id,amount){

    setStock(
        id,
        getStock(id)
        +
        Number(amount)
    );

    renderProducts();

    renderAdmin();

    toast(
        "Stoku u ndryshua."
    );

}


/* =========================
   TABLE COUNT
========================= */

function saveTableCount(){

    const input =
        document.getElementById(
            "tableCount"
        );

    const count =
        Math.max(
            1,
            Math.min(
                100,
                Number(input.value)
            )
        );

    const settings =
        getJSON(
            SETTINGS_KEY,
            DEFAULT_SETTINGS
        );

    settings.tableCount =
        count;

    setJSON(
        SETTINGS_KEY,
        settings
    );

    initializeTables();

    renderTables();

    toast(
        "Tavolinat u ruajtën."
    );

}


/* =========================
   APP NAME
========================= */

function saveAppName(){

    const input =
        document.getElementById(
            "appNameInput"
        );

    const settings =
        getJSON(
            SETTINGS_KEY,
            DEFAULT_SETTINGS
        );

    settings.appName =
        input.value.trim()
        ||
        "MY BAR";

    setJSON(
        SETTINGS_KEY,
        settings
    );

    renderHeader();

    toast(
        "Emri u ruajt."
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
        SELECTED_TABLE_KEY
    );

    localStorage.removeItem(
        "MYBAR_CURRENT_USER"
    );

    window.location.href =
        "login.html";

}


/* =========================
   TOAST
========================= */

let toastTimer;

function toast(message){

    const box =
        document.getElementById(
            "toast"
        );

    box.textContent =
        message;

    box.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {

                box.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================
   START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        initialize();

        setInterval(
            updateClock,
            1000
        );

        /*
           Rifreskon kategoritë/produktet
           për ndryshimin 20:00.
        */

        setInterval(
            function(){

                renderCategories();

                renderProducts();

            },
            60000
        );

    }
);

</script>

</body>
</html>
