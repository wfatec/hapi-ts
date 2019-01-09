'use strict'

import "reflect-metadata";
import * as Glue from "glue";
import * as dotenv from 'dotenv';
import * as confidence from "confidence";
import createDBConnection from './db';
// import * as config from './config/config.json';
import config from './config/config';

// 设置环境变量
dotenv.config();

const store = new confidence.Store(config);
const manifest = store.get("/server", { env: process.env.NODE_ENV })

const options = {
    relativeTo: __dirname
};

const init = async () => {
    const connection = await createDBConnection();

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