const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, 'private.pem'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, 'public.pem'), 'utf8');

const jwtOptions = {
    secret: {
      private: privateKey,
      public: publicKey,
    },
    sign: {
      expiresIn: '365d',
      algorithm: 'RS256',
    },
    verify: {
      maxAge: '365d',
      algorithms: ['RS256'],
    },
  };

const setToken = (id, email) => {
    const accessToken = jwt.sign({ id, email, }, privateKey, jwtOptions.sign);
    const refreshToken = jwt.sign({ id, email, }, privateKey, jwtOptions.sign);

    return { accessToken, refreshToken };
}

const verifyAccessToken = (token) => {
    try {
        const verify = jwt.verify(token, privateKey, jwtOptions.verify);
        return verify;
    } catch {
        if (error.message !== 'jwt expired')
            console.error(`Access token error: ${error.message}`);
    }
};

const verifyRefreshToken = (token) => {
    try {
        const verify = jwt.verify(token, jwtOptions.secret, jwtOptions.verify);
        return verify;
    } catch {
        if (error.message !== 'jwt expired')
            console.error(`Refresh token error: ${error.message}`);
    }
};

module.exports = {
    setToken,
    verifyAccessToken,
    verifyRefreshToken,
}