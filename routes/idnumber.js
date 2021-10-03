const idnumberHandler = require("../features/idnumber/idnumber_handler");
const respConst = require("../commons/Const/Response");

const route = require("express").Router();

route.get("/v1/isvalid", (req, res) => {
    res.status(200).json({
        result: respConst.SUCCESS,
        isValid: true
    })
})

route.get("/v1/isvalid/:idnumber", (req, res) => {
    const bResult = idnumberHandler.isValid(req.params.idnumber);

    res.status(200).json({
        result: bResult === true ? respConst.SUCCESS : respConst.FAIL,
        isValid: bResult
    })
})

route.get("/v1/getlastdigit/:idnumber", (req, res) => {
    const oResult = idnumberHandler.getLastDigit(req.params.idnumber);

    res.status(200).json(oResult);
})

route.get("/v1/idnumbergenerator/:idnumber", (req, res) => {
    const oResult = idnumberHandler.idNumberGenerator(req.params.idnumber, "_");

    res.status(200).json(oResult);
})

route.post("/v1/lastdigitlist", (req, res) => {
    // const oResult = idnumberHandler.idNumberGenerator(req.params.idnumber, "_");

    //-- TODO

    res.status(200).json(oResult);
})

route.post("/v1/idnumberlist", (req, res) => {
    // const oResult = idnumberHandler.idNumberGenerator(req.params.idnumber, "_");

    //-- TODO

    res.status(200).json(oResult);
})

module.exports = route;