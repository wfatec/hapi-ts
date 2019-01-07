'use strict';

import * as hapi from 'hapi';
import {Entry} from '../models/entry';

export default {
    name: 'myPlugin',
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example

        server.route({
            method: 'GET',
            path: '/',
            handler: async (request: hapi.Request, h: hapi.HandlerDecorationMethod) => {
                const entryRepo = server.app.dbConnection.getRepository(Entry);
                const entries = await entryRepo.find();
                return entries;
            }
        });
        
        server.route({
            method: 'POST',
            path: '/',
            handler: async (request, h) => {
        
                let {id, title, slug, content} = request.payload;
        
                let newEntry = new Entry();
                newEntry.id = id;
                newEntry.title = title;
                newEntry.slug = slug;
                newEntry.content= content;
        
                let entryRepo = server.app.dbConnection.getRepository(Entry);
                await entryRepo.save(newEntry);
        
                return "New post created"
            }
        });
    }
};