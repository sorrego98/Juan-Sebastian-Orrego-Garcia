import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
  } from '@nestjs/common';
  import { Response, Request } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
  
      response.status(status).json({
        success: false,
        statusCode: status,
        errorType: (exceptionResponse as any).error,
        message: (exceptionResponse as any).message || exception.message,
        timestamp: new Date(new Date().getTime() - 5 * 60 * 60 * 1000).toISOString(),
        path: request.url,
      });
    }
  }
  