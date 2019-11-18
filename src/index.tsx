import React from 'react';
import ReactDOM from 'react-dom';

import AppQuery from './AppQuery';
import AppCSS from './AppCSS';

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const render = () => {
    ReactDOM.render(
        <AppQuery />,
        rootElement,
    );
}

render();
if (module.hot) {
    module.hot.accept('./AppQuery', () => {
        render();
    });
}
