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
      <div className="flex-1 auth-layout">{children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default AuthLayout
