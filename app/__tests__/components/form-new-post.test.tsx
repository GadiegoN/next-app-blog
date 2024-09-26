import { FormNewPost } from "@/app/_components/form-new-post";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("../../_actions/create-post", () => ({
  createPost: jest.fn(),
}));

const { createPost } = require("../../_actions/create-post");

beforeAll(() => {
  HTMLFormElement.prototype.requestSubmit = jest.fn();
});

describe("FormNewPost Component", () => {
  it("deve renderizar o formulário corretamente", () => {
    render(<FormNewPost />);

    expect(screen.getByText(/Adicione uma noticia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Adicionar noticia/i })
    ).toBeInTheDocument();
  });

  it("deve permitir que o usuário insira o título e o conteúdo", () => {
    render(<FormNewPost />);

    const titleInput = screen.getByPlaceholderText("Digite o título");
    const contentTextarea = screen.getByPlaceholderText("Escreva a notícia...");

    fireEvent.change(titleInput, { target: { value: "Título de Teste" } });
    fireEvent.change(contentTextarea, {
      target: { value: "Conteúdo de Teste" },
    });

    expect(titleInput).toHaveValue("Título de Teste");
    expect(contentTextarea).toHaveValue("Conteúdo de Teste");
  });

  it("deve chamar a função createPost ao submeter o formulário", () => {
    render(<FormNewPost />);

    const titleInput = screen.getByPlaceholderText("Digite o título");
    const contentTextarea = screen.getByPlaceholderText("Escreva a notícia...");
    const submitButton = screen.getByRole("button", {
      name: /Adicionar noticia/i,
    });

    fireEvent.change(titleInput, { target: { value: "Título de Teste" } });
    fireEvent.change(contentTextarea, {
      target: { value: "Conteúdo de Teste" },
    });

    fireEvent.click(submitButton);

    expect(createPost).toHaveBeenCalledWith(
      expect.anything(),
      { title: "Título de Teste", content: "Conteúdo de Teste" },
      expect.any(Function)
    );
  });
});
