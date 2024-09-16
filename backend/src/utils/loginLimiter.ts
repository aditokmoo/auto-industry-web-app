const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 4,
    message: { status: 'fail', message: 'To many login attemps, please try again after 60 second pause' },
    handler: (req: any, res: any, next: any, options: any) => {
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false
});

export default loginLimiter