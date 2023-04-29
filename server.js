const express = require('express');
const app = express();

const { initDb } = require('./db/connect');
initDb((err, db) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  } else {
    console.log('Connected to MongoDB');
  }
});

const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
