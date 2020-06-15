import React from 'react';
import { Container } from 'react-materialize';
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import './App.css';

function App(props) {
  return (
    <React.Fragment>
      <Menu />
      <main>
        {props.container && (
        <Container className="container-app">
          {props.children}
        </Container>)}
        {!props.container && props.children}
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
