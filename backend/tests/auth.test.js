const request = require('supertest');
const app = require('../app'); // Import the Express app

describe('Authentication Endpoints', () => {
    it('should register a user', async () => {
        const response = await request(app).post('/api/v1/auth/register').send({
            email: 'testuser@example.com',
            password: 'password123',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully!');
    });

    it('should login a user', async () => {
        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'testuser@example.com',
            password: 'password123',
        });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
