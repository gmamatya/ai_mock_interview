import { db } from "@/app/firebase/admin"

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
