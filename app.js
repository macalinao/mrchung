const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(`${__dirname}/public`));

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
