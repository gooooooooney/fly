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

export default GooneyFlyLogo;

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);
  const [gitHubClicked, setGitHubClicked] = useState(false);

  //   return (
  //     <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
  //       <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
  //         <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
  //           <a href="https://precedent.dev">
  //             <Image
  //               src="/logo.png"
  //               alt="Logo"
  //               className="h-10 w-10 rounded-full"
  //               width={20}
  //               height={20}
  //             />
  //           </a>
  //           <h3 className="font-display text-2xl font-bold">Sign In</h3>
  //           <p className="text-sm text-gray-500">
  //             This is strictly for demo purposes - only your email and profile
  //             picture will be stored.
  //           </p>
  //         </div>

  //         <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
  //           <button
  //             disabled={signInClicked}
  //             className={`${
  //               signInClicked
  //                 ? "cursor-not-allowed border-gray-200 bg-gray-100"
  //                 : "border border-gray-200 bg-white text-black hover:bg-gray-50"
  //             } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
  //             onClick={() => {
  //               setSignInClicked(true);
  //               signIn("google");
  //             }}
  //           >
  //             {signInClicked ? (
  //               <LoadingDots color="#808080" />
  //             ) : (
  //               <>
  //                 <Google className="h-5 w-5" />
  //                 <p>Sign In with Google</p>
  //               </>
  //             )}
  //           </button>
  //         </div>
  //       </div>
  //     </Modal>
  //   );
  return (
    <Modal backdrop="blur" isOpen={showSignInModal} onClose={() => setShowSignInModal(false)}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center justify-center space-y-3 border-b border-border bg-background px-4 py-6 pt-8 text-center md:px-16">
                <a href="https://precedent.dev">
                  <GooneyFlyLogo />
                </a>
                <h3 className="font-display text-2xl font-bold">Sign In</h3>
                <p className="text-sm text-gray-500">
                  This is strictly for demo purposes - only your email and
                  profile picture will be stored.
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col">
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
                  signIn("github");
                }}
              >
                Sign In with Github
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback]
  );
}
