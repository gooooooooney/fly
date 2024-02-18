import { useSession as useClerkSession} from "@clerk/nextjs"

export const useSession = () => {
  const {  session } = useClerkSession();
  return session
}