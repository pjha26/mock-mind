export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default-secret-do-not-use';
export const TOKEN_EXPIRATION = '24h';
export const VAPI_BASE_URL = 'https://api.vapi.ai';
export const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred';
export const COOKIE_NAME = 'auth_token';

// Centralized AI Models
export const GROQ_LLM_MODEL = process.env.GROQ_LLM_MODEL || 'openai/gpt-oss-120b';
export const GROQ_FAST_MODEL = process.env.GROQ_FAST_MODEL || 'openai/gpt-oss-20b';
