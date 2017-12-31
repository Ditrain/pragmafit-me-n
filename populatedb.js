#! /usr/bin/env node

console.log('This script populates some test equipments, exercises, movementangles and movementangles to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Equipment = require('./models/equipment')
var Exercise = require('./models/exercise')
var MovementAngle = require('./models/movement_angle')
var MuscleGroup = require('./models/movementangle')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var exercises = []
var movementangles = []
var equipments = []
var movementangles = []

function exerciseCreate(name, muscle_group, movement_angle, 
  combo_exercise, difficulty, comments)
  exercisedetail = {name:name , muscle_group: muscle_group }  
  var exercise = new Exercise(exercisedetail);
       
  exercise.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Exercise: ' + exercise);
    exercises.push(exercise)
    cb(null, exercise)
  }  );
}

function movementangleCreate(angle) {
  var movementangle = new MovementAngle({ angle: angle });
       
  movementangle.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New MovementAngle: ' + movementangle);
    movementangles.push(movementangle)
    cb(null, movementangle);
  }   );
}

function equipmentCreate(title, summary, isbn, exercise, movementangle, cb) {
  equipmentdetail = { 
    title: title,
    summary: summary,
    exercise: exercise,
    isbn: isbn
  }
  if (movementangle != false) equipmentdetail.movementangle = movementangle
    
  var equipment = new Equipment(equipmentdetail);    
  equipment.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Equipment: ' + equipment);
    equipments.push(equipment)
    cb(null, equipment)
  }  );
}


function MovementAngleCreate(equipment, imprint, due_back, status, cb) {
  movementangledetail = { 
    equipment: equipment,
    imprint: imprint
  }    
  if (due_back != false) movementangledetail.due_back = due_back
  if (status != false) movementangledetail.status = status
    
  var movementangle = new MuscleGroup(movementangledetail);    
  movementangle.save(function (err) {
    if (err) {
      console.log('ERROR CREATING MuscleGroup: ' + movementangle);
      cb(err, null)
      return
    }
    console.log('New MuscleGroup: ' + movementangle);
    movementangles.push(movementangle)
    cb(null, equipment)
  }  );
}


function createMovementAngleExercises(cb) {
    async.parallel([
        function(callback) {
          exerciseCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
        },
        function(callback) {
          exerciseCreate('Ben', 'Bova', '1932-11-8', false, callback);
        },
        function(callback) {
          exerciseCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
        },
        function(callback) {
          exerciseCreate('Bob', 'Billings', false, false, callback);
        },
        function(callback) {
          exerciseCreate('Jim', 'Jones', '1971-12-16', false, callback);
        },
        function(callback) {
          movementangleCreate("Fantasy", callback);
        },
        function(callback) {
          movementangleCreate("Science Fiction", callback);
        },
        function(callback) {
          movementangleCreate("French Poetry", callback);
        },
        ],
        // optional callback
        cb);
}


function createEquipments(cb) {
    async.parallel([
        function(callback) {
          equipmentCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', exercises[0], [movementangles[0],], callback);
        },
        function(callback) {
          equipmentCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', exercises[0], [movementangles[0],], callback);
        },
        function(callback) {
          equipmentCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', exercises[0], [movementangles[0],], callback);
        },
        function(callback) {
          equipmentCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', exercises[1], [movementangles[1],], callback);
        },
        function(callback) {
          equipmentCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', exercises[1], [movementangles[1],], callback);
        },
        function(callback) {
          equipmentCreate('Test Equipment 1', 'Summary of test equipment 1', 'ISBN111111', exercises[4], [movementangles[0],movementangles[1]], callback);
        },
        function(callback) {
          equipmentCreate('Test Equipment 2', 'Summary of test equipment 2', 'ISBN222222', exercises[4], false, callback)
        }
        ],
        // optional callback
        cb);
}


function createMuscleGroups(cb) {
    async.parallel([
        function(callback) {
          MovementAngleCreate(equipments[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          MovementAngleCreate(equipments[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // optional callback
        cb);
}



async.series([
    createMovementAngle,
    createEquipments,
    createMuscleGroups
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+movementangles);
        
    }
    //All done, disconnect from database
    mongoose.connection.close();
});


{
  date: today;
  workoutType: 'Tabata';
  circuit: [
    {
    round: [
      {
        exercise: bench,
        equipment: barbell,
        set: [
          {reps: 21,weight: 135},
          {reps: 15,weight: 135},
          {reps: 9,weight: 135}
        ]
      },
      {
        exercise: sit-up,
        equipment: air,
        set: [
          {reps: 42,weight: 0},
          {reps: 30,weight: 0},
          {reps: 18,weight: 0}
        ]
      }
    ],
    time: "10:30",    
    circuitComments: "great round"
    }
  ];
  sessionComments: "awesome workout";
}