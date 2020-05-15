const projectToCreate = fields => {
    return {
        name: fields.name,
        date_created: fields.date_created,
        description: fields.description
    };
};

const projectToEdit = fields => {
    let result = {};
    if (fields.hasOwnProperty("name")) {
        result.name = fields.name;
    }
    if (fields.hasOwnProperty("description")) {
        result.description = fields.description;
    }
    return result;
};

exports.projectToCreate = projectToCreate;
exports.projectToEdit = projectToEdit;
