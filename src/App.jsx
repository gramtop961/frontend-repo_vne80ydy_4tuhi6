import React from 'react'
import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Header, Footer, Container, Card } from './components/UI'
import { DataProvider, useData } from './components/DataContext'
import SEO from './components/SEO'
import { Link } from 'react-router-dom'

function HomeContent() {
  const { stats } = useData()
  return (
    <>
      <SEO />
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
        <div className="relative h-[60vh] min-h-[440px] w-full overflow-hidden">
          <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-neutral-950" />
        </div>
      </div>

      <Container className="-mt-24">
        <div className="rounded-xl border border-neutral-200 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="CO2 concentration" value={stats.co2ppm?.toFixed?.(2)} unit="ppm" />
            <Card title="Global temperature rise" value={stats.tempRise?.toFixed?.(2)} unit="°C" />
            <Card title="Sea level rise" value={stats.seaLevel?.toFixed?.(1)} unit="mm" />
            <Card title="Arctic ice extent" value={stats.iceExtent?.toFixed?.(2)} unit="million km²" />
          </div>
          {/* ADS HERE: 728x90 */}
          <div className="mt-6 grid place-items-center">
            <div className="h-[90px] w-[728px] max-w-full rounded border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-600 grid place-items-center text-xs">AD 728x90</div>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link className="group rounded-lg border border-neutral-200 bg-white p-4 text-sm shadow-sm transition hover:border-orange-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900" to="/co2">
              <div className="font-medium">CO2</div>
              <div className="mt-1 text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400">Line chart 1750–2024 and country table</div>
            </Link>
            <Link className="group rounded-lg border border-neutral-200 bg-white p-4 text-sm shadow-sm transition hover:border-orange-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900" to="/temperature">
              <div className="font-medium">Temperature</div>
              <div className="mt-1 text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400">Anomaly map + yearly bars</div>
            </Link>
            <Link className="group rounded-lg border border-neutral-200 bg-white p-4 text-sm shadow-sm transition hover:border-orange-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900" to="/sea-level">
              <div className="font-medium">Sea level</div>
              <div className="mt-1 text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400">Observed + projections</div>
            </Link>
            <Link className="group rounded-lg border border-neutral-200 bg-white p-4 text-sm shadow-sm transition hover:border-orange-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900" to="/sources">
              <div className="font-medium">Sources</div>
              <div className="mt-1 text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400">All datasets & updates</div>
            </Link>
          </div>
        </div>
      </Container>
    </>
  )
}

export default function App() {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const initial = mq.matches ? 'dark' : 'light'
    const saved = localStorage.getItem('theme')
    const next = saved || initial
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }, [])

  const toggle = () => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      localStorage.setItem('theme', next)
      return next
    })
  }

  return (
    <DataProvider>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <Header onToggleTheme={toggle} theme={theme} />
        <HomeContent />
        <Footer />
      </div>
    </DataProvider>
  )
}
