import handler from '@/pages/api/posts';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import fs from 'node:fs';

jest.mock('node:fs');

describe('API Posts Handler', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar os posts em uma requisição GET', async () => {
        const mockPosts = [
            { id: '1', title: 'Post 1', content: 'Content 1', createAt: new Date().toISOString(), author: 'Admin' }
        ];

        (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockPosts));

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({ method: 'GET' });

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(mockPosts);
    });

    it('deve criar um novo post em uma requisição POST', async () => {
        const mockPosts: any[] = [];

        (fs.readFileSync as jest.Mock).mockReturnValueOnce(JSON.stringify(mockPosts));
        (fs.writeFileSync as jest.Mock).mockImplementationOnce(() => { });

        const newPost = { title: 'New Post', content: 'New Content' };

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: 'POST',
            body: newPost,
        });

        await handler(req, res);

        expect(res.statusCode).toBe(201);
        const createdPost = res._getJSONData();
        expect(createdPost.title).toBe(newPost.title);
        expect(createdPost.content).toBe(newPost.content);
        expect(createdPost).toHaveProperty('id');
        expect(createdPost).toHaveProperty('createAt');
        expect(createdPost.author).toBe('Admin');

        expect(fs.writeFileSync).toHaveBeenCalledWith(
            expect.stringContaining('posts.json'),
            expect.stringContaining(newPost.title)
        );
    });

    it('deve retornar um erro 400 se o body estiver incompleto na requisição POST', async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
            method: 'POST',
            body: { title: '' },
        });

        await handler(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ error: 'Title and news are required.' });
    });
});