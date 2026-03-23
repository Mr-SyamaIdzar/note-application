// routes/noteRoutes.js — Definisi endpoint untuk /api/notes

const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// GET    /api/notes        → ambil semua catatan
router.get("/", noteController.getAll);

// GET    /api/notes/:id    → ambil satu catatan
router.get("/:id", noteController.getOne);

// POST   /api/notes        → tambah catatan baru
router.post("/", noteController.create);

// PUT    /api/notes/:id    → edit catatan
router.put("/:id", noteController.update);

// DELETE /api/notes/:id    → hapus catatan
router.delete("/:id", noteController.remove);

module.exports = router;
