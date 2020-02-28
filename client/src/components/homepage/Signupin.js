
// import React from 'react';
// import { Button, ButtonGroup } from 'reactstrap';
// import Signupin from './Signupin.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Link} from 'react-router-dom'
// import { connect } from 'react-redux';
// import IconButton from '@material-ui/core/IconButton';
// import MoreIcon from '@material-ui/icons/MoreVert';




// const SplitButton = ({isAuthenticated}) => {
    
//   return (
//       isAuthenticated?(
//     <ButtonGroup className="signup-signin">
//       <Link to='/login'><Button>Se déconnecter</Button></Link>
//     </ButtonGroup>):(
//     <ButtonGroup className="signup-signin">
//       <Link to='/login'><Button>Se connecter</Button></Link>
//       <Link to='/register'><Button>S'inscrire</Button></Link>
//       <div className={classes.sectionMobile}>
//             <IconButton
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </div>
//     </ButtonGroup>)
//   );
// }

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
//   });
//   export default connect(
//     mapStateToProps,
//     { SplitButton }
//   )(SplitButton)