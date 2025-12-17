import { useState, useEffect } from 'react'

export default function Greeting (props) {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(() => new Date()), 1000*60*30)
        return () => clearInterval(id)
    }, [])

    const hours = now.getHours()
    const greeting = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening'

    return (
        <section className='greeting'>
            <h1 className={props.greetingClassh1}>{greeting}, Abid</h1>
        </section>
    )
}