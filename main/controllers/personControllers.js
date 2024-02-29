// controllers/personController.js
const Person = require('../models/person');

exports.getAllPersons = async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getPersonById = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.createPerson = async (req, res) => {
  const person = new Person({
    name: req.body.name,
    age: req.body.age,
    favoriteFoods: req.body.favoriteFoods
  });

  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.updatePersonById = async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(updatedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.deletePersonById = async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPersons = async (req, res) => {
  const persons = req.body; // Assuming req.body is an array of person objects

  try {
    const createdPersons = await Person.create(persons);
    res.status(201).json(createdPersons);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.generateRandomUsers = async (req, res) => {
  const numberOfUsers = req.body.numberOfUsers || 10; // Default to 10 users if not specified
  const randomUsers = [];

  // Generate random users
  for (let i = 0; i < numberOfUsers; i++) {
    const randomUser = {
      name: generateRandomName(),
      age: generateRandomAge(),
      favoriteFoods: generateRandomFoods()
    };
    randomUsers.push(randomUser);
  }

  try {
    // Insert random users into the database
    const createdUsers = await Person.create(randomUsers);
    res.status(201).json(createdUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Helper function to generate a random name
function generateRandomName() {
  // Generate a random string for the name (you can adjust this as needed)
  return Math.random().toString(36).substring(7);
}

// Helper function to generate a random age between 18 and 80
function generateRandomAge() {
  return Math.floor(Math.random() * (80 - 18 + 1)) + 18;
}

// Helper function to generate an array of random favorite foods
function generateRandomFoods() {
  const foods = ['Pizza', 'Burger', 'Pasta', 'Salad', 'Sushi', 'Tacos', 'Steak'];
  const numFoods = Math.floor(Math.random() * (foods.length - 1)) + 1; // Random number of favorite foods
  const randomFoods = [];
  for (let i = 0; i < numFoods; i++) {
    const randomIndex = Math.floor(Math.random() * foods.length);
    randomFoods.push(foods[randomIndex]);
  }
  return randomFoods;
}


