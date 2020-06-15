export const getAll = () => {
    const url = `${process.env.REACT_APP_TASK_MANAGER_API}/statuses`;
    return fetch(url, {method: 'GET'})
        .then(response => {
            if (!response.ok) {
                return new Error("Error to retrieve all statuses");
            }
            return response.json();
        });
}
