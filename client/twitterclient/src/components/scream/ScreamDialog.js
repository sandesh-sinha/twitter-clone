import React , {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import dayjs  from 'dayjs';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close'
import ChatIcon from '@material-ui/icons/Chat'
import MyButton from '../../util/MyButton'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import CircularProgress from '@material-ui/core/CircularProgress'
import {getScream, clearErrors} from '../../redux/actions/dataActions'
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
const style = (theme) =>({
    ...theme.spreadThis,
    profileImage : {
        maxWidth : 200,
        height : 200,
        borderRadius : '50%',
        objectFit : 'cover'
    },
    dialogContent : {
        padding : 20,
        marginTop : 15,
        float : 'right'
    },
    closeButton : {
        position : 'absolute',
        left : '85%',
        top : '8%'
    },
    expandButton : {
        position : 'absolute',
        left : '90%'
    },
    spinnerDiv : {
        textAlign : 'center',
        margin : '50px auto 50px auto' 
    }
})

class ScreamDialog extends Component {
    state = {
        open : false,
        oldPath : '',
        newPath : ''

    }
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }
    handleOpen = () =>{
        console.log("handleOpen");
        let oldPath = window.location.pathname;
        const {userHandle, screamId} = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        if(oldPath===newPath) oldPath = `/users/${userHandle}`
        window.history.pushState(null, null, newPath);
        this.setState({open:true, oldPath, newPath})
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({open:false});
        this.props.clearErrors();
    }
    render(){
        console.log("scream dialog render");
        const {classes, 
               scream : {screamId, body, createdAt, likeCount, commentCount , userImage, userHandle, comments}, 
               UI:{ loading}} = this.props
               
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} />
            </div>
        ):(
            <Grid container>
                <Grid item sm={6}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={6}>
                    <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeperator} />
                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeperator} />
                    <Typography variant='body1'>
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeperator} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        )
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary'/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream : PropTypes.func.isRequired,
    screamId : PropTypes.string.isRequired,
    userHandle : PropTypes.string.isRequired,
    scream : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired,
    clearErrors : PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    scream : state.data.scream,
    UI : state.UI
})
const mapActionsToProps = {
    getScream,
    clearErrors
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(style)(ScreamDialog));
