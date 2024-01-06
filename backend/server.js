const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const port = 3000;
app.use(bodyParser.json());
app.use(cors())




// Connect to MongoDB
mongoose.connect('mongodb+srv://pulkit:123@cluster0.xofh23l.mongodb.net/new?retryWrites=true').then(console.log("database connected"));



app.use('/auth', authRoutes);

app.use('/products', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
