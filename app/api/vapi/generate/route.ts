import { db } from "@/app/firebase/admin"
import { getRandomInterviewCover } from "@/utils"
import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { FieldValue } from "firebase-admin/firestore"

const RATE_LIMIT = 5
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

async function checkRateLimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
  const windowKey = Math.floor(Date.now() / WINDOW_MS)
  const docRef = db.collection("rateLimits").doc(`${userId}_${windowKey}`)

  return db.runTransaction(async (tx) => {
    const doc = await tx.get(docRef)
    const count = doc.exists ? (doc.data()!.count as number) : 0

    if (count >= RATE_LIMIT) {
      return { allowed: false, remaining: 0 }
    }

    tx.set(
      docRef,
      {
        count: FieldValue.increment(1),
        expiresAt: new Date(Date.now() + WINDOW_MS),
      },
      { merge: true },
    )

    return { allowed: true, remaining: RATE_LIMIT - count - 1 }
  })
}

export async function GET() {
  return Response.json({ success: true, data: "Hello, World!" }, { status: 200 })
}

export async function POST(request: Request) {
  try {
    const { type, role, level, techstack, amount, userid } = await request.json()

    const { allowed, remaining } = await checkRateLimit(userid)
    if (!allowed) {
      return Response.json(
        { success: false, message: "Rate limit exceeded. You can generate up to 5 interviews per hour." },
        {
          status: 429,
          headers: {
            "Retry-After": "3600",
            "X-RateLimit-Limit": String(RATE_LIMIT),
            "X-RateLimit-Remaining": "0",
          },
        },
      )
    }
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioral and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    })

    const interview = {
      role,
      level,
      type,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      coverImage: getRandomInterviewCover(),
      userId: userid,
      finalized: true,
      createdAt: new Date().toISOString(),
    }

    await db.collection("interviews").add(interview)

    return Response.json({ success: true, data: interview }, {
      status: 200,
      headers: {
        "X-RateLimit-Limit": String(RATE_LIMIT),
        "X-RateLimit-Remaining": String(remaining),
      },
    })
  } catch (error) {
    console.error("Error in POST /api/vapi/generate:", error)
    return Response.json({ success: false, message: `${error}` }, { status: 500 })
  }
}
