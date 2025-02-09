import { configDotenv } from "dotenv";
configDotenv();

exports.handler = async (event) => {
    const API_KEY = process.env.API_KEY;
    const { location } = event.queryStringParameters;

    if (!location) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Location is required" }),
        };
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch weather data" }),
        };
    }
};
