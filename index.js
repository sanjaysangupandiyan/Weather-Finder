const button = document.getElementById("btn");
const cityInput = document.getElementById("city");
const result = document.getElementById("result");

button.addEventListener("click", () => {
    const city = cityInput.value.trim();
    
    // Basic validation
    if (!city) {
        result.innerHTML = `<p class="error-message">Please enter a city name</p>`;
        return;
    }

    // Set loading state
    result.innerHTML = `<p class="loading">Fetching weather...</p>`;

    // Fixed API key and URL string interpolation
    const apiKey = "352ed05761c798ae5a6327a2d7fd35ce";
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fixed fetch casing and status code check
    fetch(api)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                // Capitalize the error message from the API
                const errorMessage = data.message ? data.message.charAt(0).toUpperCase() + data.message.slice(1) : "City not found";
                result.innerHTML = `<p class="error-message">${errorMessage}</p>`;
            } else {
                // Remove the animation class temporarily to re-trigger it
                result.style.animation = 'none';
                result.offsetHeight; // Trigger reflow
                result.style.animation = null; 
                
                // Inject styled weather content
                result.innerHTML = `
                    <div class="weather-city">${data.name}, ${data.sys.country}</div>
                    <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
                    <div class="weather-desc">${data.weather[0].description}</div>
                `;
            }
        })
        .catch(err => {
            console.log("Fetch error:", err);
            result.innerHTML = `<p class="error-message">Failed to connect. Please try again.</p>`;
        });
});

// Allow triggering search with the Enter key
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        button.click();
    }
});