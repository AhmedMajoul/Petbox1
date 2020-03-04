import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/adoptPosts';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  infos: {
    display: "flex",
  },
  
}));

const PostForm = ({ addPost }) => {

  const classes = useStyles();
  const [state, setState] = useState('');


  const {text, picture, petName, petPrice, petRace, petSexe, petDateOfBirth}= state
  const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost(state);
          setState('');
         document.location.reload();

        }}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name='petPhoto'
          cols='30'
          rows='1'
          placeholder='SRC IMG'
          value={picture}
          onChange={e => onChange(e)}
          required
        />
        <div className={classes.infos}>
        <textarea
          name='petName'
          cols='3'
          placeholder='Nom'
          value={petName}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name='petRace'
          cols='3'
          placeholder='Race'
          value={petRace}
          onChange={e => onChange(e)}
          required
        />
         <textarea
          cols='3'
          placeholder='male/female'
          name='petSexe'
          defaultValue={petSexe}
          onChange={e => {
            onChange(e);
          }} 
          />
        <input
        type="date"
        placeholder="Date de naissance"
        name="petDateOfBirth"
        value={petDateOfBirth}
        onChange={e => onChange(e)}
        />
        </div>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);