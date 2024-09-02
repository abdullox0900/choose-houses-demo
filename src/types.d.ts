/// <reference types="vite/client" />

interface ProcessEnv {
    readonly API_URL: string
    // boshqa o'zgaruvchilarni ham qo'shing
  }
  
  interface Process {
    readonly env: ProcessEnv
  }