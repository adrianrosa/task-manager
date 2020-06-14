import {createStore, applyMiddleware} from 'redux';
import Reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
    let store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));
    return store;
};

export default configureStore;
