require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/userRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use('/users', usersRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
