import * as confidence from "confidence";
import {createConnection} from "typeorm";
import * as config from './config/config.json';
import {Entry} from './models/entry';

export default async () => {
    const store = new confidence.Store(config);
    const db_config = store.get("/db");
    db_config.entities = [Entry];

    return await createConnection(db_config);
}