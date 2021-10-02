const express = require("express");

const app = express();

app.get("/api/v1/testapi", () => {
    console.log("Test console successful!!");
})

app.get("/api/v2/testapi", (req, res) => {
    res.send("Test API successful!!");
})

app.listen(5000, () => {
    console.log("Backend server started successfully!!!");
})