import React from 'react';
import { Container } from 'react-materialize';
import Menu from '../Menu/Menu';
import './App.css';

function App(props) {
  return (
    <React.Fragment>
      <Menu />
      <Container className="container-app">
        {props.children}
      </Container>
    </React.Fragment>
  );
}

export default App;
