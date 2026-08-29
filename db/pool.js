const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
  connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}`
});

// const pool = new Pool({
//   host: process.env.HOST,
//   database: process.env.PGDATABASE,
//   username: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   port: 5432,
// //   ssl: {
// //     require: true,
// //   },
// });

// module.exports = { pool };
