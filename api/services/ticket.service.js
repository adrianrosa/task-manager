let ObjectID = require('mongodb').ObjectID;
const statusService = require('./status.service');

const stateMachine = {
    in_analysis:{
        transitions_to: [
            "to_do"
        ]
    },
    to_do: {
        transitions_to: [
            "in_analysis",
            "in_progress"
        ]
    },
    in_progress: {
        transitions_to: [
            "to_do",
            "in_qa"
        ]
    },
    in_qa: {
        transitions_to: [
            "to_do",
            "in_review"
        ]
    },
    in_review: {
        transitions_to: [
            "in_qa",
            "in_analysis",
            "done"
        ]
    },
    done: {
        transitions_to: [
            "in_analysis",
            "to_do"
        ]
    }
};

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
        result.user = fields.user;
    }
    if (fields.hasOwnProperty("project")) {
        fields.project._id = ObjectID(fields.project._id);
        result.project = fields.project;
    }
    if (fields.hasOwnProperty("description")) {
        result.description = fields.description;
    }
    return result;
};

const performTransition = (currentStatus, destinationStatus) => {
    let result = false;
    stateMachine[currentStatus].transitions_to.forEach(transitionStatus => {
        if (transitionStatus === destinationStatus) {
            result = true;
            return;
        }
    });
    return result;
};

exports.performTransition = performTransition;
exports.ticketToCreate = ticketToCreate;
exports.ticketToEdit = ticketToEdit;
