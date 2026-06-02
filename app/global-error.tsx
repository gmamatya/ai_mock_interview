"use client"

import { useEffect } from "react"
import React from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en" className="dark">
      <body className="antialiased flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4 bg-[#09090b] text-white">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="text-gray-400 max-w-md">A critical error occurred. Please refresh the page.</p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Try again
        </button>
      </body>
    </html>
  )
}
