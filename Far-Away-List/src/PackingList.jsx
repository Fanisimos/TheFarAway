import { useState } from "react";
import Item from "./Item";
import PropTypes from "prop-types";

PackingList.propTypes = {
  items: PropTypes.array.isRequired, // Ensures `item` is a array and required
  onDeleteItem: PropTypes.func.isRequired, // Ensures `item` is a function and required
  onToggleItem: PropTypes.func.isRequired, // Ensures `item` is a function and required
  onSetItems: PropTypes.func.isRequired, // Ensures `item` is a function and required
};

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onSetItems,
}) {
  const [sort, setSort] = useState("packed");
  let sortedItems;

  if (sort === "packed")
    sortedItems = items.slice().sort((a, b) => b.packed - a.packed);
  if (sort === "description")
    sortedItems = items.slice().sort((a, b) => b.quantity - a.quantity);
  if (sort === "A-Z")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sort === "input") sortedItems = items.slice();

  function handleClear() {
    const confirmed = window.confirm(
      "Are you sure you want to clear the list?"
    );
    if (confirmed) onSetItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, index) => (
          <Item
            key={index}
            item={item.description}
            id={item.id}
            quantity={item.quantity}
            packed={item.packed}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="packed">Sorted by Packed Status</option>
          <option value="description">Sorted by Quantity</option>
          <option value="A-Z">Sorted by A-Z</option>
          <option value="input">Sorted by Description</option>
        </select>
        <button onClick={handleClear}>Clear List</button>
      </div>
    </div>
  );
}
