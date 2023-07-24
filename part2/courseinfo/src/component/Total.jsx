const Total = (props) => {
  const { parts } = props.course;
  let total = parts.reduce((acc, curElement) => acc + curElement.exercises, 0);
  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};
export default Total;
