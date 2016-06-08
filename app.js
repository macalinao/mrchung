const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Schema } = mongoose;
app.use(bodyParser.urlencoded({extended: true});

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
  compatibility: [String],
  image: String
});

const Antibody = mongoose.model('antibody', AntibodySchema);

app.get('/antibodies', (req, res) => {
  Antibody.find({}).then((antibodies) => {
    res.json(antibodies.map(a => a.toJSON()));
  });
});
        

AntibodySchema.plugin(dataTables, {
  totalKey: 'recordsTotal',
  dataKey: 'data'
});

app.post('/antibodies', (req, res) => {
  const antibody = new Antibody(req.body);
  antibody.save().then((doc) => {
    res.json(doc.toJSON());
  });
});

        app.post('/antibodies', function (req, res) {
            var Model = require('mongoose'),
                datatablesQuery = require('datatables-query'),
                params = req.body,
                query = datatablesQuery(Model);
            
            query.run(params).then(function (data) {
                res.json(data);
            }, function (err) {
                res.status(500).json(err);
            });
        };

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
