# OF TV — Backend

Backend em Node.js para gerenciamento de **slides de mídia** e **autenticação de usuários**, com armazenamento de arquivos na Cloudflare R2 e dados no MongoDB.

---

## Tecnologias

| Pacote | Uso |
|---|---|
| **Express 5** | Servidor HTTP e roteamento |
| **MongoDB + Mongoose** | Banco de dados principal |
| **Zod** | Validação de dados de entrada |
| **jsonwebtoken** | Access tokens (JWT) |
| **bcrypt** | Hash de senhas |
| **cookie-parser** | Leitura de cookies httpOnly |
| **Multer** | Upload de arquivos em memória |
| **@aws-sdk/client-s3** | Upload para Cloudflare R2 |
| **dotenv** | Variáveis de ambiente |

---

## Pré-requisitos

- Node.js 18+
- Banco MongoDB (local ou em nuvem)
- Conta e bucket configurados na Cloudflare R2

---

## Instalação

```bash
git clone <URL_DO_REPOSITORIO>
cd "OF TV"
npm install
```

Crie um arquivo `.env` na raiz com as variáveis abaixo:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/oftvdb

JWT_SECRET=
REFRESH_TOKEN_TTL_MS=604800000

PEPPER=
ROUND_ENCRYPTION=12

R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

---

## Execução

```bash
npm run dev
```

---

## Endpoints

### Autenticação

| Método | Rota | Autenticado | Descrição |
|---|---|---|---|
| POST | `/auth/register` | Não | Cadastro de usuário |
| POST | `/auth/login` | Não | Login |
| POST | `/auth/refresh` | Não | Renovar access token via cookie |

### Slides

| Método | Rota | Autenticado | Descrição |
|---|---|---|---|
| GET | `/slides` | Sim | Listar todos os slides |
| GET | `/active-slides` | Não | Listar slides ativos no momento |
| POST | `/slide` | Sim | Criar slide (multipart/form-data) |
| PUT | `/slide/:id` | Sim | Atualizar slide |
| DELETE | `/slide/:id` | Sim | Excluir slide |

Rotas autenticadas exigem o header:
```
Authorization: Bearer <access_token>
```

---

## Autor

**Claudio** — cvsilva391@gmail.com
