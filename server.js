const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
const userRoute = require('./routes/userRoute');
const portfinder = require('portfinder');


dotenv.config();


connectDb();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/users', require('./routes/userRoute'));

//transaction routes
app.use('/api/v1/transactions',require('./routes/transactionRoutes'));

//admin route
app.use('/api/v1/admin',require('./routes/admin-route'));



// Use portfinder to get an available port
portfinder.basePort = process.env.PORT || 8080;
portfinder.getPort((err, port) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    // Start the server on the found port
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});