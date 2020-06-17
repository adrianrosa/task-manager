import React from 'react';
import { Icon, Modal, Button , TextInput, Textarea, Select} from 'react-materialize';

class TicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show || false,
            title: props.ticket.title || "",
            description: props.ticket.description || "",
            user: props.ticket.user || {},
            projectId: props.projectId || null
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState((prevState, props) => ({
            ...prevState,
            show: nextProps.show,
            title: nextProps.ticket.title || "",
            description: nextProps.ticket.description || "",
            user: nextProps.ticket.user || {}
        }));  
    }
    submit(e) {
        e.preventDefault();
        // Send ticket data to API
    }
    handleChangeInput(e, key) {
        const value = e.target.value;
        this.setState(prevState => ({
          ...prevState,
          [key]: value
        }));
    }
    handleChangeSelect(e) {
        const id = e.target.value;
        const name = e.target[e.target.selectedIndex].text;
        this.setState(prevState => ({
            ...prevState,
            user: {
                id,
                name 
            }
          }));
    }
    close() {
        this.setState((prevState, props) => ({
            ...prevState,
            show: false,
            title: "",
            description:"",
            user: {}
        }));
    }
    render() {
        return (
            <Modal id="ticket-modal" open={this.state.show} bottomSheet={false} fixedFooter={false}
                actions={[
                    <Button flat modal="close" onClick={() => this.close()} node="button" waves="green">Cancelar</Button>
                ]}
                header={this.props.project ? `Editar tarea ${this.props.project.title}` : "Nueva tarea"}
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: () => this.close(),
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
                trigger={<Button node="button">Crear tarea</Button>}
            >
                <form onSubmit={this.submit}>
                    <TextInput id="ticket-title" label="Título" value={this.state.title} onChange={e => this.handleChangeInput(e, 'title')} />
                    <Textarea id="ticket-description" label="Descripción" data-length={1000} value={this.state.description} onChange={e => this.handleChangeInput(e, 'description')} />
                    <Select id="ticket-users" multiple={false} value={Object.entries(this.state.user).length > 0 ? this.state.user.id.toString() : ""} onChange={e => this.handleChangeSelect(e)}
                        options={{
                            classes: '',
                            dropdownOptions: {
                            alignment: 'left',
                            autoTrigger: true,
                            closeOnClick: true,
                            constrainWidth: true,
                            coverTrigger: true,
                            hover: false,
                            inDuration: 150,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            outDuration: 250
                            }
                    }}>
                        <option disabled value="">Asingar a</option>
                        <option value="1">Juan Perez</option>
                        <option value="2">Miguel Gomez</option>
                        <option value="3">Susana Lopez</option>
                    </Select>
                    <Button node="button" type="submit" waves="light" modal="close">
                        Guardar<Icon right>send</Icon>
                    </Button>
                </form>
            </Modal>
        )
    }
}

export default TicketForm;