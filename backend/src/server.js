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
import migrationsRoutes from './routes/migrations.js';

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

// CORS configuration - allow multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://ai-gents-realty.vercel.app',
  'https://aigentsrealty.vercel.app',
  process.env.CORS_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

// Database connection test
app.get('/db-test', async (req, res) => {
  try {
    const { query } = await import('./config/database.js');
    const result = await query('SELECT NOW() as current_time, version() as db_version');
    res.json({
      success: true,
      database_connected: true,
      current_time: result.rows[0].current_time,
      db_version: result.rows[0].db_version,
      has_database_url: !!process.env.DATABASE_URL,
      database_url_prefix: process.env.DATABASE_URL?.substring(0, 30) + '...'
    });
  } catch (error) {
    res.json({
      success: false,
      database_connected: false,
      error: error.message,
      has_database_url: !!process.env.DATABASE_URL,
      database_url_prefix: process.env.DATABASE_URL?.substring(0, 30) + '...'
    });
  }
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

// Create leads table migration endpoint (run once)
app.get('/migrate-leads', async (req, res) => {
  try {
    const { query } = await import('./config/database.js');

    // Create leads table
    await query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255),
        budget VARCHAR(100),
        interested_project VARCHAR(255),
        preferred_area VARCHAR(255),
        bedrooms VARCHAR(50),
        timeline VARCHAR(100),
        investment_purpose VARCHAR(50),
        notes TEXT,
        source VARCHAR(50) DEFAULT 'genie_chat',
        status VARCHAR(50) DEFAULT 'new',
        conversation_summary TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Create indexes
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);`);

    // Verify table
    const result = await query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'leads'
      ORDER BY ordinal_position;
    `);

    res.json({
      success: true,
      message: 'Leads table created successfully',
      columns: result.rows
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
});

// Use routes
app.use('/api/chat', chatRoutes);
app.use('/api/areas', areasRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/migrations', migrationsRoutes);

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
