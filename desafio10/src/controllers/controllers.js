const users = [
    {
        username: 'Luis',
        password : 'Argentina',
        admin: true,
    },
    {
        username: 'Sofia',
        password : 'Paraguay',
        admin: false,
    }
]

const login = (req, res) => {
    const {username, password } = req.body

    const index = users.findIndex((anUser) => anUser.username === username && anUser.password === password);
    console.log(index)
    if(index < 0)
        res.status(401).json({ 
            msg: 'No estas autorizado para ingresar' 
        });
    else {
        const user = users[index];

        req.session.info = {
            loggedIn: true,
            contador : 1,
            username : user.username,
            admin : user.admin,
        };

        res.json({
            msg: `Bienvenido/a ${req.session.info.username}!`
        })
    }
} 

const infoSession = (req, res) => {
    res.send({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
}

const visit = (req, res) => {
    req.session.info.contador++;
    res.json({
        msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
    });
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.status(200).json({
                msg: `Hasta luego!`
            })
        } 
        else {
            res.status(500).json({
                msg: 'Error al desloguearse'
            })
            console.log(err);
        } 
    });
}


module.exports = {
    login,
    visit,
    logout,
    infoSession
}