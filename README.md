# vinicifreitas.github.io

Portfólio pessoal do [Vinicius Freitas](https://www.linkedin.com/in/vinicifreitas/) em formato de terminal retrô (CRT âmbar).

**Live:** https://vinicifreitas.github.io

## Stack

HTML, CSS e JavaScript puros. Sem framework, sem bundler, sem etapa de build — o repositório é servido diretamente pelo inde.html a partir da raiz.

### Infraestrutura do projeto
```
index.html
assets/
  css/style.css
  js/main.js
```

## O que tem na página

- **Boot sequence**: simulação de inicialização de terminal ao carregar a página (uma vez por sessão, via `sessionStorage`).
- **Chuva digital**: efeito estilo "Matrix" em canvas, em tom âmbar, com baixo consumo de CPU/bateria (pausa quando a aba fica em segundo plano).
- **Scanlines + vinheta + flicker**: simulam um monitor CRT antigo.
- **Toggle de efeitos** (canto superior direito): liga/desliga chuva digital, scanlines e vinheta — pensado para quem prefere uma versão mais estática ou tem sensibilidade a movimento.
- **Seções**: `sobre`, `projetos`, `skills`, `contato`, apresentadas como saídas de comandos de terminal (`cat sobre.txt`, `ls -la ./projetos/`, etc.).
- **Terminal interativo** no rodapé da página, com os comandos:
  - `help` — lista os comandos disponíveis
  - `whoami`, `about`, `projetos`, `skills`, `contato` — navegam até a seção correspondente
  - `date` — mostra data/hora atual
  - `clear` — limpa a saída do terminal
  - `matrix` — easter egg, muda a chuva digital para verde por alguns segundos
