import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import { animate, scroll } from "motion"

render(<App />, document.getElementById('app'));
