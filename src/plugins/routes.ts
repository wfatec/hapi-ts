'use strict';

import * as hapi from 'hapi';
import * as Joi from 'joi';
import * as Boom from 'boom';
import {Entry} from '../models/entry';

exports.plugin = {
    name: 'routes',
    version: '1.0.0',
    register: async function (server, options) {

        // Create a route for example

        server.route({
            method: 'GET',
            path: '/',
            handler: async (request: hapi.Request, h: hapi.HandlerDecorationMethod) => {

                return 'Hello World!';
            },
            options: {
                tags: ['api'],
            }
        });

        server.route({
            method: 'GET',
            path: '/entry/{id}',
            handler: async (request: hapi.Request, h: hapi.HandlerDecorationMethod) => {
                const entryRepo = server.app.dbConnection.getRepository(Entry);
                const entries = await entryRepo.findOne(request.params.id);

                return entries||Boom.notFound('The entry id is not found!');
            },
            options: {
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.number().min(1)
                    }
                },
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
            },
            options: {
                tags: ['api'],
            }
        });
    }
};