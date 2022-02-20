const schema = require('../../model/dashboard');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config.json')
module.exports = {
    name: '/login',
    run: async (req, res) => {
        const url = process.oauth.generateAuthUrl({
            scope: ["identify"],
            state: require('crypto').randomBytes(16).toString("hex"), // Be aware that randomBytes is sync if no callback is provided
        });
        if (req.cookies.token && req.cookies.token.length > 0) {
            let decoded;
            try {
                decoded = jwt.verify(req.cookies.token, jwt_secret);
            } catch (e) {
                return res.redirect('/login');
            }
            if (!decoded) return res.redirect(url);
            let data = await schema.findOne({
                _id: decoded.uuid
            });
            if (!data) res.redirect(url);
            else {
                if ((Date.now() - data.lastUpdated) > data.expires_in * 1000) {
                    const oauthData = process.oauth.tokenRequest({
                        // clientId, clientSecret and redirectUri are omitted, as they were already set on the class constructor
                        refreshToken: data.refresh_token,
                        grantType: "refresh_token",
                        scope: ["identify"]
                    });
                    data.access_token = oauthData.access_token;
                    data.refresh_token = oauthData.refresh_token;
                    data.expires_in = oauthData.expires_in;
                }
                await data.save();
                res.redirect('/dashboard');
            }
        } else res.redirect(url);

    }
}