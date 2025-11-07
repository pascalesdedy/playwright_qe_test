# Playwright API Testing - ReqRes API

Project ini berisi automated API testing menggunakan Playwright untuk menguji REST API dari [ReqRes.in](https://reqres.in/).

## 📋 Prerequisites

Pastikan sistem Anda sudah terinstall:
- **Node.js** (versi 18 atau lebih baru)
- **npm** (biasanya sudah terinstall bersama Node.js)
- **Git** (untuk clone repository)

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/pascalesdedy/playwright_qe_test.git
cd playwright_qe_test
```

### 2. Install Dependencies
```bash
npm install
```

Perintah ini akan menginstall:
- `@playwright/test` - Framework testing Playwright
- `dotenv` - Library untuk mengelola environment variables
- `@types/node` - TypeScript type definitions untuk Node.js

### 3. Setup Environment Variables

Buat file `.env` di root directory project:
```bash
touch .env
```

Isi file `.env` dengan konfigurasi berikut:
```env
BASE_URL=https://reqres.in/api
API_KEY=your_api_key_here
```

> **Note**: API_KEY diperlukan jika API memerlukan authentication. Untuk ReqRes.in, API key bersifat opsional.

## 📁 Struktur Project

```
playwright_qe_test/
├── lib/
│   └── payload.ts          # Request payload templates
├── tests/
│   └── api.test.spec.ts    # API test cases
├── playwright.config.ts     # Playwright configuration
├── .env                     # Environment variables (not tracked in git)
├── .gitignore              # Git ignore rules
└── package.json            # Project dependencies
```

## 🧪 Test Cases

Project ini mencakup 7 test cases yang menguji berbagai endpoint API:

### 1. **Get User Detail by ID**
- **Endpoint**: `GET /users/2`
- **Deskripsi**: Mengambil detail user dengan ID 2
- **Validasi**: 
  - Status code 200
  - Response memiliki property `data`
  - User ID adalah 2
  - Email user adalah `janet.weaver@reqres.in`

### 2. **Get Detail of Non-Existent User**
- **Endpoint**: `GET /users/23`
- **Deskripsi**: Mencoba mengambil user yang tidak ada
- **Validasi**:
  - Status code 404
  - Response body kosong `{}`

### 3. **Create User**
- **Endpoint**: `POST /users`
- **Deskripsi**: Membuat user baru dengan nama "morpheus" dan job "leader"
- **Validasi**:
  - Status code 201
  - Response memiliki nama dan job yang sesuai
  - Response memiliki property `createdAt`

### 4. **Update User**
- **Endpoint**: `PUT /users/2`
- **Deskripsi**: Mengupdate data user dengan ID 2
- **Validasi**:
  - Status code 200
  - Nama berubah menjadi "claire"
  - Job berubah menjadi "worker"
  - Response memiliki property `updatedAt`

### 5. **Delete User by ID**
- **Endpoint**: `DELETE /users/2`
- **Deskripsi**: Menghapus user dengan ID 2
- **Validasi**:
  - Status code 204 (No Content)

### 6. **Register New User**
- **Endpoint**: `POST /register`
- **Deskripsi**: Registrasi user baru dengan email dan password yang valid
- **Validasi**:
  - Status code 200
  - Response memiliki property `id`
  - Response memiliki property `token`

### 7. **Register User with Missing Password**
- **Endpoint**: `POST /register`
- **Deskripsi**: Negative test - registrasi tanpa password
- **Validasi**:
  - Status code 400
  - Response memiliki property `error`
  - Error message adalah "Missing password"

## ▶️ Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests with UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run Specific Test File
```bash
npx playwright test tests/api.test.spec.ts
```

### Run Single Test by Name
```bash
npx playwright test -g "get user detail by id"
```

### Run Tests with Debug Mode
```bash
npx playwright test --debug
```

## 📊 View Test Reports

Setelah test selesai dijalankan, Anda dapat melihat HTML report:

```bash
npx playwright show-report
```

Report akan otomatis terbuka di browser dengan detail hasil test, screenshot (jika ada), dan trace.

## Configuration

Konfigurasi Playwright dapat diubah di file `playwright.config.ts`:

- **testDir**: Directory tempat test files berada
- **fullyParallel**: Menjalankan test secara parallel
- **retries**: Jumlah retry jika test gagal
- **reporter**: Format report (default: HTML)
- **use.baseURL**: Base URL untuk API endpoint
- **use.extraHTTPHeaders**: Header yang ditambahkan ke setiap request

## Troubleshooting

### Error: Cannot find module 'dotenv'
```bash
npm install dotenv
```

### Error: BASE_URL is undefined
Pastikan file `.env` sudah dibuat dan berisi `BASE_URL=https://reqres.in/api`

### Tests failing with timeout
Tambahkan timeout di `playwright.config.ts`:
```typescript
use: {
  timeout: 30000, // 30 seconds
}
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Testing Guide](https://playwright.dev/docs/api-testing)
- [ReqRes API Documentation](https://reqres.in/)

## Author

Pascales Dedy Kurniawan
