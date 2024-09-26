import { PostProps } from "@/app/_types/posts"
import { NextApiRequest, NextApiResponse } from "next"
import fs from "node:fs"
import path from "node:path"

const dataPath = path.join(process.cwd(), 'data', 'posts.json')

const readPostsFromFile = (): PostProps[] => {
    try {
        const jsonData = fs.readFileSync(dataPath, 'utf-8')
        return JSON.parse(jsonData)
    } catch (error) {
        return []
    }
}

export default function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === 'GET') {
        const posts = readPostsFromFile()
        return response.status(200).json(posts)
    }

    if (request.method === 'POST') {
        const { title, summary, content } = request.body

        if (!title || !content) {
            return response.status(400).json({ error: "Title and news are required." })
        }

        const newPost: PostProps = {
            id: (Date.now()).toString(),
            title,
            summary,
            content,
            createAt: new Date(),
            author: 'Admin'
        }

        const posts = readPostsFromFile()
        posts.push(newPost)

        fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2))

        return response.status(201).json(newPost)
    }
}