import { useState, useEffect } from "react"

export default function ClockWidget () {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(() => new Date()), 1000)
        return () => clearInterval(id)
    }, [])

    const hours = now.getHours()
    const minutes = now.getMinutes()
    const padded = (n) => String(n).padStart(2, "0");
    const timeString = `${padded(hours)}∶${padded(minutes)}`;


    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const dateString = now.toLocaleDateString(undefined, options);

    return (
        <div className='time-card card'>
            <div className='location'>
                <img src='/src/assets/marker.png' alt='marker icon'/>
                Kochi, Kerala, India
            </div>
            <h1 className='time'>
                {timeString}
            </h1>
            <div className='date-time'>
                {dateString}
            </div>
        </div>
    )
}