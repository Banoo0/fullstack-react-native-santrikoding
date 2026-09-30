const router = require('express').Router();
const prisma = require('../lib/prisma');
const auth = require('../middleware/auth');

const withCreator = { creator: { select: { name: true } } };
const toJSON = (e) => ({ ...e, _id: e.id, attendees: e.attendeeIds });

// GET /api/events?search=&category=&location=&date=YYYY-MM-DD
router.get('/', async (req, res) => {
  try {
    const { search, category, location, date } = req.query;
    const where = {};
    if (search) where.title = { contains: search, mode: 'insensitive' };
    if (category) where.category = category;
    if (location) where.location = { contains: location, mode: 'insensitive' };
    if (date) where.date = date;

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
      include: withCreator,
    });
    res.json(events.map(toJSON));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Tiket = event yang diikuti user
router.get('/tickets/me', auth, async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { attendeeIds: { has: req.userId } },
      orderBy: { date: 'asc' },
    });
    res.json(events.map(toJSON));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: withCreator,
    });
    if (!event) return res.status(404).json({ message: 'Event tidak ditemukan' });
    res.json(toJSON(event));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, date, time, location } = req.body;
    if (!title || !date || !time || !location)
      return res.status(400).json({ message: 'Title, date, time, location wajib diisi' });

    const event = await prisma.event.create({
      data: { title, description, category, date, time, location, creatorId: req.userId },
    });
    res.status(201).json(toJSON(event));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Join / batal join (toggle)
router.post('/:id/join', auth, async (req, res) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!event) return res.status(404).json({ message: 'Event tidak ditemukan' });

    const joined = event.attendeeIds.includes(req.userId);
    const updated = await prisma.event.update({
      where: { id: event.id },
      data: {
        attendees: joined
          ? { disconnect: { id: req.userId } }
          : { connect: { id: req.userId } },
      },
    });
    res.json(toJSON(updated));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: req.params.id } });
    if (!event) return res.status(404).json({ message: 'Event tidak ditemukan' });
    if (event.creatorId !== req.userId)
      return res.status(403).json({ message: 'Bukan event kamu' });

    await prisma.event.delete({ where: { id: event.id } });
    res.json({ message: 'Event dihapus' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;