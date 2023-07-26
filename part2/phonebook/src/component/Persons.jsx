const Persons = (props) => {
  const { personsToShow } = props;
  return personsToShow.map((element) => (
    <div key={element.name}>
      {element.name} {element.number}
    </div>
  ));
};
export default Persons;
