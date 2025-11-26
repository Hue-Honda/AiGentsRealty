import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';

// Routes
import chatRoutes from './routes/chat.js';
import areasRoutes from './routes/areas.js';
import projectsRoutes from './routes/projects.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:3000';

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.API_RATE_WINDOW) || 15) * 60 * 1000,
  max: parseInt(process.env.API_RATE_LIMIT) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// ============================================================================
// ROUTES
// ============================================================================

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'AiGentsRealty API',
    version: '2.0.0',
    status: 'running',
    message: 'Welcome to AiGentsRealty Off-Plan Projects API',
    endpoints: {
      health: '/health',
      api: '/api',
      areas: '/api/areas',
      projects: '/api/projects',
      chat: '/api/chat'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API Info
app.get('/api', (req, res) => {
  res.json({
    name: 'AiGentsRealty API',
    version: '2.0.0',
    description: 'AI-Powered Dubai Real Estate Discovery Platform',
    endpoints: {
      areas: '/api/areas',
      projects: '/api/projects',
      suggestions: '/api/projects/suggestions',
      featured: '/api/projects/featured',
      chat: '/api/chat'
    }
  });
});

// Use routes
app.use('/api/chat', chatRoutes);
app.use('/api/areas', areasRoutes);
app.use('/api/projects', projectsRoutes);

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: err.name || 'Error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log('');
  console.log('🚀 AiGentsRealty Off-Plan API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🌐 Frontend: ${FRONTEND_URL}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🤖 AI Model: OpenAI GPT-4o-mini`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  process.exit(0);
});
