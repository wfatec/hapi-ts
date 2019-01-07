import {Entry} from '../models/entry';
import {createConnection} from "typeorm";

export default async ({
    POSTGRES_PORT,
    POSTGRES_HOST,
    POSTGRES_DB_NAME,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD
}) => {
    return await createConnection({
        type: "postgres",
        host: POSTGRES_HOST||"localhost",
        port: POSTGRES_PORT||5432,
        username: POSTGRES_USERNAME||"postgres",
        password: POSTGRES_PASSWORD||"123456",
        database: POSTGRES_DB_NAME||"test",
        entities: [
            Entry
        ]
    });
}