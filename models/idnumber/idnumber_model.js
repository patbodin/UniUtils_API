class CommonIdNumberModel {
    constructor() {
        this.result = "";
        this.message = "";
        this.idnumber = ""
    }
    
};

class CommonResult {
    constructor() {
        this.fullidnumber = "";
        this.formattedidnumber = "";
    }
};

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
        // this.inclusion = "";
        this.exclusion = [];
    }
};

class CommonIdNumberListModel {
    constructor() {
        this.result = "";
        this.message = "";
        this.totalnumber = 0;
        this.exclusion = [];
        this.idnumberlist = [];
    }
};

class LastDigitListModel {
    constructor() {
        this.idnumber = "";
        this.fullidnumber = "";
        this.formattedidnumber = "";
        this.lastdigit = "";
    }
}

class RandomIdNumberListModel {
    constructor() {
        this.idnumber = "";
        this.fullidnumber = "";
        this.formattedidnumber = "";
    }
}

module.exports = { 
    CommonIdNumberModel, 
    CommonResult, 
    LastDigitComputedModel, 
    IdNumberGeneratorModel,
    CommonIdNumberListModel,
    LastDigitListModel,
    RandomIdNumberListModel
};