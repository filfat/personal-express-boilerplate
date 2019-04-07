import express from 'express';

import HelloRoutes from './hello';

const Router = (app, logger) => {
    logger.info(`Setting up routes...`);

    const HelloRouter = express.Router();
    app.use('/hello', HelloRouter);
    HelloRoutes(HelloRouter, logger.child({}));

    /**
     * @route GET /
     * @group Index
     * @returns {object} 200 - link to the swagger docs
     * @returns {Error}  default - Unexpected error
     */
    app.all('/', (req, res) => {
        res.send({
            status: 200,
            data: {
                message: 'personal-express-boilerplate API v1',
                docs: `${req.protocol}://${req.get('host')}/api-docs`
            }
        });
    });

    return;
};

export default Router;