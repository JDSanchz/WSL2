const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger-output.json'
const endpointsFiles = ['./routes/contacts.js', './routes/index.js']  // add all route files you want to document

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation for my API"
    },
    host: "https://wslesson12esusdb.onrender.com/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    // Add other options here as needed
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')  // Your project's root file
})
