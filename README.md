# Playwright API Testing - ReqRes API

This project contains automated API testing using Playwright to test REST API from [ReqRes.in](https://reqres.in/).

## Prerequisites

Make sure your system has the following installed:
- **Node.js** (version 18 or newer)
- **npm** (usually comes with Node.js)
- **Git** (to clone the repository)

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/pascalesdedy/playwright_qe_test.git
cd playwright_qe_test
```

### 2. Install Dependencies
```bash
npm install
```

This command will install:
- `@playwright/test` - Playwright testing framework
- `dotenv` - Library for managing environment variables
- `@types/node` - TypeScript type definitions for Node.js

### 3. Setup Environment Variables

Create a `.env` file in the project root directory:
```bash
touch .env
```

Fill the `.env` file with the following configuration:
```env
BASE_URL=https://reqres.in/api
API_KEY=your_api_key_here
```

> **Note**: API_KEY is required if the API requires authentication. For ReqRes.in, API key is optional.

## Project Structure

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

## Test Cases

API testing coverage:

### 1. **Get User Detail by ID**
- **Endpoint**: `GET /users/2`
- **Description**: Retrieve user details by ID
- **Validation**: 
  - Status code 200
  - Response has `data` property
  - User ID is 2
  - User email is `janet.weaver@reqres.in`

### 2. **Get Detail of Non-Existent User**
- **Endpoint**: `GET /users/23`
- **Description**: Attempt to get details of a non-existent user
- **Validation**:
  - Status code 404
  - Empty response body `{}`

### 3. **Create User**
- **Endpoint**: `POST /users`
- **Description**: Create a new user with name "morpheus" and job "leader"
- **Validation**:
  - Status code 201
  - Response has matching name and job
  - Response has `createdAt` property

### 4. **Update User**
- **Endpoint**: `PUT /users/2`
- **Description**: Update user data by ID
- **Validation**:
  - Status code 200
  - Name changed to "claire"
  - Job changed to "worker"
  - Response has `updatedAt` property

### 5. **Delete User by ID**
- **Endpoint**: `DELETE /users/2`
- **Description**: Delete user by ID
- **Validation**:
  - Status code 204 (No Content)

### 6. **Register New User**
- **Endpoint**: `POST /register`
- **Description**: Register a new user with valid email and password
- **Validation**:
  - Status code 200
  - Response has `id` property
  - Response has `token` property

### 7. **Register User with Missing Password**
- **Endpoint**: `POST /register`
- **Description**: Negative test - registration without password
- **Validation**:
  - Status code 400
  - Response has `error` property
  - Error message is "Missing password"

## Running Tests

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

## View Test Reports

After tests are completed, the HTML report can be viewed with the command:

```bash
npx playwright show-report
```

The report will automatically open in the browser with detailed test results.

## Configuration

Playwright configuration can be modified in the `playwright.config.ts` file:

- **testDir**: Directory where test files are located
- **fullyParallel**: Run tests in parallel
- **retries**: Number of retries if test fails
- **reporter**: Report format (default: HTML)
- **use.baseURL**: Base URL for API endpoints
- **use.extraHTTPHeaders**: Headers added to every request

## Troubleshooting

### Error: Cannot find module 'dotenv'
```bash
npm install dotenv
```

### Error: BASE_URL is undefined
Make sure the `.env` file has been created and contains `BASE_URL=https://reqres.in/api`

### Tests failing with timeout
Add timeout in `playwright.config.ts`:
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
