class IDNumberPattern {
    static fullDigitRegExp = /^[0-9]{13}$/g;
    static partDigitRegExp = /^[0-9]{12}$/g;
    static chkDigitRegExp = /^.{12}$/g;
}

module.exports = {
    IDNumberPattern
}