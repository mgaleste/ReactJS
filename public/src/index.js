import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import createSagaMiddleware from 'redux-saga';
//import { logoutSaga } from './store/sagas/auth';

import { createStore, applyMiddleware, compose, combineReducers  } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


import { BrowserRouter } from 'react-router-dom';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

//const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)) 
    );

//sagaMiddleware.run(logoutSaga);

const app =(
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
