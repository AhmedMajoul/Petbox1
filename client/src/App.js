import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
import AdoptPost from './components/adoption/AdoptPost'

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrimarySearchAppBar from './components/homepage/LoggedInNavbar'

import './App.css';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
      <PrimarySearchAppBar/>
      {/* <AdoptPost/> */}
      <Switch>
            {/* <Route exact path="/" component={PrimarySearchAppBar} /> */}
            <Route component={Routes} />
          </Switch>
      </Router>
    </Provider>
  );
};

export default App;

