const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
const testRoute = require("./routes/test");

const app = express();

dotenv.config();

let port = 5000;

app.get("/api/v1/testapi", () => {
    console.log(chalk.blue("Test console successful!!"));
})

app.get("/api/v2/testapi", (req, res) => {
    res.send("<h1>Test API successful!!</h1>");
})

app.get("/api/v3/testapi", (req, res) => {
    res.redirect("http://www.google.com");
})

app.use(express.json());

app.use("/api/tests", testRoute);

app.listen(process.env.SERVER_PORT || port, () => {
    if(process.env.SERVER_PORT)
        console.log(chalk.bold.green(`Backend server started successfully!!! on PORT ${process.env.SERVER_PORT}`));
    else
        console.log(chalk.bold.green(`Backend server started successfully!!! on PORT ${port}`));
})