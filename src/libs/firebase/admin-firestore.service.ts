import * as admin from 'firebase-admin';
import { app } from 'firebase-admin';

export class AdminFirestore {
  private static instance: AdminFirestore;
  private readonly admin: app.App;

  private constructor() {
    const adminConfig = {
      credential: admin.credential.applicationDefault(),
    };
    this.admin = admin.initializeApp(adminConfig);
  }

  public static getInstance(): AdminFirestore {
    if (!AdminFirestore.instance) {
      AdminFirestore.instance = new AdminFirestore();
    }
    return AdminFirestore.instance;
  }

  public getAdmin() {
    return this.admin;
  }
}
