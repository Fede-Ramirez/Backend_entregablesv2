const passport = require('passport');
const { UserModel } = require('../models/user');

const passportOptions = {
    badRequestMessage: 'Falta usuario y/o contraseña'
};

const logIn = (req, res, next) => {
    try {
        res.json({ 
            msg: 'Bienvenido!', 
            user: req.user 
        });
    } catch(err) {
        next(err);
    }
};

const signUp = (req, res, next) =>  {
    try {
        passport.authenticate('signup', passportOptions, (err, user, info) => {
            console.log('Información de registro');
            console.log(err, user, info);
    
            if (err) {
                return next(err);
            }
    
            if (!user) return res.status(401).json({ 
                data: info 
            });
        
            res.json({ 
                msg: 'Registro realizado con éxito' 
            });
        })(req, res, next);
    } catch(err) {
        next(err);
    }
};

const logOut = (req, res, next) => {
    try {
        () => req.logOut();
        res.json({ 
            msg: 'Hasta luego!' 
        });
    } catch(err) {
        next(err);
    }
};

const sessionInfo = (req, res, next) =>   {
    try {
        res.json({ 
            msg: 'HOLA', 
            session: req.session 
        });
    } catch(err) {
        next(err);
    }
};

const getUsers = async(req, res, next) => {
    try {
        const users = await UserModel.find();
        res.json({ 
            users 
        });
    } catch (err) {
        next(err);
    }
}

const createUsers = async(req, res, next) => {
    try {
        const { username, password, firstName, lastName } = req.body;

        if (!username || !password ||!firstName || !lastName) {
            console.log('Campos inválidos');
            return res.status(400).json({ 
                msg: 'Campos inválidos' 
            });
        }

        const userData = {
            username,
            password,
            firstName,
            lastName,
        };

        const newUser = new UserModel(userData);
        await newUser.save();
        res.json({ 
            data: newUser 
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    logIn,
    signUp,
    logOut,
    sessionInfo,
    getUsers,
    createUsers
}
