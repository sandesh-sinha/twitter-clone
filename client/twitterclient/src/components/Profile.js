import React , {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs'

const styles = (theme) => ({
    ...theme.spreadThis
});
class Profile extends Component {
    render(){
        const {classes , user : {authenticated, credentials :{handle,createdAt, imageUrl, bio, website, location}}, loading} = this.props;
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
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
        ) ):(<p>Loading...</p>)
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

Profile.propType = {
    user : PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));