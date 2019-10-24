const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "You must provide a review!"],
        min: [3, "Review must be at least 3 characters"],
        max: [140, "Review must be less than 140 characters"],
    },
    rating: {
        type: Number,
        required: [true, "Must enter a rating!"],
        min: [1, "Rating must be at least 1 star!"],
        max: [5, "Rating can be no more than 5 stars"]
    },
    name: {
        type: String,
        required: [true, "You must provide a name!"],
        minlength: [3, "Name must be at least 3 characters long"]
    }
}, {timestamps: true});

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Must enter a Movie Title!"],
        minlength: [3, "Movie Title must have at least 3 characters"]
    },
    reviews: [ReviewSchema]
}, {timestamps: true});

mongoose.model('Movie', MovieSchema);
mongoose.model('Review', ReviewSchema);