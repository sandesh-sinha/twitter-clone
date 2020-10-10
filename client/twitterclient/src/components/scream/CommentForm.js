import React , {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {submitComment} from '../../redux/actions/dataActions'

const styles = (theme) => ({
    ...theme.spreadThis,
})

class CommentForm extends Component {
    state = {
        body : '',
        errors : {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors : nextProps.UI.errors});
        }
        if(! nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body : '', errors : {}});
        }
    }
    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value,
            errors : {}
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, {body: this.state.body});
    }
    render(){
        const {classes, authenticated} = this.props;
        const errors = this.state.errors;
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign : 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name="body"
                               type='text'
                               label='comment on scream'
                               error={errors.comment ? true : false}
                               helperText={errors.comment}
                               value={this.state.body}
                               onChange={this.handleChange}
                               fullWidth
                               className={classes.textField} />
                    <Button type='submit' variant='contained' color='primary'
                            className={classes.button}>
                                submit
                            </Button>
                </form>
                <hr className={classes.visibleSeparatpr} />
            </Grid>
        ) : (
            <div></div>
        );
        return commentFormMarkup;

    }
}

CommentForm.propTypes = {
    screamId : PropTypes.string.isRequired,
    submitComment : PropTypes.func.isRequired,
    UI : PropTypes.object.isRequired,
    authenticated : PropTypes.bool.isRequired,
    classes : PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    UI : state.UI,
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));