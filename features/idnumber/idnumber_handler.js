const { LastDigitModel, LastDigitComputedModel } = require("../../models/idnumber/idnumber_model");
const stringUtils = require("../../commons/StringUtils");

const fullDigitRegExp = /^[0-9]{13}$/g;
const partDigitRegExp = /^[0-9]{12}$/g;

function isValid(idnumber) {
    // console.log(idnumber.length);

    const chkLength = idnumber.trim().length === 13;
    const chkRegex = isNumber(idnumber, fullDigitRegExp);

    // console.log(`Check Length: ${chkLength}`);
    // console.log(`Check Regex: ${chkRegex}`);
    // console.log(`----------------------------`);

    return chkLength && chkRegex;
}

function getLastDigit(idnumber) {
    let oResult = new LastDigitModel();
    let oComputedNum = new LastDigitComputedModel();

    let sumNum = 0;
    let modNum = 0;
    let lastDigit = '';

    if(isNumber(idnumber, partDigitRegExp) === true) {
        for(let i = 0; i < idnumber.length; i++){
            sumNum += Number(idnumber[i]) * (idnumber.length - i + 1);

            // console.log(`number: ${Number(idnumber[i])}, multiply: ${idnumber.length - i + 1}, sumNum: ${sumNum}`);
        }

        // console.log(`sumNum: ${sumNum}`);

        modNum = 11 - (sumNum % 11);
        lastDigit = modNum.toString();

        // console.log(`modNum: ${modNum}, lastDigit: ${lastDigit}`);

        oResult.result = "Success";
        oResult.idnumber = idnumber;

        oComputedNum.lastdigit = lastDigit[lastDigit.length - 1];
        oComputedNum.fullidnumber = idnumber + lastDigit[lastDigit.length - 1];
        oComputedNum.formattedidnumber = formattedNumber(oComputedNum.fullidnumber);

    }
    else {
        oResult.result = "Fail";
        oResult.idnumber = idnumber;
    }

    let spreadResult = { ...oResult, ...oComputedNum };

    return spreadResult;
}

function isNumber(idnumber, myregex) {
    const regexObj = new RegExp(myregex);

    // console.log(`isNumber: ${regexObj.test(idnumber)}`);

    return regexObj.test(idnumber);
}

function formattedNumber(idnumber) {
    let strResult = "";

    strResult = stringUtils.insertStr(idnumber, 1, "-");
    strResult = stringUtils.insertStr(strResult, 6, "-");
    strResult = stringUtils.insertStr(strResult, 12, "-");
    strResult = stringUtils.insertStr(strResult, 15, "-");

    return strResult;
}

module.exports = { isValid, getLastDigit };