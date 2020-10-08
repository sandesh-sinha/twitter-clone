import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
// Components
import Navbar from './components/Navbar'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#43a047',
    },
  },
  typography:{
    useNextVariants : true
  }
});

function App(){
  return (
    <MuiThemeProvider theme={theme}>
        <div className="App">
        <Router>
          <Navbar/>
          <div className="Container">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/signup" component={Signup}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
