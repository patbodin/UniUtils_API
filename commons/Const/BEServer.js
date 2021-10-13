class BEServerConst {
    static serverDomain = "http://localhost";
    static serverPort = "3000";
    static serverFullDomain = `${this.serverDomain}:${this.serverPort}`;
}

module.exports = {
    BEServerConst
}