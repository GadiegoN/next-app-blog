import fs from 'fs';
import path from 'path';
import { PostProps } from '../_types/posts';

const dataPath = path.join(process.cwd(), 'data', 'posts.json');

export async function getPost(id: string): Promise<PostProps | null> {
    try {
        const jsonData = fs.readFileSync(dataPath, 'utf-8');
        const posts: PostProps[] = JSON.parse(jsonData);

        const post = posts.find((post) => post.id === id);
        return post || null;
    } catch (error) {
        console.error('Erro ao ler o post:', error);
        return null;
    }
};