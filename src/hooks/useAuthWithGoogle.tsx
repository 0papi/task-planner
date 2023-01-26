import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase.config";
import { setCurrentUser } from "../store/userReducer";

export default function useAuthWithGoogle() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const dispatch = useDispatch();

  const signIn = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        console.log("AUTHED TOKEN", token);

        const user = result.user;

        if (user) {
          dispatch(
            setCurrentUser({
              accessToken: token!,
              displayName: user.displayName!,
              email: user.email!,
              photoUrl: user.photoURL!,
              uid: user.uid,
            })
          );
        }

        router.push({
          pathname: "/dashboard",
        });
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  return { signIn };
}
