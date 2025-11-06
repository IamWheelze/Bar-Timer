import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import deadlineRoutes from './routes/deadlines';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/deadlines', deadlineRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'German Lawyer Deadline Management System API'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║   🚀 German Lawyer Deadline Management System - API Server        ║
║                                                                    ║
║   Server running on: http://localhost:${PORT}                        ║
║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
║   Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}        ║
║                                                                    ║
║   📊 Health Check: http://localhost:${PORT}/health                  ║
║   📝 API Docs: http://localhost:${PORT}/api                         ║
╚════════════════════════════════════════════════════════════════════╝
  `);
});

export default app;
