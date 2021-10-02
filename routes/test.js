const route = require("express").Router();

//-- Test JSON
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

//-- Test Format
route.post("/v1/testformat", (req, res) => {
    res.format({
        'text/plain': () => {
            res.status(200).send("Hello");
        },
        'text/html': () => {
            res.status(200).send("<h2 style:color='red'>Hello</h2>");
        },
        'application/json': () => {
            res.status(200).json({message: "Hello"});
        },
        default: function() {
            res.status(406).send('Not Acceptable');
        }
    })
})

module.exports = route;