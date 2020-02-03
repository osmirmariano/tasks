require("dotenv").config();

const portHttp = process.env.PORT || 3000;

const bodyParser = require('body-parser');
const express = require('express');
const packageJson = require('../../package.json');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api/v1", require("./routes/index"));

app.listen(portHttp, () =>  console.log(`${packageJson.name} is running on port ${portHttp} - ${packageJson.version}`));

module.exports = app