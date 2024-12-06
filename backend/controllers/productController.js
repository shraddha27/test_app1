const db = require('../config/db');

const logProductView = async (req, res) => {
  console.log(req.user);
    const userId = req.user.userId;
    const productId = req.params.productId;

    try {
        await db.query(
            `INSERT INTO recently_viewed (user_id, product_id) VALUES (?, ?)
             ON DUPLICATE KEY UPDATE viewed_at = CURRENT_TIMESTAMP`,
            [userId, productId]
        );

        res.status(201).json({ message: 'Product view logged' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log product view'+err });
    }
};

const listProducts =  async (req, res) => {
    try {
      const [rows] = await db.query("SELECT id, name, description, price FROM products");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching products" });
    }
  };

// Get product details by ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        // Query to fetch product details by ID
        const query = 'SELECT * FROM products WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json(results[0]); // Return the first result
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

  

module.exports = { logProductView, listProducts, getProductById };
