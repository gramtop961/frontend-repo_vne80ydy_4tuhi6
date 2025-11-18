import React, { useMemo } from 'react'
import { Container } from '../components/UI'
import { useData } from '../components/DataContext'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart } from 'recharts'

export default function SeaLevelPage() {
  const { seaLevel } = useData()

  const projection = useMemo(() => {
    if (!seaLevel.length) return []
    const last = seaLevel[seaLevel.length - 1]
    const rate = 3.6 // mm/year placeholder until real data uploaded
    const arr = []
    for (let y = last.year + 1; y <= 2100; y++) {
      arr.push({ year: y, value: last.value + (y - last.year) * rate })
    }
    return arr
  }, [seaLevel])

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Sea Level Rise</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">Observed sea level and simple projection to 2100.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={seaLevel} margin={{ left: 16, right: 16, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} labelStyle={{ color: '#fff' }} />
                <Area type="monotone" dataKey="value" stroke="#f97316" fill="#fb923c55" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projection} margin={{ left: 16, right: 16, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="value" stroke="#f97316" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* ADS HERE: 728x90 */}
          <div className="mt-4 grid place-items-center">
            <div className="h-[90px] w-[728px] max-w-full rounded border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-600 grid place-items-center text-xs">AD 728x90</div>
          </div>
        </div>
      </div>
    </Container>
  )
}
