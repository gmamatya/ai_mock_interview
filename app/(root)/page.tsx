import InterviewCard from "@/components/InterviewCard"
import { Button } from "@/components/ui/button"
import { dummyInterviews } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-3xl">Get Interview Ready with AI-powered Practice and Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions, get instant AI-generated feedback, and improve your interview skills.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden" />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="px-16 max-sm:px-4">Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => <InterviewCard {...interview} key={interview.id} />)}
          {/* <p>You haven&apos;t taken any interviews yet. Practice and get feedback on real interview questions.</p> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="px-16 max-sm:px-4">Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => <InterviewCard {...interview} key={interview.id} />)}
        </div>
      </section>
    </>
  )
}

export default Page
