import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
// Mui 
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import makeStyles from '@material-ui/core/styles/makeStyles'
import {withStyles} from '@material-ui/core/styles'
import Typography  from '@material-ui/core/Typography';

const styles = {
    card : {
        display : 'flex',
        marginBottom : 20,
    },
    image:{
        minWidth : 200,
    },
    content : {
        padding:25,
        objectFit : 'cover'
    }
};

class Scream extends Component {
    render(){
        dayjs.extend(relativeTime);
        const {classes , scream :{ body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }} = this.props;
        return(
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color='primary'>{userHandle}</Typography>
                    <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                </CardContent>
            </Card>
        );
    };
};

export default withStyles(styles)(Scream);