import React, {Component} from "react"
import axios from 'axios'
import PropTypes from 'prop-types'
// Material UI
import Grid from '@material-ui/core/Grid'
import Profile from '../components/Profile'
import Scream from '../components/Scream'
import {connect} from 'react-redux'
import {getScreams} from '../redux/actions/dataActions'
class Home extends Component {
    componentDidMount(){
        this.props.getScreams();
    };
    render(){
        const {screams,  loading} = this.props.data
        let recentScreamsMarkup = !loading ? (
        screams.map( (scream)=>
                         <Scream key={scream.screamId} scream={scream}/>)
        ): <p>Loading...</p>
        return (
            <div className="home" >
                <Grid container spacing={3} >
                    <Grid item sm={6} xs={12}>
                        {recentScreamsMarkup}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Profile />
                    </Grid>
                </Grid>
            </div>
        );
    }
};

Home.propTypes = {
    getScreams : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    data: state.data
})
export default connect(mapStateToProps, {getScreams})(Home);