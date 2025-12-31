import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Cache GET requests for 5 minutes
    if (request.method === 'GET') {
      response.setHeader('Cache-Control', 'public, max-age=300');
    }

    return next.handle().pipe(
      tap(() => {
        // Log response time for monitoring
        const now = Date.now();
        const requestTime = request['startTime'] || now;
        const duration = now - requestTime;
        if (duration > 1000) {
          console.warn(`Slow request: ${request.method} ${request.url} - ${duration}ms`);
        }
      }),
    );
  }
}
