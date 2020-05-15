const status = require('../models/status.model');

exports.getAll = (req, res) => {
    status.getAll()
    .then(statuses => {
        if (!statuses || statuses.length === 0) {
            return res.status(204).json({error: false, data: `No statuses`});
        }
        res.status(200).json({error: false, data: statuses});
    })
    .catch(err => res.status(500).json({error: true, data: err.message}));
};