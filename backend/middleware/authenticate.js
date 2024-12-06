const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET || "721e9144924561e8033451ed3d3ef4ab58c1e21394eadd02261d52687bbcffbe598faf73307fe1a16809dbf7007830846c928b8809321aa11959a6148e0dc4335fce7ae89b55f4d837c417266a8955ea8fb27d6b8c7c962696ba19327606876a4ac37a2ef4e9cadd439d893ae327851738a4c072d49ef98e496d5eb7a468946d750232cdd37d3eea7ecd78feaaede9f619175b7c0c37d1bb9e199ef86f45954a903eeedbad9a76591afa5ecdd84aca198545b5672b3ef068f3aec7c777c1673536f5f340547716886483f4a5afbb7dcda0915498f4703cf1bc9de3f88f86c95fb76c1a552d43cccbe6bd38c69782428eba7f1359bcf70d2b076fc2f62e9667d3";

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Forbidden' });
    }
};

module.exports = authenticateJWT;
