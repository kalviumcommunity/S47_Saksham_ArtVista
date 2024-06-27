// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import axios from 'axios';
// import { BrowserRouter } from 'react-router-dom';
// import { vi } from 'vitest';
// import Create from '../Create';

// vi.mock('axios');

// describe('Create', () => {
//     beforeEach(() => {
//         localStorage.setItem('UserToken', 'mock-token'); // Mock the UserToken
//     });

//     afterEach(() => {
//         localStorage.clear(); // Clear localStorage after each test
//         vi.resetAllMocks(); // Reset all mock calls and instances after each test
//     });

//     it('should handle form submission error', async () => {
//         const mockUser = { email: 'test@example.com' };
//         const mockPostData = {
//             email: mockUser.email,
//             image: 'https://example.com/image.jpg',
//             title: 'Test Title',
//             description: 'Test Description'
//         };
//         const mockErrorResponse = { response: { data: { message: 'Post creation failed!' } } };

//         // Mock axios post requests
//         axios.post.mockImplementation((url, data) => {
//             if (url.includes('/verifyuser')) {
//                 // Mock verifyuser to return successfully without affecting form submission
//                 return Promise.resolve({ data: { user: mockUser } });
//             } else if (url.includes('/posts')) {
//                 // Mock posts to simulate submission error
//                 if (data.email === mockUser.email) {
//                     return Promise.reject(mockErrorResponse);
//                 }
//             }
//             return Promise.reject(new Error('Unexpected request'));
//         });

//         render(
//             <BrowserRouter>
//                 <Create />
//             </BrowserRouter>
//         );

//         // Simulate input changes
//         fireEvent.change(screen.getByPlaceholderText('title'), { target: { value: 'Test Title' } });
//         fireEvent.change(screen.getByPlaceholderText('******'), { target: { value: 'https://example.com/image.jpg' } });
//         fireEvent.change(screen.getByPlaceholderText('Describe about your post here'), { target: { value: 'Test Description' } });

//         // Submit the form
//         fireEvent.click(screen.getByText('Submit'));

//         // Wait for the form submission to complete
//         await waitFor(() => {
//             expect(axios.post).toHaveBeenCalledWith(
//                 `${import.meta.env.VITE_BACKEND}/posts`,
//                 mockPostData
//             );
//         });

//         // Verify that the form submission error was handled
//         expect(screen.getByText('Post creation failed!')).toBeInTheDocument();
//     });
// });
