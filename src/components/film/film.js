import PropTypes from 'prop-types';
import MovieIcon from '@material-ui/icons/Movie';

import "./film.scss";

export const Film = (props) => {
  const onLike = () => {
    console.log("like");
  }

  const onDislike = () => {
    console.log("dislike");
  }

  console.log("props:", props);
  return (
    <div className="film-parent">
      <div className="icon">
        <MovieIcon/>
      </div>
      <div className="details">
        {props.title}
        {props.category}
      </div>
      <div>
        {props.likes}
        {props.dislikes}
      </div>
    </div>
  );
};

Film.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
};

export default Film;