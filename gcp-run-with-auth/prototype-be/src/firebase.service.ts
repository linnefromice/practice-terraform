import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { readCredentials } from './lib/credential';

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor() {
    if (admin.apps.length === 0) {
      console.log('Initialize Firebase Admin');
      const credentials = readCredentials();
      this.firebaseApp = admin.initializeApp({
        credential: cert({
          projectId: credentials.project_id,
          clientEmail: credentials.client_email,
          privateKey: credentials.private_key,
        }),
      });
    }
  }

  getAuth = (): admin.auth.Auth => {
    return this.firebaseApp.auth();
  };
}
