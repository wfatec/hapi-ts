'use strict'

import "reflect-metadata";
import * as Glue from "glue";
import * as dotenv from 'dotenv';
import * as confidence from "confidence";
import createDBConnection from './db';
import config from './config/config';
import { Server } from "hapi";

// 设置环境变量
dotenv.config();

const store: confidence.Store = new confidence.Store(config);
const manifest:object = store.get("/server", { env: process.env.NODE_ENV })

const options = {
    relativeTo: __dirname
};

const init = async () => {
    const connection = await createDBConnection();

    const server:Server = await Glue.compose(manifest, options);

    (server.app as any).dbConnection = connection;

    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
};

process.on('unhandledRejection', (err) => {
    
    console.log(err);
    process.exit(1);
});
    

init();