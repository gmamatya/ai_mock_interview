import Image from "next/image"
import Link from "next/link"
import React, { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <div className="auth-layout">{children}</div>
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} className="rounded-full" />
          <h2 className="text-primary-100">AI Mock Interview</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default AuthLayout
