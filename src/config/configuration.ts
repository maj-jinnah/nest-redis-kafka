export default () => ({
  port: process.env.PORT || 3000,
  dbURI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
});
