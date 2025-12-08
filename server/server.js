import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import stripeWebhook from './controllers/webhooks.js';

const app = express();

// Connect to database (don't use top-level await for Vercel)
connectDB().catch(err => console.error('Database connection failed:', err));

app.post('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use('/api/credit', creditRouter);

const PORT = process.env.PORT || 3000;

// Only listen if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;