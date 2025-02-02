const jwt = require('jsonwebtoken');
const createSignToken = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    return token;
}

module.exports = createSignToken;