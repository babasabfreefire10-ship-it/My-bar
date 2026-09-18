"use strict";

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

/*
=========================================================
MY BAR — FISCAL BACKEND
=========================================================

IMPORTANT:
- Mos vendos certifikatë, password ose token fiskal në index.html.
- Këto ruhen vetëm në server/environment variables.
- Endpoint-i real fiskal vendoset pasi të konfigurohet
  zgjidhja dhe të ndiqet procesi zyrtar i certifikimit.
=========================================================
*/

app.use(cors());
app.use(express.json({
    limit: "1mb"
}));


/* =====================================================
   CONFIGURATION
===================================================== */

const FISCAL_MODE =
    process.env.FISCAL_MODE || "TEST";

const FISCAL_API_URL =
    process.env.FISCAL_API_URL || "";

const FISCAL_API_TOKEN =
    process.env.FISCAL_API_TOKEN || "";

const BUSINESS_NIPT =
    process.env.BUSINESS_NIPT || "";

const SOFTWARE_CODE =
    process.env.SOFTWARE_CODE || "";


/* =====================================================
   BASIC HEALTH CHECK
===================================================== */

app.get("/", (req, res) => {

    res.json({
        app: "MY BAR",
        service: "Fiscal Backend",
        mode: FISCAL_MODE,
        status: "online"
    });
});


/* =====================================================
   FISCAL CONFIG STATUS
===================================================== */

app.get("/api/fiscal/status", (req, res) => {

    res.json({

        configured:
            Boolean(
                FISCAL_API_URL &&
                FISCAL_API_TOKEN &&
                BUSINESS_NIPT
            ),

        mode: FISCAL_MODE,

        niptConfigured:
            Boolean(BUSINESS_NIPT),

        endpointConfigured:
            Boolean(FISCAL_API_URL),

        tokenConfigured:
            Boolean(FISCAL_API_TOKEN),

        softwareConfigured:
            Boolean(SOFTWARE_CODE)
    });
});


/* =====================================================
   VALIDATE INVOICE
===================================================== */

function validateInvoice(invoice) {

    if (!invoice || typeof invoice !== "object") {
        return "Fatura mungon.";
    }

    if (!Array.isArray(invoice.items)) {
        return "Produktet e faturës mungojnë.";
    }

    if (invoice.items.length === 0) {
        return "Fatura nuk ka produkte.";
    }

    if (
        invoice.total === undefined ||
        Number(invoice.total) < 0
    ) {
        return "Totali i faturës nuk është i vlefshëm.";
    }

    if (!invoice.paymentMethod) {
        return "Metoda e pagesës mungon.";
    }

    return null;
}


/* =====================================================
   CREATE FISCAL INVOICE
===================================================== */

app.post(
    "/api/fiscal/invoice",
    async (req, res) => {

        try {

            const invoice =
                req.body;

            const validationError =
                validateInvoice(invoice);

            if (validationError) {

                return res.status(400).json({
                    success: false,
                    error: validationError
                });
            }


            /*
            -------------------------------------------------
            DEVELOPMENT / TEST MODE
            -------------------------------------------------

            Nuk bëjmë pretendim për fiskalizim real.
            Kjo pjesë kontrollon strukturën dhe kthen
            një përgjigje të përkohshme.
            */

            if (FISCAL_MODE !== "LIVE") {

                const testId =
                    "TEST-" +
                    Date.now();

                return res.json({

                    success: true,

                    mode: "TEST",

                    status: "READY_FOR_FISCALIZATION",

                    invoiceId:
                        testId,

                    message:
                        "Fatura u validua. Fiskalizimi real nuk është aktivizuar.",

                    invoice: invoice
                });
            }


            /*
            -------------------------------------------------
            LIVE MODE
            -------------------------------------------------

            Këtu vendoset integrimi real me shërbimin
            fiskal pasi të jetë konfiguruar endpoint-i
            dhe autentikimi sipas specifikimeve zyrtare.
            */

            if (
                !FISCAL_API_URL ||
                !FISCAL_API_TOKEN ||
                !BUSINESS_NIPT
            ) {

                return res.status(503).json({

                    success: false,

                    status:
                        "FISCAL_NOT_CONFIGURED",

                    message:
                        "Konfigurimi fiskal nuk është komplet."
                });
            }


            /*
            -------------------------------------------------
            PLACEHOLDER FOR OFFICIAL FISCAL SERVICE
            -------------------------------------------------

            Nuk dërgojmë kërkesë të sajuar te një API
            që mund të jetë e gabuar.

            Kur konfigurimi zyrtar të jetë gati,
            këtu implementohet request-i sipas
            dokumentacionit të DPT.
            */

            return res.status(501).json({

                success: false,

                status:
                    "FISCAL_INTEGRATION_PENDING",

                message:
                    "Integrimi LIVE duhet konfiguruar sipas specifikimeve zyrtare."
            });

        } catch (error) {

            console.error(
                "Fiscal error:",
                error
            );

            return res.status(500).json({

                success: false,

                status:
                    "SERVER_ERROR",

                message:
                    "Gabim në server."
            });
        }
    }
);


/* =====================================================
   START SERVER
===================================================== */

app.listen(
    PORT,
    () => {

        console.log(
            "MY BAR fiscal backend running on port",
            PORT
        );

        console.log(
            "Fiscal mode:",
            FISCAL_MODE
        );
    }
);
