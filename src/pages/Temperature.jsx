import React from 'react'
import { Container } from '../components/UI'
import { useData } from '../components/DataContext'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function TemperaturePage() {
  const { temperature } = useData()

  const latest = temperature.slice(-60) // recent years for bar chart as a proxy to race style

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Global Temperature</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">Global temperature anomaly map and yearly bars.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="h-[420px] overflow-hidden rounded">
            <MapContainer center={[20, 0]} zoom={2} className="h-full w-full" scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/* Simple visualization: size/color of marker based on anomaly */}
              {temperature.slice(-1).map((d, i) => (
                <CircleMarker key={i} center={[20, 0]} radius={10 + Math.abs(d.anomaly) * 10} pathOptions={{ color: d.anomaly > 0 ? '#ef4444' : '#3b82f6' }} />
              ))}
            </MapContainer>
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latest} margin={{ left: 16, right: 16, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="anomaly" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* ADS HERE: 300x250 */}
          <div className="mt-4 grid place-items-center">
            <div className="h-[250px] w-[300px] rounded border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-600 grid place-items-center text-xs">AD 300x250</div>
          </div>
        </div>
      </div>
    </Container>
  )
}
