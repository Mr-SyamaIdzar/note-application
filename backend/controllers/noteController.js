// controllers/noteController.js — Business logic & response handler

const noteModel = require('../models/noteModel');

const noteController = {

  // GET /api/notes
  async getAll(req, res) {
    try {
      const notes = await noteModel.findAll();
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil data catatan', detail: err.message });
    }
  },

  // GET /api/notes/:id
  async getOne(req, res) {
    try {
      const note = await noteModel.findById(req.params.id);
      if (!note) return res.status(404).json({ error: 'Catatan tidak ditemukan' });
      res.json(note);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengambil catatan', detail: err.message });
    }
  },

  // POST /api/notes
  async create(req, res) {
    const { judul, isi } = req.body;
    if (!judul || !isi) {
      return res.status(400).json({ error: 'Judul dan isi wajib diisi' });
    }
    try {
      const note = await noteModel.create({ judul, isi });
      res.status(201).json(note);
    } catch (err) {
      res.status(500).json({ error: 'Gagal membuat catatan', detail: err.message });
    }
  },

  // PUT /api/notes/:id
  async update(req, res) {
    const { judul, isi } = req.body;
    if (!judul || !isi) {
      return res.status(400).json({ error: 'Judul dan isi wajib diisi' });
    }
    try {
      const exists = await noteModel.findById(req.params.id);
      if (!exists) return res.status(404).json({ error: 'Catatan tidak ditemukan' });

      const updated = await noteModel.update(req.params.id, { judul, isi });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Gagal mengupdate catatan', detail: err.message });
    }
  },

  // DELETE /api/notes/:id
  async remove(req, res) {
    try {
      const exists = await noteModel.findById(req.params.id);
      if (!exists) return res.status(404).json({ error: 'Catatan tidak ditemukan' });

      await noteModel.remove(req.params.id);
      res.json({ message: 'Catatan berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menghapus catatan', detail: err.message });
    }
  },
};

module.exports = noteController;