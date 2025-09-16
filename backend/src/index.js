import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import adminRoutes from './admin/routes/adminRoutes.js';

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Middlewares
// Security headers
app.use(helmet());

// Logging
app.use(morgan('combined'));

// CORS and JSON parsing
app.use(cors());
app.use(express.json());


// Admin Routes
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
  res.send('🚀 Civic Issue Reporting API Running...');
});


// Start the server
export default app;