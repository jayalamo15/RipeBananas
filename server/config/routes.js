const movies = require('../controllers/movies');

module.exports = (app) => {
    app.get('/movies', (req,res) => movies.index(req,res));
    app.get('/movies/:id', (req,res) => movies.show_movie(req,res));
    app.post('/movies/new', (req,res) => movies.new_movie(req,res));
    app.post('/movies/review/:id', (req,res) => movies.new_review(req,res));
    app.delete('/movies/destroy/:id', (req,res) => movies.remove_movie(req,res));
}