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
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userAction'

const styles = (theme) => ({
    ...theme.spreadThis
});

class Signup extends Component{
    constructor(){
        super();
        this.state= {
            email : '', 
            password : '',
            confirmPassword:'',
            handle : '',
            errors : {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors : nextProps.UI.errors
            })
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            loading : true
        });
        const newUserData = {
            email : this.state.email, 
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
            handle : this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    }
    
    handleChange = (event) =>{
        this.setState({
            errors : {},
            [event.target.name]: event.target.value
        })
    };
    
    render(){
        const {classes , UI: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item>
                    <img src={AppIcon} alt='monkey' className={classes.image}/>      
                    <Typography variant='h2' className={classes.pageTitle}>
                        Signup
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
                        <TextField  id='confirmPassword' 
                                    name='confirmPassword' 
                                    type='password' 
                                    label='ConfirmPassword'
                                    helperText={errors.password}
                                    error={errors.password ? true : false}
                                    className={classes.textField}
                                    value ={this.state.confirmPassword} 
                                    onChange={this.handleChange} 
                                    fullWidth/>
                        <TextField  id='handle' 
                                    name='handle' 
                                    type='text' 
                                    label='Handle'
                                    helperText={errors.handle}
                                    error={errors.handle ? true : false}
                                    className={classes.textField}
                                    value ={this.state.handle} 
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
                                disable={loading?1:0}
                                >
                                    { loading ? (<CircularProgress size={25} className={classes.circular} />) : (<div>Signup</div>)}
                        </Button>
                        <div>
                            <Typography variant='body2'>Already have an account ? <Link to='/login'>Login</Link></Typography>
                        </div>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
};

Signup.propTypes = {
    classes : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired,
    signupUser : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user : state.user,
    UI : state.UI
})

const mapActionsToProps = {signupUser};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));