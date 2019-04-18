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
            queries.forEach((mql) => {
                this.mediaQueryList[mql.query] = targetWindow.matchMedia(mql.query);
                this.cancellableListener(mql.query, this.mediaQueryList[mql.query]);
                this.mediaQueryList[mql.query].addListener(this.cancellableListener.bind(this, mql.query));
            });
        } else {
            console.error('Does not support type');
            return;
        }
    }

    componentWillUnmount() {
        this.cancel();
    }

    cancellableListener = (originQuery, mql) => {
        const { queries } = this.props;
        if (mql.matches) {
            const matched = queries.filter(q => q.query === originQuery)[0];
            this.setState({
                matchQuery: matched ? matched.query : null,
            });
        }
    }

    cancel = () => {
        const { queries } = this.props;
        if (Array.isArray(queries)) {
            queries.forEach((mql) => {
                this.mediaQueryList[mql.query].removeListener(this.cancellableListener);
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
