"use client"
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Icons } from "@/components/icons";

import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

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
  const [signInClicked, setSignInClicked] = useState(false);
  const [gitHubClicked, setGitHubClicked] = useState(false);
  return (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader className="flex flex-col gap-1">Sign in</CardHeader>
      <CardBody>
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-border bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev">
            <GooneyFlyLogo />
          </a>
          <h3 className="font-display text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Plaease sign in - only your email and profile
            picture will be stored.
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="ghost"
          fullWidth
          disabled={signInClicked}
          isLoading={signInClicked}
          startContent={<Icons.Google className="h-5 w-5" />}
          onClick={() => {
            setSignInClicked(true);
            signIn("google");
          }}
        >
          Sign In with Google
        </Button>
        <Button
          variant="ghost"
          fullWidth
          disabled={gitHubClicked}
          isLoading={gitHubClicked}
          startContent={<Icons.Github className="h-5 w-5" />}
          onClick={() => {
            setGitHubClicked(true);
            signIn("github")
          }}
        >
          Sign In with Github
        </Button>
      </CardFooter>
    </Card>
  );
};

