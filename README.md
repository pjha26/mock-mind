# MockMind

## 1. PROJECT OVERVIEW

MockMind is a voice-based AI mock interview platform designed to help candidates practice and improve their interviewing skills in real-time. The application supports four distinct interview types: Behavioral, Technical, System Design, and HR/Culture Fit. During an active session, the AI acts as a human interviewer, asking dynamically generated questions, evaluating the candidate's spoken responses, and following up with adaptive probing or challenges based on the candidate's performance. Once a session concludes, the platform processes the full transcript to generate a comprehensive, structured feedback report highlighting strengths, weaknesses, and specific areas for improvement.

## 2. TECH STACK

- **Frontend:** Next.js (React), Tailwind CSS — *Provides a fast, responsive, and modern UI built on a robust server-rendered framework.*
- **Backend:** Next.js API Routes — *Keeps the backend logic co-located with the frontend for simplified deployment and maintenance.*
- **Database:** PostgreSQL via Prisma ORM (hosted on Neon) — *Ensures type-safe database queries and reliable relational data storage.*
- **Auth:** JWT (`jose` library), no OAuth — *Provides lightweight, stateless authentication explicitly built to avoid heavy OAuth dependencies per assignment requirements.*
- **Voice layer:** Vapi — *Manages real-time WebRTC voice connections, Speech-to-Text (STT), Text-to-Speech (TTS), and custom LLM webhook integration.*
- **Conversation engine:** LangGraph + Groq — *Powers the "brain" of the AI using state-machine graph routing and ultra-low latency LLaMA 3.3 70B inference.*
- **Deployment:** Vercel — *Offers seamless, zero-config hosting for Next.js applications with scalable serverless functions.*

## 3. SYSTEM ARCHITECTURE

```text
  Browser (Mic Input)
        │
        ▼
      Vapi (Speech-to-Text, manages live WebRTC call)
        │
        ▼  [POST /api/chat/completions] (Vapi Webhook)
        │  Sends call.variableValues (interviewId, interviewType, jobRole, experienceLevel) + Messages
        ▼
   Our Backend (Next.js API Route)
        │
        ▼
    LangGraph State Machine (src/features/interview/graph.ts)
        ├── evaluateAnswerNode: Assesses depth/clarity of previous answer
        ├── strategizeNode: Decides next move (e.g. probe_deeper, next_question, challenge_assumption)
        └── generateQuestionNode: Selects a topic from TOPIC_POOLS (filtered by PREVIOUSLY DISCUSSED TOPICS)
        │
        ▼
      Groq (LLM Inference using llama-3.3-70b-versatile)
        │
        ▼
   Our Backend formats response as an OpenAI-compatible completion chunk
        │
        ▼
      Vapi (Text-to-Speech)
        │
        ▼
  Browser (Audio Output)
```

### Supporting API Routes:
- **`POST /api/interviews`**: Creates a session in the DB, sets status to `IN_PROGRESS`, and returns the `id` along with a signed `beaconToken`.
- **`GET /api/interviews`**: Lists all user sessions. Also acts as a garbage collector, sweeping stale `IN_PROGRESS` sessions to `ABANDONED` if no activity occurred in the last 30 minutes.
- **`POST /api/interviews/[id]/abandon`**: Triggered via `navigator.sendBeacon` when the user closes the tab. It verifies the HMAC-signed `beaconToken` to securely mark the interview as `ABANDONED`.
- **`PUT /api/interviews/[id]/transcript`**: Called when the interview naturally ends to save the final conversation transcript and update the session status to `COMPLETED`.

### Why LangGraph?
Instead of relying on a single monolithic prompt, LangGraph allows us to break the LLM's thought process into distinct nodes. First, it explicitly evaluates the candidate's last answer. Then, deterministic code decides the strategy (should we dig deeper into a weak answer, or move to a new topic?). Finally, a targeted prompt generates the specific question. This prevents topic repetition, hallucination, and ensures a realistic interview flow.

## 4. AUTH FLOW

The application uses a custom JWT-based authentication flow. Upon signup or login, the server generates a JWT using the `jose` library. This token is stored client-side and sent as an `Authorization: Bearer <token>` header on subsequent API requests. 

The exception is the tab-close abandonment endpoint (`/api/interviews/[id]/abandon`). Because browsers restrict setting custom headers on `navigator.sendBeacon` requests, the server issues a short-lived, HMAC-signed `beaconToken` when the interview starts. This token is passed in the JSON payload of the beacon request to securely authenticate the action without relying on headers.

## 5. DATABASE SCHEMA

The PostgreSQL database (managed by Prisma) relies on two primary models:

**`User` Model:**
- `id` (String, UUID)
- `email` (String, Unique)
- `passwordHash` (String)
- `name` (String)
- `jobRole` (String, optional)
- `experienceLevel` (String, optional)
- `createdAt` / `updatedAt`

**`Interview` Model:**
- `id` (String, UUID)
- `userId` (String, Foreign Key to User)
- `type` (String, e.g., 'Technical', 'Behavioral')
- `status` (String: `IN_PROGRESS`, `COMPLETED`, `ABANDONED`)
- `transcript` (Json, optional - stores the full message history)
- `feedback` (Json, optional - stores the generated post-interview report)
- `lastActivityAt` (DateTime - updated on every interaction)
- `startedAt` / `endedAt` / `createdAt` / `updatedAt`

## 6. LOCAL SETUP

You can run this project locally in under 5 commands:

1. `git clone <repo-url>`
2. `cd mock-mind`
3. `npm install`
4. `cp .env.example .env` (Populate with your keys)
5. `npx prisma db push && npm run dev`

**Required Environment Variables:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
JWT_SECRET_KEY="your_secure_jwt_secret"
NEXT_PUBLIC_VAPI_PUBLIC_KEY="your_vapi_public_key"
GROQ_API_KEY="your_groq_api_key"
```

## 7. KEY DESIGN DECISIONS / TRADEOFFS

- **LangGraph over a single prompt loop:** By decoupling evaluation, strategy, and generation into specialized nodes, the AI avoids getting "confused" by massive system prompts. It also provides deterministic tracking of previously discussed topics and candidate struggle streaks.
- **JWT + HMAC beacon token:** Since `navigator.sendBeacon` cannot reliably set `Authorization` headers, we use a separate, cryptographically signed `beaconToken` specifically for the tab-close event. This ensures the endpoint remains secure while bypassing browser API limitations.
- **30-min staleness sweep as a backstop:** Browsers are notoriously unreliable at firing `beforeunload` or `unload` events (especially on mobile devices or force-quits). Sweeping stale `IN_PROGRESS` sessions during the `GET /api/interviews` call acts as a fail-safe backstop to ensure dashboard accuracy.

## 8. KNOWN LIMITATIONS

- **Topic Exhaustion:** In extremely long interviews (e.g., 20+ turns), the AI may exhaust the predefined `TOPIC_POOLS` for a given interview type. Currently, it attempts to wrap up naturally, but highly extended sessions might experience slight repetition or generic fallback questions.
- **Feedback Overwrites:** The post-interview feedback report is stored in a `Json?` field on the `Interview` model rather than a separate table. If the feedback generation endpoint is triggered multiple times for the same session, it will simply overwrite the existing JSON blob instead of preserving a history of reports. (Though UI guards are in place to prevent duplicate generation).
- **Cost Considerations:** The architecture utilizes Vapi for voice streaming and Groq (LLaMA 3.3 70B) for inference. High-volume usage could quickly scale costs, especially since the entire conversation history is passed to the LLM on every turn to maintain context.
- **Auth Scope:** Per assignment requirements, OAuth providers (Google, GitHub) are deliberately out of scope in favor of a purely custom JWT implementation.
