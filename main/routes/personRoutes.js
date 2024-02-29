// routes/personRoutes.js
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personControllers');

router.get('/', personController.getAllPersons);
router.post('/createPerson', personController.createPerson);
router.post('/generateRandomUsers', personController.generateRandomUsers);
router.delete('/deletePerson/:id', personController.deletePersonById);
router.put('/updatePerson/:id', personController.updatePersonById);


module.exports = router;
