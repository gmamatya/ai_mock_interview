import Footer from "@/components/ui/footer"
import { getCurrentUser, isAuthenticated, signOut } from "@/lib/actions/auth.action"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import React, { ReactNode } from "react"

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated()
  if (!isUserAuthenticated) {
    redirect("/sign-in")
  }
  const user = await getCurrentUser()

  return (
    <>
      <div className="root-layout">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} className="rounded-full" />
              <h2 className="text-primary-100">AI InterviewPrep</h2>
            </Link>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-300 mb-1">{`Welcome, ${user?.name || "User"}!`}</span>
            <form action={signOut}>
              <button
                type="submit"
                className="sign-out"
              >
                Sign out
              </button>
            </form>
          </div>
        </nav>
        {children}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default RootLayout
