require('./sass/style.dev.scss');
require('nuclear');

const { Server, Sfs } = require('sn-cornerstone');
const { env } = require("snowball");
const { createApplication } = require("snowball/app");
const router = require("./app/router");

createApplication({
    routes: router.default,
    autoStart: true,
    extend() {
        return {
            env: {
                ...env,
                IMAGE_UPLOAD_URL: process.env.REACT_APP_IMAGE_UPLOAD_URL,
                SFS_URL: process.env.REACT_APP_SFS_URL
            },
            sfs: new Sfs(process.env.REACT_APP_SFS_URL),
            server: {
                market: new Server({ baseUrl: '/market_server' }),
                trade: new Server({ baseUrl: '/trade_server' })
            }
        };
    },
    options: {
        disableTransition: true
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});
