const entityName = 'statuses';

exports.getAll = () => {
    return db.get(entityName).then(result => result);
};
