import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pull from 'lodash/pull';

export type QueryPreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface Query {
    query?: string;
    preset?: QueryPreset;
    component: React.ReactNode;
};

export interface MediaQueryProps {
    queries: Query[];
    targetWindow?: Window;
}

interface IState {
    matched?: React.ReactNode;
    matchedQuery: string[];
}

const queryPreset: { [preset in QueryPreset]?: string } = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
}

class MediaQuery extends Component<MediaQueryProps, IState> {
    mediaQueryList = {} as { [key: string]: any };

    static propTypes = {
        queries: PropTypes.arrayOf(PropTypes.object.isRequired),
        targetWindow: PropTypes.object,
    }

    state: IState = {
        matched: null,
        matchedQuery: this.props.queries.reduce((prev, curr) => {
            return prev.concat(curr.query || queryPreset[curr.preset]);
        }, []),
    }

    componentDidMount() {
        const { targetWindow = window } = this.props;
        if (typeof targetWindow !== 'object') {
            return;
        }
        if (typeof targetWindow.matchMedia !== 'function') {
            console.error('Does not support matchMedia');
            return;
        }
        const { queries } = this.props;
        if (Array.isArray(queries)) {
            queries.forEach((mql) => {
                const { query, preset } = mql;
                if (query && query.length) {
                    this.mediaQueryList[query] = targetWindow.matchMedia(query);
                    this.cancellableListener(query, this.mediaQueryList[query]);
                    this.mediaQueryList[query].addListener(this.cancellableListener.bind(this, query));
                } else if (preset && queryPreset[preset]) {
                    const querySet = queryPreset[preset];
                    this.mediaQueryList[querySet] = targetWindow.matchMedia(querySet);
                    this.cancellableListener(querySet, this.mediaQueryList[querySet]);
                    this.mediaQueryList[querySet].addListener(this.cancellableListener.bind(this, querySet));
                }
            });
        } else {
            console.error('Does not support type');
            return;
        }
    }

    componentWillUnmount() {
        this.cancel();
    }

    getMatched = (targetQuery: string) => {
        const { queries } = this.props;
        if (typeof targetQuery === 'undefined') {
            return null;
        }
        return queries.filter(q => {
            if (q.query === targetQuery) {
                return true;
            } else if (queryPreset[q.preset] === targetQuery) {
                return true;
            }
            return false;
        })[0];
    }

    cancellableListener = (originQuery: string, mql: MediaQueryListEvent | MediaQueryList) => {
        if (mql.matches) {
            const matchedQuery = this.state.matchedQuery.concat(originQuery);
            const matched = this.getMatched(originQuery);
            this.setState({
                matched: matched ? matched.component : null,
                matchedQuery,
            });
        } else {
            const matchedQuery = pull(this.state.matchedQuery, originQuery);
            const matched = this.getMatched(matchedQuery[matchedQuery.length - 1]);
            this.setState({
                matched: matched ? matched.component : null,
                matchedQuery,
            })
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
        const { matched } = this.state;
        if (matched) {
            if (typeof matched === 'function') {
                return matched();
            }
            return matched;
        }
        return null;
    }
}

export default MediaQuery;
