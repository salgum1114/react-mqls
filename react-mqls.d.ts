declare module 'react-mqls' {
  import * as React from 'react'

  interface Query {
    query: String,
    component: React.Component,
  }

  interface MediaQueryProps {
    queries: Array<Query>,
    targetWindow: Object | null,
  }

  export class MediaQuery extends React.Component<
    MediaQueryProps,
    React.ComponentState,
  > {}

}
