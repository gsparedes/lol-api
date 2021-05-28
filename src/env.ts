import {config} from 'dotenv';
import {resolve} from 'path';

const ENV_FILE_PATH = resolve(__dirname, './.env');

// Set environment variables from .env file, if present
config({path: ENV_FILE_PATH});
