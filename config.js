var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pana_todo';

module.exports = connectionString;
