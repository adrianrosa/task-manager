import React from 'react';
import App from '../App/App';
import TicketForm from '../Ticket/TicketForm';
import { Row, Col, Preloader, Card, Icon} from 'react-materialize';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: props.statuses || [],
            tickets: props.tickets || [],
            project: props.project || {},
            isLoading: props.isLoading || false,
            ticketCounterStatus: {},
            showForm: false,
            ticketToEdit: {}
        }
        this.openForm = this.openForm.bind(this);
        this.addTicket = this.addTicket.bind(this);
        this.deleteTicket = this.deleteTicket.bind(this);
        this.update = this.update.bind(this);
    }
    async componentDidMount() {
        await this.props.getProjectById(this.props.projectId);
        this.setState((prevState, props) => ({
            ...prevState,
            project: props.project,
            isLoading: props.isLoading
        }));
        await this.props.getStatuses();
        this.setState((prevState, props) => ({
            ...prevState,
            statuses: props.statuses,
            isLoading: props.isLoading
        }));
        await this.props.getTicketsByProjectId(this.props.projectId);
        this.setState((prevState, props) => ({
            ...prevState,
            tickets: props.tickets,
            isLoading: props.isLoading
        }));
        this.updateTicketCounters();
    }
    componentWillReceiveProps(nextProps) {
        this.setState((prevState, props) => ({
            ...prevState,
            tickets: nextProps.tickets
        }));
    }
    updateTicketCounters() {
        let counters = {};
        this.state.statuses.forEach(status => {
            counters = {
                ...counters,
                [status.name]: 0
            }
        });
        this.state.tickets.forEach(ticket => {
            for (const status in counters) {
                if (status === ticket.status.name) {
                    counters[status] += 1;
                }
            }
        });
        this.setState(prevState => ({
            ...prevState,
            ticketCounterStatus: counters
        }));
    }
    openForm(e, ticket) {
        e.preventDefault();
        this.setState((prevState, props) => ({
            ...prevState,
            showForm: true,
            ticketToEdit: ticket
        }));
    }
    async addTicket(ticket) {
        if (ticket.title) {
            await this.props.addTicket(ticket);
            this.setState((prevState, props) => {
                return {
                    ...prevState,
                    tickets: props.tickets,
                    showForm: false,
                    ticketToEdit: {},
                    ticketCounterStatus: {
                        ...prevState.ticketCounterStatus,
                        [ticket.status.name.toLowerCase()]: prevState.ticketCounterStatus[ticket.status.name.toLowerCase()] + 1
                    }
                }
            });
        }
    }
    async update(ticket) {
        await this.props.modifyTicket(ticket);
        this.setState((prevState, props) => {
            //console.log(props)
            return {
                ...prevState,
                tickets: props.tickets,
                showForm: false,
                //ticketToEdit: {}
            }
        });
    }
    async deleteTicket(ticket) {
        await this.props.deleteTicketById(ticket._id)
        this.setState((prevState, props) => {
            return {
                ...prevState,
                tickets: props.tickets,
                ticketToEdit: {},
                showForm: false,
                ticketCounterStatus: {
                    ...prevState.ticketCounterStatus,
                    [ticket.status.name]: prevState.ticketCounterStatus[ticket.status.name] - 1
                }
            }
        });
    }
    render() {
        return (
            <App>
                <Row id="board-page" className={"flex"}>
                    <h1 className="title-page"><Icon>business_center</Icon> Proyecto: <a href={`/projects/${this.props.projectId}`}>{this.props.project.name}</a></h1>
                    <Col s={12} className="grid-center">
                        { this.state.isLoading && (<Preloader />)}
                    </Col>
                    <Col s={12} m={12} l={12}>
                        <TicketForm show={this.state.showForm}
                                    project={this.props.project}
                                    statuses={this.props.statuses}
                                    ticket={this.state.ticketToEdit}
                                    handleCreate={this.addTicket}
                                    handleUpdate={this.update}
                                    handleDelete={this.deleteTicket} />
                    </Col>
                    {this.state.statuses && (this.state.statuses.map(status => 
                    <Col key={status._id} s={12} m={4} l={2} className="container-app column-stattus">
                        <div className="column-status-group">
                            <h2>{status.name.toUpperCase()}</h2>
                            <span className="counter">{this.state.ticketCounterStatus[status.name]}</span>   
                        </div>
                        <hr />
                        {this.state.tickets.length > 0 && this.state.tickets.map(ticket => {
                            return ticket.status.name.toLowerCase() === status.name.toLowerCase() && (
                                <Card key={ticket._id}
                                    title={ticket.title.length >= 40 ? ticket.title.substring(0, 40) + " ..." : ticket.title}
                                    actions={[
                                        <a key="1" href="/" onClick={e => this.openForm(e, ticket)}>Editar</a>,
                                        <span key="2" className="number"># {ticket.number}</span>
                                    ]}>
                                    <hr className={"divider-app"} />
                                    <p><i>Estado: {ticket.status.name.toUpperCase()}</i></p><br />
                                    {ticket.description.length >= 150 ? ticket.description.substring(0, 150) + " ..." : ticket.description}
                                </Card>
                            )
                        })}
                    </Col>
                    ))}
                </Row>
            </App>
        );
    }
}

export default Board;