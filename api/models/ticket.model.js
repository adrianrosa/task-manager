const entityName = 'tickets';

exports.getAll = () => {
    return db.get(entityName).then(result => result);
};

exports.getOne = (id) => {
    return db.get(entityName, id).then(result => result);
};

exports.getByProject = (projectId) => {
    let conditions = { "project.id": parseInt(projectId) };
    return db.getByConditions(entityName, conditions).then(result => result);
};

exports.getByStatus = (statusId) => {
    let conditions = { "status.id": parseInt(statusId) };
    return db.getByConditions(entityName, conditions).then(result => result);
};

exports.create = ticket => {
    return db.save(entityName, ticket).then(result => result);
};

exports.update = (ticket, id) => {
    return db.save(entityName, ticket, id).then(result => result);
};

exports.delete = (id) => {
    return db.drop(entityName, id).then(result => result);
};
