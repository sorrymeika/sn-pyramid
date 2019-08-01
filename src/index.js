import { createApplication } from "snowball/app";
import { Server } from "sn-cornerstone";
import "./sass/style.scss";
import router from "./app/router";

const projects = {
};

const marketServer = new Server({
    baseUri: '/market_server'
});

createApplication({
    projects,
    routes: router,
    autoStart: true,
    extend() {
        return {
            marketServer
        };
    },
    options: {
        disableTransition: true
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});
