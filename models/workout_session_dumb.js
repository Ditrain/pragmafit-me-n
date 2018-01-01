const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var WorkoutSessionSchema = new Schema(
  {
    date: {type: Date, default: Date.now},
    workoutType: {type: String, max: 100, enum: 
        ['Tabata', 'Rounds in time', 'Drop Reps', 'Max Strength',
         'Number Goal','Five Minute Fun Time', 'Five Rounds', 'Basic'], default: 'Basic'},
    exercise: [{type: String, required: true}],
    equipment: [{type: String, required: true}],
    reps: [{type: Number, min: 0, max: 100}],
    weight: [{type: Number, min: 0, max: 1000 }],
    time: {type: Number,  max: 250},    
    comments: {type: String,  max: 250},    
    exercise2: {type: String},
    equipment2: {type: String},
    reps2: [{type: Number, min: 0, max: 100}],
    weight2: [{type: Number, min: 0, max: 1000 }],
    time2: {type: Number,  max: 250},    
    comments2: {type: String,  max: 250},
    exercise3: {type: String},
    equipment3: {type: String},
    reps3: [{type: Number, min: 0, max: 100}],
    weight3: [{type: Number, min: 0, max: 1000 }],
    time3: {type: Number,  max: 250},    
    comments3: {type: String,  max: 250}
  }
);

// Virtual for session's URL
WorkoutSessionSchema
.virtual('url')
.get(function () {
  return '/workout/workout-session/' + this._id;
});

//Export model
module.exports = mongoose.model('WorkoutSession', WorkoutSessionSchema);