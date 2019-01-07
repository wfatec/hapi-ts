import * as Blipp from "blipp";
import routes from '../plugins/routes';

export default {
    server: {
        port: 8000
    },
    register: {
        plugins: [
            { plugin: Blipp, options: { showAuth: true } },
            { plugin: routes }
        ],
        options: {
            once: true
        }
    }
}
