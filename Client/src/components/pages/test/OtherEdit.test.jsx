import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import OtherEdit from '../OtherEdit'; // Adjust the import path as necessary

vi.mock('axios');

describe('OtherEdit Component', () => {
    beforeEach(() => {
        localStorage.setItem('UserToken', 'mock-token'); // Mock the UserToken
    });

    afterEach(() => {
        localStorage.clear(); // Clear localStorage after each test
        vi.resetAllMocks(); // Reset all mock calls and instances after each test
    });

    it('should render posts after successful data fetch', async () => {
        const mockPosts = [
            { _id: '1', email: 'test@example.com', image: 'image1.jpg', title: 'Post 1', description: 'Description 1' },
            { _id: '2', email: 'test@example.com', image: 'image2.jpg', title: 'Post 2', description: 'Description 2' },
        ];

        axios.get.mockResolvedValueOnce({ data: mockPosts });

        render(
            <BrowserRouter>
                <OtherEdit />
            </BrowserRouter>
        );

        // Wait for data to load
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND}/posts/home`);
        });

        // Check if posts are rendered
        expect(screen.getByText('Post 1')).toBeInTheDocument();
        expect(screen.getByText('Post 2')).toBeInTheDocument();
    });

    it('should handle post deletion', async () => {
        const mockPosts = [
            { _id: '1', email: 'test@example.com', image: 'image1.jpg', title: 'Post 1', description: 'Description 1' },
        ];

        axios.get.mockResolvedValueOnce({ data: mockPosts });
        axios.delete.mockResolvedValueOnce({ data: { message: 'Post deleted successfully!' } });

        render(
            <BrowserRouter>
                <OtherEdit />
            </BrowserRouter>
        );

        // Wait for data to load
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND}/posts/home`);
        });

        // Simulate delete button click
        fireEvent.click(screen.getByText('Delete'));

        // Wait for delete operation to complete
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND}/modify/1`, {
                headers: {
                    Authorization: `Bearer mock-token`,
                },
            });
        });

        // Verify post is no longer in the UI
        expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
    });

    it('should handle errors during data fetch', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

        render(
            <BrowserRouter>
                <OtherEdit />
            </BrowserRouter>
        );

        // Wait for error message to be displayed
        await waitFor(() => {
            expect(screen.getByText('Error fetching data: Failed to fetch data')).toBeInTheDocument();
        });
    });
});
