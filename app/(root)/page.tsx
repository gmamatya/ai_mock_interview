import InterviewCard from "@/components/InterviewCard"
import Aurora from "@/components/ui/aurora"
import { Button } from "@/components/ui/button"
import { dummyInterviews } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Page = () => {
  return (
    <>
      <section className="card-cta relative overflow-hidden">
        <Aurora
          colorStops={["#065471", "#0A91AB", "#FFC045"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
          className="absolute inset-0 w-full h-full z-0"
        />
        <div className="flex flex-col gap-6 max-w-lg z-10">
          <h2 className="text-3xl">Get Interview Ready with AI-powered Practice and Feedback</h2>
          <p className="text-lg">
            Practice on real interview questions, get instant AI-generated feedback, and improve your interview skills.
          </p>
          <Button asChild className="btn-primary max-sm:w-full z-10">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={450} height={450} className="max-sm:hidden z-1" />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => <InterviewCard {...interview} key={interview.id} />)}
          {/* <p>You haven&apos;t taken any interviews yet. Practice and get feedback on real interview questions.</p> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterviews.map((interview) => <InterviewCard {...interview} key={interview.id} />)}
        </div>
      </section>
    </>
  )
}

export default Page
