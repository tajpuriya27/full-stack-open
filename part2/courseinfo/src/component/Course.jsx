import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {
  // console.log("course component", props);
  const { courses } = props;
  return courses.map((element) => {
    return (
      <div key={element.id}>
        <Header course={element} />
        <Content course={element} />
        <Total course={element} />
      </div>
    );
  });
};

export default Course;
