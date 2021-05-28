// Coerce global Promise to be bluebird
import 'bluebird-global';
import './env';

import Log from '@/logger';

// Start the server
import server from './server';

const {logger} = Log;

// eslint-disable-next-line consistent-return
function exitHandler(options: {exit?: boolean}) {
  if (server) {
    logger.warn('Exiting...');
    server.close(() => {
      if (options.exit) {
        process.exit(0);
      }
    });
    // Force close server after 5secs
    setTimeout((e) => {
      logger.error('Forcing server close !!!', e);
      process.kill(process.pid, 'SIGUSR2');
    }, 1000);
  }
}

// Handle all exit codes imaginable
process.once('SIGINT', exitHandler.bind(null, {exit: true}));
process.once('SIGUSR1', exitHandler.bind(null, {exit: true}));
process.once('SIGUSR2', exitHandler.bind(null, {exit: true}));
process.once('SIGTERM', exitHandler.bind(null, {exit: true}));
process.once('SIGHUP', exitHandler.bind(null, {exit: true}));
