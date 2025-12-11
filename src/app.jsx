import { useEffect, useRef } from 'preact/hooks';
import './app.css';
import { animate, scroll } from "motion"

export function App() {
  const boxRef = useRef(null);

  // run once after mount
  useEffect(() => {
    const controls = animate(boxRef.current, { rotate: 360 }, { duration: 1.2 });
    return () => controls.stop(); // clean up on unmount/HMR
  }, []);

  const bump = () => {
    animate(boxRef.current, { scale: [1, 1.15, 1] }, { duration: 0.35 });
  };

  return (
    <>
      <div ref={boxRef} class="box">⚙️</div>
      <button onClick={bump}>Animate</button>
  
      <p>
        Have you read{' '}
        <a href="https://en.wikipedia.org/wiki/Odyssey" target="_blank">
          The Odyssey
        </a>
        , one of the most significant works of the Western canon?
      </p>
      <p>Let’s dive into the ancient Greek world full of drama and hidden motifs…</p>
      <img src="The Oddysey.png" alt="Description of the image">
    </>
  );
}
