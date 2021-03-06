import { useState } from 'react';

import PropTypes from 'prop-types';
import MovieIcon from '@material-ui/icons/Movie';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { LinearProgress } from '@material-ui/core';

import "./film.scss";

export const Film = (props) => {
  const [liked, setLiked] = useState(null);
  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);
  const onLike = () => {
    if (liked === true) {
      setLikes(likes - 1);
      setLiked(null);
      return;
    } else if (liked === false) {
      setDislikes(dislikes - 1);
    }
    setLikes(likes + 1);
    setLiked(true);
  }

  const onDislike = () => {
    if (liked === false) {
      setLiked(null);
      setDislikes(dislikes - 1);
      return;
    } else if (liked === true) {
      setLikes(likes - 1);
    }
    setDislikes(dislikes + 1);
    setLiked(false);
  }

  const onDelete = () => {
    props.onDelete(props.id);
  }

  return (
    <div className="film-parent">
      <div className="icon">
        <MovieIcon className="moovie"/>
        <DeleteForever className="delete" onClick={onDelete}/>
      </div>
      <div className="details">
        <div className="title">
          {props.title}
        </div>
        <div className="category">
          {props.category}
        </div>
      </div>
      <div className="ratio-p">
        <div className="icons">
          <div>
            <ThumbUp className={liked === true ? 'liked' : ''} onClick={onLike} />
            <span className="likes">{likes}</span>
          </div>
          <div>
            <ThumbDown className={liked === false ? 'disliked' : ''} onClick={onDislike} />
            <span className="dislikes">{dislikes}</span>
          </div>
        </div>
        <div className="ratio-bar">
          <LinearProgress variant="determinate" value={(likes / (likes + dislikes)) * 100} />
        </div>
      </div>
    </div>
  );
};

Film.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  onDelete: PropTypes.func
};

export default Film;