import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useRouter } from "next/router";
import Logo from "../components/icons & svs/Logo";

export default function Home() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;

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
  };
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto py-4">
        <header className="flex items-center justify-between mb-4">
          <Logo />
          <button
            className="text-white border-2 border-gray-500 px-2 py-1 rounded-[100px]"
            onClick={() => handleGoogleSignIn()}
          >
            Get Started
          </button>
        </header>

        <div className="flex items-center justify-center flex-col text-white mt-4">
          <h2 className="text-5xl text-center">
            Task management <br /> for{" "}
            <span className="border-b-4 border-primary">One</span>
          </h2>
          <p>
            A simple intuitive task management platform for your personal
            projects
          </p>
        </div>
      </div>
    </div>
  );
}
