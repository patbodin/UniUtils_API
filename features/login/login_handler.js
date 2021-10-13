const axios = require("axios");
const { BEServerConst } = require("../../commons/Const/BEServer");

async function validateLogin(myUsername, myPassword) {
    const resp = await axios.post(`${BEServerConst.serverFullDomain}/api/logins/v1/validatelogin`, {
        username: myUsername,
        password: myPassword
    });

    return resp;
}

module.exports = { 
    validateLogin
}