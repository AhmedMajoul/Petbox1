import React, { Fragment, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../layout/Spinner';
import PostItem from './postItem';
import PostForm from './PostForm';
import AdoptPost from './AdoptPost';
import { getPosts } from '../../actions/adoptPosts';
import SideBarFiltreSearch from './filterSearchComp/SideBarFiltreSearch';

const useStyles = makeStyles(theme => ({
  posts:{
    display:"flex",
    width:"100%",
    flexWrap: "wrap"
  }
}));



const Posts = ({ getPosts, adoptposts ,type }) => {
  useEffect(() => {getPosts()}, []);
  const classes = useStyles();

  const [myFilter, setFilter] = useState({
    fltrOption:"", fltrValue:null
  });
  const filterBy = (fltrOption, fltrValue) => {
    if (fltrOption===''||fltrValue===''){
      setFilter({fltrOption:"", fltrValue:null})
    }else{ setFilter({fltrOption, fltrValue}) }
  }
  const { fltrOption, fltrValue } = myFilter;

  return adoptposts.loading?
(
<Spinner />):(
<Fragment>
   
      <h1 className='large text-primary'>Posts</h1>
      <SideBarFiltreSearch filterBy={filterBy}/>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to Adoption 
      </p>
     
      {type === "visitor" ? null : <PostForm />}
        <div className={classes.posts}>
        {adoptposts.adoptposts.filter(el => fltrOption ? el[fltrOption] === fltrValue : true ).map(post => (
          <AdoptPost key={post._id} post={post} />
        ))}
      </div> 
    
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  adoptposts: PropTypes.object.isRequired,
  type: PropTypes.bool
};

const mapStateToProps = state => ({
    adoptposts: state.adoptPosts,
    type:state.auth.user.type
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);