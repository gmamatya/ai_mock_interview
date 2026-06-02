"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import React from "react"

export default function Error({
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <h2 className="text-2xl font-semibold text-primary-100">Something went wrong</h2>
      <p className="text-gray-400 max-w-md">
        An unexpected error occurred. You can try again or return to the dashboard.
      </p>
      <div className="flex gap-3">
        <Button className="btn" onClick={reset}>Try again</Button>
        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/5"
          onClick={() => window.location.href = "/"}
        >
          Go to dashboard
        </Button>
      </div>
    </div>
  )
}
