const passport = require('passport');
const { Strategy } = require('passport-local');
const { UserModel } = require('../models/user');

const strategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
};

const logIn = async (req, username, password, done) => {
    try{
        console.log("Realizando login")
        const user = await UserModel.findOne({ username });
    
        if (!user || !user.isValidPassword(password)) {
            return done(null, false, { 
                message: 'Usuario o contraseña inválidos' 
            });
        }
        console.log('Login realizado con éxito');
    
        return done(null, user);
    } catch(err) {
        done(err);
    }
};

const signUp = async (req, username, password, done) => {
    try {
        console.log('Realizando registro...')
        const { username, password, firstName, lastName } = req.body;
        
        if (!username || !firstName || !lastName) {
            console.log('Campos inválidos');
            return done(null, false, {message: 'Campos inválidos'});
        }
    
        const query = {
            $or: [{ username: username }],
        };

        console.log(query);
        const user = await UserModel.findOne(query);

        if (user) {
                console.log('El usuario ya existe');
                console.log(user);
                return done(null, false, {message: 'El usuario ya existe'});
            } else {
                const userData = {
                username,
                password,
                firstName,
                lastName,
                };
        
                const newUser = await UserModel.create(userData);
                return done(null, newUser);
            }
    } catch (err) {
        console.log(err);
        return done(null, false, { message: 'Error inesperado' });
    }
};

const logInFunction = new Strategy(strategyOptions, logIn);
const signUpFunction = new Strategy(strategyOptions, signUp);

passport.serializeUser((user, done) => {
    console.log('Ejecutando serializeUser');
    done(null, user._id);
});

passport.deserializeUser(async(userId, done) => {
    console.log('Ejecutando desserializeUser');
    const user = await UserModel.findById(userId);
    return done(null, user);
});

module.exports = {
    logInFunction,
    signUpFunction
}