import express from 'express';
import pino from 'pino';

import setup from './setup';

const port = 3000;
const logger = pino({
    prettyPrint: true
});

const app = express();
setup(app, logger);

app.listen(port);
logger.info(`Server started on port ${port}!`);