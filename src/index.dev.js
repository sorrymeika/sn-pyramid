
require('./sass/style.dev.scss');
require('snowball');
require('nuclear');

const { Server } = require('sn-cornerstone');
const { createApplication } = require("snowball/app");
const router = require("./app/router");

const marketServer = new Server({
    baseUri: '/market_server'
});

createApplication({
    routes: router.default,
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
