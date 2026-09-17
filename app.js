/* =========================================================
   SABI WAITER UI — SIMPLE PC STYLE
   ========================================================= */

function createWaiterStyle() {

    if (document.getElementById("sabiWaiterStyle")) return;

    const style = document.createElement("style");
    style.id = "sabiWaiterStyle";

    style.textContent = `

        /* =========================
           CLEAN PC STYLE
        ========================= */

        body {
            background:
                #0b0f0d !important;
        }

        /* Thin premium line */
        body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;

            background: #00c878;

            box-shadow:
                0 0 8px rgba(0,200,120,.35);

            z-index: 99999;
            pointer-events: none;
        }


        /* =========================
           HEADER
        ========================= */

        header {
            border-bottom:
                1px solid rgba(255,255,255,.07) !important;

            box-shadow:
                0 4px 18px rgba(0,0,0,.25) !important;
        }


        /* =========================
           BUTTONS
        ========================= */

        button {
            transition:
                background .15s ease,
                transform .15s ease !important;
        }

        button:active {
            transform: scale(.97);
        }


        /* =========================
           TABLE CARDS
        ========================= */

        .table-card {

            background:
                #121815 !important;

            border:
                1px solid rgba(255,255,255,.07) !important;

            box-shadow:
                0 4px 12px rgba(0,0,0,.25) !important;

            border-radius: 10px !important;

            transition:
                border-color .15s ease,
                background .15s ease !important;
        }

        .table-card:hover {

            border-color:
                rgba(0,200,120,.45) !important;

            background:
                #151c18 !important;
        }


        /* =========================
           MENU CARDS
        ========================= */

        .menu-card {

            background:
                #121815 !important;

            border:
                1px solid rgba(255,255,255,.07) !important;

            border-radius: 10px !important;

            box-shadow:
                0 3px 10px rgba(0,0,0,.22) !important;

            transition:
                border-color .15s ease,
                background .15s ease !important;
        }

        .menu-card:hover {

            border-color:
                rgba(0,200,120,.4) !important;
        }


        /* =========================
           ACTIVE ELEMENT
        ========================= */

        .active,
        .selected {

            border-color:
                #00c878 !important;

            box-shadow:
                0 0 0 1px rgba(0,200,120,.18) !important;
        }


        /* =========================
           MODALS
        ========================= */

        .modal {

            backdrop-filter:
                blur(4px) !important;
        }


        /* =========================
           MOBILE = PC STYLE
        ========================= */

        @media(max-width:600px) {

            body {
                font-size: 14px !important;
            }

            .table-card {
                border-radius: 8px !important;
            }

            .menu-card {
                border-radius: 8px !important;
            }

            button {
                min-height: 42px;
            }
        }

    `;

    document.head.appendChild(style);
}


function startWaiterStyle() {

    createWaiterStyle();

}


window.addEventListener(
    "DOMContentLoaded",
    startWaiterStyle
);

startWaiterStyle();
