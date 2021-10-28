const route = require("express").Router();
const loginHandler = require("../features/login/login_handler")
const logger = require("../features/logging/logging_handler");

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
    logger.info("+++ Login Validation Start +++");
    logger.info("Username: " + req.body.username);
    logger.info("Req Body: " + JSON.stringify(req.body));
    logger.info("Req Headers: " + JSON.stringify(req.headers));
    // const oResult = "" + req.body.username + req.body.password;
    const oResult = await loginHandler.validateLogin(req.body.username, req.body.password);
    
    logger.info("Resp Body: " + JSON.stringify(oResult.data));
    logger.info("Resp Headers: " + JSON.stringify(oResult.headers));
    logger.info("Result: " + oResult.data.result);
    logger.info("Process datetime: " + oResult.data.datetime);
    logger.info("+++ Login Validation End +++");
    // console.log(oResult);
    res.status(200).json(oResult.data);
});

module.exports = route;