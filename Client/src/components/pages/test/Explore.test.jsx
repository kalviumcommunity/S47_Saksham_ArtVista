import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Explore from '../Explore'; 
import { vi } from 'vitest';

vi.mock('axios');

describe('Explore Component', () => {
    it('should display loader initially', () => {
        render(
            <BrowserRouter>
                <Explore />
            </BrowserRouter>
        );
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should fetch and display posts', async () => {
        const mockPosts = [
            { _id: '1', image: 'https://static.autox.com/uploads/2023/08/Lamborghini-Revuelto-Exterior.jpg' },
            { _id: '2', image: 'https://static.autox.com/uploads/2023/08/Lamborghini-Revuelto-Exterior.jpg' }
        ];
        const mockUsernames = { users: [{ email: 'test@example.com', username: 'testuser' }] };

        axios.get.mockImplementation((url) => {
            if (url.includes('/posts/home')) {
                return Promise.resolve({ data: mockPosts });
            } else if (url.includes('/getpostuser')) {
                return Promise.resolve({ data: mockUsernames });
            }
        });

        render(
            <BrowserRouter>
                <Explore />
            </BrowserRouter>
        );


        await waitFor(() => {
            expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
        });

        const images = screen.queryAllByAltText('post');
        expect(images).toHaveLength(mockPosts.length);
        mockPosts.forEach((post, index) => {
            expect(images[index]).toHaveAttribute('src', post.image);
        });
    });
});
