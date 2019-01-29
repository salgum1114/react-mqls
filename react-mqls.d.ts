import * as React from 'react';

export interface Query {
  query: string,
  component: React.Component,
}

export interface MediaQueryProps {
  queries: Query[],
  targetWindow: object | null,
}

export default class MediaQuery extends React.Component<
  MediaQueryProps,
  React.ComponentState
> {}
