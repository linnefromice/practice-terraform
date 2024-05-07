import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloJs(): string {
    return 'Hello JavaScript!';
  }

  getHelloTs(): string {
    return 'Hello TypeScript!';
  }
}
