import { render } from 'preact'
import './index.css'
import { App } from './pages/app.jsx'
import { animate, scroll } from "motion"

render(<App />, document.getElementById('app'));
