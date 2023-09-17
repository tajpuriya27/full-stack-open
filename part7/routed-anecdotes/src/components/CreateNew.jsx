import { useNavigate } from "react-router-dom";

import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const reDirect = useNavigate();
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    reDirect("/");
  };

  function resetAll() {
    const emptyValue = {
      target: {
        value: "",
      },
    };
    content.onChange(emptyValue);
    author.onChange(emptyValue);
    info.onChange(emptyValue);
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={resetAll}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button type="submit">create</button>
        <input type="reset" value="Reset" />
      </form>
    </div>
  );
};

export default CreateNew;
