import { connect } from 'react-redux';
import { getProjects } from '../actions/project.action';
import ProjectList from './Project/ProjectList';

const mapStateToProps = state => {
    return {
        projects: state.projectReducer.projects || null,
        isLoading: state.projectReducer.isLoading || false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProjects: () => {
            return dispatch(getProjects());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
