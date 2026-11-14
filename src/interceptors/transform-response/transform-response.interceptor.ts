import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(map((data) => {
      const statusCode = response.statusCode;
      if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
        return { success: true, message: 'Berhasil', statusCode, data: data.data, meta: data.meta };
      }
      return { success: true, message: 'Berhasil', statusCode, data };
    }));
  }
}
