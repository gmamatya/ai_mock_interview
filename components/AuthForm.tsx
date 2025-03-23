"use client"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import FormField from "./FormField"

type FormType = "sign-in" | "sign-up"
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter()
  // 1. Define your form.
  const formSchema = authFormSchema(type)
  const isSignIn = type === "sign-in"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    try {
      if (type === "sign-in") {
        toast.success("Signed in successfully")
        router.push("/")
        // sign_in(values.email, values.password)
      } else {
        toast.success("Account created successfully. Please sign in.")
        router.push("/sign-in")
        // sign_up(values.name, values.email, values.password)
      }
    } catch (error) {
      console.log(error)
      toast.error(`Something went wrong.: ${error}`)
    }
  }

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className="text-primary-100">AI Mock Interview Platform</h2>
        </div>
        <h3>Practice job interviews with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && <FormField control={form.control} name="name" label="Name" placeholder="Your Name" />}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button className="btn" type="submit">{isSignIn ? "Sign In" : "Create an Account"}</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <Link className="font-bold text-user-primary ml-1" href={isSignIn ? "/sign-up" : "/sign-in"}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
