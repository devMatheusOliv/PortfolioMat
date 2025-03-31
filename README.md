# Portfólio Matheus Oliveira

Este é o repositório do meu portfólio pessoal, agora convertido para Next.js para melhor performance e análise com Vercel Speed Insights.

## Tecnologias Utilizadas

- Next.js
- React
- CSS
- Vercel Speed Insights

## Como Executar

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

4. Acesse http://localhost:3000

## Implantação

O site está otimizado para implantação na Vercel, com integração automática do Vercel Speed Insights.

## Como o Vercel Speed Insights foi implementado

1. Instalação do pacote:

```bash
npm install @vercel/speed-insights
```

2. Configuração no arquivo `_app.js`:

```jsx
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
```

Isso permite monitorar e melhorar o desempenho do site automaticamente quando implantado na Vercel.
