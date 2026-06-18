import { checkRateLimit } from './checkRateLimit';

/** rate limit 비즈니스 로직 (window 계산 + 한도 비교). */
export const RateLimitService = { checkRateLimit };
