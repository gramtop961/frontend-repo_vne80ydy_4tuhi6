import React from 'react'
import { Container, Card } from '../components/UI'
import { useData } from '../components/DataContext'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useMemo } from 'react'
import { useTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, flexRender, useSortBy } from '@tanstack/react-table'

export default function CO2Page() {
  const { co2 } = useData()
  const data1750 = useMemo(() => co2.filter((d) => d.year >= 1750), [co2])

  // Country aggregation for table (latest by country)
  const latestByCountry = useMemo(() => {
    const map = new Map()
    for (const row of co2) {
      if (!row.country) continue
      const prev = map.get(row.country)
      if (!prev || prev.year < row.year) map.set(row.country, row)
    }
    return Array.from(map.values())
  }, [co2])

  const columns = React.useMemo(() => [
    { header: 'Country', accessorKey: 'country' },
    { header: 'Year', accessorKey: 'year' },
    { header: 'CO2 (ppm)', accessorKey: 'value' },
  ], [])

  const [globalFilter, setGlobalFilter] = React.useState('')

  const table = useTable({
    data: latestByCountry,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const v = String(row.getValue(columnId) ?? '').toLowerCase()
      return v.includes(String(filterValue).toLowerCase())
    },
  })

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold tracking-tight">CO2 Concentration</h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">Interactive line chart 1750–2024 and country comparison table.</p>

      <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data1750} margin={{ left: 16, right: 16, top: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-800" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #333' }} labelStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="value" stroke="#f97316" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* ADS HERE: 728x90 */}
        <div className="mt-4 grid place-items-center">
          <div className="h-[90px] w-[728px] max-w-full rounded border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700 dark:text-neutral-600 grid place-items-center text-xs">AD 728x90</div>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Country comparison (latest)</h2>
          <input value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search country…" className="h-9 rounded-md border border-neutral-300 bg-white px-3 text-sm dark:border-neutral-800 dark:bg-neutral-900" />
        </div>
        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
          <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
            <thead className="bg-neutral-50 dark:bg-neutral-900/60">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id} className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wide text-neutral-500">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}
