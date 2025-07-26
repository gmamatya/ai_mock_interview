# AI InterviewPrep - an AI Interview Preparation Platform

## About the Project

A **Next.js**-powered mock interview platform offering real-time AI interviews, personalized feedback, and dynamically curated questions based on your choices. Ace your next interview!

#### The project uses the following technologies:

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
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) Frontend cloud platform for deploying, previewing, and scaling modern web applications with seamless Git integration and edge performance.
- ![Vercel AI SDK](https://img.shields.io/badge/Vercel%20AI%20SDK-FF0080?style=flat&logo=vercel&logoColor=white) Lightweight TypeScript SDK from Vercel for building conversational AI apps using streaming LLM outputs, function calling, and tool integration.

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
## Gemini AI integration

### LLM Model used:
**gemini-2.0-flash**: Gemini 2.0 Flash delivers next-gen features and improved capabilities, including superior speed, built-in tool use, multimodal generation, and a 1M token context window.

```mermaid
sequenceDiagram
    participant User
    participant VAPI as VAPI Assistant
    participant API as API Endpoint
    participant Gemini
    participant Firestore
    participant UI

    User->>VAPI: 1. Initiate call
    VAPI->>User: 2. Ask pre-defined questions
    loop 3. Collect responses
        User-->>VAPI: Answer question
    end
    VAPI->>API: 4. Send all responses
    API->>Gemini: 5. Feed info
    Gemini-->>API: Return AI response
    API->>Firestore: Store response
    UI->>API: 6. Fetch entries from Firestore
    API-->>UI: Return stored entries
    UI->>UI: Display on screen
```

### AI Models used:
Voice Assistant:
- gpt-4o cluster by OpenAI
- claude-sonnet 3.5 by Anthropic

Transcriber (Speech to Text):
- nova-2 by deepgram

Interview Generation and Feedback
- gemini-2.0-flash-001

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