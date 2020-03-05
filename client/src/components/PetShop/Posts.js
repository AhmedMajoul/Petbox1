import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
// import PostItem from './postItem';

import PetshopForm from './PetshopForm';
import PetshopPosts from './PetshopPosts'
import { getPosts } from '../../actions/petShopPosts';

const PetSopPosts = ({ getPosts, petShopPosts, loading, type }) => {
  useEffect(() => {getPosts()}, [getPosts]);

  return (
loading ? 
<Spinner />:
<Fragment>
   
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome Pet Shop
      </p>
     
      {type === "visitor" ? null : <PetshopForm />}
       <div className='posts'>
        {petShopPosts.map(post => (
        // <p>{post.text}</p>
          <PetshopPosts key={post._id} post={post} />
        ))}
      </div> 
    
    </Fragment>
  );
};

PetSopPosts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  petShopPosts: PropTypes.array.isRequired,
  type: PropTypes.bool
};

const mapStateToProps = state => ({
    petShopPosts: state.petShopPosts.petShopPosts,
    type:state.auth.user.type
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PetSopPosts);