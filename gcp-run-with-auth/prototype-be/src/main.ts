import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { AppModule } from './app.module';
import { logger } from './common.middleware';
import { readCredentials } from './lib/credential';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(logger);

  const credentials = readCredentials();
  admin.initializeApp({
    credential: cert({
      projectId: credentials.project_id,
      clientEmail: credentials.client_email,
      privateKey: credentials.private_key,
    }),
  });

  await app.listen(3000);
}
bootstrap();
