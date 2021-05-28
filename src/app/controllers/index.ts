import app from '@/app/config';

// Health check TODO Maybe only allow internal ip addresses
app.get('/status/_healthz', (req, res) => res.sendStatus(200));
