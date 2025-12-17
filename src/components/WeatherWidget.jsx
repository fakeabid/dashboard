import { useState, useEffect } from "react"
import { getWeather } from '/src/api'

export default function WeatherWidget ({ city = 'kochi', refreshInterval = 0}) {
    const [data, setData] = useState(null);     // weather object from API
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let controller = new AbortController();

        async function load() {
            setLoading(true);
            setError("");
            
            try {
                const w = await getWeather(city); // uses import.meta.env inside api.js
                if (!controller.signal.aborted) setData(w);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message || "Failed to load weather");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        load();

        // optional polling
        let id;
        if (refreshInterval > 0) id = setInterval(load, refreshInterval);

        return () => {
            controller.abort();
            if (id) clearInterval(id);
        };
    }, [city, refreshInterval]);

    if (loading) return (
        <div className="weather-card card">
            <div className="weather-skeleton">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </div>
    )
    if (error) return <div className="weather-card card" style={{color:"crimson"}}>Error: {error}</div>;
    if (!data) return <div className="weather-card no-weather card" style={{ fontSize: '0.8rem', opacity: '0.6' }}>
        <img src="/src/assets/weather-404.png" alt="weather not found" />
        <span>No data</span>
    </div>;

    return (
        <div className='weather-card card'>
            <h4>What's my Weather?</h4>
            <img src={data.iconUrl} alt={data.desc} />
            <span className='description'>{data.main}</span>
            <h3 className='temperature'>{data.temp}°</h3>
        </div>
    )
}