const idnumberHandler = require("../features/idnumber/idnumber_handler");
const respConst = require("../commons/Const/Response");

const route = require("express").Router();

/**
 * @swagger
 * /api/users/v1/isvalid:
 *   get:
 *     summary: Simply get success response from the route 
 *     description: Simply return response without processing
 */
route.get("/v1/isvalid", (req, res) => {
    res.status(200).json({
        result: respConst.SUCCESS,
        isValid: true
    })
})

/**
 * @swagger
 * /api/users/v1/isvalid/{idnumber}:
 *   get:
 *     summary: Check if the idnumber provided is valid 
 *     description: The idnumber better be aligned with the formala, hence valid
 *     parameters:
 *       - in: path
 *         name: idnumber
 *         required: true
 *         description: Numeric ID of the user to be processed.
 *         schema:
 *           type: integer
 */
route.get("/v1/isvalid/:idnumber", (req, res) => {
    const bResult = idnumberHandler.isValid(req.params.idnumber);

    res.status(200).json({
        result: bResult === true ? respConst.SUCCESS : respConst.FAIL,
        isValid: bResult
    })
})

/**
 * @swagger
 * /api/users/v1/getlastdigit/{idnumber}:
 *   get:
 *     summary: Find the last digit of the input idnumber 
 *     description: The 12 given digits will be calculated as a result of the last digit
 *     parameters:
 *       - in: path
 *         name: idnumber
 *         required: true
 *         description: Numeric ID of the user to be processed.
 *         schema:
 *           type: integer
 */
route.get("/v1/getlastdigit/:idnumber", (req, res) => {
    const oResult = idnumberHandler.getLastDigit(req.params.idnumber);

    res.status(200).json(oResult);
})

route.get("/v1/idnumbergenerator/:idnumber", (req, res) => {
    const oResult = idnumberHandler.idNumberGenerator(req.params.idnumber, "_");

    res.status(200).json(oResult);
})

route.post("/v1/lastdigitlist", (req, res) => {
    const oResult = idnumberHandler.getLastDigitList(req.body.idnumberlist);

    res.status(200).json(oResult);
})

route.post("/v1/idnumberlist", (req, res) => {
    // const oResult = idnumberHandler.idNumberGenerator(req.params.idnumber, "_");

    //-- TODO

    res.status(200).json(oResult);
})

route.get("/v1/randomidnumber", (req, res) => {
    const oResult = idnumberHandler.getRandomIdNumber(req.query.count, req.query.exclude);
    // const oResult = idnumberHandler.getRandomIdNumber(req.query.count, "1234987");

    res.status(200).json(oResult);
})

module.exports = route;