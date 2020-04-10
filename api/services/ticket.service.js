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

const ticketToCreate = fieds => {
    return {
        title: fieds.title, 
        number: null,
        status: "in_analysis",
        date_created: fieds.date_created,
        user: JSON.parse(fieds.user),
        proyect: JSON.parse(fieds.proyect),
        description: fieds.description
    };
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
