var mongoose = require('mongoose');

var grumbleSchema = new mongoose.Schema({
  username: String,
  text: String,
  annoyanceLevel: {num: Number, text: String},
  authenticated: Boolean,
  url: String,
  date: { text: String, num: Number, relative: String },
  comments: [{ username: String, text: String, authenticated: Boolean, date: {text: String, num: Number, relative: String} }]
});

module.exports = mongoose.model('Grumble', grumbleSchema);