import { useState, useEffect } from 'react';

import FilterBar from "../../components/filterBar/filterBar";
import Film from "../../components/film/film";

import "./home.scss";
import { movies } from "../../data/movies";
import { CircularProgress, Select, MenuItem } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

export const Home= () => {
  const [loading, setLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [paginatedFilms, setPaginatedFilms] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(8);
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
    // setPaginatedFilms(res.slice(0, limit));
    setLoading(false);
  }

  // on mount
  useEffect(() => {
    getMovies();
  }, []);

  // on film changed
  useEffect(() => {
    applyPagination();
  }, [films, limit]);

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

  const applyPagination = () => {
    console.log("LIMIT IN NEW PAGINATION//:", limit);
    const paginated = films.reduce((arr, item, index) => { 
      const chunkIndex = Math.floor(index / limit);
      if(!arr[chunkIndex]) {
        arr[chunkIndex] = [] // start a new chunk
      }
      arr[chunkIndex].push(item)
      return arr
    }, []);
    setPage(0);
    setPaginatedFilms([...paginated]);
    console.log("paginated:", paginated);
  }

  const applyLimit = (e) => {
    console.log("LIMIT VALUE NEW:", e.target.value);
    setLimit(e.target.value);
    // applyPagination();
  }

  const changePage = (direction) => {
    if (direction === "next" && paginatedFilms[page + 1]) {
      setPage(page + 1)
    } else if (direction === "prev" && page != 0) {
      setPage(page - 1)
    }
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
            paginatedFilms[page].map(film =>
              <Film key={film._id} title={film.title} category={film.category} likes={film.likes} dislikes={film.dislikes} />
            )
          }  
        </div>
      }
      <div className="footer">
        <div className="flex limits">
          <div className="limit-label">Films per page: </div>
          <Select
            value={limit}
            onChange={applyLimit}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </div>
        <div>
          page: <span className="value">{page + 1}</span> of total {paginatedFilms.length}
        </div>
        <div className="buttons">
          <NavigateBefore onClick={(e) => changePage("prev")}/>
          <NavigateNext onClick={(e) => changePage("next")}/>
        </div>
      </div>
    </div>
  );
};

export default Home;