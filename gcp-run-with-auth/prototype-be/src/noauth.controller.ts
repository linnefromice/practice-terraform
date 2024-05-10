import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller()
export class HelloController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async get(): Promise<string> {
    console.log(await this.prisma.user.count()); // temp: check to use prisma
    return 'Hello!';
  }
}
