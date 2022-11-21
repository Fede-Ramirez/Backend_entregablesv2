const knex = require('knex');

const dbConfig = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: '',
        database: 'desafio7'
    }
}

const sqliteConfig = {
    client: 'sqlite3',
    connection: { filename: './myDb.sqlite'},
    useNullAsDefault: true,
}

class Database {

    constructor(config, tableName) {
        this.connection = knex(config);
        this.tableName = tableName;
    }

    get(id={}) {
        return this.connection(this.tableName).where(id).select('*');
    }

    create(data) {
        return this.connection(this.tableName).insert(data);
    }

    update(id, data) {
        return this.connection(this.tableName).where('id', id).update(data);
    }

    delete(id) {
        return this.connection(this.tableName).where('id', id).del();
    }
}

const productsTableName = 'products';
const messagesTableName = 'messages';

const productsInstance = new Database(dbConfig, productsTableName);
const messagesInstance = new Database(sqliteConfig, messagesTableName);

const database = knex(dbConfig);
const database2 = knex(sqliteConfig)

const initProductsTable = async () => {
    await database.schema.createTable(productsTableName, (productsTable) => {
        productsTable.increments(),
        productsTable.string('title').notNullable();
        productsTable.integer('price');
        productsTable.string('image').notNullable();
        productsTable.timestamps(true, true);
    })

    const initialProducts = [
        {
            title: "smart tv 50 pulgadas noblex",
            price: 10.00,
            image: "https://cdn2.iconfinder.com/data/icons/i-love-apple-1/512/display2.png",
        },
        {
            title: "samsung galaxy flip 4",
            price: 26.50,
            image: "https://cdn2.iconfinder.com/data/icons/i-love-apple-1/512/black_iphone.png",
        },
    ];

    const createProducts = initialProducts.map((product) => 
        database(productsTableName).insert(product)
    );
    console.log('productos insertados!')
    await Promise.all(createProducts);
}

const initProductsDatabase = async () => {
    const productsTableExists = await database.schema.hasTable(productsTableName);

    if (!productsTableExists) {
        await initProductsTable();
    }
}

const initMessagesTable = async () => {
    await database2.schema.createTable(messagesTableName, (messagesTable) => {
        messagesTable.increments(),
        messagesTable.string('email').notNullable();
        messagesTable.string('message').notNullable();
        messagesTable.timestamps(true, true);
    })

    const initialMessages = [
        {
            email: "ejemplo@gmail.com",
            message: "Hola! Como estás?",
        },
        {
            email: "ejemplo2@gmail.com",
            message: "Bien, y vos?",
        },
    ];

    const createMessages = initialMessages.map((message) => 
        database2(messagesTableName).insert(message)
    );
    console.log('mensajes insertados!')
    await Promise.all(createMessages);
}

const initMessagesDatabase = async () => {
    const messagesTableExists = await database2.schema.hasTable(messagesTableName);

    if (!messagesTableExists) {
        await initMessagesTable();
    }
}

module.exports = {
    productsInstance,
    messagesInstance,
    initProductsDatabase,
    initMessagesDatabase
}