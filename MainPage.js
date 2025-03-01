// Parse the movie data from ChuckMovies.js
const moviesData = JSON.parse(movies).movies;

function initializePage() {
    loadRandomImage();
    populateMoviesTable(moviesData);
    setupButtonStates();
}

// Function to display a random Chuck Norris image
function loadRandomImage() {
    const chuckImages = ['photos/chuck1.png', 'photos/chuck2.png', 'photos/chuck3.png', 'photos/chuck4.png', 'photos/chuck5.png'];
    const randomImage = chuckImages[Math.floor(Math.random() * chuckImages.length)];
    document.getElementById('chuck-image').src = randomImage;
}

// Function to populate the movies table
function populateMoviesTable(movies) {
    const tableBody = document.querySelector('#movies-table tbody');
    tableBody.innerHTML = '';  // Clear previous table data

    if (movies.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center;"></td></tr>`;
        return;
    }

    movies.forEach((movie, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.role}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filtering movies by year
document.getElementById('filter-button').addEventListener('click', () => {
    const yearInput = document.getElementById('year-filter').value.trim();

    if (!/^\d{4}$/.test(yearInput)) {
        alert('Please enter a valid 4-digit year.');
        return;
    }

    const filteredMovies = moviesData.filter(movie => movie.year >= parseInt(yearInput));
    populateMoviesTable(filteredMovies);
});

// Initial button setup
function setupButtonStates() {
    document.getElementById('get-joke-button').disabled = false;
    document.getElementById('like-joke-button').disabled = true;
    document.getElementById('dislike-joke-button').disabled = true;
    document.getElementById('clear-joke-button').disabled = true;
}

// Update button states based on joke presence
function updateButtonStates(hasJoke) {
    document.getElementById('like-joke-button').disabled = !hasJoke;
    document.getElementById('dislike-joke-button').disabled = !hasJoke;
    document.getElementById('clear-joke-button').disabled = !hasJoke;
}

// Fetching a random joke
document.getElementById('get-joke-button').addEventListener('click', async () => {
    const jokeDisplay = document.getElementById('joke-display');
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const jokeData = await response.json();
        jokeDisplay.textContent = jokeData.value;
        jokeDisplay.style.color = 'black';
        updateButtonStates(true);
    } catch (error) {
        console.error('Error fetching joke:', error);
        jokeDisplay.textContent = 'Failed to fetch joke. Please try again.';
    }
});

// Like button
document.getElementById('like-joke-button').addEventListener('click', () => {
    const jokeDisplay = document.getElementById('joke-display');
    jokeDisplay.style.color = 'green';
});

// Dislike button
document.getElementById('dislike-joke-button').addEventListener('click', () => {
    const jokeDisplay = document.getElementById('joke-display');
    jokeDisplay.style.color = 'red';
});

// Clear button
document.getElementById('clear-joke-button').addEventListener('click', () => {
    const jokeDisplay = document.getElementById('joke-display');
    jokeDisplay.textContent = '';
    jokeDisplay.style.color = 'black';
    updateButtonStates(false);
});