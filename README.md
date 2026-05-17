<div align="center">

# 🔍 GitHub Explorer

**Busque um usuário do GitHub, explore seu perfil e navegue pelos seus repositórios mais populares.**

Aplicação web _client-side_ que consome a API pública do GitHub — sem back-end próprio.

[![CI](https://github.com/pedrohribeiross/github-explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/pedrohribeiross/github-explorer/actions/workflows/ci.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-build-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)

### [▶ Acessar a demo](https://github-explorer-pedrohribeiross.netlify.app)

</div>

---

## Sumário

- [✨ Funcionalidades](#-funcionalidades)
- [⚙️ Como funciona](#️-como-funciona)
- [🏗️ Arquitetura](#️-arquitetura)
- [🧰 Stack](#-stack)
- [📦 Pré-requisitos e instalação](#-pré-requisitos-e-instalação)
- [📜 Scripts](#-scripts)
- [🚀 Desenvolvimento e build](#-desenvolvimento-e-build)
- [🧪 Testes](#-testes)
- [🛡️ Tratamento de erros e estados](#️-tratamento-de-erros-e-estados)
- [🔄 CI/CD](#-cicd)
- [🌐 Demo](#-demo)

---

## ✨ Funcionalidades

- **Busca de usuário** — campo de busca por _username_ com validação de
  formato antes de disparar a requisição.
- **Perfil do usuário** — avatar, bio, e-mail, número de seguidores e número
  de seguidos.
- **Listagem de repositórios** — todos os repositórios públicos do usuário,
  ordenados por estrelas em ordem decrescente por padrão.
- **Reordenação da listagem** — alterne entre cinco critérios: estrelas
  (decrescente/crescente), nome (A–Z / Z–A) e mais recentes (data de
  atualização).
- **Detalhe do repositório** — página própria com nome, descrição, número de
  estrelas, linguagem e link externo para o repositório no GitHub.
- **Navegação por rotas** — fluxo busca → perfil → detalhe, com URLs
  compartilháveis e tratamento de rota inexistente.

---

## ⚙️ Como funciona

A aplicação consome três endpoints da API do GitHub, sem autenticação:

| Operação | Endpoint |
| --- | --- |
| Detalhes do usuário | `GET /users/{username}` |
| Repositórios do usuário | `GET /users/{username}/repos?per_page=100` |
| Detalhes do repositório | `GET /repos/{owner}/{repo}` |

A ordenação por estrelas é feita **no cliente**, não pela API. O endpoint de
repositórios é buscado com `per_page=100` e a ordenação é aplicada no
navegador por uma função pura que não muta o array original, permitindo trocar
o critério de ordenação sem nova requisição à rede.

As respostas da API são cacheadas pelo React Query com `staleTime` de 5
minutos e deduplicação automática, evitando requisições redundantes — relevante
porque o limite não autenticado da API do GitHub é de **60 requisições por
hora**. O `retry` é seletivo: erros 4xx (usuário inexistente, rate limit) não
são repetidos, pois não há chance de sucesso; falhas de rede e 5xx têm uma
tentativa adicional.

---

## 🏗️ Arquitetura

Organização em camadas com direção de dependência estrita — componentes de
apresentação nunca fazem HTTP diretamente:

```
pages / components  →  hooks  →  services  →  api (cliente Axios)
```

```
src/
  api/         Cliente Axios, QueryClient e builders de chave de query
  services/    Funções de acesso a dados (githubService)
  domain/      Modelos de domínio (User, Repository, SortOption)
  types/       Interfaces de resposta da API (uma por arquivo)
  mappers/     Transformações API → domínio (uma por arquivo)
  hooks/       Hooks de dados (useUser, useRepositories, useRepository)
  context/     SearchContext — estado de cliente compartilhado
  components/  Componentes de UI reutilizáveis
  pages/       Páginas mapeadas para rotas
  routes/      Definição das rotas
  utils/       Funções puras (ordenação, formatação, validação)
```

**Princípios aplicados:**

- **Separação de responsabilidades** — o React Query vive dentro da camada
  `hooks/`; os componentes não conhecem a biblioteca, consumindo apenas um
  contrato `loading` / `error` / `data`.
- **Tipos e funções separados** — declarações de tipo e funções nunca
  coexistem no mesmo arquivo; tipos ficam em `types/`, transformações em
  `mappers/`, cada um com responsabilidade única.
- **Estado de cliente vs. servidor** — `SearchContext` guarda apenas o
  _username_ atual e o critério de ordenação; o estado de servidor (respostas
  cacheáveis da API) é responsabilidade exclusiva do React Query. Sem store
  global.
- **Código autoexplicativo** — sem comentários; nomenclatura descritiva em
  inglês. Todo texto exibido ao usuário final é em português (pt-BR).

### Rotas

| Rota | Página |
| --- | --- |
| `/` | Busca por _username_ |
| `/user/:username` | Perfil + listagem de repositórios |
| `/user/:username/repo/:repoName` | Detalhe de um repositório |
| `*` | Página de rota não encontrada |

---

## 🧰 Stack

| Camada | Ferramenta |
| --- | --- |
| Linguagem | TypeScript (modo `strict`) |
| UI | React 19 |
| Build / Dev server | Vite |
| Roteamento | React Router v6 |
| HTTP client | Axios |
| Estilo / responsividade | Bootstrap 5 + Bootstrap Icons |
| Estado de cliente | React Context API |
| Estado de servidor | TanStack React Query v5 |
| Testes | Jest + React Testing Library |
| Lint / Format | ESLint + Prettier |
| CI/CD | GitHub Actions + Netlify |

---

## 📦 Pré-requisitos e instalação

- Node.js 20 ou superior (desenvolvido com Node 24).
- npm 10 ou superior.

Clone o repositório e instale as dependências a partir da raiz do projeto:

```bash
git clone https://github.com/pedrohribeiross/github-explorer.git
cd github-explorer
npm install
```

---

## 📜 Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento Vite com HMR. |
| `npm run build` | Verifica tipos (`tsc -b`) e gera o build de produção em `dist/`. |
| `npm run preview` | Serve localmente o build de produção. |
| `npm run lint` | Executa o ESLint sobre o projeto. |
| `npm run typecheck` | Verificação de tipos do app e da configuração de teste. |
| `npm run format` | Formata o código com Prettier. |
| `npm run format:check` | Verifica a formatação sem alterar arquivos. |
| `npm test` | Executa a suíte de testes Jest. |
| `npm run test:watch` | Executa os testes em modo _watch_. |
| `npm run test:coverage` | Executa os testes com relatório de cobertura. |

---

## 🚀 Desenvolvimento e build

**Desenvolvimento:**

```bash
npm run dev
```

O Vite imprime a URL local no terminal (por padrão
`http://localhost:5173`). A aplicação já consome a API pública do GitHub sem
configuração adicional — não há variáveis de ambiente nem chaves a definir.

Em modo de desenvolvimento, os React Query Devtools ficam disponíveis no canto
da tela para inspeção do cache e do estado das requisições; eles não são
incluídos no build de produção.

**Build de produção:**

```bash
npm run build
npm run preview
```

O `build` roda `tsc -b` antes do empacotamento, portanto qualquer erro de tipo
reprova o build. O artefato final é gerado em `dist/` e pode ser servido por
qualquer host de arquivos estáticos.

---

## 🧪 Testes

```bash
npm test
```

A suíte é organizada por camada:

- **Services** — mock do Axios, validando chamadas e _parsing_ das respostas.
- **Utils** — ordenação e formatação testadas com casos puros.
- **Hooks** — estados de loading, erro e sucesso, renderizados com um
  `QueryClientProvider` isolado por teste.
- **Componentes-chave** — busca, listagem e detalhe renderizam os dados
  corretos e a navegação funciona.

---

## 🛡️ Tratamento de erros e estados

Cada cenário tem uma mensagem específica em português:

| Cenário | Comportamento |
| --- | --- |
| Usuário não encontrado (404) | Mensagem "Usuário não encontrado". |
| Rate limit atingido (403) | Mensagem orientando aguardar. |
| Falha de rede | Mensagem genérica com opção de tentar novamente. |
| Sem conexão (offline) | Aviso dedicado com retry, sem spinner infinito. |
| Carregando | Indicador de loading (spinner Bootstrap). |
| Lista de repositórios vazia | Mensagem "Nenhum repositório encontrado". |
| Erro de renderização / rota | Tela de erro com botão de retorno, preservando o layout. |

---

## 🔄 CI/CD

Pipeline em **GitHub Actions** (`.github/workflows/ci.yml`), disparado em
`push` e `pull_request` para a `main`:

- **`quality`** — `npm ci` → `lint` → `typecheck` → `test` → `build`. Qualquer
  falha reprova a PR.
- **`deploy`** — depende do `quality` verde e roda apenas em `push` na `main`;
  publica o build no Netlify via `netlify-cli`. PRs (inclusive de forks) rodam
  só o `quality`, sem acesso aos secrets.

A `main` é protegida por _branch protection rule_: push direto bloqueado,
_pull request_ obrigatória com revisão de _Code Owner_ e status check do CI
verde antes do _merge_.

---

## 🌐 Demo

**[https://github-explorer-pedrohribeiross.netlify.app](https://github-explorer-pedrohribeiross.netlify.app)**

Publicada automaticamente pelo GitHub Actions a cada `push` na `main` que
passe no CI.
