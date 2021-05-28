import app from '@/app/config';
import authentication from './authentication';
import authorization from './authorization';

import bodyParser from 'body-parser';

// First assume json with applicaiton/json header type
app.use(bodyParser.json({limit: '1mb'}));

// First, authenticate, who are you?
app.use(authentication);

// Then, authorize, can you operate on the requested resource?
app.use(authorization);
