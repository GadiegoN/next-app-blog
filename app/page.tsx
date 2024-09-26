import Link from "next/link";
import { getPosts } from "./_actions/get-posts";
import { PostProps } from "./_types/posts";

export default async function Home() {
  let posts: PostProps[] = [];
  try {
    posts = await getPosts();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="w-11/12 mx-auto max-w-7xl py-10 space-y-8">
      <h1>Blog de noticias</h1>

      <section className="flex flex-col gap-4">
        <h2>Acompanhe as ultimas noticias</h2>

        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="hover:text-primary hover:border-primary border rounded-lg p-4"
            >
              {post.title}
            </Link>
          ))
        ) : (
          <p>Nenhuma noticia no momento.</p>
        )}
      </section>
    </main>
  );
}
