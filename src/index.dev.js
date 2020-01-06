import './sass/style.dev.scss';
import 'nuclear';

import { Sfs, AppConfiguration } from 'sn-cornerstone';
import { env } from "snowball";
import { createApplication } from "snowball/app";
import router from "./app/router";

createApplication({
    routes: router,
    autoStart: true,
    configuration: AppConfiguration,
    extend() {
        return {
            env: {
                ...env,
                IMAGE_UPLOAD_URL: process.env.REACT_APP_IMAGE_UPLOAD_URL,
                SFS_URL: process.env.REACT_APP_SFS_URL,
                API_URL: ''
            },
            sfs: new Sfs(process.env.REACT_APP_SFS_URL)
        };
    },
    options: {
        disableTransition: true
    }
}, document.getElementById('root'), () => {
    console.log('application start!');
});
