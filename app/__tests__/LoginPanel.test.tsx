/**
 * Testes para o componente LoginPanel
 * Cobre validações, integração com API, estados de loading e mensagens de erro
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginPanel } from "../components/LoginPanel";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("LoginPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("renderiza campos de email e senha", () => {
    render(<LoginPanel />);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("exibe erro de email inválido", async () => {
    render(<LoginPanel />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "email-invalido" } });
    fireEvent.change(passwordInput, { target: { value: "senha12345" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/e-mail inválido/i)).toBeInTheDocument();
    });
  });

  it("exibe erro de senha curta", async () => {
    render(<LoginPanel />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "senha" } });
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
      json: async () => ({ token: "abc123" }),
    });

    render(<LoginPanel />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "senha12345" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/auth/login",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "user@example.com",
            password: "senha12345",
          }),
        }),
      );
    });
  });

  it("exibe erro ao falhar no login", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Credenciais inválidas" }),
    });

    render(<LoginPanel />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "senha12345" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
    });
  });

  it("desabilita botão durante carregamento", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {}),
    );

    render(<LoginPanel />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^Senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "senha12345" } });
    fireEvent.submit(submitButton.closest("form")!);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("exibe link para criar conta", () => {
    render(<LoginPanel />);

    expect(screen.getByText(/criar conta/i)).toBeInTheDocument();
  });

  it("exibe link para esqueci minha senha", () => {
    render(<LoginPanel />);

    expect(screen.getByText(/esqueci minha senha/i)).toBeInTheDocument();
  });
});
