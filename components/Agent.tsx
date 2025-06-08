import { cn } from "@/utils"
import Image from "next/image"
import React from "react"

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

const Agent = ({ userName }: AgentProps) => {
  const callStatus = CallStatus.FINISHED
  const isSpeaking = true
  const messages = [
    "What's your name?",
    "My name is Gav, nice to meet you!",
    "What is your greatest strength?",
    "I am a quick learner and adapt to new situations easily.",
  ]
  const lastMessage = messages[messages.length - 1]
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className="object-cover" />
            {isSpeaking && <span className="animate-speak"></span>}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[150px] "
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn("transition-opacity duration-500 opacity-0", "animate-fadeIn opacity-100")}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE
          ? (
            <button className="relative btn-call">
              <span
                className={cn(
                  "absolute animate-ping rounder-full opacity-75",
                  callStatus !== CallStatus.CONNECTING && "hidden",
                )}
              />
              <span>
                {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                  ? "Start Interview"
                  : "Connecting..."}
              </span>
            </button>
          )
          : (
            <button className="btn-disconnect">
              End Interview
            </button>
          )}
      </div>
    </>
  )
}

export default Agent
