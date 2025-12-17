export async function getWeather (city) {
    const key = import.meta.env.VITE_OPENWEATHER_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`;

    try {
        const response = await fetch(url)
        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `Weather API error ${response.status}`);
        }

        const json = await response.json()
        console.log(json)

        return {
            city: `${json.name}, ${json.sys?.country ?? ""}`,
            temp: Number(json.main.temp).toFixed(2),
            main: json.weather[0].main,
            desc: json.weather[0].description,
            iconUrl: `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
        }

    } catch(error) {
        console.error(error.message)
    }
}