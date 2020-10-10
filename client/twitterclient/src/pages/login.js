import React, {Component} from "react"
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import AppIcon from '../images/logo192.png'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction'

const styles = (theme) => ({
    ...theme.spreadThis,
});

class Login extends Component{
    constructor(){
        super();
        this.state= {
            email : '', 
            password : '',
            loading :  false,
            errors : {}
        }
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors : nextProps.UI.errors
            })
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        const userData = {
            email : this.state.email, 
            password : this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }
    
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        const {classes, UI : {loading}} = this.props;
        const {errors}  = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item>
                    <img src={AppIcon} alt='monkey' className={classes.image}/>      
                    <Typography variant='h2' className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}> 
                        <TextField  id='email'
                                    name='email'
                                    type='email' 
                                    label='Email' 
                                    helperText={errors.email}
                                    error={errors.email ? true : false}
                                    className={classes.textField}
                                    value ={this.state.email} 
                                    onChange={this.handleChange} 
                                    fullWidth/>
                        <TextField  id='password' 
                                    name='password' 
                                    type='password' 
                                    label='Password'
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    className={classes.textField}
                                    value ={this.state.password} 
                                    onChange={this.handleChange} 
                                    fullWidth/>
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type='submit' 
                                variant='contained' 
                                color='primary' 
                                className={classes.button}
                                disable= {loading?1:0} >
                                    { loading ? (<CircularProgress size={25} className={classes.circular} />) : (<div>Login</div>)}
                        </Button>
                        <div>
                            <Typography variant='body2'>Don't have an account ? <Link to='/signup'>Sign up </Link></Typography>
                        </div>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
};

Login.propTypes = {
    classes : PropTypes.object.isRequired,
    loginUser : PropTypes.func.isRequired,
    user : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI  : state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));