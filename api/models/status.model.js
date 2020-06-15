const entityName = 'statuses';

exports.getAll = () => {
    return db.get(entityName).then(result => result);
};

exports.getByName = (name) => {
    let conditions = { "name": name };
    return db.getByConditions(entityName, conditions).then(result => result);
};
