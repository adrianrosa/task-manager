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
