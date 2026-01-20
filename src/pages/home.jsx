import React, { useState} from 'react';
import { animate } from 'motion';
import '../app.css';     
import bookCover from '../assets/The_Odyssey.png'

function TypewriterText({text, speed = 14, delay =150, className = '', onDone}){ //i got a little bit obssesed with animations, in this page im using typewriter for text, and fading animatin on the book cover, and blobs yes  
  const [i, setI] = useState(0); 
  
  React.useEffect(() => {
    const start = setTimeout(() => {
      const id = setInterval (() => {
        setI(v => {
          if (v >= text.length) {clearInterval(id); onDone?.(); return v;}
          return v+1;
        });
      }, speed);
    }, delay);
    return () => clearTimeout(start);
}, [text, speed, delay, onDone]);
return <span className={`typewriter ${className}`}>{text.slice(0, i)}</span>;
}

export default function Home() {
  const [isFading, setIsFading] = useState(false);
  const [subtitleDone, setSubtitleDone]= useState(false);

  const handleClick= () => setIsFading(true); 
  const handleAnimationEnd= (e) => {
    if (e.animationName === 'book-wipe' || e.animationName === 'fade-alt') {
      setIsFading(false);
    }
  };

  const titleText = 
  "Let's dive into the ancient Greek world full of drama and hidden motifs..."

  const subtitlePlain = 
  "Have you read The Odyssey, one of the most significant works of the Western canon?"

  return (
      <section className="hero">
        <div className="intro">
        <h1 className="title">
          <TypewriterText text={titleText} speed={14} delay={150} className="title-typer" />
        </h1>

        <p className="subtitle">
          {!subtitleDone ? (
          <TypewriterText
            text={subtitlePlain}
            speed={14}
            delay={titleText.length * 22 + 250 /* starts after title */}
            className="subtitle-typer"
            onDone={() => setSubtitleDone(true)}
          />
        ) : (
          <>
        Have you read{' '}
        <a href="https://en.wikipedia.org/wiki/Odyssey" target="_blank" rel="noreferrer">
          The Odyssey
        </a>
        , one of the most significant works of the Western canon?
      </>
        )}
      </p>
      </div>
      <div className="orbit-wrap">
      <div className="orbit">
         <img 
         src={bookCover} 
         className={`book ${isFading ? 'is-fading' : ''}`}
         onClick={handleClick}
         alt="The Odyssey" 
         onAnimationEnd={handleAnimationEnd}
         />
        <span className="blob blob--blue" />
        <span className="blob blob--gold" />
      </div>

      <p className="cta">Click on it!</p>
      </div>
      </section>
  );
}
