<!DOCTYPE html>
<html lang="sq">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MY BAR</title>

<style>
*{
    box-sizing:border-box;
    margin:0;
    padding:0;
    -webkit-tap-highlight-color:transparent;
}

html,body{
    width:100%;
    height:100%;
    overflow:hidden;
    font-family:Arial,Helvetica,sans-serif;
    background:#050807;
    color:white;
}

body{
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
}

/* BACKGROUND */
.bg{
    position:absolute;
    inset:0;
    background:
        radial-gradient(circle at center,rgba(0,255,120,.10),transparent 35%),
        linear-gradient(135deg,#030504,#08100b 50%,#020403);
}

.grid{
    position:absolute;
    inset:0;
    opacity:.13;
    background-image:
        linear-gradient(rgba(0,255,120,.15) 1px,transparent 1px),
        linear-gradient(90deg,rgba(0,255,120,.15) 1px,transparent 1px);
    background-size:45px 45px;
}

/* LED BARS */
.led{
    position:absolute;
    top:0;
    bottom:0;
    width:4px;
    background:#00ff73;
    box-shadow:
        0 0 6px #00ff73,
        0 0 18px #00ff73,
        0 0 40px #00ff73;
    animation:ledColor 7s linear infinite;
    z-index:5;
}

.led.left{
    left:0;
}

.led.right{
    right:0;
}

.led::after{
    content:"";
    position:absolute;
    left:50%;
    width:22px;
    height:130px;
    transform:translateX(-50%);
    background:linear-gradient(
        to bottom,
        transparent,
        rgba(0,255,120,.9),
        transparent
    );
    filter:blur(5px);
    animation:travel 2.4s linear infinite;
}

@keyframes travel{
    0%{top:-140px;}
    100%{top:100%;}
}

@keyframes ledColor{
    0%,100%{
        background:#00ff73;
        box-shadow:0 0 8px #00ff73,0 0 25px #00ff73,0 0 50px #00ff73;
    }
    20%{
        background:#00eaff;
        box-shadow:0 0 8px #00eaff,0 0 25px #00eaff,0 0 50px #00eaff;
    }
    40%{
        background:#236cff;
        box-shadow:0 0 8px #236cff,0 0 25px #236cff,0 0 50px #236cff;
    }
    60%{
        background:#b52cff;
        box-shadow:0 0 8px #b52cff,0 0 25px #b52cff,0 0 50px #b52cff;
    }
    80%{
        background:#ff2c9c;
        box-shadow:0 0 8px #ff2c9c,0 0 25px #ff2c9c,0 0 50px #ff2c9c;
    }
}

/* CORNERS */
.corner{
    position:absolute;
    width:55px;
    height:55px;
    border-color:#00ff73;
    border-style:solid;
    opacity:.7;
    animation:pulse 2s infinite alternate;
}

.c1{top:25px;left:25px;border-width:2px 0 0 2px;}
.c2{top:25px;right:25px;border-width:2px 2px 0 0;}
.c3{bottom:25px;left:25px;border-width:0 0 2px 2px;}
.c4{bottom:25px;right:25px;border-width:0 2px 2px 0;}

@keyframes pulse{
    from{opacity:.3;}
    to{opacity:1;}
}

/* MAIN */
.content{
    position:relative;
    z-index:10;
    width:min(92%,600px);
    text-align:center;
}

.badge{
    display:inline-block;
    padding:8px 16px;
    border:1px solid rgba(0,255,115,.45);
    border-radius:30px;
    background:rgba(0,255,115,.06);
    color:#00ff73;
    font-size:11px;
    letter-spacing:3px;
    margin-bottom:25px;
    box-shadow:0 0 20px rgba(0,255,115,.12);
}

.logo{
    width:105px;
    height:105px;
    margin:0 auto 25px;
    display:flex;
    align-items:center;
    justify-content:center;
    transform:rotate(45deg);
    border:2px solid #00ff73;
    box-shadow:
        0 0 15px #00ff73,
        0 0 45px rgba(0,255,115,.4);
    background:rgba(0,255,115,.04);
}

.logo span{
    transform:rotate(-45deg);
    font-size:48px;
    font-weight:900;
    color:#00ff73;
    text-shadow:0 0 15px #00ff73;
}

h1{
    font-size:clamp(38px,10vw,75px);
    letter-spacing:8px;
    font-weight:900;
    margin-bottom:10px;
    text-shadow:
        0 0 10px rgba(255,255,255,.2),
        0 0 35px rgba(0,255,115,.25);
}

.subtitle{
    color:#9ca8a1;
    letter-spacing:5px;
    font-size:12px;
    margin-bottom:28px;
}

.line{
    width:180px;
    height:1px;
    margin:0 auto 30px;
    background:linear-gradient(90deg,transparent,#00ff73,transparent);
    box-shadow:0 0 12px #00ff73;
}

/* BUTTONS */
.buttons{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:13px;
}

.btn{
    width:min(100%,330px);
    min-height:56px;
    border-radius:12px;
    border:1px solid #00ff73;
    background:rgba(0,255,115,.08);
    color:white;
    font-size:14px;
    font-weight:800;
    letter-spacing:2px;
    cursor:pointer;
    touch-action:manipulation;
    user-select:none;
    transition:.2s ease;
    box-shadow:
        0 0 10px rgba(0,255,115,.15),
        inset 0 0 15px rgba(0,255,115,.03);
}

.btn:hover{
    background:#00ff73;
    color:#031008;
    transform:translateY(-2px);
    box-shadow:
        0 0 15px #00ff73,
        0 0 40px rgba(0,255,115,.35);
}

.btn:active{
    transform:scale(.96);
    background:#00ff73;
    color:#031008;
}

.btn.main{
    background:#00ff73;
    color:#031008;
    box-shadow:
        0 0 15px #00ff73,
        0 0 45px rgba(0,255,115,.3);
}

.btn.main:hover{
    background:#66ffad;
}

.contact-btn{
    border-color:rgba(255,255,255,.25);
    color:#b8c0bb;
    background:rgba(255,255,255,.03);
}

/* FOOTER */
.footer{
    margin-top:35px;
    color:#56615b;
    font-size:10px;
    letter-spacing:3px;
}

/* MODAL */
.modal{
    display:none;
    position:fixed;
    inset:0;
    z-index:100;
    background:rgba(0,0,0,.78);
    backdrop-filter:blur(8px);
    align-items:center;
    justify-content:center;
    padding:20px;
}

.modal.show{
    display:flex;
}

.modal-box{
    width:min(100%,430px);
    background:#08100b;
    border:1px solid #00ff73;
    border-radius:18px;
    padding:25px;
    box-shadow:
        0 0 20px #00ff73,
        0 0 80px rgba(0,255,115,.2);
}

.modal-box h2{
    color:#00ff73;
    margin-bottom:10px;
    font-size:20px;
}

.modal-box p{
    color:#929c96;
    font-size:13px;
    line-height:1.6;
    margin-bottom:18px;
}

.modal-box textarea{
    width:100%;
    min-height:120px;
    resize:none;
    border-radius:10px;
    border:1px solid #24352a;
    background:#030604;
    color:white;
    padding:13px;
    outline:none;
    margin-bottom:12px;
}

.modal-box textarea:focus{
    border-color:#00ff73;
    box-shadow:0 0 12px rgba(0,255,115,.2);
}

.modal-buttons{
    display:flex;
    gap:10px;
}

.modal-buttons button{
    flex:1;
    min-height:48px;
    border-radius:10px;
    cursor:pointer;
    font-weight:bold;
}

.send{
    background:#00ff73;
    border:0;
    color:#031008;
}

.close{
    background:transparent;
    border:1px solid #38443d;
    color:white;
}

@media(max-width:500px){
    .corner{
        width:35px;
        height:35px;
    }

    .logo{
        width:82px;
        height:82px;
    }

    .logo span{
        font-size:38px;
    }

    h1{
        letter-spacing:5px;
    }

    .subtitle{
        letter-spacing:3px;
    }

    .footer{
        margin-top:25px;
    }
}
</style>
</head>

<body>

<div class="bg"></div>
<div class="grid"></div>

<div class="led left"></div>
<div class="led right"></div>

<div class="corner c1"></div>
<div class="corner c2"></div>
<div class="corner c3"></div>
<div class="corner c4"></div>

<main class="content">

    <div class="badge">SISTEM PREMIUM • V2</div>

    <div class="logo">
        <span>S</span>
    </div>

    <h1>MY BAR</h1>

    <div class="subtitle">
        SISTEMI I MENAXHIMIT
    </div>

    <div class="line"></div>

    <div class="buttons">

        <button
            type="button"
            class="btn main"
            id="enterBtn">
            HYR NË SISTEM →
        </button>

        <button
            type="button"
            class="btn contact-btn"
            id="contactBtn">
            CONTACT
        </button>

    </div>

    <div class="footer">
        MY BAR • SISTEM PREMIUM • 2026
    </div>

</main>

<!-- CONTACT MODAL -->
<div class="modal" id="contactModal">

    <div class="modal-box">

        <h2>RAPORTO NJË PROBLEM</h2>

        <p>
            Na shkruaj problemin që ke hasur në sistemin MY BAR.
        </p>

        <textarea
            id="reportText"
            placeholder="Shkruaj problemin këtu..."></textarea>

        <div class="modal-buttons">

            <button
                type="button"
                class="send"
                id="sendReport">
                DËRGO
            </button>

            <button
                type="button"
                class="close"
                id="closeModal">
                MBYLL
            </button>

        </div>

    </div>

</div>

<script>

/* HYR NË SISTEM */
document.getElementById("enterBtn").addEventListener("click", function(){

    window.location.href = "login.html";

});

/* CONTACT */
const modal = document.getElementById("contactModal");

document.getElementById("contactBtn").addEventListener("click", function(){

    modal.classList.add("show");

});

/* MBYLL */
document.getElementById("closeModal").addEventListener("click", function(){

    modal.classList.remove("show");

});

/* KLIKO JASHTË MODALIT */
modal.addEventListener("click", function(e){

    if(e.target === modal){
        modal.classList.remove("show");
    }

});

/* DËRGO RAPORTIM */
document.getElementById("sendReport").addEventListener("click", function(){

    const text = document.getElementById("reportText").value.trim();

    if(!text){

        alert("Shkruaj problemin më parë.");
        return;

    }

    alert("Raportimi u regjistrua. Faleminderit!");

    document.getElementById("reportText").value = "";
    modal.classList.remove("show");

});

</script>

</body>
</html>
