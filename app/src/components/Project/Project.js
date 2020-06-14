import React from 'react';

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: props.projects || [],
            isLoading: props.isLoading || true
        }
    }
    componentDidMount() {
        this.props.getProjects()
            .then(projects => {
                this.setState((prevState, props) => ({
                    ...prevState,
                    projects: props.projects,
                    isLoading: props.isFetching
                }));
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="App">
            <header className="App-header">
                { this.state.projects.map(project => (
                    <p key={project.name}>{project.name}</p>
                )) }             
            </header>
            </div>
        ); 
    }
}

export default Project;
