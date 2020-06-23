import { connect } from 'react-redux';
import { addProject } from '../actions/project.action';
import ProjectForm from './Project/ProjectForm';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.projectReducer.project.id || null,
        name: state.projectReducer.project.name || "",
        description: state.projectReducer.project.description || "",
        isLoading: state.projectReducer.isLoading || state.ticketReducer.isLoading || false,
        error: state.projectReducer.error || null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProject: project => {
            return dispatch(addProject(project));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectForm));
