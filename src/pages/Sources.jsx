import React from 'react'
import { Container } from '../components/UI'

export default function SourcesPage() {
  const sources = [
    { name: 'NASA GISTEMP (Global Temperature)', url: 'https://data.giss.nasa.gov/gistemp/', lastUpdate: '—' },
    { name: 'NOAA Global Monitoring Laboratory (CO2)', url: 'https://gml.noaa.gov/ccgg/trends/', lastUpdate: '—' },
    { name: 'NASA Sea Level Change', url: 'https://sealevel.nasa.gov/', lastUpdate: '—' },
    { name: 'NSIDC Arctic Sea Ice', url: 'https://nsidc.org/data/seaice_index', lastUpdate: '—' },
    { name: 'World Bank (Country emissions)', url: 'https://data.worldbank.org/indicator/EN.ATM.CO2E.PC', lastUpdate: '—' },
  ]

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Sources</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">Links to primary data sources and their most recent update. These will auto-populate after you upload data.</p>

      <ul className="mt-6 space-y-3">
        {sources.map((s) => (
          <li key={s.url} className="rounded-lg border border-neutral-200 bg-white p-4 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <a className="font-medium text-neutral-900 underline-offset-2 hover:underline dark:text-white" href={s.url} target="_blank" rel="noreferrer">
                {s.name}
              </a>
              <span className="text-neutral-500 dark:text-neutral-400">Last update: {s.lastUpdate}</span>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}
