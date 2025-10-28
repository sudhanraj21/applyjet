import { useEffect } from "react";
import { usePlausibleEvent } from "../../lib/usePlausibleEvent";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const { track } = usePlausibleEvent();

  useEffect(() => {
    track("Sign Up Page Viewed");
  }, [track]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp routing="path" path="/sign-up" />
    </div>
  );
}
