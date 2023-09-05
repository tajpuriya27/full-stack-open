const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
    <button>show</button>
  </div>
);

export default Blog;
