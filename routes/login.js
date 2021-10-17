const route = require("express").Router();
const loginHandler = require("../features/login/login_handler")

/**
 * @swagger
 * /api/logins/v1/validatelogin:
 *   post:
 *     summary: Login with a selective credentials 
 *     description: Validate user & password then get a token as a passport.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username to login
 *                 example: admin
 *               password:
 *                 type: string
 *                 description: password to login
 *                 example: admin
 */
route.post('/v1/validatelogin', async (req, res) => {
    // const oResult = "" + req.body.username + req.body.password;
    const oResult = await loginHandler.validateLogin(req.body.username, req.body.password);
    
    // console.log(oResult);
    res.status(200).json(oResult.data);
});

module.exports = route;