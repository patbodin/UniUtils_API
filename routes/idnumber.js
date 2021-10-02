const idnumberHandler = require("../features/idnumber/idnumber_handler");

const route = require("express").Router();

route.get("/v1/isvalid", (req, res) => {
    res.status(200).json({
        result: "Success",
        isValid: true
    })
})

route.get("/v1/:idnumber/isvalid", (req, res) => {
    const bResult = idnumberHandler.isValid(req.params.idnumber);

    res.status(200).json({
        result: bResult === true ? "Success" : "Fail",
        isValid: bResult
    })
})

route.get("/v1/:idnumber/getlastdigit", (req, res) => {
    const oResult = idnumberHandler.getLastDigit(req.params.idnumber);

    res.status(200).json(oResult);
})

route.get("/v1/:idnumber/idnumbergenerator", (req, res) => {
    const oResult = idnumberHandler.idNumberGenerator(req.params.idnumber, "_");

    res.status(200).json(oResult);
})

module.exports = route;