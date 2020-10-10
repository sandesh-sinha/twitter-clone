import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import axios from 'axios'
// Redux
import {Provider} from 'react-redux';
import store from './redux/store'
import {SET_AUTHENTICATED} from './redux/types'
import {logoutUser, getUserData} from './redux/actions/userAction'


// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import user from './pages/user'
// Components
import Navbar from './components/layout/Navbar'
import themeFile from './util/theme'
const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp *1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  else{
    store.dispatch({type : SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App(){
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div >
          <Router>
            <Navbar/>
            <div className="Container">
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <AuthRoute exact path="/login" component={Login} ></AuthRoute>
                <AuthRoute exact path="/signup" component={Signup} ></AuthRoute>
                <Route exact path='/users/:handle' component={user}/>
                <Route exace path='/users/:handle/scream/:screamId' component={user} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
