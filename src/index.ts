import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';
import { Express } from 'express-serve-static-core';

const expressServer = express();

async function bootstrap(expressInstance: Express): Promise<void> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  await app.init();
}

export const api = functions.https.onRequest(async (request, response) => {
  await bootstrap(expressServer);
  expressServer(request, response);
});
