import Aurora from "@/components/ui/aurora"
import Footer from "@/components/ui/footer"
import { isAuthenticated } from "@/lib/actions/auth.action"
import { redirect } from "next/navigation"
import React, { ReactNode } from "react"

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated()
  if (isUserAuthenticated) {
    redirect("/")
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Aurora
        colorStops={["#065471", "#0A91AB", "#FFC045"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
        className="absolute inset-0 w-full h-full z-0"
      />
      <div className="flex-1 auth-layout z-10">{children}</div>
      <footer className="z-10">
        <Footer />
      </footer>
    </div>
  )
}

export default AuthLayout
