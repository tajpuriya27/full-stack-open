const IndividualUser = ({ userOne }) => {
  if (!userOne) {
    return "Redirect to Home page first";
  }
  return (
    <>
      <h2>{userOne.name}</h2>
      <h5>added blogs</h5>
      {userOne.blogs.map((n) => (
        <li key={n.id}>{n.title}</li>
      ))}
    </>
  );
};

export default IndividualUser;
