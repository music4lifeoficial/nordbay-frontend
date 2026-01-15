// Railway-specific configuration and utilities
export const RAILWAY_CONFIG = {
  // Backend URLs
  PRODUCTION_URL: 'https://nordbay-backend-production.up.railway.app',
  LOCAL_URL: 'http://localhost:3001',
  
  // API endpoints
  API_BASE: '/api',
  
  // Railway deployment info
  DEPLOYMENT_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // Cold start handling
  COLD_START_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

// Helper to get the correct API URL
export function getApiUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  
  if (baseUrl) {
    return baseUrl
  }
  
  // Fallback logic
  if (RAILWAY_CONFIG.IS_PRODUCTION) {
    return `${RAILWAY_CONFIG.PRODUCTION_URL}${RAILWAY_CONFIG.API_BASE}`
  }
  
  return `${RAILWAY_CONFIG.LOCAL_URL}${RAILWAY_CONFIG.API_BASE}`
}

// Helper for Railway cold start detection
export function isRailwayColdStart(error: any): boolean {
  return (
    error.code === 'ECONNABORTED' ||
    error.message?.includes('timeout') ||
    error.response?.status === 503 ||
    error.response?.status === 502
  )
}

// Railway health check
export async function checkRailwayHealth(): Promise<{
  healthy: boolean
  responseTime: number
  error?: string
}> {
  const startTime = Date.now()
  
  try {
    const response = await fetch(`${getApiUrl()}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    
    const responseTime = Date.now() - startTime
    
    if (response.ok) {
      return { healthy: true, responseTime }
    } else {
      return { 
        healthy: false, 
        responseTime, 
        error: `HTTP ${response.status}` 
      }
    }
  } catch (error) {
    const responseTime = Date.now() - startTime
    return { 
      healthy: false, 
      responseTime, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Retry wrapper for Railway requests
export async function withRailwayRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = RAILWAY_CONFIG.RETRY_ATTEMPTS
): Promise<T> {
  let lastError: Error
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      // Only retry on cold starts or network errors
      if (isRailwayColdStart(error) && attempt < maxRetries) {
        console.warn(`🔄 Railway retry attempt ${attempt}/${maxRetries}`)
        await new Promise(resolve => 
          setTimeout(resolve, RAILWAY_CONFIG.RETRY_DELAY * attempt)
        )
        continue
      }
      
      throw error
    }
  }
  
  throw lastError!
}

export default RAILWAY_CONFIG
