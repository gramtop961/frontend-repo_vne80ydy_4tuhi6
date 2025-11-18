import React from 'react'
import { Sun, Moon, Menu, Search } from 'lucide-react'

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Header({ onToggleTheme, theme = 'light' }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/60 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-950/70 dark:supports-[backdrop-filter]:bg-neutral-950/60">
      <Container className="flex h-14 items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button aria-label="menu" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200/70 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
            <Menu size={18} />
          </button>
          <a href="/" className="font-semibold tracking-tight text-neutral-900 dark:text-white">Climate Change Data</a>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-md border border-neutral-200/70 bg-white px-3 py-1.5 text-sm text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            <Search size={16} className="mr-2" />
            <input className="bg-transparent outline-none placeholder:text-neutral-400 w-48" placeholder="Search…" />
          </div>
          <button onClick={onToggleTheme} className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200/70 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </Container>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200/60 py-10 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p>Climate Change Data 2025 – CO2, Temperature, Sea Level Rise (Live Tracker)</p>
        <nav className="flex items-center gap-4">
          <a className="hover:text-neutral-900 dark:hover:text-white" href="/sources">Sources</a>
        </nav>
      </Container>
    </footer>
  )
}

export function Card({ title, value, unit, children }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="text-sm text-neutral-500 dark:text-neutral-400">{title}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        {value != null ? (
          <>
            {value}
            {unit ? <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">{unit}</span> : null}
          </>
        ) : (
          <span className="text-neutral-400">—</span>
        )}
      </div>
      {children ? <div className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">{children}</div> : null}
    </div>
  )
}
