import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MapingPosts from "./MappingPosts";

import { MemoryRouter } from "react-router-dom";

const mockPosts = [
  {
    id: "1",
    title: "Post One",
    content: "content 1",
    timestamp: new Date().toISOString(),
    Auther: "Eman",
  },
  {
    id: "2",
    title: "Post Two",
    content: "content 1",
    timestamp: new Date().toISOString(),
    Auther: "Eman",
  },
  {
    id: "3",
    title: "Post Three",
    content: "content 1",
    timestamp: new Date().toISOString(),
    Auther: "Eman",
  },
  {
    id: "4",
    title: "Post Four",
    content: "content 1",
    timestamp: new Date().toISOString(),
    Auther: "Eman",
  },
  {
    id: "5",
    title: "Post Five",
    content: "content 1",
    timestamp: new Date().toISOString(),
    Auther: "Eman",
  },
];

const handleEdit = jest.fn();
const handleDelete = jest.fn();

beforeEach(() => {
  localStorage.setItem("user", JSON.stringify({ fullName: "John Doe" }));
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

test("Show number of posts according to available posts per page", async () => {
  render(
    <MemoryRouter>
      <MapingPosts
        userPosts={mockPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </MemoryRouter>
  );

  // ensure display the first four posts according to pagination

  expect(screen.getByText("Post One")).toBeInTheDocument();
  expect(screen.getByText("Post Two")).toBeInTheDocument();
  expect(screen.getByText("Post Three")).toBeInTheDocument();
  expect(screen.getByText("Post Four")).toBeInTheDocument();

  // ensure not display the fifth post according to pagination

  expect(screen.queryByText("Post Five")).not.toBeInTheDocument();
});

test("clicking handle Edit get Edit page", () => {
  render(
    <MemoryRouter>
      <MapingPosts
        userPosts={mockPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </MemoryRouter>
  );

  const editButtons = screen.getAllByText("Edit");
  fireEvent.click(editButtons[0]);
  expect(handleEdit).toHaveBeenCalledWith(mockPosts[0]);
});

test("handle Delete", () => {
  render(
    <MemoryRouter>
      <MapingPosts
        userPosts={mockPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </MemoryRouter>
  );

  const deleteButtons = screen.getAllByText("Delete");
  fireEvent.click(screen.getByTestId("deletebtn-1"));
  expect(handleDelete).toHaveBeenCalledWith("1");
});
