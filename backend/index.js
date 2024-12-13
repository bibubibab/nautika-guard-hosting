import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import multer from "multer";
import path from 'path';
import midtransClient from "midtrans-client";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message,
    });
  });
  

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
    res
      .status(201)
      .json({ message: "User berhasil didaftarkan", userId: result.insertId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Gagal mendaftarkan user", error });
  }
});

// Endpoint Login (Admin dan User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek admin terlebih dahulu
    const [adminRows] = await db.execute(
      "SELECT * FROM admin WHERE email = ? AND password = ?",
      [email, password]
    );

    if (adminRows.length > 0) {
      // Jika admin ditemukan
      return res.status(200).json({
        message: "Login berhasil",
        user: { email, role: "admin" },
      });
    }

    // Cek user jika bukan admin
    const [userRows] = await db.execute(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, password]
    );

    if (userRows.length > 0) {
      // Jika user ditemukan
      return res.status(200).json({
        message: "Login berhasil",
        user: { email, role: "user" },
      });
    }

    // Jika tidak ditemukan
    res.status(401).json({ message: "Email atau password salah" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Gagal login", error });
  }
});

/// Endpoint Midtrans QRIS
app.post("/proses_payment", async (req, res) => {
  try {
    const { amount, name, email } = req.body;

    // Validasi input
    if (!amount || isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid amount. It must be a positive number." });
    }
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Invalid name. It must be a non-empty string." });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const parameter = {
      transaction_details: {
        order_id: `order-${Date.now()}`, // ID transaksi unik
        gross_amount: parseInt(amount, 10), // Pastikan amount berupa integer
      },
      customer_details: {
        first_name: name,
        email: email,
      },
    };

    // Membuat transaksi menggunakan Snap API
    const transaction = await snap.createTransaction(parameter);

    // Response sukses
    res.status(200).json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (err) {
    console.error("Error creating transaction:", err.message, err.stack);
    res.status(500).json({
      message: "Failed to create transaction. Please try again later.",
      error: process.env.NODE_ENV === "development" ? err.message : undefined, // Jangan ekspos error detail pada produksi
    });
  }
});

// data masuk Formulir volunteer
app.post('/volunteer', async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        email,
        phone_number,
        interest_reason,
        suitability_reason,
        job_role,
      } = req.body;
  
      // Validasi manual
      if (!first_name || typeof first_name !== "string" || first_name.trim() === "") {
        return res.status(400).json({ message: "First name is required and must be a valid string." });
      }
      if (!last_name || typeof last_name !== "string" || last_name.trim() === "") {
        return res.status(400).json({ message: "Last name is required and must be a valid string." });
      }
      if (
        !email ||
        typeof email !== "string" ||
        email.trim() === "" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        return res.status(400).json({ message: "Email is required and must be a valid email address." });
      }
      if (
        !phone_number ||
        typeof phone_number !== "string" ||
        phone_number.trim() === "" ||
        !/^\d+$/.test(phone_number)
      ) {
        return res.status(400).json({ message: "Phone number is required and must be numeric." });
      }
      if (!interest_reason || typeof interest_reason !== "string" || interest_reason.trim() === "") {
        return res.status(400).json({ message: "Interest reason is required and must be a valid string." });
      }
      if (!suitability_reason || typeof suitability_reason !== "string" || suitability_reason.trim() === "") {
        return res.status(400).json({ message: "Suitability reason is required and must be a valid string." });
      }
      if (!job_role || typeof job_role !== "string" || job_role.trim() === "") {
        return res.status(400).json({ message: "Job role is required and must be a valid string." });
      }
  
      // Simpan ke database
      const query = `
        INSERT INTO volunteer 
        (first_name, last_name, email, phone_number, interest_reason, suitability_reason, job_role) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        first_name,
        last_name,
        email,
        phone_number,
        interest_reason,
        suitability_reason,
        job_role,
      ];
      await db.execute(query, values);
  
      res.status(201).json({ message: "Volunteer application submitted successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

// Menyajikan file statis dari folder 'uploads'
app.use("/uploads", express.static("uploads"));

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Direktori tempat file akan disimpan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});

const upload = multer({ storage: storage });

// Fetch a specific volunteer by ID
app.get('/volunteer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM volunteer WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching volunteer data' });
  }
});


// Endpoint untuk mengunggah laporan isu
app.post("/report_issue", upload.single("photo"), async (req, res) => {
  try {
    const {
      full_name,
      phone,
      title,
      location,
      description,
      expectation,
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    // Validasi input
    if (
      !full_name ||
      !phone ||
      !title ||
      !location ||
      !description ||
      !expectation ||
      !photo
    ) {
      return res
        .status(400)
        .json({ message: "Semua field wajib diisi, termasuk foto." });
    }

    // Simpan data ke database
    const query = `
      INSERT INTO issue 
      (full_name, phone, title, location, description, expectation, photo) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      full_name,
      phone,
      title,
      location,
      description,
      expectation,
      photo,
    ];
    await db.execute(query, values);

    res
      .status(201)
      .json({ message: "Laporan berhasil disimpan", photo_url: `/uploads/${photo}` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Gagal menyimpan laporan", error });
  }
});

// GET Profile Data by ID
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Ambil data user berdasarkan ID
    const [rows] = await db.execute("SELECT id, fullName, email FROM user WHERE id = ?", [id]);

    // Jika user tidak ditemukan
    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({ message: "User ditemukan", user: rows[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Gagal mengambil data user", error });
  }
});

// PUT Update Profile Data
app.put("/user", async (req, res) => {
  const { id, fullName, email, password } = req.body;

  try {
    // Validasi input
    if (!id || !fullName || !email || !password) {
      return res.status(400).json({ message: "Semua data wajib diisi" });
    }

    // Query untuk update data user
    const [result] = await db.execute(
      "UPDATE user SET fullName = ?, email = ?, password = ? WHERE id = ?",
      [fullName, email, password, id]
    );

    // Cek apakah ada data yang diperbarui
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({ message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Gagal memperbarui profil", error });
  }
});

// PUT Change Password
app.put("/user/change-password", async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;

  try {
    // Validasi input
    if (!id || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "Semua data wajib diisi" });
    }

    // Cek apakah password lama sesuai dengan yang ada di database
    const [rows] = await db.execute("SELECT password FROM user WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const storedPassword = rows[0].password;

    // Verifikasi password lama
    if (storedPassword !== oldPassword) {
      return res.status(400).json({ message: "Password lama tidak sesuai" });
    }

    // Update password jika validasi berhasil
    const [result] = await db.execute("UPDATE user SET password = ? WHERE id = ?", [
      newPassword,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.status(200).json({ message: "Password berhasil diperbarui" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Gagal memperbarui password", error });
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
