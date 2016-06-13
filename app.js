const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.connect(MONGODB_URI);

const app = express();
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

const AntibodySchema = new Schema({
  target: String,
  catalogNumber: String,
  hostSpecies: String,
  reactivity: [String],
  clarity: String,
  switch: String,
  map: String,
  vendorWebsite: String,
  publication: String,
  image: String
});

const Antibody = mongoose.model('antibody', AntibodySchema);

app.get('/antibodies', (req, res) => {
  Antibody.find({}).then((antibodies) => {
    res.json(antibodies.map(a => a.toJSON()));
  }).catch((err) => res.json({ error: err }));
});

app.get('/antibodies/:id', (req, res) => {
  Antibody.findOne({ _id: req.params.id }).then((antibody) => {
    res.json(antibody.toJSON());
  }).catch((err) => res.json({ error: err }));
});

app.post('/antibodies', (req, res) => {
  const antibody = new Antibody(req.body);
  antibody.save().then((doc) => {
    res.json(doc.toJSON());
  }).catch((err) => res.json({ error: err }));
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
