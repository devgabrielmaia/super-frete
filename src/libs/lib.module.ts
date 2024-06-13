import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminFirestore } from '@src/libs/firebase/admin-firestore.service';
import { firestore } from 'firebase-admin';
import { AutoIncrementEnum } from '@src/libs/firebase/trigger.provider';
import Firestore = firestore.Firestore;

@Global()
@Module({
  providers: [
    {
      provide: 'FIRESTORE',
      useFactory: () => {
        // const adminConfig = {
        //   credential:
        //     process.env.NODE_ENV === 'development'
        //       ? admin.credential.applicationDefault()
        //       : admin.credential.cert({
        //           projectId: config.get<string>('FIREBASE_PROJECT_ID'),
        //           privateKey: config.get<string>('FIREBASE_PRIVATE_KEY'),
        //           clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
        //         }),
        //   databaseURL: config.get<string>('FIREBASE_DATABASE_URL'),
        // };
        const appFirestore = AdminFirestore.getInstance().getAdmin();
        return appFirestore.firestore();
        // if (process.env.NODE_ENV === 'development') {
        //   app.firestore().settings({
        //     host: 'localhost:8080',
        //     ssl: false,
        //   });
        // }
      },
      inject: [ConfigService],
    },
  ],
  exports: ['FIRESTORE'],
})
export class LibModule implements OnModuleInit {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async onModuleInit() {
    const counterRef = this.db
      .collection(AutoIncrementEnum.index)
      .doc('catalogIncrement');
    const counterDoc = await counterRef.get();
    if (!counterDoc.exists) {
      await counterRef.set({ current: 0 });
    }
  }
}
