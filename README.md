# 🗃️ Giraph

_Web app part of the Giraph._

| Stack used  | Utility                 |
| ----------- | ----------------------- |
| Typescript  |                         |
| Express     | Server                  |
| Prisma      | ORM                     |
| Apollo      | Librarie (framework 🙄) |
| React       | Front end               |
| Redux       | Centralized state       |
| TailwindCSS | Framework CSS           |

ViteJS ⚡️ : lightning-fast frontend build tool  
ESLint / Prettier for beautiful code 🥰  
Yarn 🐈

## How to clone/use the project :

_⚠️ Don't forget to set .env (copy/paste/edit .env.example)_

Init project

```bash
git clone https://github.com/ecandotti/giraph.git
cd giraph
make install
```

For development

```bash
make dev
```

For production

```bash
make build
```

For preview of production

```bash
make preview
```

## 💨 Workflow (Git) :

feature/issue_number-XX_XXXX : pour une feature  
hotfix/XXXXX : pour corriger un bug  
Release/X.X.X : pour staging vers master (prod)

# 🌳 Project structure

```shell
├── .github
├── client
├── server
├── package.json
├── .env.example
├── .eslintrc.js
├── .prettierrc.js
├── Dockerfile
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Makefile
├── nginx.conf
├── postcss.config.js
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.node.json
├── tsconfig.json
└── yarn.lock
```
