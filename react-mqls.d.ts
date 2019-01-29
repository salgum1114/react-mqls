import * as React from 'react';

export interface Query {
  query: string,
  component: React.ReactNode,
}

export interface MediaQueryProps {
  queries: Query[],
  targetWindow?: object | null,
}

export default class MediaQuery extends React.Component<
  MediaQueryProps,
  React.ComponentState
> {}

declare module 'react-mqls';