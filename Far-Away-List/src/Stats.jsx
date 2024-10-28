import PropTypes from "prop-types";

Stats.propTypes = {
  items: PropTypes.array.isRequired,
};

export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPackedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "Congrats! You are all set for your trip! ✈️"
          : ` You have ${numItems} items on your list, and you are already packed
        ${numPackedItems} items. That's ${percentage}% of them.`}
      </em>
    </footer>
  );
}
