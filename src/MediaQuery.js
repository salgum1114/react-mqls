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
                this.cancellableListener(mql.component, this.mediaQueryList[mql.query]);
                this.mediaQueryList[mql.query].addListener(this.cancellableListener.bind(this, mql.component));
            });
        } else {
            console.error('Does not support type');
            return;
        }
    }

    componentWillUnmount() {
        this.cancel();
    }

    cancellableListener = (component, mql) => {
        if (mql.matches) {
            this.setState({
                matchQuery: {
                    component,
                    media: mql.media,
                    matches: mql.matches,
                },
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
        const { matchQuery } = this.state;
        if (matchQuery && matchQuery.component) {
            if (typeof matchQuery.component === 'function') {
                return matchQuery.component();
            }
            return matchQuery.component;
        }
        return null;
    }
}

export default MediaQuery;
