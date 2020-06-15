import { connect } from 'react-redux';
//import { getProjects } from '../actions/project.action';
import { withRouter } from 'react-router-dom';
import Board from './Board/Board.js';

const mapStateToProps = (state, ownProps) => {
    return {
        projectId: ownProps.match.params.id
        /*projects: state.projectReducer.projects || null,
        isLoading: state.projectReducer.isLoading || false*/
    }
}

const mapDispatchToProps = dispatch => {
    return {
       /* getProjects: () => {
            return dispatch(getProjects());
        }*/
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
