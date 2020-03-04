import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deleteItem, addComment } from '../../actions/itemShop';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ItemEdit from './ItemEdit'
import './Item.css';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: blue[500]
  },
  avatarcomment: {
    backgroundColor: blue[500],
    width: 25,
    height: 25
  },
  dislike: {
    color: 'grey'
  },
  like: {
    color: '#d32f2f'
  },
  supp: {
    color: '#d50000'
  },
  edit: {
    color: '#4db6ac'
  },
  Number: {
    color: 'grey',
    fontSize: 15
  },
  space: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function Item({
  itemState,
  addComment,
  itemId,
  addLike,
  removeLike,
  deleteItem,
  auth,
  item,
  showActions
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { _id, description, name, picture, price, species, likes, comments, date }=item
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const isliked=auth.user?(likes.filter((el)=>el.user===auth.user._id).length>0):false
  const [Text, setText] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [liked, setliked] = React.useState(isliked);
  // setliked(
  //   likes.indexOf({_id:auth.user._id})>0
  // )
  const handlelikeClick = () => {
    if (auth.user){
    if(liked) {removeLike(_id); setliked(false)}
    else {addLike(_id); setliked(true)}}
  };
  const [supp, setsupp] = React.useState(false);
  const handledeleteClick = () => {
    setsupp(!supp);
  };

  const [edit, setedit] = React.useState(false);

  const handleeditClick = () => {
    setedit(!edit);
  };
  var timeLikeClicked = 1;

  return (
    <Card className='root'>
          
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        subheader={
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        }
      />
      <div className='content'>
        <img
          className='media'
          src={picture}
        />

        <CardContent>
          <Typography className='text'>Nom :</Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography className='text'>Description :</Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {description}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography className='text'>Prix :</Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {price}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography className='text'>Espèce :</Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {species}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography className='text'>Description :</Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {description}
          </Typography>
        </CardContent>
      </div>
      {showActions && (
      <CardActions disableSpacing className={classes.space}>
        <div>
        <IconButton
        onClick={()=>{ 
         handlelikeClick();
        }}
        style={liked ? {color:"#d32f2f"}:{color:"grey"}}
        // style={(liked )?{color:"#d32f2f"}:{color:"grey"}}
        // className={
        //   clsx(classes.dislike, {
        //   [classes.like]: liked,
        // })}
        >
          <FavoriteIcon />
          <span>{likes.length > 0 && <span className={classes.Number}>{likes.length}</span>}</span>
        </IconButton>


            {!auth.loading && auth.user.type==="admin" && (
            <IconButton
              aria-label={supp}
              onClick={() => {
                deleteItem(_id);
              }}
              className={clsx(classes.dislike, {
                [classes.supp]: supp
              })}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <ItemEdit item={item}/>
          {/* <IconButton
            aria-label={edit}
            onClick={handleeditClick}
            className={clsx(classes.dislike, {
              [classes.edit]: edit
            })}
          >
            <EditOutlinedIcon /> */}
          {/* </IconButton> */}
        </div>
         
        <Link to={`/itemshop/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>

        <div>
          <Link to={`/itemshop/${_id}`}>
            {comments.length > 0 && (
              <span className={classes.Number}>{comments.length}</span>
            )}
          </Link>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </CardActions>
      )}
      {/* <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
           <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addComment(_id, { Text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          value={ Text }
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
          <Typography className='comment'>
            <Avatar
              className={classes.avatarcomment}
              aria-label='recipe'
              src='avatar'
            >
              R
            </Avatar>
            <span>text</span>
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}

Item.defaultProps = {
  showActions: true
};

Item.propTypes = {
  addComment:PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  islikeclicked: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deleteItem, addComment })(
  Item
);
