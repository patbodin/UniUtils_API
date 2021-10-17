class BEServerConst {
    static serverDomain = "http://localhost";
    static serverPort = "3000";
    // static serverDomain = "http://10.138.46.91";
    // static serverPort = "5199";
    static serverFullDomain = `${this.serverDomain}:${this.serverPort}`;
}

module.exports = {
    BEServerConst
}