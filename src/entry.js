import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

// Import Polyfills
import 'whatwg-fetch';
import 'es6-shim';
import 'es6-promise';

// CSS
import css from './style/style.styl';

// Components
import App from './components/App';
import Home from './components/presentational/Home';

const router = (
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	</Provider>
);

render(router, document.getElementById('root'));
