
import { render, screen, fireEvent } from "@testing-library/react";
import MapingPosts from "./MappingPosts";
import { Post } from "Components/Types";
import { MemoryRouter } from "react-router-dom";
import PostForm from "Components/PostForm/PostForm";



// ممكن تعرف الـ mock data والـ mocks للـ handlers
const mockPosts = [
  { id: "1", title: "Post One" ,content:"content 1",timestamp:new Date().toISOString(),Auther:"Eman"},
  { id: "2", title: "Post Two" ,content:"content 1",timestamp:new Date().toISOString(),Auther:"Eman" },
  { id: "3", title: "Post Three" ,content:"content 1",timestamp:new Date().toISOString(),Auther:"Eman"},
  { id: "4", title: "Post Four" ,content:"content 1",timestamp:new Date().toISOString(),Auther:"Eman"},
  { id: "5", title: "Post Five",content:"content 1",timestamp:new Date().toISOString(),Auther:"Eman" },
];

const handleEdit = jest.fn();
const handleDelete = jest.fn();

beforeEach(() => {
  localStorage.setItem(
    "user",
    JSON.stringify({ fullName: "John Doe" })
  );
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

test("Show number of posts according to available posts per page", () => {
  render(
    <MemoryRouter>
         <MapingPosts
      userPosts={mockPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
    </MemoryRouter>
 
  );

  // تحقق من ظهور أول 4 بوستات
  expect(screen.getByText("Post One")).toBeInTheDocument();
  expect(screen.getByText("Post Two")).toBeInTheDocument();
  expect(screen.getByText("Post Three")).toBeInTheDocument();
  expect(screen.getByText("Post Four")).toBeInTheDocument();

  // تحقق من عدم ظهور البوست الخامس

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
  fireEvent.click(deleteButtons[0]);
  expect(handleDelete).toHaveBeenCalledWith("1");
});