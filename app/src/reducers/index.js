import { combineReducers } from 'redux';
import projectReducer from './project.reducer';
import statusReducer from './status.reducer';
import ticketReducer from './ticket.reducer';

export default combineReducers({
    projectReducer: projectReducer,
    statusReducer: statusReducer,
    ticketReducer: ticketReducer
});
