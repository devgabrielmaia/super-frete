import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { CloudFunction } from 'firebase-functions';
import { AppModule } from './app.module';
import { Express } from 'express-serve-static-core';
import { AdminFirestore } from '@src/libs/firebase/admin-firestore.service';
import { firestore } from 'firebase-admin';
import { TriggerProps, triggers } from '@src/libs/firebase/trigger.provider';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

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

const admin = AdminFirestore.getInstance().getAdmin();

export const triggersSetup: CloudFunction<any>[] = [];

triggers.forEach((trigger: TriggerProps) => {
  triggersSetup.push(
    functions.firestore
      .document(trigger.onDocument)
      .onCreate(async (snap: QueryDocumentSnapshot) => {
        await trigger.func(admin.firestore(), snap, trigger.options);
      }),
  );
});
