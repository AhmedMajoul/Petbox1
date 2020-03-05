  
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import PostItem from './postItem';

import PostForm from './PostForm';
import AdoptPost from './AdoptPost'
import { getPosts } from '../../actions/adoptPosts';

const Posts = ({ getPosts, adoptposts }) => {
  useEffect(() => {getPosts()}, []);


  return adoptposts.loading?
(
<Spinner />):(
<Fragment>
   
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to Adoption 
      </p>
     
      <PostForm />
       <div className='posts'>
        {adoptposts.adoptposts.map(post => (
        // <p>{post.text}</p>
          <AdoptPost key={post._id} post={post} />
        ))}
      </div> 
    
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  adoptposts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    adoptposts: state.adoptPosts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);