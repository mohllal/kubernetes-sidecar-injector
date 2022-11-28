import fs from 'fs'
import https from 'https'

import logger from '@lib/logger';
import config from '@shared/config'
import server from './server';

const { httpsEnabled, httpPort, httpsPort} = config;

if (httpsEnabled) {
    https.createServer({
        requestCert: false,
        rejectUnauthorized: true,
        key: fs.readFileSync(config.tlsPrivateKeyFile),
        cert: fs.readFileSync(config.tlsCertFile)
    }, server).listen(httpsPort, () => {
        logger.info('HTTPS Express server started on port: ' + httpsPort);
    })
} else {
    // Start HTTP server
    server.listen(httpPort, () => {
        logger.info('HTTP Express server started on port: ' + httpPort);
    });
}
