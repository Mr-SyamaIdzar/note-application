// Import Package dan File
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./prisma/client"); // ganti: dulu require('./config/database')
const noteRoutes = require("./routes/noteRoutes");

// Inisialisasi Express
const app = express();

// Izinkan origin frontend dari mana saja (semua origin)
// agar frontend App Engine bisa memanggil backend ini tanpa terkena error CORS.
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
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
// Prisma tidak perlu sync manual, tapi kita tetap test koneksi dulu test
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
