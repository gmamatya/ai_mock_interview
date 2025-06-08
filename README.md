# AI Mock Interview Platform

## About the Project

A **Next.js**-powered AI mock-interview platform that combines rapid front-end development with intelligent, AI-driven back-ends:

- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) React framework with built-in SSR, static-export, file-based routing, and image optimization.  
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) Utility-first CSS for rapid UI prototyping without leaving your markup.  
- ![Vapi](https://img.shields.io/badge/Vapi-4FC08D?style=flat&logo=vercel&logoColor=white) Lightweight, type-safe API framework for defining endpoints and request/response schemas with minimal boilerplate.  
- ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black) Managed backend services (Auth, Firestore, Hosting, Functions) for quick setup and horizontal scalability.  
- ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-6366F1?style=flat&logo=shadcn&logoColor=white) Accessible, customizable React components built on Radix and Tailwind—perfect for design consistency.  
- ![Zod](https://img.shields.io/badge/Zod-000000?style=flat&logo=zod&logoColor=white) TypeScript-first schema validation to ensure data integrity at compile- and runtime.  
- ![Gemini AI](https://img.shields.io/badge/Gemini_AI-673AB7?style=flat&logo=google&logoColor=white) Advanced LLM integration for context-aware interview simulations and real-time feedback.  
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) Statically-typed JavaScript superset for safer code and better editor support.  
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) Configurable linter enforcing code standards and catching potential errors early.  
- ![Turbopack](https://img.shields.io/badge/Turbopack-FFFFFF?style=flat&logo=webpack&logoColor=black) Next-generation bundler optimized for lightning-fast HMR and incremental builds.  
- ![Mermaid](https://img.shields.io/badge/Mermaid-FF3670?style=flat&logo=mermaid&logoColor=white) Text-based diagramming engine for generating flowcharts, sequence diagrams, class diagrams, and more directly from simple markup.
- **…and more**: State management, test runners, CI/CD tools, performance monitoring, and other enhancements.

## Firebase Authentication
```mermaid
sequenceDiagram
    participant User
    participant ClientSDK as Client SDK
    participant FirebaseAuth as Firebase Auth
    participant AdminSDK as Admin SDK
    participant Firestore

    User->>ClientSDK: Sign in with Email/Google/Facebook
    ClientSDK->>FirebaseAuth: Authenticate user credentials
    FirebaseAuth-->>ClientSDK: Return ID Token
    ClientSDK->>AdminSDK: Send ID Token for session creation
    AdminSDK->>FirebaseAuth: Verify ID Token
    FirebaseAuth-->>AdminSDK: Valid ID Token
    AdminSDK-->>ClientSDK: Issue Session Cookie

    User->>ClientSDK: Make authenticated request
    ClientSDK->>AdminSDK: Send Session Cookie
    AdminSDK->>FirebaseAuth: Verify Session Cookie
    FirebaseAuth-->>AdminSDK: Valid Session
    AdminSDK->>Firestore: Fetch user details
    Firestore-->>AdminSDK: Return user records
    AdminSDK-->>ClientSDK: Return user data
```


## Getting Started

1. Install dependencies and start development server:

   ```bash
   npm install
   npm run dev
   # or
   yarn
   yarn dev
   # or
   pnpm
   pnpm dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) to see your app.

3. Edit `app/page.tsx`—changes auto-reload in the browser.

This setup also uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize loading of the **Geist** font from Vercel.

## Learn More

- **Next.js Documentation**: https://nextjs.org/docs  
- **Interactive Tutorial**: https://nextjs.org/learn  
- **GitHub Repo**: https://github.com/vercel/next.js

## Deploy on Vercel

Deploy with zero-config on Vercel:

[![Deploy on Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
