"use server"

import { google } from "@ai-sdk/google"
import { generateObject } from "ai"

import { db } from "@/app/firebase/admin"
import { feedbackSchema } from "@/constants"
export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
  try {
    const interviewsSnapshot = await db.collection("interviews").where("userId", "==", userId).orderBy(
      "createdAt",
      "desc",
    ).get()
    if (interviewsSnapshot.empty) return null

    const interviews: Interview[] = []
    interviewsSnapshot.forEach((doc) => {
      interviews.push({
        ...doc.data(),
        id: doc.id,
      } as Interview)
    })
    return interviews
  } catch (error: any) {
    console.error("Error fetching interviews:", error)
    return null
  }
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  try {
    // Get the 5 most recent interviews for a user
    const { userId, limit = 5 } = params
    const interviewsSnapshot = await db.collection("interviews").where("finalized", "==", true).where(
      "userId",
      "!=",
      userId,
    ).orderBy(
      "createdAt",
      "desc",
    ).limit(limit)
      .get()
    if (interviewsSnapshot.empty) return null

    const interviews: Interview[] = []
    interviewsSnapshot.forEach((doc) => {
      interviews.push({
        ...doc.data(),
        id: doc.id,
      } as Interview)
    })
    return interviews
  } catch (error: any) {
    console.error("Error fetching interviews:", error)
    return null
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  try {
    const interviewDoc = await db.collection("interviews").doc(id).get()
    if (!interviewDoc.exists) return null

    return interviewDoc.data() as Interview | null
  } catch (error: any) {
    console.error("Error fetching interviews:", error)
    return null
  }
}

export async function createFeedback(params: CreateFeedbackParams): Promise<{ success: boolean; feedbackId?: string }> {
  try {
    const { interviewId, userId, transcript } = params
    const formattedTranscript = transcript.map((sentence: { role: string; content: string }) => (
      `- ${sentence.role}: ${sentence.content}\n`
    )).join("")
    const { object: { totalScore, categoryScores, strengths, areasForImprovement, finalAssessment } } =
      await generateObject({
        model: google("gemini-2.0-flash-001", {
          structuredOutputs: false,
        }),
        schema: feedbackSchema,
        prompt: `
    You are an AI interviewer analyzing a mock interview transcript. Your goal is to provide an objective, evidence-based evaluation using the exact categories listed below. Be rigorous: if you identify mistakes or weaknesses, point them out clearly and offer concrete suggestions for improvement. Do not add or remove categories.

    Input:
    Transcript:
    ${formattedTranscript}

    Instructions:
    1. Rubric & Scoring:
       - For each category, assign an integer score from 0 to 100, where:
         - 0 means “unacceptable” or “no evidence of proficiency.”
         - 100 means “exceptional” or “demonstrates mastery at an expert level.”
       - Use the rubric definitions below to guide scoring. Cite specific moments or examples from the transcript to justify the score.

    2. Categories (strictly these; do not introduce others):
       - Communication Skills: Clarity, articulation, logical structuring of responses, appropriate pacing and tone.
       - Technical Knowledge: Depth and accuracy of domain concepts, correctness of technical details, appropriateness of chosen technologies or approaches.
       - Problem-Solving: Ability to break down complex problems, propose logical approaches, consider edge cases, and iterate on solutions.
       - Cultural & Role Fit: Evidence they understand and align with typical company values (e.g., collaboration, ownership, adaptability), role expectations, and team dynamics; ask whether their answers reflect mindset suited for the position.
       - Confidence & Clarity: Poise and assurance in delivery, ability to handle uncertainty, maintain engagement, and clarify ambiguous questions.

    3. Rubric Guidelines (examples—adapt as needed):
       - Communication Skills:
         • 90-100: Speaks concisely, structures answers (e.g., “STAR” or similar), uses precise language.
         • 70-89: Generally clear but occasional rambling or vague explanations.
         • 50-69: Some clarity but frequent disorganization or filler language.
         • <50: Hard to follow; major issues in articulation or coherence.
       - Technical Knowledge:
         • 90-100: Deep, accurate understanding; references best practices, trade-offs, and relevant details.
         • 70-89: Solid understanding with minor inaccuracies or omissions.
         • 50-69: Partial understanding; noticeable gaps or misconceptions.
         • <50: Incorrect or superficial knowledge.
       - Problem-Solving:
         • 90-100: Systematic breakdown, explores multiple angles, addresses edge cases, explains thought process.
         • 70-89: Logical approach but misses some edge cases or deeper considerations.
         • 50-69: Simplistic or incomplete solutions; limited justification.
         • <50: Unable to articulate a coherent approach.
       - Cultural & Role Fit:
         • 90-100: Demonstrates clear alignment with collaborative mindset, ownership, adaptability; tailors examples to the role.
         • 70-89: Some alignment but limited connection to company/role context.
         • 50-69: Weak or generic cultural references; unclear fit.
         • <50: Contradicts key values or shows red flags (e.g., poor teamwork).
       - Confidence & Clarity:
         • 90-100: Speaks confidently, handles follow-up questions smoothly, clarifies ambiguities proactively.
         • 70-89: Reasonably confident but occasional hesitation or uncertainty.
         • 50-69: Frequent hesitations, low energy, unclear when unsure.
         • <50: Very hesitant, seems unprepared or overly uncertain.

    4. Tone & Style:
       - Professional and objective.
       - Direct and constructive: avoid vague praise or criticism.
       - Evidence-based: always refer to specific transcript content or patterns (“When asked X, candidate did Y…”).

    5. Strictness:
       - Do not pad scores—be honest and critical per rubric.
       - If transcript lacks evidence in a category, note “no evidence to judge X” and assign a low score accordingly.

    6. Final Summary:
       - Include a brief human-readable summary (1-2 short paragraphs) synthesizing overall impression, e.g.: “Overall, the candidate shows strong technical fundamentals but needs to improve structured communication. Focus on practicing whiteboard explanations under time pressure.”
            `,
        system:
          "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
      })
    const feedback = await db.collection("feedback").add({
      userId,
      interviewId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    })

    return { success: true, feedbackId: feedback.id }
  } catch (error: any) {
    console.error("Error creating feedback:", error)
    return { success: false }
  }
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {
  try {
    // Get the 5 most recent interviews for a user
    const { interviewId, userId } = params
    const feedback = await db.collection("feedback").where("interviewId", "==", interviewId).where(
      "userId",
      "==",
      userId,
    ).orderBy(
      "createdAt",
      "desc",
    ).limit(1)
      .get()
    if (feedback.empty) return null

    const feedbackData = feedback.docs[0]
    return {
      id: feedbackData.id,
      ...feedbackData.data(),
    } as Feedback
  } catch (error: any) {
    console.error("Error fetching interviews:", error)
    return null
  }
}
