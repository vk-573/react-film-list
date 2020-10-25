import { useState, useEffect } from 'react';

import FilterBar from "../../components/filterBar/filterBar";
import Film from "../../components/film/film";

import "./home.scss";
import { movies } from "../../data/movies";
import { CircularProgress } from "@material-ui/core";

export const Home= () => {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  let initialFilms = [];

  const getMovies = async () => {
    const res = await movies;
    // creating new array filtred by unique value
    const epuredCategories = res.map(item => item.category).filter((v, i, a) => a.indexOf(v) === i)
    initialFilms = [...res];
    setAllFilms(res);
    console.log("initialFilm:", initialFilms);
    console.log("res:", res);
    setCategories(epuredCategories);
    // setFilteredCategories(epuredCategories);
    setFilms(res);
    setLoading(false);
  }

  // on mount
  useEffect(() => {
    getMovies();
  }, []);

  const applyFilter = (categories) => {
    console.log("categories:", categories);
    // if no filters then don't apply on empty array
    if (!categories.length) {
      setFilms([...allFilms]);
      setFilteredCategories([]);
      return;
    }
    console.log("allFilms:", allFilms);
    const filteredFilms = allFilms.filter(item => {
      if (categories.includes(item.category)) {
        console.log("INCLUDES§ ");
        return true;
      }
    });
    setFilteredCategories([...categories]);
    setFilms([...filteredFilms]);
    console.log("filteredFilm:", filteredFilms);
    console.log("filteredCategories:", filteredCategories);
  }

  return (
    <div className="home-parent">
      <div className="top-bar">
        <FilterBar categories={categories} onCategoryChange={applyFilter} activeCategories={filteredCategories}/>
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