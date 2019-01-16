import * as Blipp from "blipp";
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';
import * as Routes from "../plugins/routes";
// import * as Pack from "../../package.json"; //not valid
const Pack = require('../../package');

const swaggerOptions = {
    info: {
        title: 'Test API Documentation',
        version: Pack.version,
    },
};

export default {
    server: {
        server: {
            $filter: "env",
            production:{
                port: 80
            },
            $default:{
                port: 3000
            }
        },
        register: {
            plugins: [
                Inert,
                Vision,
                {
                    plugin: HapiSwagger,
                    options: swaggerOptions
                },
                { plugin: Blipp, options: { showAuth: true } },
                { plugin: Routes },
            ],
            options: {
                once: true
            }
        }
    },
    db: {
        $filter: { $env: "DB_TYPE" },
        postgres: {
            type: "postgres",
            host: {
                $env: "POSTGRES_HOST",
                $default: "localhost"
            },
            port: {
                $env: "POSTGRES_PORT",
                $default: "5432"
            },
            username: {
                $env: "POSTGRES_USERNAME",
                $default: "postgres"
            },
            password: {
                $env: "POSTGRES_PASSWORD",
                $default: "123456"
            },
            database: {
                $env: "POSTGRES_DB_NAME",
                $default: "test"
            }
        },
        $default: {
            host: "127.0.0.1",
            port: 3306,
            user: "dev",
            password: "password",
            database: "dev_db"
        }
        
    }
}