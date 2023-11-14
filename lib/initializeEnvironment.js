import { loadEnvironment } from './aws-secrets.js';
import { getConfig } from './utils.js';

let loadingEnvironment = false;
let environmentInitialized = false;

export default async function initializeEnvironment() {
  if (!loadingEnvironment && !environmentInitialized && !getConfig('IS_LOCAL')) {
    loadingEnvironment = true;
    await loadEnvironment();
    environmentInitialized = true;
  }
}

export {
  initializeEnvironment,
};
