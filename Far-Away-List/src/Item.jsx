import PropTypes from "prop-types";

Item.propTypes = {
  item: PropTypes.string.isRequired, // Ensures `item` is a string and required
  id: PropTypes.number.isRequired, // Ensures `item` is a number and required
  quantity: PropTypes.number.isRequired, // Ensures `item` is a number and required
  packed: PropTypes.bool.isRequired, // Ensures `item` is a boolean and required
  onDeleteItem: PropTypes.func.isRequired, // Ensures `item` is a function and required
  onToggleItem: PropTypes.func.isRequired, // Ensures `item` is a function and required
};

function Item({ item, id, quantity, packed, onDeleteItem, onToggleItem }) {
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={packed}
          onChange={() => onToggleItem(id)}
        />
        <span style={packed ? { textDecoration: "line-through" } : {}}>
          {quantity} {item}
        </span>
        <button onClick={() => onDeleteItem(id)}>❌</button>
      </li>
    </>
  );
}

export default Item;
