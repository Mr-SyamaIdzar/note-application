// models/noteModel.js — Query layer menggunakan Prisma

const prisma = require('../prisma/client');

const noteModel = {
  /** Ambil semua catatan, terbaru duluan */
  findAll() {
    return prisma.catatan.findMany({
      orderBy: { tanggal_dibuat: 'desc' },
    });
  },

  /** Ambil satu catatan by id */
  findById(id) {
    return prisma.catatan.findUnique({
      where: { id: Number(id) },
    });
  },

  /** Buat catatan baru */
  create({ judul, isi }) {
    return prisma.catatan.create({
      data: { judul, isi },
    });
  },

  /** Update catatan */
  update(id, { judul, isi }) {
    return prisma.catatan.update({
      where: { id: Number(id) },
      data:  { judul, isi },
    });
  },

  /** Hapus catatan */
  remove(id) {
    return prisma.catatan.delete({
      where: { id: Number(id) },
    });
  },
};

module.exports = noteModel;