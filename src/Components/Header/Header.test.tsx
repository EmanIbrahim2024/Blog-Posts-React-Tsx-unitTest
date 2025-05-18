import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../redux/AuthSliceAndtest/authSlice";
import { MemoryRouter } from "react-router-dom";


//renderWithprovider is fn to render header but by using redux

const renderWithProviders = (user: any = null) => {
  //create store and pass argument to set user by using preloadedstate
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { user: user },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    ),
  };
};

describe("Header Component with localStorage", () => {
  test("shows login/signup when no user in localStorage", () => {
    renderWithProviders(null);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  test("shows dashboard/logout when user exists in localStorage", () => {
    const fakeUser = { email: "test@example.com", id: "123" };

    renderWithProviders(fakeUser);

    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/all posts/i)).toBeInTheDocument();
    expect(screen.getByText(/new post/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test("removes user from localStorage on logout", () => {
    const fakeUser = { email: "test@example.com", id: "123" };

    const { store } = renderWithProviders(fakeUser);

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    const state = store.getState();
    expect(state.auth.user).toBeNull;

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
