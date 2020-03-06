  
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../layout/Spinner';
import ModalItemAdd from './ModalItemAdd'
// import ItemForm from './ItemForm';
import Item from './Item'
import { getItems } from '../../actions/itemShop';


const useStyles = makeStyles(theme => ({
  posts:{
    display:"flex",
    width:"100%",
    flexWrap: "wrap"
  }
}));

const Items = ({ getItems, items, type, loading }) => {
  useEffect(() => {getItems()}, [getItems]);
  const classes = useStyles();

return (
loading ? 
<Spinner />:
<Fragment>
   
      <h1 className='large text-primary'>Items</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
     {type==="admin"&&
      <ModalItemAdd />}
       <div className={classes.posts}>
        {items.map(item => (
        //<p>{item.description}</p>
          <Item key={item._id} item={item} />
        ))}
      </div> 
    
    </Fragment>
  );
};

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    items: state.itemShop.items,
    type:state.auth.user.type
});

export default connect(
  mapStateToProps,
  { getItems }
)(Items);