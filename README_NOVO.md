# GistenLixt - Sistema de Gestão para Empresas

Plataforma moderna para gestão de clientes e dados empresariais com foco em usuários brasileiros.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone <repo-url>
cd gastenlixt

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:3000
```

### Testes

```bash
# Executar todos os testes
npm test

# Modo watch
npm test -- --watch
```

### Build para Produção

```bash
# Compilar para produção
npm run build

# Iniciar servidor de produção
npm start
```

---

## 📋 Funcionalidades

### Autenticação

- ✅ Login com email e senha
- ✅ Cadastro de novos usuários
- ✅ Validações avançadas de senha
- ✅ Persistência de sessão
- ✅ Role-based access (admin/usuário)

### Gerenciamento de Clientes

- ✅ Listagem de clientes com busca
- ✅ Criar novo cliente
- ✅ Validação de dados (CNPJ, email)
- ✅ Dashboard com estatísticas
- ✅ Acesso restrito por role

### Interface

- ✅ Design responsivo (mobile-first)
- ✅ Dark mode automático
- ✅ Acessibilidade completa (WCAG)
- ✅ Ícones modernos (lucide-react)

---

## 🏗️ Arquitetura

### Stack Tecnológico

```
Frontend:
- Next.js 16.1.6 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS v4

Backend:
- Next.js API Routes
- SQLite + better-sqlite3
- bcryptjs (hash de senhas)
- JWT-like tokens

Testing:
- Jest
- React Testing Library
```

### Estrutura de Pastas

```
app/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Input, Button)
│   ├── AppShell.tsx    # Layout principal
│   ├── LoginPanel.tsx
│   └── CadastroPanel.tsx
├── api/                # Endpoints API
│   └── auth/
│       ├── login
│       ├── signup
│       └── logout
├── cadastro/           # Página de cadastro
├── clientes/           # Páginas de clientes
├── dashboard/          # Dashboard
├── __tests__/          # Testes unitários
├── lib/
│   ├── db.ts          # Inicialização DB
│   └── auth-*.ts      # Autenticação
└── middleware.ts      # Proteção de rotas

public/                # Arquivos estáticos
```

---

## 🔐 Segurança

- ✅ Senhas hashadas com bcryptjs
- ✅ Validação em duas camadas (client + server)
- ✅ CSRF protection (cookies httpOnly)
- ✅ Middleware de autenticação
- ✅ Sanitização de inputs
- ✅ Role-based access control (RBAC)

---

## 📱 Responsive Design

O projeto é **mobile-first** com suporte completo a:

- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Widescreen (1280px+)

---

## 🌙 Dark Mode

Suporte automático ao dark mode do sistema:

```tsx
// Tailwind dark: modifier
<div className="bg-white dark:bg-zinc-950">...</div>
```

---

## 🧪 Cobertura de Testes

```
Test Suites: 3 passed, 3 total
Tests:       22 passed, 22 total

Componentes testados:
- LoginPanel (7 testes)
- CadastroPanel (8 testes)
- Page (7 testes)
```

**Executar testes:**

```bash
npm test
npm test -- --coverage  # Ver cobertura
```

---

## 📚 Documentação Técnica

### Componentes

Veja [COMPONENTS_DOCUMENTATION.md](./COMPONENTS_DOCUMENTATION.md) para:

- Descrição detalhada de cada componente
- Props e exemplos de uso
- Padrões de validação
- Boas práticas

### Implementação

Veja [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) para:

- Resumo da entrega
- Checklist de funcionalidades
- Métricas de qualidade
- Próximas evoluções

---

## 👥 Usuário Padrão

Para testar o sistema, use as credenciais do admin padrão:

```
Email: admin@admin.com
Senha: admin123
Role: 1 (Administrador)
```

> **⚠️ Mude a senha em produção!**

---

## 🔄 Fluxo de Autenticação

```
1. Usuário acessa /
   ↓
2. Preenche email e senha
   ↓
3. POST /api/auth/login
   ↓
4. Servidor valida credenciais
   ↓
5. Sucesso: Cookie httpOnly + Redirecionamento
   Erro: Mensagem de erro exibida
   ↓
6. /dashboard (protegido por middleware)
```

---

## 📝 Variáveis de Ambiente

`.env.local` (local):

```env
# Não necessário para desenvolvimento local
# Configurações padrão usam SQLite em memory
```

---

## 🚨 Erros Comuns

### "Database initialized successfully"

Normal! O banco de dados é criado automaticamente ao iniciar a aplicação.

### Senha inválida no cadastro

A senha deve ter:

- ✅ Mínimo 8 caracteres
- ✅ Uma letra MAIÚSCULA
- ✅ Um número
- ✅ Um caractere especial (!@#$%^&\*)

Exemplo válido: `Senha123!`

---

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Setar variáveis de ambiente em production
vercel env add
```

### Docker

```bash
# Não configurado ainda
# Próxima entrega
```

---

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.

---

## 📄 Licença

MIT License - veja LICENSE para detalhes.

---

## 🎯 Roadmap

### v1.1 (Próximo)

- [ ] Recuperação de senha
- [ ] Autenticação com Google/GitHub
- [ ] Toast notifications

### v1.2

- [ ] Dois fatores (2FA)
- [ ] Exportar clientes (CSV/PDF)
- [ ] Gráficos e relatórios

### v2.0

- [ ] Multi-tenant support
- [ ] API pública com rate limiting
- [ ] Mobile app (React Native)

---

**Versão:** 1.0.0  
**Última atualização:** 2026-02-01  
**Status:** ✅ Pronto para produção
