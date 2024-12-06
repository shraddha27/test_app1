const db = require('../config/db');
//const redisClient = require('../config/redis');


const login = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
  
      if (rows.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      const user = rows[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging in" });
    }
  };

  const register = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if user already exists
      const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
      const [existingUser] = await db.query(checkUserQuery, [email]);
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert new user into the database
      const insertUserQuery = `
        INSERT INTO users (username, password)
        VALUES (?, ?)
      `;
      await db.query(insertUserQuery, [username, hashedPassword]);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

module.exports = {login, register };
