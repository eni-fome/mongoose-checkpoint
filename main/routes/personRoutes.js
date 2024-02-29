// routes/personRoutes.js
const express = require('express');
const router = express.Router();
const personController = require('../controllers/personControllers');

router.get('/', personController.getAllPersons);
router.post('/createMany', personController.createPersons);
router.post('/generateRandomUsers', personController.generateRandomUsers);

module.exports = router;
