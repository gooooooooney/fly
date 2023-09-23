"use client"
import { signIn, useSession } from "next-auth/react";
import {
  useState,
} from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Icons } from "@/components/icons";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const GooneyFlyLogo: React.FC = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="#1e90ff" />

      {/* Abstract shapes */}
      <path
        d="M20 50 Q50 10 80 50"
        stroke="#ffffff"
        strokeWidth="2"
        fill="transparent"
      />
      <circle cx="30" cy="70" r="10" fill="#ffffff" />
      <circle cx="70" cy="70" r="10" fill="#ffffff" />
    </svg>
  );
};


export const SignInCard = () => {

  const { status } = useSession()
  const [signInClicked, setSignInClicked] = useState(false);
  const [gitHubClicked, setGitHubClicked] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [email, setEmail] = useState("");

  const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validationState = React.useMemo(() => {
    if (email === "") return undefined;

    return validateEmail(email) ? "valid" : "invalid";
  }, [email]);
  if (status === "authenticated") {
    redirect("/")
  }


  const handleEmailClick = () => {
    if (validationState === "invalid") return
    setEmailClicked(true);
    signIn("email", { email }).catch((e => {
      toast.error(e.message)
    })).finally(() => {
      setEmailClicked(false);
    })
  }
  return (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader className="flex flex-col gap-1">Fly note</CardHeader>
      <CardBody>
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-border bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev">
            <GooneyFlyLogo />
          </a>
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Please sign in - only your email and profile
            picture will be stored.
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="ghost"
          fullWidth
          disabled={signInClicked || gitHubClicked || emailClicked}
          isLoading={signInClicked}
          startContent={<Icons.Google className="h-5 w-5" />}
          onClick={() => {
            setSignInClicked(true);
            signIn("google", { callbackUrl: "/" });
          }}
        >
          Sign In with Google
        </Button>
        <Button
          variant="ghost"
          fullWidth
          disabled={signInClicked || gitHubClicked || emailClicked}
          isLoading={gitHubClicked}
          startContent={<Icons.Github className="h-5 w-5" />}
          onClick={() => {
            setGitHubClicked(true);
            signIn("github", { callbackUrl: "/" }).catch((e => {
              toast.error(e.message)
            })).finally(() => {
              setGitHubClicked(false);
            })
          }}
        >
          Sign In with Github
        </Button>
        <div className="w-full mx-auto my-2 text-center">or</div>
        <div className="flex flex-col w-full gap-2">
          <Input
            variant="faded"
            value={email}
            errorMessage={validationState === "invalid" && "Please enter a valid email"}
            validationState={validationState}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEmailClick()
              }
            }}
            onValueChange={e => {
              setEmail(e)
            }}
            type="email"
            label="Email" />
          <Button
            variant="ghost"
            fullWidth
            disabled={signInClicked || gitHubClicked || emailClicked || validationState === "invalid"}
            isLoading={emailClicked}
            startContent={<Icons.Email className="h-5 w-5" />}
            onClick={handleEmailClick}
          >
            Sign In with Email
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

