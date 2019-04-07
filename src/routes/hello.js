import HelloController from '../controllers/hello';

const HelloRoutes = (router, logger) => {
    logger.info('Setting up Admin routes...');

    /**
     * Hello world!
     * @route GET /hello
     * @group Hello
     * @returns {object} 200 - hello world
     * @returns {Error}  default - Unexpected error
     */
    router.get('/', HelloController.Get(logger));
};

export default HelloRoutes;