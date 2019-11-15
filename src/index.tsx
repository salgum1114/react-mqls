import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const render = () => {
    ReactDOM.render(
        <App />,
        rootElement,
    );
}

render();
if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });
}
