const mongodb = require('mongodb'), client = mongodb.MongoClient, ObjectId = mongodb.ObjectId;
const db_host = process.env.DB_HOST || "localhost";
const db_port = process.env.DB_PORT || 27017;
const db_name = process.env.DB_NAME || "task-manager";
const connectionString = process.env.URI_MONGO_DB || `mongodb://${db_host}:${db_port}/${db_name}`;

const getClient = () => {
    return client.connect(connectionString).then((database) => {
        return database;
    }).catch((err) => {
        console.log(err);
    });
};

const init = () => {
    console.log(`Connection to db -> ${connectionString}`);
    return getClient();
}

const get = (entity, id) => {
    return getClient()
    .then(db => {
        if (id) {
            return db.collection(entity).findOne({_id: new ObjectId(id)});
        }
        return db.collection(entity).find().toArray();
    })
    .catch(err => console.log(err));
};

const save = (entity, object, id) => {
    return getClient()
    .then(db => {
        if (id) {
            return db.collection(entity).updateOne({_id: new ObjectId(id)}, {$set: object});
        }
        if (object.hasOwnProperty('number')) {
            return getNextSequenceValue(entity).then(result => {
                object.number = result.value.sequence_value;
                return db.collection(entity).insertOne(object);
            });
        }
        return db.collection(entity).insertOne(object);
    })
    .catch(err => console.log(err));
};

const getNextSequenceValue = (entity) => {
    return getClient().then(db => {
        return db.collection('counters').findAndModify(
            {_id: entity}, 
            {_id: 'ASC'},
            {$inc: {sequence_value:1}},
            { "new": true, "upsert": true }
        );
    });
}

const drop = (entity, id) => {
    return getClient().then(db => {
        return db.collection(entity).deleteOne({_id: new ObjectId(id)});
    });
}

exports.init = init;
exports.get = get;
exports.save = save;
exports.drop = drop;