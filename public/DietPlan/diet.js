document.getElementById('generateDiet').addEventListener('click', async () => {
    const experienceLevel = document.getElementById('experienceLevel').value;
    const fitnessGoal = document.getElementById('fitnessGoal').value;
    const dietType = document.getElementById('dietType').value;
    const allergies = document.getElementById('allergies').value;
    const specifications = document.getElementById('specifications').value;

    try {
        const response = await fetch('/get-diet-plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ experienceLevel, fitnessGoal, dietType, allergies, specifications })
        });

        if (!response.ok) throw new Error('Failed to fetch diet plan');
        
        const data = await response.json();
        displayDietPlan(data.week);
    } catch (error) {
        alert('An error occurred while fetching the diet plan.');
        console.error(error);
    }
});

function displayDietPlan(week) {
    const container = document.getElementById('dietPlanContainer');
    container.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'diet-table';
    table.innerHTML = `
        <tr>
            <th>Day</th>
            <th>Morning Meal</th>
            <th>Afternoon Meal</th>
            <th>Snacks</th>
            <th>Dinner</th>
        </tr>
    `;

    const snacks = ["Protein Bar", "Fruit Salad", "Greek Yogurt", "Mixed Nuts", "Energy Balls"];

    for (const [day, meals] of Object.entries(week)) {
        const randomSnack = snacks[Math.floor(Math.random() * snacks.length)];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${day}</td>
            <td>
                ${meals.meals[0]?.title || 'N/A'}<br>
                <a href="${meals.meals[0]?.sourceUrl || '#'}" target="_blank">Recipe</a><br>
                ${meals.meals[0]?.readyInMinutes || 'N/A'} mins
            </td>
            <td>
                ${meals.meals[1]?.title || 'N/A'}<br>
                <a href="${meals.meals[1]?.sourceUrl || '#'}" target="_blank">Recipe</a><br>
                ${meals.meals[1]?.readyInMinutes || 'N/A'} mins
            </td>
            <td>${randomSnack}</td>
            <td>
                ${meals.meals[2]?.title || 'N/A'}<br>
                <a href="${meals.meals[2]?.sourceUrl || '#'}" target="_blank">Recipe</a><br>
                ${meals.meals[2]?.readyInMinutes || 'N/A'} mins
            </td>
        `;
        table.appendChild(row);
    }

    container.appendChild(table);
}
