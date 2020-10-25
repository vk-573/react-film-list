import { useEffect, useState } from 'react';

import FilterItem from "../filterItem/filterItem";
import PropTypes from 'prop-types';
import "./filterBar.scss";

export const FilterBar = (props) => {
  const [dropped, setDrop] = useState(false);
  const [categories, setCategories] = useState([{}]);

  const onDrop = () => {
    setDrop(!dropped)
  }

  const parseCategories = () => {
    console.log("prps.categories:", props.categories);
    const tmp = props.categories.map((item) => {
      return {name: item, active: false};
    })
    setCategories(tmp);
    console.log("tmp:", tmp);
  }

  useEffect(() => {
    parseCategories()
  }, [props]);

  const toggleCategory = (name) => {
    const idx = categories.findIndex(category => category.name === name);
    // toggle bool
    categories[idx].active = !categories[idx].active;
    console.log('categories CHANGED:', categories);
    setCategories(categories);
  }

  const unSelectCategory = (name) => {
    const idx = categories.findIndex(category => category.name === name);
    // toggle bool
    categories[idx].active = false;
    setCategories(categories);
  }

  return (
    <div className="filter-parent">
      <div className="labels">
        {
          categories.map((item) => {
            if (item.active) {
              return <FilterItem key={item.name} itemName={item.name} unSelect={unSelectCategory} />
            }
          })
        }
      </div>
      <div className="filter">
        <div className="drop">
          <button className="button-filter" onClick={onDrop}>
            FILTER
          </button>
          <ul className={dropped ? "dropped": ""}>
            {categories.map(item => {
              console.log("itel;", item);
              return <li key={item.name} className={item.active ? 'active' : ''} onClick={() => toggleCategory(item.name)}>{item.name}</li>
            }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  categories: PropTypes.array,
};


export default FilterBar;