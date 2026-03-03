# Slider Backend

Backend em Node.js para cadastro, gerenciamento e exibição de **slides** (imagens ou vídeos), com armazenamento de arquivos na Cloudflare R2 e dados no MongoDB.  

Permite criar, listar, atualizar, excluir e obter apenas os slides ativos de acordo com período de exibição e status.

---

## Tecnologias

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Cloudflare R2** (`@aws-sdk/client-s3` com endpoint R2)
- **Multer** (upload em memória)
- **Zod** (validação de dados)
- **dotenv** (variáveis de ambiente)
- **cors**, **body-parser**, **cookie-parser**

---

## Pré-requisitos

- **Node.js** 18+ instalado
- Acesso a um banco **MongoDB** (local ou em nuvem)
- Conta e bucket configurados na **Cloudflare R2**

---

## Instalação

```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd "OF TV"

# Instalar dependências
npm install
```

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias (exemplo):

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/sliderbackend

R2_ACCOUNT_ID=SEU_ACCOUNT_ID
R2_ACCESS_KEY_ID=SUA_ACCESS_KEY
R2_SECRET_ACCESS_KEY=SUA_SECRET_KEY
R2_BUCKET_NAME=nome-do-bucket
R2_PUBLIC_URL=https://seu-dominio-r2.com
```

---

## Execução

```bash
npm run dev
```

O servidor será iniciado usando o `index.js`, que carrega o `app.js` e chama `startServer` em `server.js`, conectando ao MongoDB e ouvindo na porta definida em `PORT`.

---

## Endpoints

Todos os endpoints estão definidos em `features/slide/routes/slideRoute.js` e montados diretamente no `app`.

### 1. Listar todos os slides

- **GET** `/slides`
- **Resposta 200**:

```json
{
  "success": true,
  "message": "Slides retornados com sucesso",
  "data": [
    {
      "_id": "...",
      "mediaUrl": "https://...",
      "mediaType": "image",
      "isEnabled": true,
      "startAt": "2024-01-01T00:00:00.000Z",
      "endAt": "2024-01-31T23:59:59.000Z",
      "status": "active"
    }
  ]
}
```

### 2. Listar slides ativos

- **GET** `/active-slides`
- Retorna apenas slides:
  - com `isEnabled = true`
  - `startAt <= agora`
  - `endAt >= agora`

### 3. Criar slide

- **POST** `/slide`
- **Body (multipart/form-data)**:
  - `file`: arquivo (campo único) – aceita `image/jpeg`, `image/png`, `video/mp4`
  - `mediaType`: `"image"` ou `"video"`
  - `startAt`: data inicial (`string`, parseada para `Date`)
  - `endAt`: data final (`string`, parseada para `Date`)
  - `isEnabled` (opcional): `true` ou `false`

Exemplo (pseudo):

- `Content-Type: multipart/form-data`
- Campos:
  - `file`: `banner.jpg`
  - `mediaType`: `image`
  - `startAt`: `2024-03-01T00:00:00.000Z`
  - `endAt`: `2024-03-31T23:59:59.000Z`
  - `isEnabled`: `true`

Validação feita via `SlideSchema` (`zod`):

- `mediaUrl`: string com mínimo de 10 caracteres (preenchida internamente após upload)
- `mediaType`: `image` | `video`
- `startAt` e `endAt`: datas válidas
- `startAt` não pode ser maior que `endAt`

### 4. Atualizar slide

- **PUT** `/slide/:id`
- **Body (JSON)**:
  - Qualquer campo do slide que você queira atualizar (`mediaType`, `isEnabled`, `startAt`, `endAt`, etc.)
- Verifica se o slide existe antes de atualizar, senão retorna erro 404.

### 5. Excluir slide

- **DELETE** `/slide/:id`
- Fluxo:
  1. Busca o slide pelo `id`
  2. Remove o arquivo correspondente na R2 (usando a última parte da URL como `key`)
  3. Apaga o registro no MongoDB

---

## Estrutura do Projeto (resumo)

```text
.
├── app.js
├── index.js
├── server.js
├── config
│   └── db.js
├── features
│   ├── slide
│   │   ├── controller
│   │   │   └── slideController.js
│   │   ├── model
│   │   │   └── slideModel.js
│   │   ├── repository
│   │   │   └── slideRepository.js
│   │   ├── routes
│   │   │   └── slideRoute.js
│   │   └── schema
│   │       └── slideSchema.js
│   └── upload
│       └── uploadService.js
├── middlewares
│   └── normalizeFileMiddleware.js
├── package.json
└── .gitignore
```

---

## Tratamento de Erros

As ações de criação, listagem, atualização, exclusão e upload retornam respostas padronizadas:

- `success`: `true` ou `false`
- `message`: descrição do que ocorreu
- `data`: dados da operação (ou `null` em caso de erro)

Erros comuns:

- **400**: erro de validação (por exemplo, datas inválidas, `startAt > endAt`, URL inválida)
- **404**: slide não encontrado ou arquivo não enviado
- **500**: erros internos (banco, R2, etc.)

---

## Licença

Projeto licenciado sob **ISC** (definido em `package.json`).

---

## Autor

- **Claudio**

