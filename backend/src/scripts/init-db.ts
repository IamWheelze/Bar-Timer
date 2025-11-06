import fs from 'fs';
import path from 'path';
import pool from '../db/connection';
import dotenv from 'dotenv';

dotenv.config();

async function initDatabase() {
  console.log('🔧 Initializing database...');

  try {
    // Read schema SQL file
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    // Execute schema
    await pool.query(schemaSql);

    console.log('✅ Database schema created successfully!');
    console.log('✅ Database initialized successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Start the backend: npm run dev');
    console.log('   2. Start the frontend: cd ../frontend && npm start');
    console.log('   3. Open http://localhost:3000');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initDatabase();
