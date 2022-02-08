module.exports = {
  app: {
    port: process.env.PORT,
    frontend: process.env.FRONTEND_URL,
  },
  database: {
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    connectionString: process.env.DATABASE_CONNECTION_STRING,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  email: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM_ADDRESS,
  },
  jsonwebtoken: {
    secret: process.env.JWT_SECRET,
  },
  authorization: [
    {
      role: 'admin',
      abilities: ['*'],
    },
    {
      role: 'user',
      abilities: [],
    },
  ]
}
