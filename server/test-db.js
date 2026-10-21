require('dotenv').config();
const { Client } = require('pg');

const client = new Client({ connectionString: process.env.DIRECT_URL });
client
  .connect()
  .then(() => client.query('SELECT 1'))
  .then(() => {
    console.log('OK: connected');
    return client.end();
  })
  .catch((e) => console.error('FAILED:', e.code, e.message));
