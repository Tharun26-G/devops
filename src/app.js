import express from 'express';
import logger from '#config/logger.js';
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { timestamp } from 'drizzle-orm/gel-core';
import authRoutes from '#routes/auth.routes.js';
import securityMiddleware from '#middleware/security.middleware.js'

const app = express();


app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: {write: (message) => logger.info(message.trim())}}));

app.use(securityMiddleware);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  logger.info('Hello from logger');
  res.status(200).send('Hello World');
});

app.get('/health', (req, res) => {
  res
    .status(200)
    .json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
});

app.get('/api',(req,res)=>{
    res.status(200).json({message:'Devops API is running'});
})

app.use('/api/auth',authRoutes);

export default app;
