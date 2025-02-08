import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AddAchievement} from './pages/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AddAchievement/>
  </StrictMode>,
)
