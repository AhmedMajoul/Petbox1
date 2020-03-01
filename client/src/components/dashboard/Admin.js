// ToDo :
// get all users / get one user by id
// Delete user
// get user pets
// get number of adoption posts, pets in sale and shop items (optional)
// income statistics (optional)
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import GetUsers from './GetUsers';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Dashboard = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Wellcome My Master, What might you request</h1>
            <Router>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Link to='/get-users'><Button>get all users</Button></Link>
                    <Link to='/get-user-by-id'><Button>get one user by id</Button></Link>
                    <Link to='/statistics'><Button>statistics</Button></Link>
                </ButtonGroup>
                <Switch>
                    <Route exact path='/get-users'>chobik lobik !!! haw el users el kol<br/><GetUsers/></Route>
                    <Route exact path='/get-user-by-id'>how lgitou</Route>
                    <Route exact path='/statistics'>el3ab yala</Route>
                </Switch>
            </Router>
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
