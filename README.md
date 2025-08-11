# React Beer E-Commerce Challenge Monorepo

This monorepo uses TurboRepo to manage two separate apps:

- **frontend**: React app built with Vite (JavaScript)
- **backend**: Node.js app using Express (JavaScript)

## Getting Started

### Prerequisites
- Node.js (latest version recommended)
- npm

### Install dependencies

From the monorepo root:

```
npm install
cd frontend && npm install
cd ../backend && npm install
```

## Running the apps

### Development (run both apps in parallel)
```
turbo run dev --parallel
```

### Production
```
turbo run build --parallel
cd frontend && npm run start
cd ../backend && npm start
```

## TurboRepo

TurboRepo is installed in the monorepo root. Use the commands above to run both apps together.

---

For more details, see the README files in each app folder.
