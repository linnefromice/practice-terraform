import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { prisma } from './lib/db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const count = await prisma.user.count();
    console.log(count);
    return this.appService.getHello();
  }
}

@Controller('app/js')
export class JavaScriptController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelloJs(): string {
    return this.appService.getHelloJs();
  }
}

@Controller('app/ts')
export class TypeScriptController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelloTs(): string {
    return this.appService.getHelloTs();
  }
}
