class LastDigitModel {
    constructor() {
        this.result = "";
        this.idnumber = ""
    }
    
};

class LastDigitComputedModel {
    constructor() {
        this.lastdigit = "";
        this.fullidnumber = "";
        this.formattedidnumber = "";
    }
}

module.exports = { LastDigitModel, LastDigitComputedModel };