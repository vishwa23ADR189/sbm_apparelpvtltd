require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://vishwanov17:HWVxDR0zX33pnJbN@cluster1.po36l1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey'
};
