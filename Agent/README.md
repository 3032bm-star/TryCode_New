# Angular Sample Application

This is a sample Angular application created for testing code search capabilities.

## Features

- Two main pages: Home and About
- Data service for managing user information
- Angular Router for navigation
- TypeScript with strict mode enabled

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/
│   │   └── about/
│   ├── services/
│   │   └── data.service.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── index.html
├── main.ts
└── styles.css
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm start
   ```

3. Navigate to `http://localhost:4200/`

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
