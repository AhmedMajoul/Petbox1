import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import './AdoptPost.css'

const useStyles = makeStyles(theme => ({
 
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
  avatarcomment: {
    backgroundColor: blue[500],
    width:25,
    height:25
  },
  dislike:{
    color:"grey"
  },
  like:{
    color:"#d32f2f"
  },
  supp:{
  color:"#d50000"
  },
 edit:{
   color:"#4db6ac"
 }

}));

export default function RecipeReviewCard() {
  

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [liked, setliked] = React.useState(false);
  const handlelikeClick = () => {
    setliked(!liked)
  };

  const [supp, setsupp] = React.useState(false);
  const handledeleteClick = () => {
    setsupp(!supp)
  };
  const [edit, setedit] = React.useState(true);
  const handleeditClick = () => {
    setedit(!edit)
  };
 
  return (
    <Card className="root">
      <CardHeader 
        avatar={ 
          <Avatar className={classes.avatar} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
           
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader={new Date().toLocaleString()}
      />
    <div className="content">  
<img className="media" src=""/>
      {/* <CardMedia className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
      <Typography className="text" >Description :</Typography>
        <Typography variant="body2" color="textSecondary" className="text">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
        
      </CardContent>
      </div>
      <CardActions disableSpacing>
        <IconButton aria-liked={liked} 
        onClick={handlelikeClick}  
        className={clsx(classes.dislike, {
          [classes.like]: liked,
        })}>
          <FavoriteIcon />
        </IconButton>
        {<IconButton aria-label={supp} 
        onClick={handledeleteClick}  
        className={clsx(classes.dislike, {
          [classes.supp]: supp,
        })}>
        <DeleteIcon />
        </IconButton>}
        <IconButton aria-label={edit} 
        onClick={handleeditClick}  
        className={clsx(classes.dislike, {
          [classes.edit]: edit,
        })}>
        <EditOutlinedIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        > 
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <input type="text" placeholder="Entrer votre commentaire" className="enterComment"></input>
          <Typography 
        className="comment">
          <Avatar className={classes.avatarcomment} aria-label="recipe">
            R
          </Avatar>
            <span>comment 1</span>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}