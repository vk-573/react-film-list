import PropTypes from 'prop-types';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import "./filterItem.scss";

export const FilterItem = (props) => {

  const onDelete = () => {
    console.log("delete");
  }

  return (
    <div className="filter-item-parent">
      {props.itemName}
      <HighlightOffIcon className="icon" onClick={onDelete}/>
    </div>
  );
};

FilterItem.propTypes = {
  itemName: PropTypes.string,
};

export default FilterItem;