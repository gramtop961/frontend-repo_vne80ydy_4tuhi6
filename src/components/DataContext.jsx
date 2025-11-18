import React, { createContext, useContext, useMemo, useState } from 'react'
import Papa from 'papaparse'

// Unified shape for datasets
// co2: [{year: number, value: number, country?: string}]
// temperature: [{year: number, anomaly: number}]
// seaLevel: [{year: number, value: number}]
// ice: [{year: number, extent: number}]

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [co2, setCo2] = useState([])
  const [temperature, setTemperature] = useState([])
  const [seaLevel, setSeaLevel] = useState([])
  const [ice, setIce] = useState([])
  const [meta, setMeta] = useState({})

  const parseCSV = (text, mapRow) => {
    const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })
    return data.map(mapRow).filter(Boolean)
  }

  const loadFromFile = async (file, type) => {
    const text = await file.text()
    return loadFromText(text, type)
  }

  const loadFromUrl = async (url, type) => {
    const res = await fetch(url)
    const text = await res.text()
    return loadFromText(text, type)
  }

  const detectFormatAndParse = (text) => {
    try {
      const json = JSON.parse(text)
      return { kind: 'json', json }
    } catch (_) {
      return { kind: 'csv', text }
    }
  }

  const loadFromText = (text, type) => {
    const detected = detectFormatAndParse(text)
    const setMetaFor = (k, m) => setMeta((prev) => ({ ...prev, [k]: { updatedAt: new Date().toISOString(), ...(m || {}) } }))

    if (type === 'co2') {
      let rows = []
      if (detected.kind === 'json') {
        const arr = Array.isArray(detected.json) ? detected.json : detected.json.data || []
        rows = arr.map((r) => ({
          year: Number(r.year ?? r.Year ?? r.date ?? r.Date),
          value: Number(r.value ?? r.ppm ?? r.co2 ?? r.CO2),
          country: r.country || r.Country || undefined,
        })).filter((r) => Number.isFinite(r.year) && Number.isFinite(r.value))
      } else {
        rows = parseCSV(detected.text, (r) => {
          const year = Number(r.year || r.Year || r.date || r.Date)
          const value = Number(r.value || r.ppm || r.co2 || r.CO2)
          const country = r.country || r.Country || undefined
          if (!Number.isFinite(year) || !Number.isFinite(value)) return null
          return { year, value, country }
        })
      }
      setCo2(rows.sort((a, b) => a.year - b.year))
      setMetaFor('co2')
      return rows
    }

    if (type === 'temperature') {
      let rows = []
      if (detected.kind === 'json') {
        const arr = Array.isArray(detected.json) ? detected.json : detected.json.data || []
        rows = arr.map((r) => ({
          year: Number(r.year ?? r.Year ?? r.date ?? r.Date),
          anomaly: Number(r.anomaly ?? r.temp ?? r.temperature ?? r.value),
        })).filter((r) => Number.isFinite(r.year) && Number.isFinite(r.anomaly))
      } else {
        rows = parseCSV(detected.text, (r) => {
          const year = Number(r.year || r.Year || r.date || r.Date)
          const anomaly = Number(r.anomaly || r.temp || r.temperature || r.value)
          if (!Number.isFinite(year) || !Number.isFinite(anomaly)) return null
          return { year, anomaly }
        })
      }
      setTemperature(rows.sort((a, b) => a.year - b.year))
      setMetaFor('temperature')
      return rows
    }

    if (type === 'sea-level') {
      let rows = []
      if (detected.kind === 'json') {
        const arr = Array.isArray(detected.json) ? detected.json : detected.json.data || []
        rows = arr.map((r) => ({ year: Number(r.year ?? r.Year ?? r.date), value: Number(r.value ?? r.sea ?? r.sea_level) }))
          .filter((r) => Number.isFinite(r.year) && Number.isFinite(r.value))
      } else {
        rows = parseCSV(detected.text, (r) => {
          const year = Number(r.year || r.Year || r.date)
          const value = Number(r.value || r.sea || r.sea_level)
          if (!Number.isFinite(year) || !Number.isFinite(value)) return null
          return { year, value }
        })
      }
      setSeaLevel(rows.sort((a, b) => a.year - b.year))
      setMetaFor('seaLevel')
      return rows
    }

    if (type === 'ice') {
      let rows = []
      if (detected.kind === 'json') {
        const arr = Array.isArray(detected.json) ? detected.json : detected.json.data || []
        rows = arr.map((r) => ({ year: Number(r.year ?? r.Year), extent: Number(r.extent ?? r.value ?? r.ice) }))
          .filter((r) => Number.isFinite(r.year) && Number.isFinite(r.extent))
      } else {
        rows = parseCSV(detected.text, (r) => {
          const year = Number(r.year || r.Year)
          const extent = Number(r.extent || r.value || r.ice)
          if (!Number.isFinite(year) || !Number.isFinite(extent)) return null
          return { year, extent }
        })
      }
      setIce(rows.sort((a, b) => a.year - b.year))
      setMetaFor('ice')
      return rows
    }

    return []
  }

  const stats = useMemo(() => {
    const latest = (arr, key) => (arr.length ? arr[arr.length - 1][key] : null)
    return {
      co2ppm: latest(co2, 'value'),
      tempRise: latest(temperature, 'anomaly'),
      seaLevel: latest(seaLevel, 'value'),
      iceExtent: latest(ice, 'extent'),
    }
  }, [co2, temperature, seaLevel, ice])

  const value = {
    co2,
    temperature,
    seaLevel,
    ice,
    meta,
    stats,
    loadFromFile,
    loadFromUrl,
  }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
