const { CommonIdNumberModel, LastDigitComputedModel, IdNumberGeneratorModel } = require("../../models/idnumber/idnumber_model");
const stringUtils = require("../../commons/StringUtils");
const numberUtils = require("../../commons/NumberUtils");
const respConst = require("../../commons/Const/Response");
const datetimeUtils = require("../../commons/DateTimeUtils");
const idnumberPattern = require("../../commons/Const/RegularExpression");

function isValid(idnumber) {
    // console.log(idnumber.length);

    const chkLength = idnumber.trim().length === 13;
    const chkNumeric = isNumber(idnumber, idnumberPattern.IDNumberPattern.fullDigitRegExp);
    const lastDigit = findLastDigit(idnumber.substr(0, 12));
    const chkLastDigit = idnumber[idnumber.length - 1] === lastDigit;

    // console.log(`Check Length: ${chkLength}`);
    // console.log(`Check Regex: ${chkNumeric}, Pattern: ${idnumberPattern.IDNumberPattern.fullDigitRegExp}`);
    // console.log(`----------------------------`);
    // console.log(`Check LastDigit: ${chkLastDigit}, LastDigit: ${lastDigit}`);

    return chkLength && chkNumeric && chkLastDigit;
}

function getLastDigit(idnumber) {
    let oResult = new CommonIdNumberModel();
    let oComputedNum = new LastDigitComputedModel();

    let lastDigit = '';

    if(isNumber(idnumber, idnumberPattern.IDNumberPattern.partDigitRegExp) === true) {
        
        lastDigit = findLastDigit(idnumber);

        // console.log(`modNum: ${modNum}, lastDigit: ${lastDigit}`);

        oResult.result = respConst.RespStatus.SUCCESS;
        oResult.message = respConst.RespMsg.C00000;
        oResult.idnumber = idnumber;

        oComputedNum.lastdigit = lastDigit;
        oComputedNum.fullidnumber = idnumber + lastDigit;
        oComputedNum.formattedidnumber = formattedNumber(oComputedNum.fullidnumber);

    }
    else {
        oResult.result = respConst.RespStatus.FAIL;
        oResult.message = respConst.RespMsg.F00001;
        oResult.idnumber = idnumber;
    }

    let oRespDtm = datetimeUtils.getResponseDateTime();
    let spreadResult = { ...oResult, ...oComputedNum, ...oRespDtm };

    return spreadResult;
}

function isNumber(idnumber, myregex) {
    const regexObj = new RegExp(myregex);

    // console.log(`isNumber: ${regexObj.test(idnumber)}`);

    return regexObj.test(idnumber);
}

function formattedNumber(idnumber, formattedIndex = [1, 6, 12, 15]) {
    let strResult = idnumber;

    // strResult = stringUtils.insertStr(strResult, 1, "-");
    // strResult = stringUtils.insertStr(strResult, 6, "-");
    // strResult = stringUtils.insertStr(strResult, 12, "-");
    // strResult = stringUtils.insertStr(strResult, 15, "-");

    for(let index of formattedIndex) {
        strResult = stringUtils.insertStr(strResult, index, "-");
        // console.log(strResult);
    }

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

    if(isNumber(idnumber, idnumberPattern.IDNumberPattern.chkDigitRegExp) === true) {
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

        oResult.result = respConst.RespStatus.SUCCESS;
        oResult.message = respConst.RespMsg.C00000;
        oResult.idnumber = idnumber;
        oComputedNum.fullidnumber = strIdNumber + lastDigit;
        oComputedNum.formattedidnumber = formattedNumber(oComputedNum.fullidnumber);
        oComputedNum.replacestring = replaceStr;

    }
    else {
        oResult.result = respConst.RespStatus.FAIL;
        oResult.message = respConst.RespMsg.F00002;
        oResult.idnumber = idnumber;
    }

    let oRespDtm = datetimeUtils.getResponseDateTime();
    let spreadResult = { ...oResult, ...oComputedNum, ...oRespDtm };

    return spreadResult;
}

function getLastDigitList(idnumberlist) {
    if(idnumberlist.length > 50) {

    }

    // let oResult = new CommonIdNumberModel();
    // let oComputedNum = new LastDigitComputedModel();

    // let lastDigit = '';

    // if(isNumber(idnumber, partDigitRegExp) === true) {
        
    //     lastDigit = findLastDigit(idnumber);

    //     oResult.result = respConst.SUCCESS;
    //     oResult.idnumber = idnumber;

    //     oComputedNum.lastdigit = lastDigit;
    //     oComputedNum.fullidnumber = idnumber + lastDigit;
    //     oComputedNum.formattedidnumber = formattedNumber(oComputedNum.fullidnumber);

    // }
    // else {
    //     oResult.result = respConst.FAIL;
    //     oResult.idnumber = idnumber;
    // }

    // let oRespDtm = datetimeUtils.getResponseDateTime();
    // let spreadResult = { ...oResult, ...oComputedNum, ...oRespDtm };

    // return spreadResult;
}

module.exports = { 
    isValid, 
    getLastDigit, 
    idNumberGenerator 
};