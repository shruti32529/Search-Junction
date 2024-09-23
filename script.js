// Reference to DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchHistoryContainer = document.getElementById('search-history');
const clearHistoryButton = document.getElementById('clear-history-button');

// On window load, load search history
window.onload = function() {
    loadSearchHistory();
};

// Add event listener for the search button
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        saveSearchTerm(searchTerm);
        displaySearchHistory();
        searchInput.value = ''; // Clear the input field
    }
});

// Add event listener for the clear history button
clearHistoryButton.addEventListener('click', () => {
    localStorage.removeItem('searchHistory');
    searchHistoryContainer.innerHTML = ''; // Clear search history display
});

// Function to save the search term to localStorage in JSON format
function saveSearchTerm(term) {
    // Get existing search history
    let searchHistory = getSearchHistory();
    const searchObject = {
        term: term,
        timestamp: new Date().toLocaleString()
    };
    searchHistory.push(searchObject);  // Add new search to history
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));  // Save updated history to localStorage
}

// Function to retrieve search history from localStorage
function getSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
}

// Function to display search history
function displaySearchHistory() {
    const searchHistory = getSearchHistory();
    searchHistoryContainer.innerHTML = '';  // Clear existing display

    // Populate with each search term from history
    searchHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.term} - ${item.timestamp}`;
        searchHistoryContainer.appendChild(li);
    });
}

// Function to load search history when the page loads
function loadSearchHistory() {
    displaySearchHistory();
}
[
    {
        "term": "JavaScript tutorials",
        "timestamp": "2023-09-23 14:00:00"
    },
    {
        "term": "CSS grid layout",
        "timestamp": "2023-09-23 14:10:00"
    }
]
