import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MediaQuery extends Component {
    static propTypes = {
        queries: PropTypes.arrayOf(PropTypes.object.isRequired),
        targetWindow: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.mediaQueryList = {};
    }

    state = {
        matchQuery: null,
    }

    componentDidMount() {
        if (typeof window !== 'object') {
            return;
        }
        const { targetWindow = window } = this.props;
        if (typeof targetWindow.matchMedia !== 'function') {
            console.error('Does not support matchMedia');
            return;
        }
        const { queries } = this.props;
        if (Array.isArray(queries)) {
            const mqls = queries.map(query => query.query);
            mqls.forEach((mql) => {
                this.mediaQueryList[mql] = targetWindow.matchMedia(mql);
                this.cancellableListener(this.mediaQueryList[mql]);
                this.mediaQueryList[mql].addListener(this.cancellableListener);
            });
        } else {
            console.error('Does not support type');
            return;
        }
    }

    componentWillUnmount() {
        this.cancel();
    }

    cancellableListener = (mql) => {
        const { queries } = this.props;
        if (mql.matches) {
            const matched = queries.filter(q => q.query === mql.media)[0];
            this.setState({
                matchQuery: matched ? matched.query : null,
            });
        }
    }

    cancel = () => {
        const { queries } = this.props;
        if (Array.isArray(queries)) {
            const mqls = queries.map(query => query.query);
            mqls.forEach((mql) => {
                this.mediaQueryList[mql].removeListener(this.cancellableListener);
            });
        }
    }

    render() {
        const { queries } = this.props;
        const { matchQuery } = this.state;
        const matched = queries.filter(query => query.query === matchQuery)[0];
        if (matched && matched.component) {
            if (typeof matched.component === 'function') {
                return matched.component();
            }
            return matched.component;
        }
        return null;
    }
}

export default MediaQuery;
