const mongodb = require('mongodb'), client = mongodb.MongoClient;
const db_host = process.env.DB_HOST || "localhost";
const db_port = process.env.DB_PORT || 27017;
const db_name = process.env.DB_NAME || "task-manager";
const connectionString = process.env.URI_MONGO_DB || `mongodb://${db_host}:${db_port}/${db_name}`;

const getConnector = () => {
    console.log(`Mongo connecting to: ${connectionString}`);
    let db;
    promise = client.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((database) => {
        db = database;
        console.log(`Mongo success connection!`);
        return db;
    }).catch((err) => {
        console.log(err);
    });
    return promise;
};

exports.getConnector = getConnector;
