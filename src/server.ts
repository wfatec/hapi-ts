'use strict'

import * as hapi from 'hapi';
import "reflect-metadata";
import {createConnection, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { any } from 'joi';

const server: any = new hapi.Server({
    port: 3000
})

@Entity("Entries")
export class Entry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({
        nullable: true
    })
    content: string;
}

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

const init = async () => {
    const connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "123456",
        database: "test",
        entities: [
            Entry
        ],
        synchronize: true,
        logging: false
    });
    await server.start();
    server.app.dbConnection = connection;
    console.log(`Server running at: ${server.info.uri}`)
};

process.on('unhandledRejection', (err) => {
    
    console.log(err);
    process.exit(1);
});
    

init();