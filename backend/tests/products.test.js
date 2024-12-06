const request = require('supertest');
const app = require('../app');

describe('Products Endpoints', () => {
    it('should return a list of products', async () => {
        const response = await request(app).get('/api/v1/products/listProducts');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should log product views', async () => {
        const token = 'mockJWTToken'; 
        const response = await request(app)
            .post('/api/v1/products/1/view')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Product view logged!');
    });
});
