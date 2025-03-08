document.getElementById('generateWorkout').addEventListener('click', async () => {
    const gender = document.getElementById('gender').value;
    const experienceLevel = document.getElementById('experienceLevel').value;
    const fitnessGoal = document.getElementById('fitnessGoal').value;

    const workoutPlan = createWorkoutPlan(fitnessGoal, gender, experienceLevel);
    displayWorkoutPlan(workoutPlan);
});

// Workout plans for all goals, genders, and experience levels
const goalWorkouts = {
    muscleGain: {
        male: {
            beginner: ['Bodyweight Squats', 'Push-Ups', 'Lunges', 'Plank', 'Rows', 'Pull-Ups', 'Overhead Press'],
            intermediate: ['Barbell Squat', 'Deadlift', 'Chest Press', 'Leg Press', 'Dumbbell Curls', 'Pull-Ups', 'Tricep Dips'],
            advanced: ['Barbell Squat', 'Deadlift', 'Barbell Bench Press', 'Overhead Press', 'Pull-Ups', 'Rows', 'Weighted Lunges']
        },
        female: {
            beginner: ['Leg Press', 'Step-Ups', 'Glute Bridges', 'Push-Ups', 'Bodyweight Squats', 'Plank', 'Rows'],
            intermediate: ['Leg Press', 'Deadlift', 'Chest Press', 'Overhead Press', 'Pull-Ups', 'Dumbbell Rows', 'Step-Ups'],
            advanced: ['Barbell Squat', 'Deadlift', 'Incline Bench Press', 'Leg Press', 'Pull-Ups', 'Rows', 'Kettlebell Swings']
        }
    },
    weightLoss: {
        male: {
            beginner: ['Walking', 'Cycling', 'Jump Rope', 'Yoga', 'Plank', 'Bodyweight Squats', 'Push-Ups'],
            intermediate: ['Running', 'Cycling', 'Swimming', 'HIIT', 'Jump Rope', 'Burpees', 'Mountain Climbers'],
            advanced: ['Running', 'Cycling', 'Jump Rope', 'Swimming', 'HIIT', 'Tabata', 'Sprints']
        },
        female: {
            beginner: ['Walking', 'Cycling', 'Yoga', 'Stretching', 'Plank', 'Bodyweight Squats', 'Push-Ups'],
            intermediate: ['Walking', 'Cycling', 'HIIT', 'Jump Rope', 'Swimming', 'Dance Fitness', 'Plyometrics'],
            advanced: ['Running', 'Cycling', 'HIIT', 'Jump Rope', 'Swimming', 'Kickboxing', 'Stair Climbing']
        }
    },
    maintenance: {
        male: {
            beginner: ['Walking', 'Cycling', 'Yoga', 'Bodyweight Squats', 'Push-Ups', 'Lunges', 'Plank'],
            intermediate: ['Jogging', 'Cycling', 'Push-Ups', 'Plank', 'Lunges', 'Bodyweight Squats', 'Yoga'],
            advanced: ['Running', 'Cycling', 'Push-Ups', 'Bodyweight Squats', 'Plank', 'Lunges', 'Resistance Bands']
        },
        female: {
            beginner: ['Walking', 'Cycling', 'Yoga', 'Bodyweight Squats', 'Push-Ups', 'Plank', 'Leg Press'],
            intermediate: ['Brisk Walking', 'Cycling', 'Pilates', 'Bodyweight Squats', 'Push-Ups', 'Plank', 'Step-Ups'],
            advanced: ['Running', 'Cycling', 'Resistance Bands', 'Bodyweight Squats', 'Plank', 'Leg Press', 'Kettlebell Workouts']
        }
    },
    endurance: {
        male: {
            beginner: ['Walking', 'Cycling', 'Swimming', 'Yoga', 'Plank', 'Bodyweight Squats', 'Push-Ups'],
            intermediate: ['Running', 'Cycling', 'Swimming', 'Rowing', 'HIIT', 'Circuit Training', 'Jump Rope'],
            advanced: ['Running', 'Cycling', 'Swimming', 'Rowing', 'HIIT', 'Obstacle Courses', 'Tabata']
        },
        female: {
            beginner: ['Walking', 'Cycling', 'Swimming', 'Yoga', 'Plank', 'Bodyweight Squats', 'Push-Ups'],
            intermediate: ['Running', 'Cycling', 'Swimming', 'HIIT', 'Rowing', 'Tabata', 'Circuit Training'],
            advanced: ['Trail Running', 'Cycling', 'Swimming', 'HIIT', 'Rowing', 'CrossFit', 'Sprints']
        }
    },
    flexibility: {
        male: {
            beginner: ['Yoga', 'Stretching', 'Pilates', 'Foam Rolling', 'Hip Flexor Stretch', 'Plank', 'Bodyweight Squats'],
            intermediate: ['Yoga', 'Pilates', 'Dynamic Stretching', 'Foam Rolling', 'Hip Flexor Stretch', 'Plank', 'Lunges'],
            advanced: ['Yoga', 'Pilates', 'Advanced Stretching', 'Foam Rolling', 'Hip Flexor Stretch', 'Plank', 'Mobility Drills']
        },
        female: {
            beginner: ['Yoga', 'Stretching', 'Pilates', 'Foam Rolling', 'Hip Flexor Stretch', 'Plank', 'Bodyweight Squats'],
            intermediate: ['Yoga', 'Pilates', 'Dynamic Stretching', 'Foam Rolling', 'Hip Flexor Stretch', 'Plank', 'Leg Press'],
            advanced: ['Yoga', 'Pilates', 'Advanced Stretching', 'Foam Rolling', 'Hip Flexor Stretch', 'Plank', 'Resistance Band Mobility']
        }
    },
    cardio: {
        male: {
            beginner: ['Walking', 'Cycling', 'Jump Rope', 'Swimming', 'Rowing', 'Bodyweight Squats', 'Plank'],
            intermediate: ['Running', 'Cycling', 'HIIT', 'Jump Rope', 'Rowing', 'Sprints', 'Mountain Climbers'],
            advanced: ['Running', 'Cycling', 'HIIT', 'Rowing', 'Swimming', 'Jump Rope', 'Burpees']
        },
        female: {
            beginner: ['Walking', 'Cycling', 'Yoga', 'Dancing', 'Jump Rope', 'Swimming', 'Bodyweight Squats'],
            intermediate: ['Running', 'Cycling', 'HIIT', 'Swimming', 'Rowing', 'Dance Fitness', 'Mountain Climbers'],
            advanced: ['Trail Running', 'Cycling', 'HIIT', 'Rowing', 'Jump Rope', 'Swimming', 'Kickboxing']
        }
    },
    strength: {
        male: {
            beginner: ['Bodyweight Squats', 'Push-Ups', 'Lunges', 'Plank', 'Rows', 'Dumbbell Curls', 'Bench Press'],
            intermediate: ['Barbell Squat', 'Deadlift', 'Chest Press', 'Pull-Ups', 'Leg Press', 'Tricep Dips', 'Rows'],
            advanced: ['Barbell Squat', 'Deadlift', 'Incline Bench Press', 'Weighted Pull-Ups', 'Overhead Press', 'Rows', 'Kettlebell Swings']
        },
        female: {
            beginner: ['Leg Press', 'Step-Ups', 'Glute Bridges', 'Push-Ups', 'Bodyweight Squats', 'Plank', 'Rows'],
            intermediate: ['Deadlift', 'Leg Press', 'Chest Press', 'Overhead Press', 'Dumbbell Rows', 'Step-Ups', 'Pull-Ups'],
            advanced: ['Barbell Squat', 'Deadlift', 'Bench Press', 'Kettlebell Swings', 'Pull-Ups', 'Rows', 'Overhead Press']
        }
    }
};

// Days of the week
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Sample workout data
const workoutData = [
    { name: 'Advanced Stretching', link: 'https://www.youtube.com/watch?v=7VbBPXlPj4A' },
    { name: 'Barbell Bench Press', link: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
    { name: 'Barbell Squat', link: 'https://www.youtube.com/watch?v=Dy28eq2PjcM' },
    { name: 'Bench Press', link: 'https://www.youtube.com/watch?v=vthMCtgVtFw' },
    { name: 'Bodyweight Squats', link: 'https://www.youtube.com/watch?v=C_VtOYc6j5c' },
    { name: 'Brisk Walking', link: 'https://www.healthline.com/nutrition/benefits-of-walking' },
    { name: 'Burpees', link: 'https://www.youtube.com/watch?v=TU8QYVW0gDU' },
    { name: 'Cardio', link: 'https://www.medicalnewstoday.com/articles/326745' },
    { name: 'Chest Press', link: 'https://www.youtube.com/watch?v=fJTTGvP5p9o' },
    { name: 'Circuit Training', link: 'https://www.verywellfit.com/circuit-training-workouts-1230771' },
    { name: 'CrossFit', link: 'https://www.youtube.com/watch?v=mlVrkiCoKkg' },
    { name: 'Cycling', link: 'https://www.cyclingweekly.com/fitness/cycling-for-beginners-7-tips-215949' },
    { name: 'Dance Fitness', link: 'https://www.youtube.com/watch?v=gCzgc_RelBA' },
    { name: 'Deadlift', link: 'https://www.youtube.com/watch?v=r4MzxtBKyNE' },
    { name: 'Dancing', link: 'https://www.youtube.com/watch?v=gCzgc_RelBA' }, // Same as Dance Fitness
    { name: 'Dumbbell Curls', link: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
    { name: 'Dynamic Stretching', link: 'https://www.youtube.com/watch?v=IFJf6aJ99_A' },
    { name: 'Foam Rolling', link: 'https://www.youtube.com/watch?v=UwBW8otP9lw' },
    { name: 'Glute Bridges', link: 'https://www.youtube.com/watch?v=wPM8icPu6H8' },
    { name: 'HIIT', link: 'https://www.youtube.com/watch?v=ml6cT4AZdqI' },
    { name: 'Incline Bench Press', link: 'https://www.youtube.com/watch?v=DbFgADa2PL8' },
    { name: 'Jogging', link: 'https://www.healthline.com/nutrition/jogging-benefits' },
    { name: 'Kettlebell Swings', link: 'https://www.youtube.com/watch?v=8zGaGl9UUnw' },
    { name: 'Leg Press', link: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },
    { name: 'Lunges', link: 'https://www.youtube.com/watch?v=COKYKgQ8KR0' },
    { name: 'Mountain Climbers', link: 'https://www.youtube.com/watch?v=nmwgirgXLYM' },
    { name: 'Overhead Press', link: 'https://www.youtube.com/watch?v=F3QY5vMz_6I' },
    { name: 'Plank', link: 'https://www.youtube.com/watch?v=B296mZDhrP4' },
    { name: 'Pull-Ups', link: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
    { name: 'Push-Ups', link: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
    { name: 'Resistance Bands', link: 'https://www.youtube.com/watch?v=ce_ynQwVwx8' },
    { name: 'Rowing', link: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
    { name: 'Running', link: 'https://www.youtube.com/watch?v=9mG7K2dFZf4' },
    { name: 'Stretching', link: 'https://www.youtube.com/watch?v=7VbBPXlPj4A' },
    { name: 'Swimming', link: 'https://www.youtube.com/watch?v=kj5cocX9NSI' },
    { name: 'Tabata', link: 'https://www.youtube.com/watch?v=nmwgirgXLYM' }, // Same as Mountain Climbers
    { name: 'Yoga', link: 'https://www.youtube.com/watch?v=v7AYKMP6rOE' },
    { name: 'Rock Climbing', link: 'https://www.youtube.com/watch?v=SkI39Y3L-Qc' },
    { name: 'Sprints', link: 'https://www.youtube.com/watch?v=T8Ao2px3EK4' },
    { name: 'Stair Climbing', link: 'https://www.youtube.com/watch?v=pbNUSBO5vX0' },
    { name: 'Step-Ups', link: 'https://www.youtube.com/watch?v=JhlCINKcnbs' },
    { name: 'Tricep Dips', link: 'https://www.youtube.com/watch?v=tKjcgfu44sI' },
    { name: 'Walking', link: 'https://www.healthline.com/nutrition/benefits-of-walking' },
    { name: 'Weighted Lunges', link: 'https://www.youtube.com/watch?v=9e5t1syjDXk' },
    { name: 'Weighted Pull-Ups', link: 'https://www.youtube.com/watch?v=0-IWLK0loU8' },
    { name: 'Dumbbell Rows', link: 'https://www.youtube.com/watch?v=BP2ZXxA3EzA' },
    { name: 'Hip Flexor Stretch', link: 'https://www.youtube.com/watch?v=g6xXJ3CyoPc' },
    { name: 'Kickboxing', link: 'https://www.youtube.com/watch?v=5pEXrjJwT18' },
    { name: 'Mobility Drills', link: 'https://www.youtube.com/watch?v=R_s0EPd6PrM' },
    { name: 'Obstacle Courses', link: 'https://www.youtube.com/watch?v=IM9iT9eYvBc' },
    { name: 'Pilates', link: 'https://www.youtube.com/watch?v=lCg_gh_fppI' },
    { name: 'Plyometrics', link: 'https://www.youtube.com/watch?v=8eQ2mF--4z4' },
    { name: 'Resistance Band Mobility', link: 'https://www.youtube.com/watch?v=oQ6JyoA7CQ4' },
    { name: 'Rows', link: 'https://www.youtube.com/watch?v=GZbfZ033f74' }
];


// Function to generate workout descriptions
function getWorkoutDescription(workout) {
    const descriptions = {
        'Advanced Stretching': 'Enhances flexibility and range of motion through deep stretching techniques.',
        'Barbell Bench Press': 'Targets the chest, triceps, and shoulders using a barbell.',
        'Barbell Squat': 'Targets the quads, hamstrings, glutes, and lower back.',
        'Bench Press': 'Strengthens the chest, shoulders, and triceps.',
        'Bodyweight Squats': 'Tones the legs and glutes using bodyweight for resistance.',
        'Brisk Walking': 'A moderate-intensity cardio exercise to improve endurance and burn calories.',
        'Burpees': 'Full-body exercise that builds strength and boosts cardiovascular fitness.',
        'Cardio': 'Any exercise that increases heart rate and improves cardiovascular health.',
        'Chest Press': 'Targets the chest, shoulders, and triceps.',
        'Circuit Training': 'Combines strength and cardio exercises in a fast-paced workout.',
        'CrossFit': 'High-intensity strength and conditioning workout involving varied functional movements.',
        'Cycling': 'Builds leg strength and boosts endurance.',
        'Dance Fitness': 'Combines dancing with fitness moves for cardiovascular benefits and fun.',
        'Deadlift': 'Strengthens the back, glutes, hamstrings, and core.',
        'Dancing': 'Improves coordination, flexibility, and cardiovascular health.',
        'Dumbbell Curls': 'Isolates and strengthens the biceps.',
        'Dumbbell Rows': 'Builds upper back and arm strength using dumbbells.',
        'Dynamic Stretching': 'Prepares muscles for exercise by moving through ranges of motion.',
        'Foam Rolling': 'Massages tight muscles, improves blood flow, and aids recovery.',
        'Glute Bridges': 'Strengthens the glutes, hamstrings, and lower back.',
        'HIIT': 'High-intensity interval training for fat loss and endurance.',
        'Hip Flexor Stretch': 'Improves flexibility in the hip flexors and reduces tightness.',
        'Incline Bench Press': 'Targets the upper chest, shoulders, and triceps.',
        'Jogging': 'Light running that improves cardiovascular endurance and burns calories.',
        'Jump Rope': 'Enhances coordination and cardiovascular fitness.',
        'Kettlebell Swings': 'Boosts strength, endurance, and cardiovascular health with dynamic hip movements.',
        'Kickboxing': 'Combines martial arts and cardio to improve strength and agility.',
        'Leg Press': 'Strengthens the quads, hamstrings, and glutes.',
        'Lunges': 'Tones the quads, glutes, and hamstrings.',
        'Mobility Drills': 'Improve joint flexibility and functional movement range.',
        'Mountain Climbers': 'Engages the core, arms, and legs while boosting cardio fitness.',
        'Obstacle Courses': 'Enhance strength, agility, and endurance through varied physical challenges.',
        'Overhead Press': 'Builds shoulder and upper chest strength.',
        'Pilates': 'Focuses on core strength, flexibility, and body alignment.',
        'Plank': 'Engages the core and strengthens the abs and back.',
        'Plyometrics': 'Explosive movements to increase power, speed, and agility.',
        'Pull-Ups': 'Develops upper back and arm strength.',
        'Push-Ups': 'Targets the chest, shoulders, and triceps.',
        'Resistance Band Mobility': 'Improves flexibility and joint stability using resistance bands.',
        'Resistance Bands': 'Add resistance to exercises for strength training and muscle toning.',
        'Rock Climbing': 'Builds strength, endurance, and flexibility with a focus on grip and core stability.',
        'Rowing': 'Provides a full-body workout that improves cardiovascular and muscular strength.',
        'Running': 'Improves cardiovascular endurance and overall stamina.',
        'Sprints': 'Short bursts of high-intensity running to increase speed and power.',
        'Stair Climbing': 'Strengthens the legs and improves cardiovascular fitness.',
        'Step-Ups': 'Strengthens the legs and tones the glutes.',
        'Stretching': 'Enhances flexibility and prepares the body for physical activity.',
        'Swimming': 'Provides full-body cardiovascular and strength benefits.',
        'Tabata': 'A form of HIIT that boosts metabolic rate and burns fat.',
        'Trail Running': 'Improves endurance and leg strength while navigating natural terrain.',
        'Tricep Dips': 'Strengthens the triceps, shoulders, and chest.',
        'Walking': 'Low-impact cardio exercise that improves endurance and burns calories.',
        'Weighted Lunges': 'Increases leg strength and stability with added weight.',
        'Weighted Pull-Ups': 'Builds upper body strength with extra resistance.',
        'Yoga': 'Improves flexibility, balance, and mental relaxation.',
        'Rows': 'Strengthens the back, arms, and shoulders using pulling motions, improving posture and upper body stability.',

    };
        return descriptions[workout] || 'No description available for this workout.';
}


// Function to get the resource link by workout name
function getResourceLinkByName(workoutName) {
    const workout = workoutData.find(w => w.name === workoutName);
    return workout ? workout.link : '#';
}

// Generate a 7-day workout plan
function createWorkoutPlan(fitnessGoal, gender, experienceLevel) {
    const selectedWorkouts = goalWorkouts[fitnessGoal][gender][experienceLevel];
    return days.map((day, i) => {
        const workoutName = selectedWorkouts[i % selectedWorkouts.length];
        return {
            day,
            workout: workoutName,
            description: getWorkoutDescription(workoutName),
            link: getResourceLinkByName(workoutName) // Fetch the link for the workout
        };
    });
}

// Display the workout plan in a table
function displayWorkoutPlan(workoutPlan) {
    const container = document.getElementById('workoutPlanContainer');
    container.innerHTML = `
        <table class="workout-plan-table">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Workout</th>
                    <th>Description</th>
                    <th>Resource Link</th>
                </tr>
            </thead>
            <tbody>
                ${workoutPlan.map(plan => `
                    <tr>
                        <td>${plan.day}</td>
                        <td>${plan.workout}</td>
                        <td>${plan.description}</td>
                        <td><a href="${plan.link}" target="_blank">Watch Video</a></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}