import express from 'express';
import expressSwagger from 'express-swagger-generator';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';

import router from './routes';

const Setup = (app, logger) => {
    logger.info(`Initializing server...`);

    app.disable('x-powered-by');
    app.use(timeout('5s'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({
        limit: '3mb'
    }));
    app.use(cookieParser());
    
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Disable http client cache
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", 0);
        next();
    });


    const v1 = express.Router();
    app.use('/v1', v1);
    router(v1, logger);

    app.all('/', (req, res) => {
        res.send({
            status: 200,
            data: {
                message: 'personal-express-boilerplate',
                versions: [
                    'v1'
                ]
            }
        });
    });

    app.use((err, req, res, next) => {
        if(!err) return next();

        logger.error(err.message || err);
        const status = err.timeout ? 504 : 500;

        res.status(status);
        return res.send({
            status: status,
            error: {
                message: err.message,
                timeout: err.timeout || undefined
            }
        });
    });

    logger.info(`Initializing Swagger...`);
    expressSwagger(app)({
        swaggerDefinition: {
            info: {
                description: 'personal-express-boilerplate',
                title: 'personal-express-boilerplate',
                version: '1.0.0',
            },
            host: 'localhost:3000',
            basePath: '/v1',
            produces: [
                "application/json"
            ],
            schemes: ['http']
        },

        basedir: __dirname,
        files: [
            './models/**/*.js',
            './routes/**/*.js',
        ]
    });
};

export default Setup;