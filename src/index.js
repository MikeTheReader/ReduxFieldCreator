import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

require('./style/index.css');

const loggerMiddleware = (store) => (next) => (action) => {
    // Don't log the ones that have promises as payloads (those with a 'then' function)
    // Otherwise, you'll end up with duplicate logs, one for the original action, and one for the fulfilled promise
    if (!action.payload.then) {
        console.log(`Dispatching action: ${action.type}`);
    }
    let result = next(action);
    return result
};

const createStoreWithMiddleware = applyMiddleware(promise, loggerMiddleware)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
