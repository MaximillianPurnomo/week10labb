const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');

const Actor = require('./models/actor');
const Movie = require('./models/movie');

const app = express();
let path = require('path');
app.use("/", express.static(path.join(__dirname, "dist/movieAng")))

app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false, useNewUrlParser: true}));

mongoose.connect('mongodb://localhost:27017/week8db', { useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false}, function(err){
    if(err){
        return console.log('Mongoose - connection error: ', err);
    }
    console.log('Connect successfully');
});

app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:id/:movid', actors.deleteMovie);

app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:yearBefore',movies.deleteMany);
app.delete('/movies/:id', movies.deleteOne);
app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:id/:actorid', movies.deleteActor);
app.get('/movies/:year1/:year2', movies.between);

app.put('/moviesIncrement', movies.increment);