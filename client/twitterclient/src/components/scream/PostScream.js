import React , {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import MyButton from '../../util/MyButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import {postScream, clearErrors} from '../../redux/actions/dataActions'
const style = (theme) => ({
    ...theme.spreadThis,
    submitButton : {
        marginTop : '10px',
        position : 'relative',
        float: 'right'
    },
    progressSpinner :{
        position : 'absolute'
    },
    closeButton :{
        position : 'absolute',
        left : '90%',
        top : '6%'
    }
})
export class PostScream extends Component {
    state = {
        open : false,
        body : '',
        errors : {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors : nextProps.UI.errors
            });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:'', open: false, errors : {}});
        }
    }
    handleOpen = () => {
        this.setState({open: true});
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({open: false, errors : {}});
    }
    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});
        this.setState({errors:{} });
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.postScream({body: this.state.body});
    }
    render() {
        const {errors} = this.state;
        const {classes, UI:{loading} } = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a scream !">
                    <AddIcon/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>
                        Post a new scream
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name='body' type='text' label='scream' multiline rows='3' placeholder="scream at your friends" 
                                       error={errors.body ? true : false } helperText={errors.body} className={classes.TextField} 
                                       onChange={this.handleChange} fullWidth/>
                            <Button type="submit" variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (<CircularProgress size='25' className={classes.progressSpinner} />)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
PostScream.propType = {
    postScream : PropTypes.func.isRequired,
    clearErrors : PropTypes.func.isRequired,
    UI : PropTypes.object.isRequired
} 
const mapStateToProps = (state) =>({
    UI : state.UI
})
export default connect(mapStateToProps, {postScream, clearErrors})(withStyles(style)(PostScream));
