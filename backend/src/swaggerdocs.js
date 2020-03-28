const swaggerUi = require('swagger-ui-express'); 
const swaggerJsDoc = require('swagger-jsdoc');

//Extended: https://swagger.io/specification/#info0bject
const Options = {
    swaggerDefinition: {
        info: {
            title: "API",
            description: "asdf",
            contact: {
                name: "qwer"
            },
            servers: ["http://localhost:3333"]
        },
        apis: ["server.js"]
    }
};

const specs = swaggerJsDoc(Options);

//const swaggerDocs = swaggerJsDoc(swaggerOptions);
//server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = (server) => {
    server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(Options));
}