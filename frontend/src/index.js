import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore,applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import {fetchAllPosts, sortPosts} from './actions/posts'
import {fetchAllCategories} from './actions/categories'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)))

store.dispatch(fetchAllPosts()).then(() =>{ store.dispatch(sortPosts({order:'voteScore'}))})
store.dispatch(fetchAllCategories())

ReactDOM.render( 
    <Provider store={store}>
          < App/> 
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();