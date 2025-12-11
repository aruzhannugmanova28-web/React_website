import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css';

export function App() {
  return (
    <>
      <p>
        Have you read{' '}
        <a href="https://en.wikipedia.org/wiki/Odyssey" target="_blank">
          The Odyssey
        </a>
        , one of the most significant works of the Western canon?
      </p>
      <p>Let’s dive into the ancient Greek world full of drama and hidden motifs…</p>
    </>
  );
}