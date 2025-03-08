const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // If needed, install via npm install node-fetch@2
const path = require('path'); // Added for serving static files
const app = express();

// Use dynamic port or fallback to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Spoonacular API Key
const API_KEY = 'f3f0db0f74a246a4add47d334a2c2be2'; // Replace with your actual API key

// API Endpoint to Get Diet Plan
app.post('/get-diet-plan', async (req, res) => {
    const { experienceLevel, fitnessGoal, dietType, allergies, specifications } = req.body;

    // Set target calories based on experience and fitness goals
    let targetCalories = 2000;
    if (fitnessGoal === 'muscleGain') targetCalories = 2500;
    if (fitnessGoal === 'weightLoss') targetCalories = 1500;
    if (fitnessGoal === 'endurance') targetCalories = 2200;
    if (fitnessGoal === 'strength') targetCalories = 2300;

    // Construct API request
    const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${API_KEY}&timeFrame=week&targetCalories=${targetCalories}&diet=${dietType}&exclude=${allergies}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).send('Failed to fetch diet plan');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching diet plan:', error);
        res.status(500).send('Server error');
    }
});

// Serve the updated WorkoutData.json
app.get('/workouts', (req, res) => {
    res.sendFile(path.join(__dirname, 'WorkoutData.json'));
});

// Start Server with Dynamic Port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
