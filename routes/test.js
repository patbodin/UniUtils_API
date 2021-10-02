const route = require("express").Router();

route.get("/v1/testjson", (req, res) => {
    res.json({
        team: "eTopup"
    });
})

route.get("/v2/testjson", (req, res) => {
    res.status(200).json({
        team: "ROM",
        dept: "FINE"
    });
})

module.exports = route;