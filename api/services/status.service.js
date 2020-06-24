const statusModel = require('../models/status.model');

const getStatusByName = async(name) => {
	return statusModel.getByName(name)
	.then(status => {
		return {
			_id: status[0]._id,
			name: status[0].name
		};
	});
};

const getAll = () => {
	return statusModel.getAll()
	.then(statuses => statuses);
}

exports.getStatusByName = getStatusByName;
exports.getAll = getAll;
