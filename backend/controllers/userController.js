const db = require('../config/db');
//const redisClient = require('../config/redis');

const getRecentlyViewed = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Check Redis Cache
/*         const cachedData = await redisClient.get(`recentlyViewed:${userId}`);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        } */

        // Fetch from MySQL
        const [rows] = await db.query(
            `SELECT product_id, viewed_at 
             FROM recently_viewed 
             WHERE user_id = ? 
             ORDER BY viewed_at DESC 
             LIMIT 10`,
            [userId]
        );

        /* // Cache Data in Redis
        await redisClient.set(
            `recentlyViewed:${userId}`,
            JSON.stringify(rows),
            'EX',
            3600 // Cache for 1 hour
        ); */

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recently viewed products.' });
    }
};


module.exports = { getRecentlyViewed};
