import React, {Component} from "react"
import axios from 'axios'
// Material UI
import Grid from '@material-ui/core/Grid'
import Profile from '../components/Profile'
import Scream from '../components/Scream'
class Home extends Component {
    state = {
        screams : null
    }
    componentDidMount(){
        axios.get('/screams')
        .then(res =>{
            console.log(res.data);
            this.setState({
                screams : res.data
            })
        })
        .catch(err =>{
            console.log(err);
        })
    };
    render(){
        let recentScreamsMarkup = this.state.screams ? (
        this.state.screams.map(scream=> <Scream key={scream.screamId} scream={scream}/>)
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

export default Home;