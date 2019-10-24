require('../models/movie');
const mongoose = require('mongoose');
    Movie = mongoose.model('Movie');
    Review = mongoose.model('Review');

module.exports = {
    index: (req,res) => {
        Movie.find()
            .then(movies => {
                res.json({results: movies});
            })
            .catch(err => {
                res.json({errors: err.errors});
            })
    },
    show_movie: (req,res) => {
        Movie.findOne({_id: req.params.id})
            .then(movie => {
                res.json({results: movie})
            })
            .catch(err => {
                res.json({errors: err.errors});
            })
    },
    new_movie: (req,res) => {
        Movie.create(req.body)
            .then(movie => {
                res.json({results: movie});
            })
            .catch(err => {
                res.json({errors: err.errors});
            })
    },
    new_review: (req,res) => {
        console.log(req.body);
        console.log(req.params.id);
        Review.create(req.body)
            .then(review => {
                console.log(review);
                Movie.findOneAndUpdate({_id:req.params.id}, {$push:{reviews:review}}, {useFindAndModify: false})
                    .then(result => {
                        console.log(result);
                        req.json({results: result})
                    })
                    .catch(err => {
                        res.json({errors: err.errors});
                    })
            })
            .catch(err => {
                res.json({errors: err.errors});
            })
    },
    remove_movie: (req,res) => {
        Movie.deleteOne({_id: req.params.id})
            .then(result => {
                res.json({results: result});
            })
            .catch(err => {
                res.json({errors: err.errors});
            })
    }
}