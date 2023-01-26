import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { setCurrentUser } from "../../store/userReducer";
import { auth } from "../../../firebase.config";
import { useRouter } from "next/router";
import { useToasts } from "@geist-ui/core";

export default function LogoutUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { setToast } = useToasts();

  /**
   * @description function that handles signing user out and removing user state from redux
   *
   */

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setCurrentUser(null));
        router.push("/");
      })
      .catch(() => setToast({ text: "Error logging out user", type: "error" }));
  };
  return (
    <button onClick={handleSignOut}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        />
      </svg>
    </button>
  );
}
