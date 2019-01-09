import * as confidence from "confidence";
import {createConnection, Connection} from "typeorm";
import * as config from './config/config.json';
import {Entry} from './models/entry';

const createDBConnection: (params?:object) => Promise<Connection> = async () => {
    const store = new confidence.Store(config);
    const db_config = store.get("/db");
    db_config.entities = [Entry];

    return await createConnection(db_config);
}

export default createDBConnection;