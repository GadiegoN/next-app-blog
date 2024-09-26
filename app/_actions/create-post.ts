import { FormEvent } from "react"

interface NewPostProps {
    title: string
    content: string
}

export async function createPost(e: FormEvent, post: NewPostProps, clearFields: () => void) {
    e.preventDefault()

    try {
        await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })

        clearFields()
    } catch (error) {
        console.log("Erro ao criar post: ", error)
    }
}