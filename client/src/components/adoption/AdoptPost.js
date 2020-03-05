import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost, addComment } from '../../actions/adoptPosts';
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
import AdoptPostEdit from './AdoptPostEdit'
import './AdoptPost.css';

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
  },
  media: {
    width:'100%',
    padding: "0px 10px",
    justifyContent: "center",
    height:"370px"
  },
  card : {
    padding: "5px 10px",
    width:"50%",
    height:"auto",
    margin:"20px",
    boxShadow:"5px 10px 18px #888888"
    },
    icons:{
      display:"flex",
    }
}));

function AdoptPost({
  adoptpostState,
  addComment,
  postId,
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, picture, petName, race, dateBirth, sexe },
  showActions
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  
  const isliked=auth.user?(likes&&likes.filter((el)=>el.user===auth.user._id).length>0):false

  const [liked, setliked] = React.useState(isliked);
  

  const handlelikeClick = () => {
    if (auth.user){
    if(liked) {removeLike(_id); setliked(false)}
    else {addLike(_id); setliked(true)}}
  };
  const [supp, setsupp] = React.useState(false);
  
  const handledeleteClick = () => {
    setsupp(!supp);
  };

  return !adoptpostState.loading&&(
    <Card className={classes.card}>
          
      <CardHeader
        avatar={
          <Link to={`/profile/${user}`}>
          <Avatar className={classes.avatar} aria-label='recipe' src={avatar}>
            M
          </Avatar>
          </Link>
        }
        // action={
        //   <IconButton aria-label='settings'>
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        
        title={
          <Link to={`/profile/${user}`}>{name}</Link>}
        subheader={
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        }
      />
      
        <CardContent>
          {/* <Typography className='text'>Description :</Typography> */}
          <Typography variant='body2' color='textSecondary' className='text'>
            {text}
          </Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {petName}
          </Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {race}
          </Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {sexe}
          </Typography>
          <Typography variant='body2' color='textSecondary' className='text'>
            {dateBirth}
          </Typography>
        </CardContent>

        {(picture !== '') ? (
        <img 
          className={classes.media}
          src={picture}
        />):<span></span>}

        
      {showActions && (
      <CardActions disableSpacing className={classes.space}>
        <div className={classes.icons}>
        <IconButton
        onClick={()=>{ 
         handlelikeClick();
        }}
        style={liked ? {color:"#d32f2f"}:{color:"grey"}}
        >
          <FavoriteIcon />
          <span>{likes.length > 0 && <span className={classes.Number}>{likes.length}</span>}</span>
        </IconButton>


            {!auth.loading && user === auth.user._id || auth.user.type==="admin" && (
            <div className={classes.icons}>
            <IconButton
              aria-label={supp}
              onClick={() => {
                deletePost(_id);
              }}
              className={clsx(classes.dislike, {
                [classes.supp]: supp
              })}
            >
              <DeleteIcon />
            </IconButton>

            <AdoptPostEdit Description={{text, picture, petName, race, dateBirth, sexe}} PostId={_id} />
            </div>
          )}
          

        </div>
         
        <Link to={`/adoptposts/${_id}`} className='btn btn-primary'>
            Discussion{' '}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>

      </CardActions>
      )}
    </Card>
  );
}

AdoptPost.defaultProps = {
  showActions: true
};

AdoptPost.propTypes = {
  addComment:PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  islikeclicked: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  adoptpostState: state.adoptPosts
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost, addComment })(AdoptPost);
