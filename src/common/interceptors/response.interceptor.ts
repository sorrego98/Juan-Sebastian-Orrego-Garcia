import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { map, Observable } from 'rxjs';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T> {
    constructor(private readonly reflector: Reflector) {}
  
    intercept(
      context: ExecutionContext,
      next: CallHandler<T>,
    ): Observable<any> | Promise<Observable<any>> {
      const httpContext = context.switchToHttp();
      const response = httpContext.getResponse();
      const successType = this.reflector.get<string>(
        'successType',
        context.getHandler(),
      );
  
      return next.handle().pipe(
        map((data) => {
          const statusCode = response.statusCode;
  
          return {
            success: true,
            statusCode,
            successType,
            data,
            timestamp: new Date(new Date().getTime() - 5 * 60 * 60 * 1000).toISOString(),
          };
        }),
      );
    }
  }
  