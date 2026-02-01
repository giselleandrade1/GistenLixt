/\*\*

- Documentação dos Componentes de Autenticação - GistenLixt
-
- Este arquivo descreve a arquitetura, responsabilidades e padrões
- utilizados nos componentes de login e cadastro do projeto.
  \*/

// =============================================================================
// ESTRUTURA DE COMPONENTES
// =============================================================================

/_
app/
├── components/
│ ├── ui/
│ │ ├── Input.tsx # Componente de campo de entrada reutilizável
│ │ └── Button.tsx # Componente de botão com variantes
│ ├── LoginPanel.tsx # Painel de login isolado
│ └── CadastroPanel.tsx # Painel de cadastro isolado
├── page.tsx # Página de login (usa LoginPanel)
├── cadastro/page.tsx # Página de cadastro (usa CadastroPanel)
└── **tests**/
├── LoginPanel.test.tsx # Testes do LoginPanel
├── CadastroPanel.test.tsx # Testes do CadastroPanel
└── page.test.tsx # Testes da página de login
_/

// =============================================================================
// COMPONENTE: Input
// =============================================================================

/\*
Localização: app/components/ui/Input.tsx

Responsabilidades:

- Campo de entrada reutilizável para todo o projeto
- Suporta validação (erro/helperText)
- Ícones opcional (integração com lucide-react)
- Acessibilidade completa (ARIA, labels associadas)
- Responsivo e consistente com design system

Props:

- label: string (obrigatório)
- error?: string (mensagem de erro)
- helperText?: string (texto de ajuda)
- icon?: React.ReactNode (ícone do lado esquerdo)
- Herda todas as propriedades de HTMLInputElement

Exemplo:
<Input
label="E-mail"
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="voce@exemplo.com"
error={errors.email}
icon={<Mail className="h-4 w-4" />}
/>

Design System:

- Borda: zinc-200 (normal), red-300 (erro), zinc-400 (foco)
- Padding: px-4 py-3 (com ícone: pl-10)
- Border radius: xl (12px)
- Focus: ring-2 + border animada
  \*/

// =============================================================================
// COMPONENTE: Button
// =============================================================================

/\*
Localização: app/components/ui/Button.tsx

Responsabilidades:

- Botão reutilizável com múltiplas variantes
- Estados: primary, secondary, outline, ghost
- Suporte a loading com spinner animado
- Acessibilidade (disabled state)
- Responsivo e consistente

Props:

- variant?: 'primary' | 'secondary' | 'outline' | 'ghost' (default: primary)
- size?: 'sm' | 'md' | 'lg' (default: md)
- loading?: boolean (default: false)
- fullWidth?: boolean (default: false)
- icon?: React.ReactNode (ícone antes do texto)
- disabled: boolean (herdado de button)

Exemplo:
<Button
type="submit"
variant="primary"
fullWidth
loading={loading}
disabled={loading}

> Entrar
> </Button>

Estados:

- Loading: desabilita, exibe spinner + "Carregando..."
- Disabled: opacidade reduzida, cursor not-allowed
  \*/

// =============================================================================
// COMPONENTE: LoginPanel
// =============================================================================

/\*
Localização: app/components/LoginPanel.tsx

Responsabilidades:

- Painel isolado e reutilizável para autenticação
- Validação client-side (email, senha)
- Integração com API /api/auth/login
- Feedback visual (erros, loading, success)
- Navegação (redirecionar, links)

Props:

- onSuccess?: () => void (callback ao sucesso)
- onError?: (error: string) => void (callback ao erro)
- redirectTo?: string (default: "/dashboard")

Validações:

- Email: regex simples (/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
- Senha: mínimo 8 caracteres

Erros tratados:

- Email vazio
- Email inválido
- Senha vazia
- Senha muito curta
- Erro na autenticação (resposta 401/400)
- Erro de conexão

Recursos:

- "Esqueci minha senha" (estrutura pronta, sem lógica por enquanto)
- Link para "Criar conta"
- Ícones dos campos (Mail, Lock)
- Dark mode support

Exemplo de uso:
<LoginPanel
onSuccess={() => console.log('Login bem-sucedido')}
onError={(err) => console.error(err)}
redirectTo="/dashboard"
/>

Flow de Autenticação:

1. Usuário preenche email e senha
2. Ao submeter, validateForm() é chamada
3. Se válido, POST para /api/auth/login
4. Se resposta ok: redireciona para dashboard
5. Se erro: exibe mensagem de erro no formulário
   \*/

// =============================================================================
// COMPONENTE: CadastroPanel
// =============================================================================

/\*
Localização: app/components/CadastroPanel.tsx

Responsabilidades:

- Painel isolado para registro de novos usuários
- Validação avançada de senha (maiúscula, número, especial)
- Confirmação de senha
- Integração com API /api/auth/signup
- Feedback visual (erro, sucesso, loading)

Props:

- onSuccess?: () => void (callback ao sucesso)
- onError?: (error: string) => void (callback ao erro)
- redirectTo?: string (default: "/?success=cadastro")

Validações:

- Nome: mínimo 3 caracteres
- Email: regex /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- Senha:
  - Mínimo 8 caracteres
  - Pelo menos uma letra maiúscula
  - Pelo menos um número
  - Pelo menos um caractere especial (!@#$%^&\*)
- Confirmação: deve coincidir com a senha

Campos:

- Nome completo (text)
- E-mail (email)
- Senha (password)
- Confirmar senha (password)

Exemplo de uso:
<CadastroPanel
onSuccess={() => console.log('Cadastro bem-sucedido')}
redirectTo="/?success=cadastro"
/>

Flow de Cadastro:

1. Usuário preenche todos os campos
2. Ao submeter, validateForm() valida cada campo
3. Se válido, POST para /api/auth/signup
4. Se sucesso: exibe mensagem + redireciona após 1.5s
5. Se erro: exibe mensagem de erro

Mensagens de Erro Específicas:

- "O nome deve ter no mínimo 3 caracteres"
- "E-mail inválido"
- "A senha deve ter no mínimo 8 caracteres"
- "A senha deve conter pelo menos uma letra maiúscula"
- "A senha deve conter pelo menos um número"
- "A senha deve conter pelo menos um caractere especial"
- "As senhas não coincidem"
- (Custom) "E-mail já cadastrado" (do servidor)
  \*/

// =============================================================================
// INTEGRAÇÃO COM PÁGINAS
// =============================================================================

/\*
app/page.tsx

- Página pública de login
- Renderiza LoginPanel como componente principal
- Exibe avisos de query params (?success=cadastro, ?unauthorized=1)
- Não contém lógica de autenticação (delegada ao LoginPanel)

app/cadastro/page.tsx

- Página pública de cadastro
- Renderiza CadastroPanel como componente principal
- Simples, sem lógica adicional
  \*/

// =============================================================================
// TESTES UNITÁRIOS
// =============================================================================

/\*
Localização: app/**tests**/

Cobertura de Testes:

LoginPanel.test.tsx:

- Renderização de campos
- Validação de email inválido
- Validação de senha curta
- Login bem-sucedido (mock de fetch)
- Erro de autenticação
- Estado de loading durante requisição
- Links (criar conta, esqueci senha)

CadastroPanel.test.tsx:

- Renderização de campos
- Validação de nome curto
- Validação de email
- Validação de senha (maiúscula, número, especial)
- Validação de confirmação de senha
- Cadastro bem-sucedido
- Erro de cadastro
- Links

page.test.tsx:

- Renderização da página
- Aviso de cadastro bem-sucedido
- Aviso de acesso restrito

Padrão de Teste:

- Mock de next/navigation (useRouter)
- Mock de global.fetch
- fireEvent.submit() para formulários (não click)
- waitFor() para operações assíncronas
- screen.getByLabelText, getByRole, getByText para queries
  \*/

// =============================================================================
// BOAS PRÁTICAS IMPLEMENTADAS
// =============================================================================

/\*

1. Separação de Responsabilidades
   - Componentes UI isolados (Input, Button)
   - Painéis reutilizáveis (LoginPanel, CadastroPanel)
   - Páginas que orquestram (page.tsx, cadastro/page.tsx)

2. Acessibilidade (WCAG)
   - Labels associadas a inputs (htmlFor)
   - aria-invalid e aria-describedby
   - Navegação por teclado
   - Foco visível
   - Contraste adequado de cores

3. Validação
   - Client-side (imediata, UX)
   - Server-side (segurança, confiabilidade)
   - Mensagens em português

4. UX/UI
   - Feedback visual claro (erro, sucesso, loading)
   - Estados de botão bem definidos
   - Ícones para melhorar compreensão
   - Dark mode support
   - Responsivo

5. Testes
   - Cobertura de validações
   - Cobertura de API calls
   - Cobertura de estados
   - Sem dependências externas (mocks)

6. TypeScript
   - Tipagem completa
   - Props interfaces
   - Generic types quando necessário

7. Performance
   - Componentes desacoplados
   - Re-renders minimizados (useState local)
   - Lazy loading preparado (Pages)

8. Segurança
   - Sanitização de inputs (trim)
   - Validação em duas camadas
   - HTTPS requerido (em produção)
   - Tokens seguros (httpOnly cookies)
     \*/

// =============================================================================
// INTEGRAÇÃO COM API
// =============================================================================

/\*
Endpoints esperados:

POST /api/auth/login

- Body: { email: string, password: string }
- Response (200): { token?: string, user?: User }
- Response (401/400): { error: string }

POST /api/auth/signup

- Body: { name: string, email: string, password: string }
- Response (201): { user: User }
- Response (400): { error: string }

Exemplo de erros esperados:

- "Credenciais inválidas"
- "E-mail já cadastrado"
- "Erro ao conectar com o servidor"
  \*/

// =============================================================================
// PRÓXIMOS PASSOS / EVOLUÇÃO
// =============================================================================

/\*
Funcionalidades planejadas:

1. Recuperação de senha (forgot-password flow)
2. Autenticação global com Context
3. Toast notifications para feedback
4. Autenticação com redes sociais
5. Dois fatores (2FA)
6. Sessão persistente

Melhorias técnicas:

1. Migração para React Hook Form (melhor performance)
2. Schema validation com Zod/Yup
3. Rate limiting no client
4. Debouncing de validações
5. PWA support
6. Offline mode básico
   \*/

// =============================================================================
// COMO ADICIONAR UM NOVO CAMPO NO LOGIN/CADASTRO
// =============================================================================

/\*
Exemplo: Adicionar campo "Remember me" no LoginPanel

1. Abrir app/components/LoginPanel.tsx
2. Adicionar estado:
   const [rememberMe, setRememberMe] = useState(false);

3. Adicionar checkbox no formulário:
   <label className="flex items-center gap-2">
   <input
   type="checkbox"
   checked={rememberMe}
   onChange={(e) => setRememberMe(e.target.checked)}
   />
   Manter conectado
   </label>

4. Usar o valor ao fazer login:
   body: JSON.stringify({ email, password, rememberMe })

5. Adicionar teste:
   it("envia rememberMe ao fazer login", async () => {
   // ... setup
   fireEvent.click(rememberCheckbox);
   fireEvent.submit(form);
   // ... assert que rememberMe está no body
   });
   \*/

export {};
