let ObjectID = require('mongodb').ObjectID;
const statusService = require('./status.service');

const ticketToCreate = async(fieds) => {
    let project = fieds.project;
    project._id = ObjectID(project._id);
    return statusService.getStatusByName("in_analysis")
        .then(status => {
            return {
                title: fieds.title,
                number: null,
                status: status,
                date_created: fieds.date_created,
                user: fieds.user,
                project: project,
                description: fieds.description
            };
        });
};

const ticketToEdit = fields => {
    let result = {};
    if (fields.hasOwnProperty("title")) {
        result.title = fields.title;
    }
    if (fields.hasOwnProperty("user")) {
        //fields.user._id = ObjectID(fields.user._id);
        result.user = fields.user;
    }
    if (fields.hasOwnProperty("project")) {
        fields.project._id = ObjectID(fields.project._id);
        result.project = fields.project;
    }
    if (fields.hasOwnProperty("description")) {
        result.description = fields.description;
    }
    if (fields.hasOwnProperty("number")) {
        result.number = fields.number;
    }
    if (fields.hasOwnProperty("status")) {
        fields.status._id = ObjectID(fields.status._id);
        result.status = fields.status;
        result.status.name.toLowerCase();
    }
    return result;
};

const performTransition = (currentStatus, destinationStatus) => {
    let result = false;
    return loadStateMachine().then(stateMachine => {
        stateMachine[currentStatus.toLowerCase()].transitions_to.forEach(transitionStatus => {
        if (transitionStatus === destinationStatus.toLowerCase()) {
                result = true;
                return;
            }
        });
        return result;
    });
};

const loadStateMachine = () => {
    let result = {};
    return statusService.getAll()
    .then(statuses => {
        statuses.forEach(status => {
            result[status.name] = {
                transitions_to: status.transitions
            }
        })
        return result;
    });
};

exports.performTransition = performTransition;
exports.ticketToCreate = ticketToCreate;
exports.ticketToEdit = ticketToEdit;
