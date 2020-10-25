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
    const tmp = props.categories.map((item) => {
      return {name: item, active: props.activeCategories.includes(item) ? true : false};
    })
    setCategories(tmp);
  }

  useEffect(() => {
    parseCategories();
  }, [props]);

  // trigger callback on categories changes
  const applyFilter = () => {
    const tmp = categories.filter((item) => {
      if (item.active) {
        return true;
      }
      return false;
    }).map(item => item.name);
    props.onCategoryChange(tmp);
  }

  const toggleCategory = (name) => {
    const idx = categories.findIndex(category => category.name === name);
    // toggle bool
    categories[idx].active = !categories[idx].active;
    setCategories([...categories]);
    applyFilter();
  }

  const unSelectCategory = (name) => {
    const idx = categories.findIndex(category => category.name === name);
    // toggle bool
    categories[idx].active = false;
    setCategories([...categories]);
    applyFilter();
  }

  return (
    <div className="filter-parent">
      <div className="labels">
        {
          categories.map((item) => {
            if (item.active) {
              return <FilterItem key={item.name} itemName={item.name} unSelect={unSelectCategory} />
            }
            return null
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