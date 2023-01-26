import Image from "next/image";
import { useState } from "react";
import useAuthWithGoogle from "../hooks/useAuthWithGoogle";
import useEmailAuth from "../hooks/useEmailAuth";

export default function UserAuth() {
  const { signIn } = useAuthWithGoogle();
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState<string>("");
  const { signInWithEmail, loading, errorMessage, isError } =
    useEmailAuth(email);

  /**
   * @description this function ensures that user has typed email before executing signInMethod
   */
  const handleEmailSignIn = () => {
    if (email && email.trim().length !== 0) {
      signInWithEmail();
    }
  };
  const inputClasses = "flex items-start gap-y-2 flex-col w-full";
  return (
    <div className="max-w-sm rounded-lg my-4 mx-auto flex items-center justify-center flex-col bg-white shadow-lg py-4 mt-20">
      <div>
        <h3 className="mb-8 text-center ">Join TaskIt</h3>
        <div className="flex flex-col">
          <button
            className="flex items-center gap-x-4 bg-primary text-white px-2 rounded-[100px] mb-4 w-full"
            onClick={() => signIn()}
          >
            <Image
              src={"/google-icon.png"}
              alt="Google icon"
              loading="eager"
              width={40}
              height={40}
            />

            <span>Continue with Google</span>
          </button>
          <button
            className="bg-transparent border border-gray-300 px-2 py-2 w-full rounded-[100px]"
            onClick={() => setShowEmail((prev) => !prev)}
          >
            Continue with Email only
          </button>

          {/* <hr /> */}
          {showEmail && (
            <div className="mt-4 flex items-start flex-col gap-y-2">
              <div className={`${inputClasses}`}>
                <input
                  type="email"
                  placeholder="enter your email"
                  className="border-b w-full border-gray-400 indent-2  py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <>
                {loading ? (
                  <button
                    className="bg-primary text-white px-2 py-2 rounded-[100px] w-full flex items-center gap-x-2"
                    onClick={handleEmailSignIn}
                    disabled
                  >
                    <span className="h-[20px] w-[20px] bg-white rounded-[50%] animate-spin"></span>
                    <span>Logging in</span>
                  </button>
                ) : (
                  <button
                    className="bg-primary text-white px-2 py-2 rounded-[100px] w-full"
                    onClick={handleEmailSignIn}
                  >
                    Get Started
                  </button>
                )}
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
