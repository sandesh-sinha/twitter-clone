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

import axios from 'axios';
const styles = {
    form :{
        textAlign : 'center'
    },
    pageTitle :{
        margin : '20px auto 20px auto',
    },
    image :{
        margin : '10px auto 10px auto',
    },
    textField :{
        margin : '20px auto 20px auto'
    },
    button :{
        marginTop : 10,
        position: 'relative'
    },
    customError :{
        marginTop : 10,
        color : 'red',
        fontSize : '0.8rem'
    },
    circular:{
        color : 'secondary',
        align :  'left',
        position : 'relative'
    }
};
class Login extends Component{
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            loading : true
        });
        const userData = {
            email : this.state.email, 
            password : this.state.password
        }
        axios.post('/login', userData)
        .then(res =>{
            console.log(res.data);
            this.setState({
                loading : false
            });
            this.props.history.push('/');
        })
        .catch(err=>{
            console.log(err);
            this.setState({
                errors : err.response.data,
                loading : false
            })
        })
        
    }
    
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    constructor(){
        super();
        this.state= {
            email : '', 
            password : '',
            loading :  false,
            errors : {}
        }
    }
    render(){
        const {classes} = this.props;
        const {errors, loading} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item>
                    <img src={AppIcon} alt='monkey image' className={classes.image}/>      
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
                                disable={this.state.loading}
                                >
                                    { this.state.loading ? (<CircularProgress size={25} className={classes.circular} />) : (<div>Login</div>)}
                        </Button>
                        <div>
                            <medium>Don't have an account ? <Link to='/signup'>Sign up </Link></medium>
                        </div>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
};

Login.propTypes = {
    classes : PropTypes.object.isRequired
};
export default withStyles(styles)(Login);