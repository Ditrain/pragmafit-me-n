var express = require('express');
var router = express.Router();

// Require controller modules
var exerciseController = require('../controllers/exerciseController');
var equipmentController = require('../controllers/equipmentController');
var muscleGroupController = require('../controllers/muscleGroupController');
var movementAngleController = require('../controllers/movementAngleController');

/// EXERCISE ROUTES //

/* GET workout home page. */
// router.get('/', workout_controller.index);

/* GET request for creating a Exercise. NOTE This must come before routes that display Exercise (uses id) */
router.get('/exercise/create', exerciseController.exerciseCreateGet);

/* POST request for creating Exercise. */
router.post('/exercise/create', exerciseController.exerciseCreatePost);

/* GET request to delete Exercise. */
router.get('/exercise/:id/delete', exerciseController.exerciseDeleteGet);

// POST request to delete Exercise
router.post('/exercise/:id/delete', exerciseController.exerciseDeletePost);

/* GET request to update Exercise. */
router.get('/exercise/:id/update', exerciseController.exerciseUpdateGet);

// POST request to update Exercise
router.post('/exercise/:id/update', exerciseController.exerciseUpdatePost);

/* GET request for one Exercise. */
router.get('/exercise/:id', exerciseController.exerciseDetail);

/* GET request for list of all Exercise items. */
router.get('/exercises', exerciseController.exerciseList);

/// EQUIPMENT ROUTES ///

/* GET request for creating Equipment. NOTE This must come before route for id (i.e. display equipment) */
router.get('/equipment/create', equipmentController.equipmentCreateGet);

/* POST request for creating Equipment. */
router.post('/equipment/create', equipmentController.equipmentCreatePost);

/* GET request to delete Equipment. */
router.get('/equipment/:id/delete', equipmentController.equipmentDeleteGet);

// POST request to delete Equipment
router.post('/equipment/:id/delete', equipmentController.equipmentDeletePost);

/* GET request to update Equipment. */
router.get('/equipment/:id/update', equipmentController.equipmentUpdateGet);

// POST request to update Equipment
router.post('/equipment/:id/update', equipmentController.equipmentUpdatePost);

/* GET request for one Equipment. */
router.get('/equipment/:id', equipmentController.equipmentDetail);

/* GET request for list of all Equipments. */
router.get('/equipment', equipmentController.equipmentList);

/// MUSCLE GROUP ROUTES ///

/* GET request for creating a MuscleGroup. NOTE This must come before route that displays MuscleGroup (uses id) */
router.get('/muscle-group/create', muscleGroupController.muscleGroupCreateGet);

/* POST request for creating MuscleGroup. */
router.post('/muscle-group/create', muscleGroupController.muscleGroupCreatePost);

/* GET request to delete MuscleGroup. */
router.get('/muscle-group/:id/delete', muscleGroupController.muscleGroupDeleteGet);

// POST request to delete MuscleGroup
router.post('/muscle-group/:id/delete', muscleGroupController.muscleGroupDeletePost);

/* GET request to update MuscleGroup. */
router.get('/muscle-group/:id/update', muscleGroupController.muscleGroupUpdateGet);

// POST request to update MuscleGroup
router.post('/muscle-group/:id/update', muscleGroupController.muscleGroupUpdatePost);

/* GET request for one MuscleGroup. */
router.get('/muscle-group/:id', muscleGroupController.muscleGroupDetail);

/* GET request for list of all MuscleGroup. */
router.get('/muscle-groups', muscleGroupController.muscleGroupList);

/// MOVEMENT ANGLE ROUTES ///

/* GET request for creating a MovementAngle. NOTE This must come before route that displays MovementAngle (uses id) */
router.get('/movement-angle/create', movementAngleController.movementAngleCreateGet);

/* POST request for creating MovementAngle. */
router.post('/movement-angle/create', movementAngleController.movementAngleCreatePost);

/* GET request to delete MovementAngle. */
router.get('/movement-angle/:id/delete', movementAngleController.movementAngleDeleteGet);

// POST request to delete MovementAngle
router.post('/movement-angle/:id/delete', movementAngleController.movementAngleDeletePost);

/* GET request to update MovementAngle. */
router.get('/movement-angle/:id/update', movementAngleController.movementAngleUpdateGet);

// POST request to update MovementAngle
router.post('/movement-angle/:id/update', movementAngleController.movementAngleUpdatePost);

/* GET request for one MovementAngle. */
router.get('/movement-angle/:id', movementAngleController.movementAngleDetail);

/* GET request for list of all MovementAngle. */
router.get('/movement-angles', movementAngleController.movementAngleList);

module.exports = router;