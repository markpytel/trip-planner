var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/trip-planner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


/*--------- Place Schema ----------*/

var placeSchema = new mongoose.Schema({
  address:     {type: String, required: true},
  city:        {type: String, required: true},
  state:       {type: String, required: true},
  // string
  phone:       {type: String},
  // lat, lon number array
  location:    {type: [Number]}
});


/*--------- Activity Schema ----------*/

var activitySchema = new mongoose.Schema({
  name:        {type: String, required: true},
  place:       [placeSchema],
  age_range:   {type: String},
});


/*--------- Hotel Schema ----------*/

var hotelSchema = new mongoose.Schema({
  name:        {type: String, required: true},
  place:       [placeSchema],
  // integer from 1-5
  num_stars:   {type: Number, min: 1, max: 5},
  // comma delimited string list
  amenities:   {type: String}
});


/*--------- Restaurant Schema ----------*/

var restaurantSchema = new mongoose.Schema({
  name:        {type: String, required: true},
  place:       [placeSchema],
  cuisine:     {type: String, required: true},
  // integer from 1-5
  price:       {type: Number, min: 1, max: 5},
});


/*----------- Models --------------*/

var Place = mongoose.model('Place', placeSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);


module.exports = {
  Place: Place,
  Activity: Activity,
  Hotel: Hotel,
  Restaurant: Restaurant
};



