# react-mqls

Javascript media query match for React.js

# Install

- npm install --save react-mqls

# Getting Started

## Basic usage (media string)
```
import React, { Component } from 'react';
import MediaQuery from 'react-mqls'

class Example extends Component {
  render() {
    return <MediaQuery queries={[
        {
            query: '(max-width: 767px)',
            component: 'text2',
        },
        {
            query: '(max-width: 1199px) and (min-width: 768px)',
            component: 'text1',
        },
        {
            query: '(min-width: 1200px)',
            component: 'text',
        },
    ]}>
  }
}
```

## Preset usage (media preset)
```
import React, { Component } from 'react';
import MediaQuery from 'react-mqls'

class Example extends Component {
  render() {
    return <MediaQuery queries={[
        {
            preset: 'xs',
            component: 'text2',
        },
        {
            query: '(max-width: 1199px) and (min-width: 768px)',
            component: 'text1',
        },
        {
            preset: 'xl',
            component: 'text',
        },
    ]}>
  }
}
```

# Query Props
| `PropName` | `Default` | `PropTypes` | `Description` |
| --- | :---: | :---: | :---: | 
| `query` | | string | | |
| `preset` | | QueryPreset | The breakpoints of responsive grid follow BootStrap 4 media queries rules `xs`, `sm`, `md`, `lg`, `xl`, `xxl` |
| `component` | | React.ReactNode | () => React.ReactNode or React.ReactNode |


# MediaQuery Props

| `PropName` | `Default` | `PropTypes` | `Description` |
| --- | :---: | :---: | :---: |
| `queries` | | Query[] | |
| `targetWindow` | | Window | |

# Demo

- git clone https://github.com/salgum1114/react-mqls.git - Clone the project
- npm start - Run script
- http://localhost:8080 - Host access

