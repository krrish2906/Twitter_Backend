import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import { connect } from './config/dbconfig.js'
import { config } from './config/serverconfig.js'
import apiRoutes from './routes/index.js';
import { passportAuth } from './config/jwt-middleware.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);
app.use('/api', apiRoutes);
connect();

app.listen(config.PORT, async () => {
    console.log(`\nServer is running on http://localhost:${config.PORT}`);
});