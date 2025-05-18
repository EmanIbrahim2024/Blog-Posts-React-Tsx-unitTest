import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import PostForm from "./PostForm";



describe("PostForm Component", () => {
  const mockSetTitle = jest.fn();
  const mockSetContent = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with initial values", () => {
      render(
      <PostForm
        title="Test Title"
        setTitle={jest.fn()}
        content="Test Content"
        setContent={jest.fn()}
        handleSubmit={jest.fn()}
        SelectedPost={null}
      />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue("Test Title");
    expect(screen.getByLabelText(/content/i)).toHaveValue("Test Content");
    expect(screen.getByRole("button")).toHaveTextContent("Add Post");
  });

  test("shows 'Edit Post' button when SelectedPost is set", () => {
    render(
      <PostForm
        title="Edit Title"
        setTitle={mockSetTitle}
        content="Edit Content"
        setContent={mockSetContent}
        handleSubmit={mockHandleSubmit}
        SelectedPost={{ id: "1", title: "Edit Title", content: "Edit Content" ,timestamp:"now"}}
      />
    );

    expect(screen.getByRole("button")).toHaveTextContent("Edit Post");
  });

  test("calls setTitle on title input change", () => {
    render(
      <PostForm
        title=""
        setTitle={mockSetTitle}
        content=""
        setContent={mockSetContent}
        handleSubmit={mockHandleSubmit}
        SelectedPost={null}
      />
    );

    const input = screen.getByPlaceholderText(/post title/i);
    fireEvent.change(input, { target: { value: "New Title" } });

    expect(mockSetTitle).toHaveBeenCalledWith("New Title");
  });

  test("calls setContent on content textarea change", () => {
    render(
      <PostForm
        title=""
        setTitle={mockSetTitle}
        content=""
        setContent={mockSetContent}
        handleSubmit={mockHandleSubmit}
        SelectedPost={null}
      />
    );

    const textarea = screen.getByPlaceholderText(/post content/i);
    fireEvent.change(textarea, { target: { value: "New Content" } });

    expect(mockSetContent).toHaveBeenCalledWith("New Content");
  });

  test("calls handleSubmit on form submit", () => {
    render(
      <PostForm
        title="Title"
        setTitle={mockSetTitle}
        content="Content"
        setContent={mockSetContent}
        handleSubmit={mockHandleSubmit}
        SelectedPost={null}
      />
    );

    fireEvent.submit(screen.getByTestId("post-form"));

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});