import Part from "./Part";

const Content = (props) => {
  // console.log('Content component', props);
  const { parts } = props.course;
  // console.log(parts);
  return parts.map((element) => <Part key={element.id} part={element} />);
};

export default Content;
