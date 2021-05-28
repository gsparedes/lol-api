import app from './config';

// Attach middleware
import './middleware';

// Attach controllers
import './controllers';

// Register error handling
import './errors';

// Register secrets
import Queries from '@/queries';

// Register application services
// import './services';

Queries.on('ready', async (queries) => {
  app.set('queries', queries);
  app.emit('services:ready');
});

export default app;
