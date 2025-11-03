// 这个中间件文件用于处理 Cloudflare Workers 的请求
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // 添加安全头
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

// 配置中间件匹配的路由
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|static|api/auth/).*)',
  ],
};
