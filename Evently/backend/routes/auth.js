const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const auth = require('../middleware/auth');

const sign = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, job: u.job, location: u.location });

router.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = (req.body.email || '').toLowerCase();
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Semua field wajib diisi' });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashed } });
    res.status(201).json({ token: sign(user), user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = (req.body.email || '').toLowerCase();
    const { password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Email atau password salah' });
    res.json({ token: sign(user), user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    const created = await prisma.event.count({ where: { creatorId: req.userId } });
    const joined = await prisma.event.count({ where: { attendeeIds: { has: req.userId } } });
    res.json({ user: publicUser(user), stats: { created, joined } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;