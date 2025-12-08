import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from '../config/db.js';
import userRouter from '../routes/userRoute.js';
import chatRouter from '../routes/chatRoutes.js';
import messageRouter from '../routes/messageRoutes.js';
import creditRouter from '../routes/creditRoutes.js';
import stripeWebhook from '../controllers/webhooks.js';

const app = express();

// Initialize database connection
let dbConnected = false;
const initDB = async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error('DB connection error:', error);
    }
  }
};

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  await initDB();
  next();
});

app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api', (req, res) => {
  res.send('API is running');
});

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/credit', creditRouter);

export default app;
