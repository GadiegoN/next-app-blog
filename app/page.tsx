import Link from "next/link";

export default function Home() {
  return (
    <main className="w-11/12 mx-auto max-w-7xl py-10 space-y-8">
      <h1>Blog de noticias</h1>

      <section className="flex flex-col gap-4">
        <h2>Acompanhe as ultimas noticias</h2>

        <Link
          href="/posts/id"
          className="hover:text-primary hover:border-primary border rounded-lg p-4"
        >
          Notica do blog
        </Link>
      </section>
    </main>
  );
}
