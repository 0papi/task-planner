import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "../icons & svs/Logo";
interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const router = useRouter();

  const linkClasses = " block text-base font-bold";

  /**
   * @description function that takes a link and returns an active class if it is the current route
   * @param link
   * @returns tailwind text class
   */
  const getLinkClass = (link: string) => {
    return router.pathname === link ? "text-primary" : "text-black";
  };
  const getLinkFill = (link: string) => {
    return router.pathname === link ? "#3026b9" : "none";
  };
  const getLinkStroke = (link: string) => {
    return router.pathname === link ? "#3026b9" : "currentColor";
  };

  return (
    <div className="dashboard tablets:block min-h-screen">
      <div className="z-20 tablets:hidden  pt-4 ">
        <div className="fixed top-2 h-[98.5vh] flex items-center text-center flex-col gap-y-8 w-20 bg-white shadow-sm">
          <div>
            <Logo />
          </div>

          <div>
            <Link href="/" className={`${linkClasses} ${getLinkClass("/")}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={getLinkFill("/")}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={getLinkStroke("/")}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>

            <Link
              href="/analytics"
              className={`${linkClasses} ${getLinkClass("/analytics")} my-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={getLinkFill("/analytics")}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={getLinkStroke("/analytics")}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                />
              </svg>
            </Link>

            <Link
              href="/settings"
              className={`${linkClasses} ${getLinkClass("/settings")}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={getLinkStroke("/settings")}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- Main Content --> */}
      <div className="w-full bg-backgroundMain h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
