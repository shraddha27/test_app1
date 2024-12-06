const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

redisClient.on('error', (err) => console.error('Redis Client Error',err));

redisClient.connect();

module.exports = redisClient;
