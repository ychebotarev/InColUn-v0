"use strict";
const config_1 = require('../config');
const jwt = require('jsonwebtoken');
function createToken(user) {
    var token = jwt.sign(user, config_1.server_config.secret, { expiresIn: '24h' });
    return token;
}
exports.createToken = createToken;
//# sourceMappingURL=createToken.js.map