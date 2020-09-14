const Clarifai = require('clarifai');

const API_KEY = 'c1ce31734c96424f8087b7ca55fe961f';
const app = new Clarifai.App({
  apiKey: API_KEY
});
const imageHandlerUrl = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then( response => res.json(response))
    .catch( err => res.status(400).json("could not work with API"))
}

const imageHandler = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1).returning('entries')
  .then(entries => {
    if (entries.length > 0){
      res.json(entries[0])
    } else {
      res.json('not found')
    }
  })
  .catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
  imageHandler,
  imageHandlerUrl
};