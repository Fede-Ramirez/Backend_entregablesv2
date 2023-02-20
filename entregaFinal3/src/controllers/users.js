const logger = require('../services/log4jsConfig');
const { UserAPI, CartAPI } = require('../api');

const validateNewUser = (newUser) => {
    return (
        !newUser ||
        !newUser.firstName ||
        !newUser.lastName ||
        !newUser.age ||
        !newUser.address ||
        !newUser.address.street ||
        !newUser.address.city
    );
};

const getUserByEmail = async(email) => {
    const user = await UserAPI.findByEmail(email);
    return user;
};

const createUser = async (userData) => {
    const newUser = await UserAPI.create(userData);
    await CartAPI.create(newUser._id);
    return newUser;
};

const isLoggedIn = (req, res, done) => {
    logger.info('Está autenticado');
    logger.info(req.isAuthenticated());
    logger.info('req.user');
    logger.info(req.user);

    if (!req.isAuthenticated()) {
        return res.status(401).json({ msg: 'No estás autorizado/a' });
    };

    done();
};

const isAdmin = (req, res, done) => {
    logger.info('Middleware para administradores');
    logger.info(req.user);

    if (!req.user.admin) {
        return res.status(401).json({ 
            msg: 'No estás autorizado - solo administradores' 
        });
    }

    done();
};

module.exports = {
    validateNewUser,
    getUserByEmail,
    createUser,
    isLoggedIn,
    isAdmin
}