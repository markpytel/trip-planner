var express = require('express');
var router = express.Router();
var models = require('../models');
var Promise = require('bluebird');
var Activity = models.Activity;
var Hotel = models.Hotel;
var Place = models.Place;
var Restaurant = models.Restaurant;

/* GET home page. */
// retrieve all the hotels, restaurants, and things to do from the database and subsequently render the index.html page with that data
router.get('/', function(req, res, next) {
    var activityPromise = Activity.find().exec();
    var hotelPromise = Hotel.find().exec();
    var restaurantPromise = Restaurant.find().exec();
    
    Promise.join(activityPromise, hotelPromise, restaurantPromise, function(activities, hotels, restaurants) {
        res.render('index', {activities: activities, hotels: hotels, restaurants: restaurants});
    });
});






module.exports = router;
