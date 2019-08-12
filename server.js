const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http')
const rp = require('request-promise')
const PORT = process.env.PORT || 5000;

const app_id = "6edf648a"; // insert your APP Id
const app_key = "214b1cb9e2430304f013a45bfdbc5ce9"; // insert your APP Key
let wordId = "";
const fields = "pronunciations";
const strictMatch = "false";


//Database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/dictionary'

//Middleware
app.use(express.json());
app.use(express.static('public'));

app.post('/',(req, res) => {
  wordId = req.body.wordId
})

//Oxford API request


app.get('/words', (req, res) => {
  const requestOptions = {
    host: 'od-api.oxforddictionaries.com',
    port: '443',
    path: '/api/v2/entries/en-us/' + "ace" + '?fields=' + fields + '&strictMatch=' + strictMatch,
    method: "GET",
    headers: {
      'app_id': app_id,
      'app_key': app_key
    }
  };
  rp(requestOptions).then(response => {
    // console.log('API call response:', response);
    res.json({response:response})
  }).catch((err) => {
    console.log('API call error:', err.message);
    res.json({err:err})
  });
});


app.listen(PORT, () => {
  console.log(`At your command, Captain. Listening on port: ${PORT}`);
})


mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('All systems go!');
})
