var mongoose = require('mongoose');

var grumbleSchema = new mongoose.Schema({
  username: String,
  imgLink: String,
  text: String,
  annoyanceLevel: {num: Number, text: String},
  authenticated: Boolean,
  url: String,
  date: { text: String, num: Number, relative: String },
  likes: [String],
  comments: [{ username: String, 
  				text: String, 
  				authenticated: Boolean, 
  				date: {
  					text: String, 
  					num: Number, 
  					relative: String
  				}, 
  				imgLink: String }]
});

module.exports = mongoose.model('Grumble', grumbleSchema);