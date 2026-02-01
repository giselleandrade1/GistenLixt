# 🎨 Sistema de Transições e Animações - GistenLixt

## Visão Geral

Sistema completo de transições suaves, elegantes e profissionais mantendo consistência em toda a aplicação.

---

## 📋 Classes Disponíveis

### Transições Padrão

```tsx
// Transição rápida (150ms)
className = "transition-fast";

// Transição padrão (300ms) - PADRÃO
className = "transition-base";

// Transição lenta (500ms)
className = "transition-slow";

// Transição suave com easing (400ms)
className = "transition-smooth";
```

### Animações de Entrada

```tsx
// Fade in suave (500ms)
className = "animate-fade-in";

// Slide up (entrada por baixo) - PADRÃO PARA CARDS
className = "animate-slide-up";

// Slide in left (entrada pela esquerda)
className = "animate-slide-in-left";

// Slide in right (entrada pela direita)
className = "animate-slide-in-right";

// Slide down (entrada por cima)
className = "animate-slide-down";

// Scale in (expansão suave) - PADRÃO PARA MODAL/OVERLAY
className = "animate-scale-in";

// Bounce in (entrada com bounce) - PADRÃO PARA ÍCONES
className = "animate-bounce-in";
```

### Efeitos de Hover

```tsx
// Efeito lift (levanta ao hover)
className = "hover-lift";

// Efeito glow (brilho ao hover)
className = "hover-glow";

// Efeito scale (aumenta ao hover)
className = "hover-scale";
```

### Efeitos Especiais

```tsx
// Glow pulse (pulso de brilho infinito)
className = "animate-glow-pulse";

// Transições de cards
className = "card-hover";
className = "card-enter";

// Efeito de pressão de botão
className = "btn-press";

// Brilho de botão
className = "btn-glow";
```

---

## ⏱️ Classes de Delay

Para criar sequências de animação sem estilos inline:

```tsx
// Disponíveis de 50ms até 500ms em incrementos de 50ms
className = "animate-fade-in delay-100";
className = "animate-slide-up delay-200";
className = "animate-scale-in delay-300";
```

**Delays Disponíveis:**

- `delay-50` - 50ms
- `delay-100` - 100ms
- `delay-150` - 150ms
- `delay-200` - 200ms
- `delay-250` - 250ms
- `delay-300` - 300ms
- `delay-350` - 350ms
- `delay-400` - 400ms
- `delay-450` - 450ms
- `delay-500` - 500ms

---

## 🎯 Padrões por Tipo de Elemento

### Botões

```tsx
<Button
  variant="primary"
  className="btn-press btn-glow" // Automático via CSS base
>
  Ação
</Button>
```

### Cards

```tsx
<Card variant="default" className="card-hover animate-scale-in delay-200">
  Conteúdo
</Card>
```

### Seções/Páginas

```tsx
// Container principal com fade in
<div className="animate-scale-in">
  {/* Conteúdo */}
</div>

// Backgrounds
<div className="transition-colors duration-500">
  {/* Muda smoothly entre temas */}
</div>

// Efeitos decorativos
<div className="transition-opacity duration-700">
  {/* Blob gradiente */}
</div>
```

### Forms/Inputs

```tsx
<form className="space-y-4 animate-fade-in delay-200">
  <Input label="Email" />
  <Input label="Senha" />
  <Button type="submit">Entrar</Button>
</form>
```

### Alertas/Notificações

```tsx
<div className="animate-slide-up">
  {/* Alerta aparece de baixo para cima */}
</div>

<div className="animate-slide-down">
  {/* Notificação aparece de cima para baixo */}
</div>
```

---

## ⏱️ Delays e Sequências

Para criar sequências de animação estilo cascata (usando classes CSS):

```tsx
// Delays fixos com classes
<div className="animate-scale-in delay-100">Item 1</div>
<div className="animate-scale-in delay-150">Item 2</div>
<div className="animate-scale-in delay-200">Item 3</div>

// Para delays dinâmicos em loop, use as classes disponíveis
{items.map((item, idx) => {
  const delays = ['delay-200', 'delay-250', 'delay-300', 'delay-350', 'delay-400'];
  return (
    <div key={idx} className={`animate-scale-in ${delays[idx % delays.length]}`}>
      {item.content}
    </div>
  );
})}
```

**Padrão de Delays Recomendado:**

- Header: `delay-100`
- Título/Heading: `delay-100` ou `delay-150`
- Formulário: `delay-200`
- Cards/Sections: `delay-300` a `delay-500` (com incremento)
- Rodapé: `delay-500`

---

## 🎬 Duração das Transições

```
--transition-fast:  150ms  (interações rápidas)
--transition-base:  300ms  (padrão geral)
--transition-slow:  500ms  (fundo/background)
```

### Quando Usar Cada Uma

| Elemento         | Duração   | Classe            |
| ---------------- | --------- | ----------------- |
| Hover de botão   | 150ms     | `transition-fast` |
| Input focus      | 300ms     | `transition-base` |
| Card hover       | 300ms     | `transition-base` |
| Background tema  | 500ms     | `transition-slow` |
| Animação entrada | 400-500ms | `animate-*`       |

---

## 🌓 Tema Claro/Escuro

Todas as transições funcionam perfeitamente com tema claro/escuro:

```tsx
// Backgrounds mudam smoothly
<div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
  Conteúdo
</div>

// Texts mudam smoothly
<h1 className="text-slate-900 dark:text-white transition-colors duration-300">
  Título
</h1>

// Decorativos também
<div className="bg-purple-300 dark:bg-purple-600 transition-opacity duration-700">
  Blob
</div>
```

---

## 📐 Easing Functions

```
ease-out    → Começa rápido, desacelera (PADRÃO)
ease-in     → Começa lento, acelera
ease-in-out → Suave em ambos os lados
cubic-bezier → Customizado (bounce)
```

---

## ✅ Checklist para Novas Páginas

- [ ] Background com `transition-colors duration-500`
- [ ] Container principal com `animate-scale-in`
- [ ] Header com `animate-slide-down`
- [ ] Seções com `animate-fade-in` + `animationDelay`
- [ ] Cards com `card-hover` + `animate-scale-in`
- [ ] Botões com `btn-press btn-glow`
- [ ] Alertas com `animate-slide-up` ou `animate-slide-down`
- [ ] Elementos com hover usando `hover-lift`, `hover-glow` ou `hover-scale`

---

## 🚀 Dicas de Performance

1. **Evite animar muitos elementos simultaneamente** - Use delays para cascata
2. **Use `will-change` para animações críticas** (adicionado automaticamente)
3. **Prefira `transform` e `opacity`** - Mais performáticas
4. **Disable animações para usuários que preferem redução de movimento:**

```tsx
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

---

## 📝 Exemplos Completos

### Exemplo 1: Card Lista com Animação Cascata

```tsx
<div className="space-y-4">
  {items.map((item, idx) => (
    <Card
      key={idx}
      className="animate-scale-in card-hover"
      style={{ animationDelay: `${100 + idx * 50}ms` }}
    >
      {item.title}
    </Card>
  ))}
</div>
```

### Exemplo 2: Form com Transição Suave

```tsx
<form className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
  <Input label="Email" className="transition-all duration-300" />
  <Input label="Senha" className="transition-all duration-300" />
  <Button className="btn-press btn-glow">Entrar</Button>
</form>
```

### Exemplo 3: Modal/Overlay

```tsx
<div className="fixed inset-0 bg-black/50 animate-fade-in">
  <div className="rounded-lg bg-white p-8 animate-scale-in">
    Conteúdo do Modal
  </div>
</div>
```

---

## 🔄 Próximas Adições (Futuro)

- [ ] Animações de carregamento customizadas
- [ ] Transições de página (Next.js)
- [ ] Gestos de toque para mobile
- [ ] Animações de scroll
- [ ] Micro-interações avançadas

---

**Criado em:** 01/02/2026  
**Versão:** 1.0.0  
**Framework:** Next.js 16 + Tailwind CSS v4
