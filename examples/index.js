import React from 'react';
import ReactDom from 'react-dom';

import MediaQuery from '../index';

const rootElement = document.getElementById('root');
ReactDom.render(
    <MediaQuery
        queries={[
            {
                query: '(min-width: 1200px)',
                component: 'text',
            },
            {
                query: '(max-width: 1199px)',
                component: 'text1',
            },
            {
                query: '(max-width: 1023px)',
                component: 'text2',
            },
        ]}
    />,
    rootElement,
);
