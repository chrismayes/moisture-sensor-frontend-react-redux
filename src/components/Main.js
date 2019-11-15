import React from 'react';
import { withRouter } from 'react-router';
import { isSomethingLoading, whatIsLoading } from './containers/calls';
import Loading from './presentational/Loading';

export default class Main extends React.Component {
  render() {
    return (
			<React.Fragment>
				{
					React.cloneElement(this.props.children, {
						...this.props,
						key: undefined,
						ref: undefined,
					})
				}
			</React.Fragment>
    );
  }
}
