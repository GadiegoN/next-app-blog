import { PostProps } from "../_types/posts";

export async function getPosts(): Promise<PostProps[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, { cache: 'no-cache' })

    if (!response.ok) {
        throw new Error('Falied to fetch posts.')
    }

    return response.json()
}