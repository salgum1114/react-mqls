import React, { Component } from 'react';

import MediaQuery from './components';
import './app.less';

class AppQuery extends Component {
    render() {
        return (
            <MediaQuery
                queries={[
                    {
                        query: '(max-width: 767px)',
                        component: 'text1',
                    },
                    {
                        query: '(max-width: 1199px) and (min-width: 768px)',
                        component: 'text2',
                    },
                    {
                        preset: 'xl',
                        component: 'text3',
                    },
                ]}
            />
        );
    }
}

export default AppQuery;