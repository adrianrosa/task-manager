import React from 'react';
import App from '../App/App';
import { Row, Col, Preloader, Card, Icon } from 'react-materialize';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses: props.statuses || [],
            tickets: props.tickets || [],
            project: props.project || {},
            isLoading: props.isLoading || false
        }
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
    }
    render() {
        return (
            <App>
                <Row id="board-page" className={"flex"}>
                    <h1 className="title-page"><Icon>business_center</Icon> Proyecto: <a href={`/projects/${this.props.projectId}`}>{this.props.project.name}</a></h1>
                    <Col s={12} className="grid-center">
                        { this.state.isLoading && (<Preloader />)}
                    </Col>
                    {this.state.statuses && (this.state.statuses.map(status => 
                    <Col key={status._id} s={2} className="container-app">
                        <h2>{status.name.toUpperCase()}</h2>
                        {this.state.tickets && this.state.tickets.map(ticket => {
                            return ticket.status.name === status.name && (
                                <Card key={ticket._id}
                                    title={ticket.title.length >= 40 ? ticket.title.substring(0, 40) + " ..." : ticket.title}
                                    actions={[
                                        <a key="1" href={`/tickets/${ticket._id}`}>Ver más</a>,
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