const route = require("express").Router();
const loginHandler = require("../features/login/login_handler")

route.post('/v1/validatelogin', async (req, res) => {
    // const oResult = "" + req.body.username + req.body.password;
    const oResult = await loginHandler.validateLogin(req.body.username, req.body.password);
    
    // console.log(oResult);
    res.status(200).json(oResult.data);
});

module.exports = route;