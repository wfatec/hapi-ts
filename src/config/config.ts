import * as Blipp from "blipp";
import * as Routes from "../plugins/routes";

export default {
    "server": {
        "server": {
            "$filter": "env",
            "production":{
                "port": 80
            }
            ,
            "$default":{
                "port": 3000
            }
        },
        "register": {
            "plugins": [
                { "plugin": Blipp, "options": { "showAuth": true } },
                { "plugin": Routes },
            ],
            "options": {
                "once": true
            }
        }
    },
    "db": {
        "$filter": { "$env": "DB_TYPE" },
        "postgres": {
            "type": "postgres",
            "host": {
                "$env": "POSTGRES_HOST",
                "$default": "localhost"
            },
            "port": {
                "$env": "POSTGRES_PORT",
                "$default": "5432"
            },
            "username": {
                "$env": "POSTGRES_USERNAME",
                "$default": "postgres"
            },
            "password": {
                "$env": "POSTGRES_PASSWORD",
                "$default": "123456"
            },
            "database": {
                "$env": "POSTGRES_DB_NAME",
                "$default": "test"
            }
        },
        "$default": {
            "host": "127.0.0.1",
            "port": 3306,
            "user": "dev",
            "password": "password",
            "database": "dev_db"
        }
        
    }
}