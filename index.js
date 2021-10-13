const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
const testRoute = require("./routes/test");
const idnumberRoute = require("./routes/idnumber");
const routelist = require("express-list-routes");
const axios = require("axios");
const cors = require("cors");

const app = express();

dotenv.config();

let port = 5000;

app.use(express.json());
app.use(cors());

app.get("/api/v1/testapi", () => {
    console.log(chalk.blue("Test console successful!!"));
})

app.get("/api/v2/testapi", (req, res) => {
    res.send("<h1>Test API successful!!</h1>");
})

app.get("/api/v3/testapi", (req, res) => {
    res.redirect("http://www.google.com");
})

app.get("/api/v1/routelist", (req, res) => {
    res.send("Please see console for route list");
    routelist(app, { prefix: '/' });
})

app.get("/api/v1/testgenpass", async (req, res) => {
    let iCount = req.query.c ? req.query.c : 10;
    let iLength = req.query.l ? req.query.l : 12;

    // await axios.get('https://makemeapassword.ligos.net/api/v1/alphanumeric/json', {
    //     params: {
    //         c: 10,
    //         l: 12
    //     }
    // }).then((resp) => {
    //     res.json(resp);
    // }).catch((err) => {
    //     res.json(err);
    // });

    // axios.get('https://makemeapassword.ligos.net/api/v1/alphanumeric/json?c=10&l=12'
    // ).then((resp) => {
    //     res.json(resp);
    // }).catch((err) => {
    //     res.json(err);
    // });

    try {
        const resp = await axios.get('https://makemeapassword.ligos.net/api/v1/alphanumeric/json', {
            params: {
                c: iCount,
                l: iLength
            }
        });

        res.json(resp.data);
    }
    catch (err) {
        res.json(err);
    }

})


app.use("/api/tests", testRoute);
app.use("/api/idnumbers", idnumberRoute);

app.listen(process.env.SERVER_PORT || port, () => {
    if (process.env.SERVER_PORT)
        console.log(chalk.bold.green(`Backend server started successfully!!! on PORT ${process.env.SERVER_PORT}`));
    else
        console.log(chalk.bold.green(`Backend server started successfully!!! on PORT ${port}`));
})