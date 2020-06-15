import React from 'react';
import App from '../App/App';

function Home() {
    return (
        <App container={true}>
            <h1 className="title-page">Home</h1>
            <p className="text-centered">¡Bienvenid@ al portal de Task manager!</p>
            <p className="text-centered">Click en <a href="/projects">projects</a> para ver todos los proyectos activos</p>
        </App>
    );
}

export default Home;