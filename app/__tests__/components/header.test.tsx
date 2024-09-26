import { Header } from "@/app/_components/header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

describe("Header component", () => {
  it('deve renderizar o título "NextBlog"', () => {
    render(<Header />, { wrapper: MemoryRouterProvider });

    const titleElement = screen.getByText(/NextBlog/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('deve renderizar o link "Início" corretamente', () => {
    render(<Header />, { wrapper: MemoryRouterProvider });

    const homeLink = screen.getByRole("link", { name: /Início/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it('deve renderizar o link "Criar Post" corretamente', () => {
    render(<Header />, { wrapper: MemoryRouterProvider });

    const createPostLink = screen.getByRole("link", { name: /Criar Post/i });
    expect(createPostLink).toBeInTheDocument();
    expect(createPostLink).toHaveAttribute("href", "/admin/new-post");
  });
});
