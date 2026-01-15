import React, { useRef } from 'react';
import { animate } from 'motion';
import '../app.css';     
import bookCover from '../assets/The_Odyssey.png'

export default function Home() {
  const bookRef = useRef(null);

  const tilt = () =>
    animate(bookRef.current, {rotate: [-4, 4, 0] }, { duration: 0.5, easing: 'ease-in-out'});

  return (
      <section className="hero">
        <h1 className="title">
        <p>
        Have you read{' '}
        <a href="https://en.wikipedia.org/wiki/Odyssey" target="_blank" rel="noreferrer">
          The Odyssey
        </a>
        , one of the most significant works of the Western canon?
      </p>
      <p>Let’s dive into the ancient Greek world full of drama and hidden motifs…</p>
      </h1>

      <div className="orbit">
         <img ref={bookRef} src={bookCover} className="book" alt="The Odyssey" onClick={tilt}/>
        <span className="blob blob--blue" />
        <span className="blob blob--gold" />
      </div>

      <p className="cta">Click on it!</p>
      </section>
  );
}
