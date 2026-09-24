const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint GET: Mengambil semua data Post
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({
      success: true,
      message: "Data berhasil diambil",
      data: posts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server Express berjalan di http://localhost:${PORT}`);
});