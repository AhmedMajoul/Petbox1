// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Routes from './components/routing/Routes';


// const PrivateRoute = ({
//   component: Component,
//   auth: { isAuthenticated, loading },
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
//     }
//   />
// );

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute);
