const logInVerification = (req, res, done) => {
    try {
        console.log('Autenticado correctamente');
        console.log(req.isAuthenticated());

        if (!req.isAuthenticated()) {
            return res.status(401).json({ 
                msg: 'No estás autorizado/a' 
            })
        };

        done();
    } catch (err) {
        console.log(err);
    }
};

const adminVerification = (req, res, done) => {
    try {
        console.log('Verificando admin');
        console.log(req.user);
    
        if (!req.user.admin) {
            return res.status(401).json({ 
                msg: 'Solo los administradores están autorizados para estar aquí' 
            });
        } 
    
        console.log('Todo en orden');
        done();
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    logInVerification, 
    adminVerification
}