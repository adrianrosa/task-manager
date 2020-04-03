const entityName = 'tickets';

exports.getAll = () => {
    return db.get(entityName).then(result => result);
};

exports.getOne = (id) => {
    return db.get(entityName, id).then(result => result);
};

exports.create = ticket => {
    return db.save(entityName, ticket).then(result => result);
};
