import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

export async function getSecrets() {
  const secretsId = process.env.SECRETS_ID;
  const secretsRegion = process.env.AWS_REGION || 'us-west-2';
  const secretsManagerClient = new SecretsManagerClient({ region: secretsRegion });
  const getSecretValueCommand = new GetSecretValueCommand({ SecretId: secretsId });
  const { SecretString: configData } = await secretsManagerClient.send(getSecretValueCommand);

  return JSON.parse(configData);
}

export async function loadEnvironment() {
  try {
    console.info('Loading environment variables...');
    const secretsManagerData = await getSecrets();
    process.env = { ...secretsManagerData, ...process.env };
    console.info('Environment variables loaded');
  } catch (err) {
    console.error('Error initializing environment:', err);
  }
}
