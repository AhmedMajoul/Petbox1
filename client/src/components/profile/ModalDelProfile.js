// import React, { useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import { delProfileById } from "../../actions/profile";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { setAlert } from "../../actions/alert";
// import { logout } from "../../actions/auth";

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`
//   };
// }

// const useStyles = makeStyles(theme => ({
//   paper: {
//     position: "absolute",
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3)
//   }
// }));

// function SimpleModal({ delProfileById, logout, user }) {
//   const classes = useStyles();
//   // getModalStyle is not a pure function, we roll the style only on the first render
//   const [modalStyle] = React.useState(getModalStyle);
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   const handleDelete = (user) => {
//     setOpen(false);
//     delProfileById(user._id)
//   }

//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//         Open Modal
//       </button>
//       <Modal
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//         open={open}
//         onClose={handleClose}
//       >
//         <div style={modalStyle} className={classes.paper}>
//           <h2 id="simple-modal-title">Text in a modal</h2>
//           <p id="simple-modal-description">
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </p>
//           <button type="button" onClick={(user)=>handleDelete(user)}>
//             Confirmer
//           </button>
//           <button type="button" onClick={handleCancel}>
//             Annuler
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }
// SimpleModal.propTypes = {
//     setAlert: PropTypes.func.isRequired,
//     delProfileById: PropTypes.func.isRequired,
//     user: PropTypes.object,
//     logout:PropTypes.func
//   };

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

// export default connect(mapStateToProps, {
//   setAlert,
//   logout,
//   delProfileById,
//   SimpleModal
// })(SimpleModal);
