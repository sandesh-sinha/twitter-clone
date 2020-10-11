import React , {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import EditDetails from './EditDetails'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import LocationOn from '@material-ui/icons/LocationOn'
import EditIcon from '@material-ui/icons/Edit'
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs'
import {logoutUser, uploadImage} from '../../redux/actions/userAction'
import MyButton from '../../util/MyButton';
import ProfileSkeleton from '../../util/ProfileSkeleton'
const styles = (theme) => ({
    ...theme.spreadThis
});

class Profile extends Component {
    handleImageChange = (event) =>{
        const image = event.target.files[0];
        // send to server
        const formData =  new FormData();
        formData.append('image',image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () =>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    handleLogout = () => {
        this.props.logoutUser();
    }
    render(){
        const {classes , user : {authenticated, credentials :{handle,createdAt, imageUrl, bio, website, location}}, loading} = this.props;
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>
                        {/* <Tooltip title="Edit profile pictire" placement="top">
                            <IconButton onClick={this.handleEditPicture} className="button" >
                            </IconButton>
                        </Tooltip> */}
                        <MyButton tip="Edit profile picture" onClick={this.handleEditPicture} btnClassName="button" >
                            <EditIcon color="primary" />
                        </MyButton>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">     
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant='body2' >
                                    {bio}
                                </Typography> }
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color="primary"/>
                                <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon  color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarTodayIcon color="primary"/>{' '}
                        <span>
                            Joined {dayjs(createdAt).format('MMM YYYY')}
                        </span>
                    </div>
                    {/* <Tooltip  title="logout" placement="top">
                        <IconButton onClick={this.handleLogout}>
                            <KeyboardReturn color="primary"/>
                        </IconButton>
                    </Tooltip> */}
                    <MyButton tip="logout" onClick={this.handleLogout} >
                            <KeyboardReturn color="primary"/>
                    </MyButton>
                    <EditDetails/>
                </div>
            </Paper>
        ):(
            // Not Authenticated
            <Paper className={classes.paper}>
                <Typography variant="body2" align='center'>
                    No Profile found, please login again
                    <div className={classes.buttons}>
                        <Button variant="contained"  color="primary" component={Link} to='/login'>
                            Login
                        </Button>
                        <Button variant="contained"  color="secondary" component={Link} to='/signup'>
                            Signup
                        </Button>
                    </div>
                </Typography>
            </Paper>
        ) ): (<ProfileSkeleton />)
        return (
            <div>
                {profileMarkup}
            </div>
        )
    }
};
const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    logoutUser, uploadImage
}

Profile.propType = {
    user : PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired,
    logoutUser : PropTypes.func.isRequired,
    uploadImage : PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));