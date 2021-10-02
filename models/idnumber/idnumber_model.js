class CommonIdNumberModel {
    constructor() {
        this.result = "";
        this.idnumber = ""
    }
    
};

class CommonResult {
    constructor() {
        this.fullidnumber = "";
        this.formattedidnumber = "";
    }
}

class LastDigitComputedModel extends CommonResult {
    constructor() {
        super();
        this.lastdigit = "";
        // this.fullidnumber = "";
        // this.formattedidnumber = "";
    }
};

class IdNumberGeneratorModel extends CommonResult {
    constructor() {
        super();
        this.replacestring = "";
        this.inclusion = "";
        this.exclusion = "";
    }
};

module.exports = { CommonIdNumberModel, CommonResult, LastDigitComputedModel, IdNumberGeneratorModel };