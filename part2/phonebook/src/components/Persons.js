import Person from "./Person";

const Persons = ({ persons, removeItem }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          removeItem={() => removeItem(person)}
        />
      ))}
    </ul>
  );
};

export default Persons;
