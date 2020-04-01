try {
  require('dotenv').config();
} catch (err) {
  // Ignore missing dotenv in production.
}

/**
 * Bearer token required to authenticate requests to administration routes (e.g.
 * database seeding).
 */
exports.adminToken = process.env.NOVEM_ADMIN_TOKEN;

/**
 * Base API path (useful if deployed under a different path behind a reverse proxy).
 */
exports.basePath = process.env.NOVEM_BASE_PATH || '/';

/**
 * MongoDB connection URL.
 */
exports.databaseUrl = process.env.NOVEM_MONGODB_URI || process.env.MONGODB_URI || 'mongodb://localhost/novem';

/**
 * Port on which the application's HTTP server will listen to.
 */
exports.port = process.env.NOVEM_PORT || process.env.PORT || 3000;
