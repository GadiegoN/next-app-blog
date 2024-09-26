import Link from "next/link";

export function Header() {
  return (
    <header className="w-full flex shadow-lg">
      <div className="flex w-11/12 py-4 max-w-7xl mx-auto justify-between">
        <h1>NextBlog</h1>

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link className="hover:opacity-75" href="/">
                Início
              </Link>
            </li>
            <li>
              <Link className="hover:opacity-75" href="/admin/new-post">
                Criar Post
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
