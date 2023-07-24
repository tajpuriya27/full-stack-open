const Header = (props) => {
  // console.log("header component", props);
  const { name } = props.course;
  return <h2>{name}</h2>;
};

export default Header;
