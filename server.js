const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { initDb } = require('./db/connect');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));
  
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
// Define a route for the root endpoint
app.use('/',contactsRouter);
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
