import * as fs from 'fs';

const CREDENTIAL_PATH = 'credentials.json';

type Credential = {
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

export const readCredentials = (): Credential => {
  const data = fs.readFileSync(CREDENTIAL_PATH, 'utf-8');
  const credentials: Credential = JSON.parse(data);
  return credentials;
};
