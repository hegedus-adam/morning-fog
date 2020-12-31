export interface Location {
    clouds: {
        all: number
    };
    coord: {
        lat: number
        lon: number
    };
    dt: number;
    id: number;
    main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
    };
    name: string;
    sys: {
        country: string
        sunrize: number
        sunset: number
        timezone: number
    };
    visibility: number;
    weather: object;
    wind: {
        deg: number
        speed: number
    };
    sunset_time?: string;
    isDay?: boolean;
    temp_celsius?: string;
    temp_min?: string;
    temp_max?: string;
    temp_feels_like?: string;
}
