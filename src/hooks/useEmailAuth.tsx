import { auth } from "../../firebase.config";
import { useState } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useRouter } from "next/router";

const actionCodeSettings = {
  url: "http://localhost:3000/auth" || "http://localhost:3001/auth",
  handleCodeInApp: true,
};

export default function useEmailAuth(email: string) {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  /**
   * @description function that calls the firebase method to sendEmailLink
   * @returns
   */
  const signInWithEmail = async () => {
    setLoading(true);
    setIsError(false);
    setErrorMessage("");

    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        // TODO-
        // SET USER TO THE CURRENT USER OBJECT THAT IS TO BE STORED IN REDUX
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        setIsError(true);
        setErrorMessage(errorMessage);
      });
  };

  return {
    signInWithEmail,
    loading,
    setIsError,
    setErrorMessage,
  };
}
