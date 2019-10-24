const mongoose = require('mongoose');
    path = require('path');
    fs = require('fs');

mongoose.connect('mongodb://localhost/squishytomatoes', {useNewUrlParser: true, useUnifiedTopology: true});

let models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js')>=0){
        require(models_path + '/' + file);
    }
});