const validateLogIn = (req, res, next) => {
    console.log(req.session);
    if (req.session.info && req.session.info.loggedIn) {
        next();
    } else {
        res.status(401).json({ 
            msg: 'No está autorizado para realizar esta acción o su sesión ha expirado, por favor ingrese nuevamente' });
    }    
};

module.exports = { validateLogIn };