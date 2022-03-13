const webPattern = require("../../commons/Const/RegularExpression");

function isValid(mynumber) {
    // console.log(idnumber.length);

    // const chkNum = mynumber.trim().length <= 2;
    const chkNum = isNumber(mynumber, webPattern.WebScrapingPattern.numberRegExp);

    return chkNum;
}

function isNumber(idnumber, myregex) {
    const regexObj = new RegExp(myregex);

    // console.log(`isNumber: ${regexObj.test(idnumber)}`);

    return regexObj.test(idnumber);
}

module.exports = {
    isValid,
};