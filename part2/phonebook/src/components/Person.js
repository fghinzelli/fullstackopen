const Person = ({ name, number, removeItem }) => (
  <li>
    {name} {number} <button onClick={removeItem}>delete</button>
  </li>
);

export default Person;
