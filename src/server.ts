'use strict'

import * as hapi from 'hapi';
// const hapi = require('hapi');
// const server: hapi.Server = new hapi.Server()
const server: hapi.Server = new hapi.Server({
    port: 3000
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request: hapi.Request, h: hapi.HandlerDecorationMethod) => {

        return 'Hello, world!!';
    }
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
};

process.on('unhandledRejection', (err) => {
    
    console.log(err);
    process.exit(1);
});
    

init();