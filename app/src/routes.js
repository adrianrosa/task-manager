import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import App from './components/App/App';
import ProjectContainer from './components/projectContainer';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <App />
                </Route>
                <Route exact path="/projects">
                    <ProjectContainer />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;
