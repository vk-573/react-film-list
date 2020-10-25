import { useState, useEffect } from 'react';

import FilterBar from "../../components/filterBar/filterBar";
import Film from "../../components/film/film";

import "./home.scss";
import { movies } from "../../data/movies";
import { CircularProgress } from "@material-ui/core";
import MovieIcon from '@material-ui/icons/Movie';

export const Home= () => {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);

  const getMovies = async () => {
    const res = await movies;
    console.log("res:", res);
    setFilms(res);
    setLoading(false);
    console.log("films:", films);
  }

  useEffect(() => {
    getMovies();
  }, []);


  return (
    <div className="home-parent">
      <div className="top-bar">
        <FilterBar/>
      </div>
      {loading ? <div className="loader-p">
        <CircularProgress className="loader"/>
      </div> :
        <div className="content">
          {
            films.map(film => 
              <Film key={film._id} title={film.title} category={film.category} likes={film.likes} dislikes={film.dislikes} />
            )
          }  
        </div>
      }
    </div>
  );
};

export default Home;