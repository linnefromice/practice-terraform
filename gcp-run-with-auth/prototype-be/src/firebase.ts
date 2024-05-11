import * as admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import * as fs from "fs";

export type Credential = {
  type: string;
  project_id: string;
  // private_key_id: string;
  private_key: string;
  client_email: string;
  // client_id: string;
  // auth_uri: string;
  // token_uri: string;
  // auth_provider_x509_cert_url: string;
  // client_x509_cert_url: string;
  // universe_domain: string;
};
const CREDENTIAL_PATH = "credentials.json";
const readCredentials = (): Credential => {
  const data = fs.readFileSync(CREDENTIAL_PATH, "utf-8");
  const credentials: Credential = JSON.parse(data);
  return credentials;
};

export const initializeFirebaseAdminApp = () => {
  const credentials = readCredentials();
  admin.initializeApp({
    credential: cert({
      projectId: credentials.project_id,
      clientEmail: credentials.client_email,
      privateKey: credentials.private_key,
    }),
  });
};
