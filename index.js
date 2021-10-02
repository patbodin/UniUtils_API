const express = require("express");
const chalk = require("chalk");

const app = express();

app.get("/api/v1/testapi", () => {
    console.log(chalk.blue("Test console successful!!"));
})

app.get("/api/v2/testapi", (req, res) => {
    res.send("Test API successful!!");
})

app.listen(5000, () => {
    console.log(chalk.bold.green("Backend server started successfully!!!"));
})