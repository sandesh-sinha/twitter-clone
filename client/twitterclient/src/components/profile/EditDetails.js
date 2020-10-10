import React , {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {editUserDetails} from '../../redux/actions/userAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'
import MyButton from '../../util/MyButton'

const styles = (theme) => ({
    ...theme.spreadThis,
    button : {
        float: "right"
    }
})
class EditDetails extends Component {
    state = {
        bio : '',
        website : '',
        location : '',
        open : false
    }
    mapUserDetailsToState = (credentials) =>{
        this.setState({
            bio : credentials.bio ? credentials.bio : '',
            website : credentials.website ? credentials.website : '',
            location : credentials.bio ? credentials.bio : '',
        });
    };
    handleOpen = () =>{
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.user.credentials);
    }
    handleClose = () =>{
        this.setState({open:false});
    }
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = () =>{
        const userDetails = {
            bio : this.state.bio,
            website : this.state.website,
            location : this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    componentDidMount(){
        this.mapUserDetailsToState(this.props.user.credentials);
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                {/* <Tooltip title="Edit Details" placement="top">
                    <IconButton  onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color='primary'/>
                    </IconButton>
                </Tooltip> */}
                <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type='text' label="Bio" 
                                       multiline rows="3" placeholder="A short bio about yourself" 
                                       className={classes.TextField} value={this.state.bio} 
                                       onChange={this.handleChange} fullWidth />
                            <TextField name="website" type='text' label="Website" 
                                        placeholder="Personal Website" 
                                        className={classes.TextField} value={this.state.website} 
                                        onChange={this.handleChange} fullWidth />
                            <TextField name="location" type='text' label="Location" 
                                        placeholder="Your location" 
                                        className={classes.TextField} value={this.state.location} 
                                        onChange={this.handleChange} fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='secondary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} color='primary'>Submit</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
};

EditDetails.propType = {
    editUserDetails : PropTypes.func.isRequired,
    classes : PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
