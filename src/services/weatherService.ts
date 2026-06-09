import 'dotenv/config';

const API_KEY = process.env.OPENWEATHER_API_KEY;

interface WeatherData {
    dt?: Date,
    name: string,
    id: string,
    main: MainWeatherData
}

interface MainWeatherData {
    temp: number,
    humidity: number,
}

interface ForecastData {
    
}

export class WeatherService {
    static async fetchCurrentWeather(city: string) {
        try {
            const response = await fetch(
                new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            );
            const json = await response.json();
            const value = json as WeatherData;
            console.log(value);
        } catch (error) {
            console.error(error);
        }
    }
}