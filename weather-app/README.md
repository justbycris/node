## CLI Weather Dashboard

Build a command-line weather app that fetches and displays weather data with a nice ASCII art interface.

**Requirements:**

- ✅ Accept a city name as a command-line argument
- ✅ Fetch current weather from a free API (like OpenWeatherMap or WeatherAPI)
- ✅ Display results with ASCII art weather icons (sun, clouds, rain, etc.)
- ✅ Show temperature, conditions, humidity, and wind speed
- ✅Color-code output using chalk or similar library
- Handle errors gracefully (invalid city, network issues)

**Bonus features:**

- Save favorite cities to a config file
- Show a 3-day forecast
- Add temperature unit conversion (C/F)
- Make it installable globally with npm

**Tech stack:**

- Node.js
- `node-fetch` for API calls
- `chalk` for colors
- `dotenv` for API key management
