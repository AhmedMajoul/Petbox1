import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../layout/Spinner';
import PetshopPosts from '../PetshopPosts';
import CommentForm from '../petshopPost/CommentForm';
import CommentItem from '../petshopPost/CommentItem';
import { getPost } from '../../../actions/petShopPosts';

const Post = ({ getPost, petShopPosts, loading, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  console.log('petShopPosts', petShopPosts)
  return   loading || petShopPosts.petShopPost === null ? (
    <Spinner />
  ) :
  (
    <Fragment>
      <Link to="/petShop" className="btn">
        Back To Posts
      </Link> 
      <PetshopPosts post={petShopPosts.petShopPost} postId={petShopPosts.petShopPost._id} showActions={false} />
       <CommentForm postId={petShopPosts.petShopPost._id} />
       <div className="comments">
        {petShopPosts.petShopPost.comments.map(comment => (
           <CommentItem key={comment._id} comment={comment} postId={petShopPosts.petShopPost._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  adoptpost: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
petShopPosts: state.petShopPosts

});

export default connect(mapStateToProps, { getPost })(Post);