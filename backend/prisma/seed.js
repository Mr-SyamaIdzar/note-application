// prisma/seed.js — Data awal untuk development

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.catatan.deleteMany(); // hapus data lama

  await prisma.catatan.createMany({
    data: [
      { judul: 'Belanja Mingguan',  isi: 'Beras, telur, minyak, sabun, shampo, teh, kopi, susu.' },
      { judul: 'Rencana Belajar',   isi: 'Pelajari Express.js dan MySQL. Buat REST API sederhana untuk proyek akhir semester.' },
      { judul: 'Ide Proyek',        isi: 'Aplikasi manajemen tugas berbasis web dengan notifikasi real-time menggunakan Socket.io.' },
      { judul: 'Catatan Kuliah',    isi: 'Cloud Computing: Perbedaan IaaS, PaaS, SaaS. Virtual Machine vs Container. Deploy ke GCP.' },
    ],
  });

  console.log('✅ Seeding selesai!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });