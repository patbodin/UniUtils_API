const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
const testRoute = require("./routes/test");
const idnumberRoute = require("./routes/idnumber");
const loginRoute = require("./routes/login");
const routelist = require("express-list-routes");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

dotenv.config();

let port = 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for UniUtils',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express.',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'JSONPlaceholder',
            url: 'https://jsonplaceholder.typicode.com',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

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

app.get("/api/v1/testbe", async (req, res) => {
    try {
        const resp = await axios.get('http://localhost:3000/');

        res.json(resp.data);
    }
    catch (err) {
        res.json(err);
    }
});


app.use("/api/tests", testRoute);
app.use("/api/idnumbers", idnumberRoute);
app.use("/api/logins", loginRoute);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.SERVER_PORT || port, () => {
    if (process.env.SERVER_PORT)
        console.log(chalk.green(`Backend server started successfully!!! on PORT ${chalk.bold(process.env.SERVER_PORT)}`));
    else
        console.log(chalk.green(`Backend server started successfully!!! on PORT ${chalk.bold(port)}`));
})