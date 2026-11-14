import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getHello() {
    return { name: 'Task Management System API', version: '1.0.0', status: 'running' };
  }
}
