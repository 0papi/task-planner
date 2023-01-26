import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../firebase.config";

export default function useAuthWithGoogle() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const signIn = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        console.log("AUTHED TOKEN", token);

        // The signed-in user info.
        const user = result.user;
        console.log("AUTHED USER", user);
        // TODO-
        // SET USER TO THE CURRENT USER OBJECT THAT IS TO BE STORED IN REDUX

        //   setUser(user);

        router.push({
          pathname: "/dashboard",
          query: {
            name: user.displayName,
            photo: user.photoURL,
          },
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
