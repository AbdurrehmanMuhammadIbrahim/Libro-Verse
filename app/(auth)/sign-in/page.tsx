"use client"
import React from 'react'
import AuthForm from '@/components/AuthForm'
import { signInSchema } from "@/lib/validations";
import { sign } from 'crypto';
import { signInWithCredentials } from '@/lib/actions/auth';


const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",

      }}
      onSubmit={signInWithCredentials}
    />
  )
}

export default page
