import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Home from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe("Login Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    jest.clearAllMocks();
  });

  it("renderiza campos de email e senha", () => {
    render(<Home />);
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it("exibe erro ao enviar formulário com email inválido", async () => {
    render(<Home />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "email-invalido" } });
    fireEvent.change(passwordInput, { target: { value: "senha123" } });

    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });
  });

  it("exibe erro se senha for curta", async () => {
    render(<Home />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "teste@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(
        screen.getByText(/a senha deve ter no mínimo 8 caracteres/i),
      ).toBeInTheDocument();
    });
  });

  it("realiza login com sucesso", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Home />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "admin@admin.com" } });
    fireEvent.change(passwordInput, { target: { value: "admin12345" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("exibe erro de autenticação em caso de falha", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Credenciais inválidas" }),
    });

    render(<Home />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "teste@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "senha12345" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
  });
});
