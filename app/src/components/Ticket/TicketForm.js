import React from 'react';
import { Icon, Modal, Button , TextInput, Textarea } from 'react-materialize';

class TicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show || false,
            title: props.ticket.title || "",
            description: props.ticket.description || "",
            date_created: null,
            user: props.ticket.user || {},
            projectId: props.projectId || null,
            statuses: props.statuses || null,
            status: props.ticket.status || {}
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState((prevState, props) => ({
            ...prevState,
            show: nextProps.show,
            title: nextProps.ticket.title || "",
            description: nextProps.ticket.description || "",
            user: nextProps.ticket.user || {},
            statuses: nextProps.statuses || null,
            status: nextProps.ticket.status || {},
            date_created: this.convertTimestampToDate(nextProps.ticket.date_created) || null
        }));  
    }
    convertTimestampToDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`; 
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
    handleChangeUserSelect(e) {
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
    handleChangeStatusSelect(e) {
        const id = e.target.value;
        const name = e.target[e.target.selectedIndex].text;
        this.setState(prevState => ({
            ...prevState,
            status: {
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
            user: {},
            date_created: null,
            status: null,
            projectId: null
        }));
    }
    render() {
        return (
            <Modal id="ticket-modal" open={this.state.show} bottomSheet={false} fixedFooter={false}
                actions={[
                    
                ]}
                header={this.props.ticket.title ? `#${this.props.ticket.number} ${this.props.ticket.title}` : "Nueva tarea"}
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
                <form className="modal-content-form" onSubmit={this.submit}>
                    <TextInput id="ticket-title" label="Título" value={this.state.title} onChange={e => this.handleChangeInput(e, 'title')} />
                    <Textarea id="ticket-description" label="Descripción" data-length={1000} value={this.state.description} onChange={e => this.handleChangeInput(e, 'description')} />
                    {this.state.date_created && (<TextInput disabled id="title-date-created" label="Fecha" value={this.state.date_created} />)}
                    <select id="ticket-user" className="input-field col browser-default" value={Object.entries(this.state.user).length > 0 ? this.state.user.id.toString() : ""} onChange={e => this.handleChangeUserSelect(e)}>
                        <option disabled value="">Asingar a</option>
                        <option value="1">Juan Perez</option>
                        <option value="2">Miguel Gomez</option>
                        <option value="3">Susana Lopez</option>
                    </select>
                    <select id="ticket-status" className="input-field col browser-default" value={this.state.status ? this.state.status.id : ""} onChange={e => this.handleChangeStatusSelect(e)}>
                        <option disabled value="">Estado</option>
                        {this.state.statuses && this.state.statuses.map(status => (
                            <option key={status._id} value={status._id}>{status.name.toUpperCase()}</option>
                        ))}
                    </select>
                    <Button node="button" type="submit" waves="light" modal="close">
                        Guardar<Icon right>send</Icon>
                    </Button>
                    <Button flat modal="close" onClick={() => this.close()} node="button" waves="green">Cancelar</Button>
                </form>
            </Modal>
        )
    }
}

export default TicketForm;