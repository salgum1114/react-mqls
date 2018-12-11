'use strict';

if (!module.hot || process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/react-mqls.min.js');
} else {
    module.exports = require('./dist/react-mqls.js');
}
