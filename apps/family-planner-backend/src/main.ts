import express from 'express';
// import * as path from 'path';
import { router as GoalRoutes } from './routes/goalRoutes.js';
import { router as UserRoutes } from './routes/userRoutes.js';

// import (dotenv.config()) from 'dotenv' ;
import { connectDB } from './config/db.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to family-planner-backend!' });
});

app.use('/api/goals', GoalRoutes);
app.use('/api/users', UserRoutes);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
