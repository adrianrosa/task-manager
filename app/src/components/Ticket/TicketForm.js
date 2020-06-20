import React from 'react';
import { Icon, Modal, Button , TextInput, Textarea } from 'react-materialize';

class TicketForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show || false,
            title: props.ticket.title || "",
            description: props.ticket.description || "",
            number: props.ticket.number || null,
            date_created: null,
            user: props.ticket.user || {},
            project: props.project || {},
            statuses: props.statuses || null,
            status: props.ticket.status || props.statuses.filter(s => s.name === "in_analysis")[0]
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeStatusSelect = this.handleChangeStatusSelect.bind(this);
        this.handleChangeUserSelect = this.handleChangeUserSelect.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState((prevState, props) => ({
            ...prevState,
            show: nextProps.show,
            title: nextProps.ticket.title || "",
            number: nextProps.ticket.number || null,
            description: nextProps.ticket.description || "",
            project: nextProps.project || {},
            user: nextProps.ticket.user || {},
            statuses: nextProps.statuses || null,
            status: nextProps.ticket.status || nextProps.statuses.filter(s => s.name === "in_analysis")[0],
            date_created: this.convertTimestampToDate(nextProps.ticket.date_created) || null
        }));  
    }
    convertTimestampToDate(timestamp) {
        const date = timestamp ? new Date(parseFloat(timestamp)) : new Date();
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`; 
    }
    convertDateToTimestamp(date) {
        if (date) {
            const timeParts = date.split("/");
            return new Date(timeParts[1]+"/"+timeParts[0]+"/"+timeParts[2]).getTime().toString();
        }
    }
    submit(e) {
        e.preventDefault();
        if (Object.entries(this.props.ticket).length === 0) {
            this.props.handleCreate({
                title: this.state.title,
                description: this.state.description,
                date_created: this.convertDateToTimestamp(this.state.date_created),
                user: this.state.user,
                project: this.state.project,
                status: this.state.status
            });
        } else if (Object.entries(this.props.ticket).length > 0) {
            this.props.handleUpdate({
                _id: this.props.ticket._id,
                title: this.state.title,
                description: this.state.description,
                number: this.state.number,
                date_created: this.convertDateToTimestamp(this.state.date_created),
                user: this.state.user,
                project: this.state.project,
                status: this.state.status
            });
        }
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
                _id: id,
                name: name 
            }
          }));
    }
    handleChangeStatusSelect(e) {
        const id = e.target.value;
        const name = e.target[e.target.selectedIndex].text;
        this.setState(prevState => ({
            ...prevState,
            status: {
                _id: id,
                name: name 
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
            status: null,
            project: {},
            ticket: {}
        }));
    }
    delete(ticket) {
        if (window.confirm(`¿Está seguro que desea borrar #${ticket.number} ${ticket.title}?`)) {
            this.close();
            this.props.handleDelete(ticket);
        }
    }
    render() {
        return (
            <Modal id="ticket-modal" open={this.state.show} bottomSheet={false} fixedFooter={false}
                actions={[
                    <Button flat modal="close" node="button" waves="green" onClick={() => this.close()} >Cancelar</Button>
                ]}
                header={this.state.title ? `#${this.state.number} ${this.state.title}` : "Nueva tarea"}
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: () => this.close(),
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
                trigger={<Button node="button">Crear tarea</Button>}
            >
                <form className="modal-content-form" onSubmit={(e) => this.submit(e)}>
                    <TextInput id="ticket-title" label="Título" value={this.state.title} onChange={e => this.handleChangeInput(e, 'title')} />
                    <Textarea id="ticket-description" label="Descripción" data-length={1000} value={this.state.description} onChange={e => this.handleChangeInput(e, 'description')} />
                    {this.state.date_created && (<TextInput disabled id="title-date-created" label="Fecha" value={this.state.date_created} onChange={e => this.handleChangeInput(e, 'date_created')} />)}
                    <select id="ticket-user" className="input-field col browser-default" value={Object.entries(this.state.user).length > 0 ? this.state.user._id.toString() : ""} onChange={e => this.handleChangeUserSelect(e)}>
                        <option disabled value="">Asingar a</option>
                        <option value="1">Juan Perez</option>
                        <option value="2">Miguel Gomez</option>
                        <option value="3">Susana Lopez</option>
                    </select>
                    <select id="ticket-status" className="input-field col browser-default" value={this.state.status ? this.state.status._id : ""} onChange={e => this.handleChangeStatusSelect(e)}>
                        <option disabled value="">Estado</option>
                        {this.state.statuses && this.state.statuses.map(status => (
                            <option key={status._id} value={status._id}>{status.name.toUpperCase()}</option>
                        ))}
                    </select>
                    <Button node="button" type="submit" waves="light" modal="close">
                        Guardar<Icon right>send</Icon>
                    </Button>
                    {this.props.ticket.title && <Button className="btn-delete" onClick={() => this.delete(this.props.ticket)} node="button" waves="green">Borrar <Icon right>delete</Icon></Button>}
                </form>
            </Modal>
        )
    }
}

export default TicketForm;