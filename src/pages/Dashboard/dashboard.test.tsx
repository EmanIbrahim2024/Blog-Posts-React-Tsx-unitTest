import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../redux/store";

const mockUser = {
  fullName: "Eman Ibrahim",
  email: "Eman@gmail.com",
  phone: "012333333",
};

beforeEach(() => {
  localStorage.setItem("user", JSON.stringify(mockUser));
});

afterEach(() => {
  localStorage.clear();
});

test("renders user info from local Storage", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();
  expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
  expect(screen.getByText(`Phone: ${mockUser.phone}`)).toBeInTheDocument();
});
