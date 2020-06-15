const statusModel = require('../models/status.model');

const getStatusByName = async(name) => {
    return statusModel.getByName(name)
        .then(status => status[0]);
};

exports.getStatusByName = getStatusByName;