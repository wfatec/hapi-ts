import {Entry} from '../models/entry';
import {createConnection} from "typeorm";

export default async () => {
    return await createConnection({
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
}