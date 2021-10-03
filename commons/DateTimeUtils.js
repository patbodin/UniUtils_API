const responseDtm = require("../models/response/responsedtm_model");
const date = require("date-and-time");

function getResponseDateTime() {
    let currTimestamp = Date.now();
    let oDateTime = new Date(currTimestamp);
    let oResult = new responseDtm.ResponseDateTimeModel();

    oResult.timestamp = currTimestamp;
    oResult.datetime = date.format(oDateTime, "YYYY/MM/DD HH:mm:ss.SSS");

    return oResult;
}

module.exports = {
    getResponseDateTime
}