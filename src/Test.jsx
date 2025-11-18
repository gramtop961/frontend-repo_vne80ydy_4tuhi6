import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import App from './App'
import CO2Page from './pages/CO2'
import TemperaturePage from './pages/Temperature'
import SeaLevelPage from './pages/SeaLevel'
import SourcesPage from './pages/Sources'

export default function Test() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/co2" element={<CO2Page />} />
      <Route path="/temperature" element={<TemperaturePage />} />
      <Route path="/sea-level" element={<SeaLevelPage />} />
      <Route path="/sources" element={<SourcesPage />} />
    </Routes>
  )
}
