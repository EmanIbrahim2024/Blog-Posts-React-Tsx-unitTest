// import { render, screen, fireEvent } from '@testing-library/react';
// import Header from './Header';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../../redux/AuthSliceAndtest/authSlice';
// import { MemoryRouter } from 'react-router-dom';

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   NavLink: ({ children, to, ...rest }:{children:React.ReactNode;to:string}) => (
//     <a href={to} {...rest}>
//       {children}
//     </a>
//   ),
// }));




// const renderWithProviders = () => {
//   const store = configureStore({
//     reducer: { auth: authReducer },
//   });

//   return render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     </Provider>
//   );
// };

// describe('Header Component with localStorage', () => {
//   afterEach(() => {
//     localStorage.clear();
//   });

//   test('shows login/signup when no user in localStorage', () => {
//     renderWithProviders();

//     expect(screen.getByText(/login/i)).toBeInTheDocument();
//     expect(screen.getByText(/signup/i)).toBeInTheDocument();
//     expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
//   });

//   test('shows dashboard/logout when user exists in localStorage', () => {
//     const fakeUser = { email: 'test@example.com', id: '123' };
//     localStorage.setItem('user', JSON.stringify(fakeUser));

//     renderWithProviders();

//     expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
//     expect(screen.getByText(/all posts/i)).toBeInTheDocument();
//     expect(screen.getByText(/new post/i)).toBeInTheDocument();
//     expect(screen.getByText(/logout/i)).toBeInTheDocument();
//   });

//   test('removes user from localStorage on logout', () => {
//     const fakeUser = { email: 'test@example.com', id: '123' };
//     localStorage.setItem('user', JSON.stringify(fakeUser));

//     renderWithProviders();

//     const logoutButton = screen.getByText(/logout/i);
//     fireEvent.click(logoutButton);

//     expect(localStorage.getItem('user')).toBeNull();
//     expect(screen.getByText(/login/i)).toBeInTheDocument();
//   });
// });