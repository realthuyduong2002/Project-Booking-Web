const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        openapi: "3.0.3", // Phiên bản OpenAPI
        info: {
            title: "Your API Documentation",
            version: "1.0.0",
            description: "API Documentation for your Express application",
        },
        basePath: "/", // Đường dẫn cơ sở của API
    },
    apis: ["./routes/*.js"], // Đường dẫn đến các tệp chứa routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;