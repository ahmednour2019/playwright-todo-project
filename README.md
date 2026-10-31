# Playwright Todo Project

End-to-end test automation for the [QACart Todo app](https://todo.qacart.com/) using [Playwright](https://playwright.dev/) and TypeScript.

## Features

- UI tests for user registration and adding todos
- API helpers (`UserApi`, `TodoApi`) to set up test state quickly (register a user, inject the access token cookie)
- `User` model that generates random data with [@faker-js/faker](https://fakerjs.dev/)
- Chromium project, HTML report, trace on first retry

## Project Structure

```
├── apis/               # API wrappers (UserApi.ts, TodoApi.ts)
├── models/             # Data models (User.ts)
├── tests/              # Test specs (todo.spec.ts, user.spec.ts)
└── playwright.config.ts
```

## Tests

| Spec | Scenario |
| --- | --- |
| `tests/user.spec.ts` | Register via the UI |
| `tests/user.spec.ts` | Register via the API |
| `tests/todo.spec.ts` | Add a todo |

## Prerequisites

- [Node.js](https://nodejs.org/) 18+

## Getting Started

```bash
npm install
npx playwright install chromium
```

## Running the Tests

```bash
npx playwright test                    # run all tests
npx playwright test tests/todo.spec.ts # run a single file
npx playwright test --ui               # interactive UI mode
npx playwright show-report             # open the HTML report
```

The base URL (`https://todo.qacart.com/`) and the headed browser mode are set in [playwright.config.ts](playwright.config.ts). Set `headless: true` there to run without a visible browser.
