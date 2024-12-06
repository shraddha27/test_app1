const db = require('../config/db');
const redisClient = require('../config/redis');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "721e9144924561e8033451ed3d3ef4ab58c1e21394eadd02261d52687bbcffbe598faf73307fe1a16809dbf7007830846c928b8809321aa11959a6148e0dc4335fce7ae89b55f4d837c417266a8955ea8fb27d6b8c7c962696ba19327606876a4ac37a2ef4e9cadd439d893ae327851738a4c072d49ef98e496d5eb7a468946d750232cdd37d3eea7ecd78feaaede9f619175b7c0c37d1bb9e199ef86f45954a903eeedbad9a76591afa5ecdd84aca198545b5672b3ef068f3aec7c777c1673536f5f340547716886483f4a5afbb7dcda0915498f4703cf1bc9de3f88f86c95fb76c1a552d43cccbe6bd38c69782428eba7f1359bcf70d2b076fc2f62e9667d3";



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
      const [existingUser] = await db.query(checkUserQuery, [username]);
      console.log(existingUser);
  
      if (existingUser.length>0) {
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
