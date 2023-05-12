// const express = require('express');
// const bodyParser = require('body-parser');
// const mongodb = require('./db/connect');
// const fs = require('fs');  // Add this line

// const port = process.env.PORT || 8080;
// const app = express();

// app
//   .use(bodyParser.json())
//   .use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   })
//   .use('/', require('./routes'));

// if (fs.existsSync('./swagger-output.json')) {  // Check if the file exists
//   const swaggerUi = require('swagger-ui-express');
//   const swaggerDocument = require('./swagger-output.json');
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// }

// mongodb.initDb((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
// });



///V2 working but no Frontend
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongodb = require('./db/connect');
// const fs = require('fs');  // Add this line

// const port = process.env.PORT || 8080;
// const app = express();

// app
//   .use(bodyParser.json())
//   .use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   })
//   .use('/', require('./routes'));

// if (fs.existsSync('./swagger-output.json')) {  // Check if the file exists
//   const swaggerUi = require('swagger-ui-express');
//   const swaggerDocument = require('./swagger-output.json');
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// }

// mongodb.initDb((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
// });
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const fs = require('fs');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://cse341-contacts-frontend.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
  .use('/', require('./routes'));

if (fs.existsSync('./swagger-output.json')) {
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = require('./swagger-output.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
