import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "../components/BlogForm";

test("test for new blog form", () => {
  const addBlog = jest.fn();

  const component = render(<BlogForm createBlog={addBlog} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "Testing Title" },
  });

  fireEvent.change(author, {
    target: { value: "Sunil Tajpuriya" },
  });

  fireEvent.change(url, {
    target: { value: "www.example.com" },
  });

  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("Testing Title");
  expect(addBlog.mock.calls[0][0].author).toBe("Jhon Doe");
  expect(addBlog.mock.calls[0][0].url).toBe("www.example.com");
});
