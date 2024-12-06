const express = require('express');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Recently Viewed Products API',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:5000' }],
    },
    apis: ['./src/routes/*.js'], // API files
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

app.use(errorHandler);

module.exports = app;
