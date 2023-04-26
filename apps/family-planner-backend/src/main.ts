import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

import { connectDB } from './config/db.js';
import { router as GroupRoutes } from './routes/groupRoutes.js';
import { router as UserRoutes } from './routes/userRoutes.js';
// import * as path from 'path';
// import { router as GoalRoutes } from './routes/goalRoutes.js';

connectDB();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to family-planner-backend!' });
});

// app.use('/api/goals', GoalRoutes);

app.use('/api/users', UserRoutes);
app.use('/api/groups', GroupRoutes);

const port = process.env.API_PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
