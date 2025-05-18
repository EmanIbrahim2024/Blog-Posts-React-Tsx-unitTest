
// // EditPost.test.tsx
// import React from 'react';
// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import EditPost from './EditPost';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';

// // Mock post data
// const mockPost = {
//   id: '1',
//   title: 'Test Title',
//   content: 'Test Content',
//   Auther:"Eman",
//   timestamp:new Date().toISOString()
// };

// // Mock update function


// // Mock usePost hook


// // Helper render function using MemoryRouter
// const renderWithRouter = (ui: React.ReactElement, initialRoute: string = '/edit/1') => {
//   return render(
//     <MemoryRouter initialEntries={[initialRoute]}>
//       <Routes>
//         <Route path="/edit/:id" element={ui} />
//       </Routes>
//     </MemoryRouter>
//   );
// };

// describe('EditPost Component', () => {
//   test('renders loading message if loading is true', () => {
//     jest.doMock('../../hooks/usePost', () => ({
//       usePost: () => ({
//         post: null,
//         loading: true,
//         error: null,
//         updatePost: jest.fn(),
//       }),
//     }));

//     // إعادة require بعد mock جديد
//     const { default: EditPostWithLoading } = require('./EditPost');

//     renderWithRouter(<EditPostWithLoading />);
//     expect(screen.getByText(/loading/i)).toBeInTheDocument();
//   });

//   test('renders error message if error exists', async () => {
//     jest.doMock('../../hooks/usePost', () => ({
//       usePost: () => ({
//         post: null,
//         loading: false,
//         error: 'Failed to fetch data',
//         updatePost: jest.fn(),
//       }),
//     }));

//     const { default: EditPostWithError } = require('./EditPost');

//     renderWithRouter(<EditPostWithError />);
//     expect(await screen.findByText(/failed to fetch data/i)).toBeInTheDocument();
//   });

//   test('shows post title and content in input fields', async () => {
//     renderWithRouter(<EditPost />);
//     const titleInput = await screen.findByDisplayValue(/test title/i);
//     const contentInput = await screen.findByDisplayValue(/test content/i);

//     expect(titleInput).toBeInTheDocument();
//     expect(contentInput).toBeInTheDocument();
//   });

//   test('shows error message when submitting empty fields', async () => {
//     renderWithRouter(<EditPost />);
//     const titleInput = await screen.findByDisplayValue(/test title/i);
//     const contentInput = await screen.findByDisplayValue(/test content/i);
//     const submitButton = screen.getByRole('button', { name: /submit/i });

//     fireEvent.change(titleInput, { target: { value: '' } });
//     fireEvent.change(contentInput, { target: { value: '' } });
//     fireEvent.click(submitButton);

//     expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
//     expect(await screen.findByText(/content is required/i)).toBeInTheDocument();
//   });
// });
