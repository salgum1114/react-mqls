import React, { Component } from 'react';
import { Canvas } from 'react-design-editor';

import MediaQuery from './components';
import './app.less';

class App extends Component {
    render() {
        return (
            <MediaQuery
                queries={[
                    {
                        query: '(min-width: 1200px)',
                        component: () => {
                            return (
                                <Canvas
                                    width={1024}
                                    height={1024}
                                    workareaOption={{
                                        backgroundColor: 'blue',
                                    }}
                                    canvasOption={{
                                        backgroundColor: 'red',
                                    }}
                                />
                            )
                        },
                    },
                    {
                        query: '(max-width: 1199px) and (min-width: 768px)',
                        component: 'text1',
                    },
                    {
                        query: '(max-width: 767px)',
                        component: 'text2',
                    },
                ]}
            />
        );
    }
}

export default App;