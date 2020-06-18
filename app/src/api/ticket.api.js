export const getAllByProjectId = projectId => {
    const url = `${process.env.REACT_APP_TASK_MANAGER_API}/tickets/project/${projectId}`;
    return fetch(url, {method: 'GET'})
        .then(response => {
            if (!response.ok) {
                return new Error("Error to retrieve all projects");
            }
            return response.json();
        });
}

export const deleteTicket = id => {
    const url = `${process.env.REACT_APP_TASK_MANAGER_API}/tickets/${id}`;
    return fetch(url, {method: 'DELETE'})
        .then(response => {
            if (!response.ok) {
                return new Error("Error to delete ticket with id " + id);
            }
            return response.json();
        });
}
