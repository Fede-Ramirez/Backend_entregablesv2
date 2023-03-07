const express = require('express');
const mainRouter = require('../routes/index');
const logger = require('./log4jsConfig');
const { graphqlHTTP } = require('express-graphql');
const { graphqlRoot, graphqlSchema } = require('./graphql');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', mainRouter);

app.use('/graphql',
    graphqlHTTP({     
        schema: graphqlSchema,  
        rootValue: graphqlRoot, 
        graphiql: true, 
        })
);

app.use((req, res, next) => {
    logger.error(`ruta ${req.url} no implementada`)
    
    return res.status(404).json({
        error: -2,
        descripcion: `La ruta ${req.url} no existe`,
    });
});

module.exports = app;