import { useState, useEffect } from 'react';

import FilterBar from "../../components/filterBar/filterBar";
import Film from "../../components/film/film";

import "./home.scss";
import { movies } from "../../data/movies";
import { CircularProgress } from "@material-ui/core";

export const Home= () => {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState([]);

  const getMovies = async () => {
    const res = await movies;
    console.log("res:", res);
    // creating new array filtred by unique value
    setCategories(res.map(item => item.category).filter((v, i, a) => a.indexOf(v) === i));
    setFilms(res);
    setLoading(false);
    console.log("films:", films);
    console.log("categories:", categories);
  }

  useEffect(() => {
    getMovies();

  }, []);



  return (
    <div className="home-parent">
      <div className="top-bar">
        <FilterBar categories={categories}/>
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