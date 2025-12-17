import { useState, useEffect } from 'react'

export default function QuoteWidget () {
    const [quote, setQuote] = useState({
        text: 'The opportunity of defeating the enemy is provided by the enemy himself.',
        author: 'Sun Tzu'
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchQuote() {
        setLoading(true)
        setError("")
        try {
            const response = await fetch("https://thequoteshub.com/api/")
            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || `Quote API error ${response.status}`);
            }

            const json = await response.json()
            console.log(json)

            setQuote({
                text: json.text,
                author: json.author
            })
            
        } catch (err) {
            setError(err.message || "Failed to load quote");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    return (
        <div className='quote-card card'>
            <img src="/src/assets/quotes.png" alt="quote symbol" />
            {loading &&
                <div className="quote-skeleton">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line short"></div>
                </div>
            }
            {error && <div style={{ color: "crimson" }}>{error}</div>}
            {!loading && !error && (
                <span>
                    “{quote.text}” — 
                    <span style={{fontWeight: '700'}}>{quote.author}</span>
                </span>
            )}
        </div>
    )
}