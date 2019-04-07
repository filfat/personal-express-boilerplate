const Get = (logger) => {
    return (req, res) => {
        logger.debug(`Getting hello world...`);

        return res.send({
            status: 200,
            data: {
                message: 'Hello World!'
            }
        });
    };
};

export default {
    Get
};