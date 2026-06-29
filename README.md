# MockMind - AI Mock Interview Platform

A full-stack, AI-powered mock interview platform utilizing Vapi.ai for real-time voice, LangGraph (with Groq) for the conversation state engine, and Gemini for post-interview feedback generation.

## Local Setup (Under 5 Commands)

Ensure you have Node.js and PostgreSQL installed.

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root based on `.env.example` and add your keys:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mockmind?schema=public"
   JWT_SECRET_KEY="your-secret-key"
   NEXT_PUBLIC_VAPI_PUBLIC_KEY="your-vapi-public-key"
   GROQ_API_KEY="your-groq-api-key"
   GEMINI_API_KEY="your-gemini-api-key"
   ```

3. **Initialize the Database**
   ```bash
   npx prisma db push
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture Highlights
- **LangGraph State Machine**: Avoids monolithic prompts. Decouples answer evaluation, strategy selection, and question generation.
- **Groq Integration**: Powers the live interaction loop with ultra-low latency LLaMA 3.
- **Vapi Custom Server**: Vapi acts as the STT/TTS layer, but the "brain" is fully self-hosted in Next.js API routes.
- **Strict Separation of Concerns**: Follows strict rules for services, constants, and utilities vs. UI components.
