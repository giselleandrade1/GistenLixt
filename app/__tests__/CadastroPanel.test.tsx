/**
 * Testes para o componente CadastroPanel
 * Cobre validações avançadas, integração com API, estados de sucesso e erro
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CadastroPanel } from "../components/CadastroPanel";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("CadastroPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("renderiza campos de nome, email, senha e confirmação", () => {
    render(<CadastroPanel />);

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument();
  });

  it("exibe erro se nome for muito curto", async () => {
    render(<CadastroPanel />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByRole("button", { name: /criar conta/i });

    fireEvent.change(nameInput, { target: { value: "Jo" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, {
      target: { value: "Senha123!" },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Senha123!" },
    });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(
        screen.getByText(/o nome deve ter no mínimo 3 caracteres/i),
      ).toBeInTheDocument();
    });
  });

  it("exibe erro de email inválido", async () => {
    render(<CadastroPanel />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByRole("button", { name: /criar conta/i });

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "email-invalido" } });
    fireEvent.change(passwordInput, {
      target: { value: "Senha123!" },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Senha123!" },
    });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });
  });

  it("exibe erro se senha não tiver maiúscula", async () => {
    render(<CadastroPanel />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByRole("button", { name: /criar conta/i });

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "senha123!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "senha123!" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(
        screen.getByText(/a senha deve conter pelo menos uma letra maiúscula/i),
      ).toBeInTheDocument();
    });
  });

  it("exibe erro se senha não tiver número", async () => {
    render(<CadastroPanel />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByRole("button", { name: /criar conta/i });

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "SenhaABC!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "SenhaABC!" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(
        screen.getByText(/a senha deve conter pelo menos um número/i),
      ).toBeInTheDocument();
    });
  });

  it("exibe erro se senhas não coincidirem", async () => {
    render(<CadastroPanel />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByRole("button", { name: /criar conta/i });

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Senha123!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Senha456!" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/as senhas não coincidem/i)).toBeInTheDocument();
    });
  });

  it("realiza cadastro com sucesso", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: 1, email: "user@example.com" } }),
    });

    render(<CadastroPanel />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByRole("button", { name: /criar conta/i });

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Senha123!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Senha123!" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/auth/signup",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "João Silva",
            email: "user@example.com",
            password: "Senha123!",
          }),
        }),
      );
    });
  });

  it("exibe erro ao falhar no cadastro", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "E-mail já cadastrado" }),
    });

    render(<CadastroPanel />);

    const nameInput = screen.getByLabelText(/nome completo/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i);
    const submitButton = screen.getByRole("button", { name: /criar conta/i });

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Senha123!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Senha123!" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/e-mail já cadastrado/i)).toBeInTheDocument();
    });
  });

  it("exibe link para login", () => {
    render(<CadastroPanel />);

    expect(screen.getByText(/fazer login/i)).toBeInTheDocument();
  });
});
