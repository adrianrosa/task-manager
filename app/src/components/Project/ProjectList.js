import React from 'react';
import App from '../App/App';
import { Row, Col, Preloader, Card, Button } from 'react-materialize';

class ProjectList extends React.Component {
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
            <App>
                <Row id="projects-page">
                    <Col s={12} className="grid-center">
                        { this.state.isLoading && (<Preloader />)}
                    </Col>
                    <Col s={12}>
                        <Button href="/projects/new" node="a">Nuevo</Button>
                        <h1 className="title-page-inline">Proyectos</h1>
                    </Col>
                    <Col s={12} className={"divider-app"}>
                        <Row>
                            { this.state.projects.map((project, index) => (
                                <Col s={12} l={6} m={6} key={index} >
                                    <Card title={project.name} className="card-block"
                                        actions={[<a key="1" href={"/projects/" + project._id + "/board" }>Entrar</a>]}>
                                        {project.description}
                                    </Card>
                                </Col>
                            )) }
                        </Row>
                    </Col>
                </Row>       
            </App>
        ); 
    }
}

export default ProjectList;
