const { CommonIdNumberModel, LastDigitComputedModel, IdNumberGeneratorModel } = require("../../models/idnumber/idnumber_model");
const stringUtils = require("../../commons/StringUtils");
const numberUtils = require("../../commons/NumberUtils");

const fullDigitRegExp = /^[0-9]{13}$/g;
const partDigitRegExp = /^[0-9]{12}$/g;
const chkDigit = /^.{12}$/g;

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
    let oResult = new CommonIdNumberModel();
    let oComputedNum = new LastDigitComputedModel();

    let lastDigit = '';

    if(isNumber(idnumber, partDigitRegExp) === true) {
        
        lastDigit = findLastDigit(idnumber);

        // console.log(`modNum: ${modNum}, lastDigit: ${lastDigit}`);

        oResult.result = "Success";
        oResult.idnumber = idnumber;

        oComputedNum.lastdigit = lastDigit;
        oComputedNum.fullidnumber = idnumber + lastDigit;
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

function findLastDigit(idnumber) {
    let sumNum = 0;
    let lastDigit = 0;
    let strLastDigit = "";
    
    for(let i = 0; i < idnumber.length; i++){
        sumNum += Number(idnumber[i]) * (idnumber.length - i + 1);

        // console.log(`number: ${Number(idnumber[i])}, multiply: ${idnumber.length - i + 1}, sumNum: ${sumNum}`);
    }

    // console.log(`sumNum: ${sumNum}`);

    lastDigit = 11 - (sumNum % 11);
    strLastDigit = lastDigit.toString();

    return strLastDigit[strLastDigit.length - 1];
}

function idNumberGenerator(idnumber, replaceStr) {
    let oResult = new CommonIdNumberModel();
    let oComputedNum = new IdNumberGeneratorModel();

    let lastDigit = "";

    if(isNumber(idnumber, chkDigit) === true) {
        let strIdNumber = "";

        for(let i = 0; i < idnumber.length; i++){
            if(idnumber[i] == replaceStr) {
                strIdNumber += numberUtils.getRandomInt(0, 10).toString();

                // console.log(`Output: ${strIdNumber}`);
            } else {
                strIdNumber += idnumber[i].toString();
            }
        }

        lastDigit = findLastDigit(strIdNumber);

        oResult.result = "Success";
        oResult.idnumber = idnumber;
        oComputedNum.fullidnumber = strIdNumber + lastDigit;
        oComputedNum.formattedidnumber = formattedNumber(oComputedNum.fullidnumber);
        oComputedNum.replacestring = replaceStr;

    }
    else {
        oResult.result = "Fail";
        oResult.idnumber = idnumber;
    }

    let spreadResult = { ...oResult, ...oComputedNum };

    return spreadResult;
}

module.exports = { isValid, getLastDigit, idNumberGenerator };