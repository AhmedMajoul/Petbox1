import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './components/routing/Routes';
import { Link } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrimarySearchAppBar from './components/homepage/LoggedInNavbar';
import SearchFilters from './components/search_filters/SearchFilters';

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
      <PrimarySearchAppBar />
      {/* <SearchFilters /> */}
      <Router>
      <Link to='/register'>Register</Link>
      <br/>
      <Link to='/login'>Login</Link>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;