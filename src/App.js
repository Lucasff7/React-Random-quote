import ReactDOM from 'react-dom/client'; 
import { useState, useEffect } from "react"; 
import './style.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);
  const [color, setColor] = useState('#D2B48C');

  const colorPalette = [
    "#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#6A4C93",
    "#FF9F1C", "#00B8A9", "#F67280", "#355C7D", "#EDEDED"
  ];

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
      setColor(randomColor);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="app" style={{ backgroundColor: color, transition: '0.5s' }}>
      <div id="quote-box" style={{ color }}>
        {error && <p>Error: {error}</p>}
        <p id="text">"{quote}"</p>
        <p id="author">- {author}</p>
        <div className="buttons">
          <a
            id="tweet-quote"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
            style={{ backgroundColor: color }}
          >
            Tweet
          </a>
          <button
            id="new-quote"
            onClick={fetchQuote}
            style={{ backgroundColor: color }}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}


export default App;
