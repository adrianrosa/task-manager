const statusModel = require('../models/status.model');

const getStatusByName = async(name) => {
	return statusModel.getByName(name)
	.then(status => {
		return {
			id: status[0]._id,
			name: status[0].name
		};
	});
};

exports.getStatusByName = getStatusByName;