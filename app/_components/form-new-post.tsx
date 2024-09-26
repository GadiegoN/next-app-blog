"use client";

import { FormEvent, useState } from "react";
import { createPost } from "../_actions/create-post";

export function FormNewPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: FormEvent) {
    const post = { title, summary, content };

    createPost(e, post, () => {
      setTitle("");
      setContent("");
      setContent("");
    });
  }

  return (
    <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <h1 className="font-bold text-xl">Adicione uma noticia</h1>

      <div className="flex flex-col w-11/12 max-w-md gap-2">
        <label htmlFor="title" className="text-md font-semibold">
          Título
        </label>
        <input
          type="text"
          required
          id="title"
          placeholder="Digite o título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-background border border-primary rounded-lg ring-0 focus:ring-0 focus-visible:outline-none px-2 py-4"
        />
      </div>
      <div className="flex flex-col w-11/12 max-w-md gap-2">
        <label htmlFor="summary" className="text-md font-semibold">
          Resumo
        </label>
        <input
          type="text"
          id="summary"
          required
          placeholder="Digite o resumo da noticia"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="bg-background border border-primary rounded-lg ring-0 focus:ring-0 focus-visible:outline-none px-2 py-4"
        />
      </div>
      <div className="flex flex-col w-11/12 max-w-md gap-2">
        <label htmlFor="content" className="text-md font-semibold">
          Descrição
        </label>
        <textarea
          id="content"
          placeholder="Escreva a notícia..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-background border border-primary rounded-lg ring-0 focus:ring-0 focus-visible:outline-none px-2 py-4"
        />
      </div>

      <button
        type="submit"
        className="h-12 w-full max-w-md bg-primary text-background font-semibold text-md rounded-lg hover:opacity-75"
      >
        Adicionar noticia
      </button>
    </form>
  );
}
