const RespStatus = {
    SUCCESS: "Success",
    FAIL: "Fail"
}

const RespMsg = {
    C00000: "Process successful!",

    F00001: "ID Number must be 12-digit numeric characters",
    F00002: "ID Number must be 12-digit numeric characters alongside replaceStr",
    F00003: "A number of ID Numbers exceed process limitation",
}

module.exports = {
    RespStatus,
    RespMsg
}