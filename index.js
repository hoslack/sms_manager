const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB_URI, { useCreateIndex: true,  useNewUrlParser: true  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


app.get('/', (req, res, next) => {
  res.status(200).send({
    message: "Hello World"
  })
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));
