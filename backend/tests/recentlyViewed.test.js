const request = require('supertest');
const app = require('../app');

describe('Recently Viewed Products', () => {
    it('should return recently viewed products for a user', async () => {
        const token = 'mockJWTToken'; // Replace with a valid token if needed
        const response = await request(app)
            .get('/api/v1/users/1/recentlyViewed')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
