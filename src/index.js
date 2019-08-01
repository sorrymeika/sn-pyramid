import { createApplication } from "snowball/app";
import "./sass/style.scss";
import router from "./app/router";
import { Server } from "./utils/Server";

const projects = {
};

const server = new Server({
    baseUri: '/auth_server'
});

createApplication({
    projects,
    routes: router,
    autoStart: true,
    extend() {
        return {
            server
        };
    },
    options: {
        disableTransition: true
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});
