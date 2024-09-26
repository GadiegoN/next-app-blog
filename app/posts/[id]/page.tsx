import { getPost } from "@/app/_actions/get-post";
import dayjs from "dayjs";

interface PostParamsProps {
  params: {
    id: string;
  };
}

export default async function Post({ params }: PostParamsProps) {
  const post = await getPost(params.id);

  if (!post) {
    return <p>Página não encontrada</p>;
  }

  const formattedDate = dayjs(post.createAt).format("DD/MM/YYYY");

  return (
    <section className="flex flex-col gap-4 max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold capitalize">{post.title}</h1>
      <h2 className="text-lg font-semibold">{post.summary}</h2>
      <p className="whitespace-pre-line">{post.content}</p>
      <span className="text-sm text-end text-primary opacity-75">
        Publicado em: {formattedDate} por {post.author}
      </span>
    </section>
  );
}
