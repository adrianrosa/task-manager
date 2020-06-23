export const getAll = () => {
    const url = `${process.env.REACT_APP_TASK_MANAGER_API}/projects`;
    return fetch(url, {method: 'GET'})
        .then(response => {
            if (!response.ok) {
                return new Error("Error to retrieve all projects");
            }
            return response.json();
        });
}

export const getById = id => {
    const url = `${process.env.REACT_APP_TASK_MANAGER_API}/projects/${id}`;
    return fetch(url, {method: 'GET'})
        .then(response => {
            if (!response.ok) {
                return new Error("Error to retrieve info from project with id " + id);
            }
            return response.json();
        });
}

export const create = project => {
    const url = `${process.env.REACT_APP_TASK_MANAGER_API}/projects`;
    console.log(JSON.stringify(project))
    return fetch(url, {method: 'POST', body: JSON.stringify(project), headers:{'Content-Type': 'application/json'}})
        .then(response => {
            if (!response.ok) {
                return new Error(`Error to create project`);
            }
            return response.json();
        });
}
