import React, {Component, Fragment} from "react"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import PostScream from '../scream/PostScream'
// MUI imports
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import MyButton from '../../util/MyButton'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from './Notifications'

class Navbar extends Component{
    render(){
      const {user: {authenticated}} = this.props
        return (
          <AppBar>
              <Toolbar className="nav-container">
                {authenticated ? (
                  <Fragment>
                    <PostScream />
                    <Link to='/'>    
                        <MyButton tip='Home'>
                          <HomeIcon />
                        </MyButton>
                    </Link>
                    <Notifications />
                  </Fragment>
                ):(  
                  <Fragment>
                    <Button color='inherit' component={Link} to="/login">Login</Button>
                    <Button color='inherit' component={Link} to="/">Home</Button>
                    <Button color='inherit' component={Link} to="/signup">Signup</Button>
                  </Fragment>
                ) }
              </Toolbar>
          </AppBar>  
        );
    }
};

Navbar.propTypes = {
  user : PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  user : state.user,
})
export default connect(mapStateToProps)(Navbar);