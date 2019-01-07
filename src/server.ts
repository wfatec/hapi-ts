'use strict'

import "reflect-metadata";
import * as Glue from "glue";
import * as dotenv from 'dotenv';
import * as confidence from "confidence";
import createDBConnection from './config/db';
import manifest from './config/server';
import { any } from "joi";

// 设置环境变量
dotenv.config();
// const config = require("./config/config");
// const store = new confidence.Store();
// store.load(config)
// const manifest = store.get("/", { env: process.env.NODE_ENV })
// console.log('manifest: ',manifest)

const {
    POSTGRES_PORT,
    POSTGRES_HOST,
    POSTGRES_DB_NAME,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD
} = process.env;

const options = {
    relativeTo: __dirname
};

const init = async () => {
    const connection = await createDBConnection({
        POSTGRES_PORT,
        POSTGRES_HOST,
        POSTGRES_DB_NAME,
        POSTGRES_USERNAME,
        POSTGRES_PASSWORD
    });

    const server = await Glue.compose(manifest, options);

    server.app.dbConnection = connection;

    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
};

process.on('unhandledRejection', (err) => {
    
    console.log(err);
    process.exit(1);
});
    

init();