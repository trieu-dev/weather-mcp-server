import 'dotenv/config';

const API_KEY = process.env.OPENWEATHER_API_KEY;

interface WeatherData {
    dt?: Date,
    name: string,
    id: string,
    main: MainWeatherData,
    wind: WindData,
}

interface MainWeatherData {
    temp: number,
    humidity: number,
}

interface WindData {
    speed: number,
    deg: number,
}

interface ForecastData {
    
}

interface AlertFeature {
  properties: {
    event?: string;
    areaDesc?: string;
    severity?: string;
    status?: string;
    headline?: string;
  };
}

// Format alert data
function formatAlert(feature: AlertFeature): string {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
}

interface ForecastPeriod {
  name?: string;
  temperature?: number;
  temperatureUnit?: string;
  windSpeed?: string;
  windDirection?: string;
  shortForecast?: string;
}

interface AlertsResponse {
  features: AlertFeature[];
}

export async function fetchCurrentWeather<T>(city: string): Promise<T | null> {
  try {
    const response = await fetch(
        new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
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

    static async fetchForecast(city: string) {
        try {
            const response = await fetch(
                new URL(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
            );
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }
}