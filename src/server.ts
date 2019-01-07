'use strict'

import "reflect-metadata";
import * as Glue from "glue";
import createDBConnection from './config/db';
import manifest from './config/server';

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