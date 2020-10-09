import {createStore , combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'


const initialState = {};
const middleware = [thunk];

const reducer = combineReducers({
    user : userReducer,
    data : dataReducer,
    UI : uiReducer
});
const store = createStore(reducer, 
                            initialState, 
                            compose(applyMiddleware(...middleware),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;