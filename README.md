# react-mqls

Javascript media query match for React.js

# Install

- npm install --save react-mqls

# Getting Started

## Basic
```
import React, { Component } from 'react';
import MediaQuery from 'react-mqls'

class Example extends Component {
  render() {
    return <MediaQuery queries={[
        {
            query: '(min-width: 1200px)',
            component: 'text',
        },
        {
            query: '(max-width: 1199px) and (min-width: 768px)',
            component: 'text1',
        },
        {
            query: '(max-width: 767px)',
            component: 'text2',
        },
    ]}>
  }
}
```

# MediaQuery
## props

| `PropName` | `Default` | `PropTypes` |
| --- | :---: | :---: |
| `queries` | | Array<Query> |
| `targetWindow` | | Object |

# Demo

- git clone https://github.com/salgum1114/react-mqls.git - Clone the project
- npm start - Run script
- http://localhost:8080 - Host access

