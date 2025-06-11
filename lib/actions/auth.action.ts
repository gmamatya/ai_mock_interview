"use server"

import { auth, db } from "@/app/firebase/admin"
import { cookies } from "next/headers"

const ONE_WEEK = 60 * 60 * 24 * 7 // seconds

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params
  try {
    const userRecord = await db.collection("users").doc(uid).get()
    if (userRecord.exists) {
      return { success: false, message: "User already exists. Please sign in instead." }
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
    })
    return { success: true, message: "User signed up successfully. Please sign in." }
  } catch (error: any) {
    console.error("Error creating user:", error)
    if (error.code === "auth/email-already-in-use") {
      return { success: false, message: "This email already in use." }
    }
    return { success: false, message: "Failed to create an account." }
  }
}

export async function setSessionCookie(idToken: string) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: ONE_WEEK * 1000, // Convert seconds to milliseconds
    })
    cookieStore.set("session", sessionCookie, {
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      path: "/",
      sameSite: "lax",
    })
  } catch (error: any) {
    console.error("Error setting session cookie:", error)
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params
  try {
    const userRecord = await auth.getUserByEmail(email)
    if (!userRecord) {
      return { success: false, message: "User does not exist. Create an account instead." }
    }
    await setSessionCookie(idToken)
  } catch (error: any) {
    console.error("Error signing in:", error)
    return { success: false, message: "Failed to sign in." }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")?.value
    if (!sessionCookie) return null

    const decodedToken = await auth.verifySessionCookie(sessionCookie, true)
    const userRecord = await db.collection("users").doc(decodedToken.uid).get()
    if (!userRecord.exists) {
      return null // User does not exist in the database
    }
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User
  } catch (error: any) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser()
  return !!user // Return true if user exists, false otherwise
}

export async function signOut() {
  const cookieStore = await cookies()

  cookieStore.delete("session")
}
