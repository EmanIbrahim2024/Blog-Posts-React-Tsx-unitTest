import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "./Signup";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set } from "firebase/database";

const Mockdispatch = jest.fn();
window.alert = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => Mockdispatch,
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({
      user: { uid: "123" },
    })
  ),
}));

jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(() => ({})),
  set: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../redux/AuthSliceAndtest/authSlice", () => ({
  loginSuccess: jest.fn((user) => ({ type: "LOGIN_SUCCESS", payload: user })),
}));

// Mock alert window
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("Signup Component", () => {
  test("renders Signup form inputs and button", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  test("calls firebase createUserWithEmailAndPassword and dispatch on valid form submission", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    //waiting for complete the process
    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object), // auth object
        "test@example.com",
        "Password123!"
      );

      expect(set).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          email: "test@example.com",
          fullName: "Test User",
          phone: "1234567890",
        })
      );

      expect(Mockdispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "LOGIN_SUCCESS",
          payload: expect.objectContaining({
            email: "test@example.com",
            fullName: "Test User",
            phone: "1234567890",
            uid: "123",
          }),
        })
      );
    });
  });

  test("shows alert on firebase signup error", async () => {
    const { createUserWithEmailAndPassword } = require("firebase/auth");
    createUserWithEmailAndPassword.mockImplementationOnce(() =>
      Promise.reject({ code: "auth/email-already-in-use" })
    );

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Error: auth/email-already-in-use"
      );
    });
  });
});

//   test("shows alert if validation fails", async () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Signup />
//         </BrowserRouter>
//       </Provider>
//     );

//     // submit without get data in fields
//     fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

//   });
