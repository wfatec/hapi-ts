'use strict'

require("reflect-metadata");
const Glue = require("glue");
const dotenv = require("dotenv");
const confidence = require("confidence");
const createDBConnection = require('./db').default;
const config = require("./config/config.json");

const { expect } = require('code');
const { it } = exports.lab = require('lab').script();

it('Testing / for successs', async () => {

    dotenv.config();

    const store = new confidence.Store(config);
    const manifest = store.get("/server", { env: process.env.NODE_ENV })

    const options = {
        relativeTo: __dirname
    };

    const connection = await createDBConnection();

    const server = await Glue.compose(manifest, options);

    server.app.dbConnection = connection;

    server.inject({ method: "GET", url: "/" }, (response) => {
        expect(response.result).to.equal("Hello World\n");
        expect(response.statusCode).to.equal(200);
    });;
});
// 设置环境变量
