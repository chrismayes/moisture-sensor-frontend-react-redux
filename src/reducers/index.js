import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import storeData from './storeData';

const rootReducer = combineReducers({ storeData, routing: routerReducer });

export default rootReducer;
