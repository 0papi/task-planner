import { useRouter } from "next/router";
import Logo from "../components/icons & svs/Logo";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-4xl mx-auto py-4">
        <header className="flex items-center justify-between mb-4">
          <Logo />
          <button
            className="text-white border-2 border-gray-500 px-2 py-1 rounded-[100px]"
            onClick={() => router.push("/auth")}
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
