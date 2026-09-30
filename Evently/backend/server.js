require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Evently API running' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

const port = process.env.PORT || 5000;

prisma
  .$connect()
  .then(() => {
    console.log('Database connected');
    app.listen(port, '0.0.0.0', (err) => {
      if (err) {
        console.error('Gagal start server:', err.message);
        process.exit(1);
      }
      console.log(`Server on port ${port}`);
    });
  })
  .catch((err) => console.error('DB error:', err.message));