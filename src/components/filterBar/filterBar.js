import FilterItem from "../filterItem/filterItem";
import "./filterBar.scss";

export const FilterBar = () => {
  return (
    <div className="filter-parent">
      <div className="labels">
        <FilterItem itemName="comedy"/>
        <FilterItem itemName="comedy"/>
        <FilterItem itemName="comedy"/>
        <FilterItem itemName="comedy"/>

      </div>
      <div className="filter">
        <div>
          FILTER
        </div>
      </div>
    </div>
  );
};

export default FilterBar;