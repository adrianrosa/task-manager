import React from 'react';
import App from '../App/App';
import { Row, Col, Preloader, Icon, Card } from 'react-materialize';

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
            <App>
                <Row id="projects-page">
                    <Col s={12} className="grid-center">
                        { this.state.isLoading && (<Preloader />)}
                    </Col>
                    <Col s={12}>
                        <h1 className="title-page"><Icon medium left>business_center</Icon>Projects<Icon medium right>business_center</Icon></h1>
                        <Row>
                            { this.state.projects.map((project, index) => (
                                <Col s={12} l={6} m={6} key={index} >
                                    <Card title={project.name} className="card-block"
                                        actions={[<a key="1" href={"/project/" + project._id }>Entrar</a>]}>
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

export default Project;
