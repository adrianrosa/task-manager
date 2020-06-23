import React from 'react';
import App from '../App/App';
import { Row, Col, TextInput, Icon, Textarea, Button } from 'react-materialize';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id || null,
            name: props.name || "",
            description: props.description || "",
            date_created: props.date_created || this.convertDateToTimestamp(new Date()),
            saveSucces: false
        }
    }
    componentDidMount() {
        if (this.state.id) {
            this.props.getProjectById(this.state.id)
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            ...prevState,
            name: nextProps.name,
            description: nextProps.description,
            date_created: nextProps.date_created
        }));
    }
    submit(e) {
        e.preventDefault();
        let project = {
            name: this.state.name,
            description: this.state.description,
            date_created: this.state.date_created
        };
        if (!this.state.id) {
            this.props.addProject(project).then(response => {
                this.setState(prevState => ({
                    ...prevState,
                    name: "",
                    description: "",
                    saveSucces: true
                }))
            }).catch(err => console.log(err))
        } else {
            project._id = this.state.id;
            this.props.modifyProject(project)
                .then(response => {
                    this.setState((prevState, props) => ({
                        ...prevState,
                        name: props.name,
                        description: props.description,
                        saveSucces: true
                    }))
                })
        }
    }
    cancel(e) {
        e.preventDefault();
        this.props.history.push("/projects")
    }
    onInputChange(e, key) {
        const value = e.target.value;
        this.setState(prevState => ({
          ...prevState,
          [key]: value
        }));
    }
    convertDateToTimestamp(date) {
        if (date) {
            return new Date((date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()).getTime().toString();
        }
    }
    render() {
        return (
            <App container={true}>
                <Row id="projects-page">
                    <Col s={12} m={12} l={12}>
                        {this.state.saveSucces && !this.state.id && (<p className="success-msg"><Icon left>verified_user</Icon> Projecto creado exitosamente</p>)}
                        {this.state.saveSucces && this.state.id && (<p className="success-msg"><Icon left>verified_user</Icon> Projecto actualizado exitosamente</p>)}
                    </Col>
                    <Col s={12} m={12} l={12}>
                        {!this.state.id && (<h1 className="title-page-inline"><Icon left>business_center</Icon> Nuevo proyecto</h1>)}
                        {this.state.id && (<h1 className="title-page-inline"><Icon left>business_center</Icon> {this.state.name}</h1>)}
                    </Col>
                    <form onSubmit={(e) => this.submit(e)}>
                        <Col s={12} m={12} l={12}>
                            <TextInput label={"Nombre"} s={12} m={12} l={12} value={this.state.name} onChange={e => this.onInputChange(e, "name")} />
                        </Col>
                        <Col s={12} m={12} l={12}>
                            <Textarea label={"Descripción"} s={12} m={12} l={12} data-length={1000} value={this.state.description} onChange={e => this.onInputChange(e, "description")} />
                        </Col>
                        {!this.state.id && <TextInput type="hidden" value={this.state.date_created} onChange={e => this.onInputChange(e, "date_created")} />}
                        <Col s={2} m={2} l={2}>
                            <Button type="submit">
                                Guardar<Icon right>send</Icon>
                            </Button>
                        </Col>
                        <Col s={2} m={2} l={2}>
                            <Button flat onClick={(e) => this.cancel(e)}>
                                Cancelar
                            </Button>
                        </Col>
                    </form>
                </Row>
            </App>
        );
    }
}

export default ProjectForm;