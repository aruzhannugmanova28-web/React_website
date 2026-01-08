import { useEffect, useRef } from 'preact/hooks';
import './app.css';
import { animate, scroll } from "motion"

export function App() {
  const boxRef = useRef(null);

  // run once after mount
  useEffect(() => {
    const controls = animate(boxRef.current, { rotate: 30 }, { duration: 1.2 });
    return () => controls.stop(); // clean up on unmount/HMR
  }, []);

  const bump = () => {
    animate(boxRef.current, { scale: [1, 1.15, 1] }, { duration: 0.35 });
  };

  return (
    <>
      <div ref={boxRef} class="box"></div>
      <button onClick={bump}>Animate</button>

      <p>
        Have you read{' '}
        <a href="https://en.wikipedia.org/wiki/Odyssey" target="_blank" rel="noreferrer">
          The Odyssey
        </a>
        , one of the most significant works of the Western canon?
      </p>
      <p>Let’s dive into the ancient Greek world full of drama and hidden motifs…</p>
    </>
  );










  
}

function IthacaWeather() {
  const [d, setD] = useState(null);
  useEffect(() => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=38.37&longitude=20.72&timezone=auto&current=temperature_2m,wind_speed_10m';
    fetch(url).then(r => r.json()).then(setD);
  }, []);
  if (!d) return <p>Loading…</p>;
  return <p>Ithaca now: {Math.round(d.current.temperature_2m)}°C, wind {Math.round(d.current.wind_speed_10m)} km/h</p>;
}