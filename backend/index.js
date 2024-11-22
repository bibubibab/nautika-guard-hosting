import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import midtransClient from "midtrans-client";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Konfigurasi Database
let db;

const initDatabase = async () => {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "*Nautika2024",
            database: process.env.DB_NAME || "nautika",
        });
        console.log("Koneksi database berhasil");
    } catch (error) {
        console.error("Koneksi database gagal:", error);
        process.exit(1);
    }
};

// Konfigurasi Midtrans
const snap = new midtransClient.Snap({
    isProduction: false, // Ganti ke true untuk produksi
    serverKey: "SB-Mid-server-EM2MmpJkTPcYNWPauekCnZAT",
});

// Endpoint Signup
app.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const [result] = await db.execute(
            "INSERT INTO user (fullName, email, password) VALUES (?, ?, ?)",
            [fullName, email, password]
        );
        res.status(201).json({ message: "User berhasil didaftarkan", userId: result.insertId });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Gagal mendaftarkan user", error });
    }
});

// Endpoint Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const [userRows] = await db.execute(
            "SELECT * FROM user WHERE email = ? AND password = ?",
            [email, password]
        );

        if (userRows.length > 0) {
            return res.status(200).json({
                message: "Login berhasil",
                user: { email, role: "user" },
            });
        }

        res.status(401).json({ message: "Email atau password salah" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Gagal login", error });
    }
});

// Endpoint Midtrans QRIS
app.post("/proses_payment", async (req, res) => {
    try {
        const { amount, name, email } = req.body;

        const parameter = {
            transaction_details: {
                order_id: `order-${Date.now()}`, // ID transaksi unik
                gross_amount: parseInt(amount), // Pastikan amount berupa integer
            },
            customer_details: {
                first_name: name,
                email: email,
            },
        };

        const transaction = await snap.createTransaction(parameter);
        res.status(200).json({ token: transaction.token, redirect_url: transaction.redirect_url });
    } catch (err) {
        console.error("Error creating transaction:", err.message);
        res.status(500).json({ message: "Error creating transaction", error: err.message });
    }
});


// Endpoint Utama
app.get("/", (req, res) => {
    res.send("Server berjalan dengan baik!");
});

// Inisialisasi Server
const startServer = async () => {
    await initDatabase(); // Inisialisasi koneksi database
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
};

startServer();
