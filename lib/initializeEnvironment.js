import { loadEnvironment } from './aws-secrets.js';

let loadingEnvironment = false;
let environmentInitialized = false;

export default async function initializeEnvironment() {
  if (!loadingEnvironment && !environmentInitialized) {
    loadingEnvironment = true;
    await loadEnvironment();
    environmentInitialized = true;
  }
}

export {
  initializeEnvironment,
};
