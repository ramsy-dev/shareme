"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect, useState } from "react"
import { createUser } from "@/app/actions"
import Script from "next/script"


const initialState = {
  errors: {}
}
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [state, formAction, pending] = useActionState(createUser, initialState);
  const [isSignupTab, setSignupTab] = useState(true);
  
  const switchTab =() => {
    setSignupTab(prev => !prev);

    window.catalyst.initApp({
      project_Id : "4939000000052001", //No I18N
      zaid : "50024743074", //No I18N
      auth_domain : "https://accounts.zohoportal.in",
      is_appsail : "true",
      api_domain : ""
    },{
      org_id: "60026071286" //No I18N
    });
    
    window.catalyst.auth.signIn("signin-frame", {});
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {isSignupTab ? <Card className="md:w-96 w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account to start sharing files in private.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button type="submit" disabled={pending} className="w-full">
                Sign Up
              </Button>

            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <span onClick={switchTab} className="underline underline-offset-4 cursor-pointer">
                Sign In
              </span>
            </div>
          </form>
        </CardContent>
      </Card> :
        <Card className="md:w-96 w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Sign to access your files and start sharing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80" id="signin-frame"></div>
          </CardContent>
        </Card>
      }
    </div>
  )
}
