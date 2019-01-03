'use strict'

// import * as hapi from 'hapi';
const hapi = require('hapi');

const server = new hapi.Server({
    port: 3000
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`)
};

init();