import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from './components/Home/Home';
import ProjectListContainer from './components/projectListContainer';
import BoardContainer from './components/boardContainer';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/projects">
                    <ProjectListContainer />
                </Route>
                <Route exact path="/projects/:id/board">
                    <BoardContainer />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;
