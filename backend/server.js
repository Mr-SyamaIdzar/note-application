// Import Package dan File
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./prisma/client"); // ganti: dulu require('./config/database')
const noteRoutes = require("./routes/noteRoutes");

// Inisialisasi Express
const app = express();

// Izinkan origin frontend lokal yang umum dipakai saat development
app.use(
  cors({
    origin: [
      "http://localhost",
      "http://localhost:5173",
      "http://127.0.0.1:5500",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Jika butuh kirim cookie/session
  }),
);

// Middleware untuk parsing JSON
app.use(express.json());

// Route dasar untuk testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Setting Routes
// dulu: require("./schema/User") → tidak diperlukan, Prisma pakai schema.prisma
app.use("/api/notes", noteRoutes); // ✅ benar

// Koneksi Database dan Jalankan Server
// dulu: sequelize.sync().then(() => app.listen(...))
// Prisma tidak perlu sync manual, tapi kita tetap test koneksi dulu
const port = process.env.PORT || 3000;

// Cloud Run merekomendasikan binding eksplisit ke 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});

prisma
  .$connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    // Jangan langsung di exit agar Cloud Run tetap mendeteksi server berjalan
    // sehingga Anda bisa melihat log error koneksinya dengan jelas di console
  });
