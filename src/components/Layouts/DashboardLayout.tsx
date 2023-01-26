import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectTaskList } from "../../store/taskReducer";
import { getCurrentUser } from "../../store/userReducer";

import Logo from "../icons & svs/Logo";
import LogoutUser from "../Logout/Logout";
interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const router = useRouter();
  const tasksList = useSelector(selectTaskList);
  const currentUser = useSelector(getCurrentUser);
  const prevTasksLength = useRef(tasksList.length);

  const [isNewActivity, setIsNewActitivy] = useState(false);

  const userPhoto = currentUser?.photoUrl;

  const linkClasses = " block text-base font-bold";

  useEffect(() => {
    setIsNewActitivy(false);
    if (tasksList.length > prevTasksLength.current) {
      setIsNewActitivy(true);

      return;
    } else if (tasksList.length < prevTasksLength.current) {
      setIsNewActitivy(true);
      return;
    }
  }, [tasksList.length]);

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

  const displayNotificationAlert = isNewActivity
    ? "block animate-ping"
    : "hidden";

  return (
    <div className="dashboard tablets:block min-h-screen">
      <div className="z-20 tablets:hidden  pt-4 ">
        <div className="fixed top-2 h-[98.5vh] flex items-center text-center flex-col gap-y-8 w-20 bg-white shadow-sm">
          <div>
            <Link href={"/dashboard"}>
              <Logo />
            </Link>
          </div>

          <div>
            <Link
              href="/dashboard"
              className={`${linkClasses} ${getLinkClass("/")}`}
            >
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
              className={`${linkClasses} ${getLinkClass("/analytics")} my-3`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
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
              href="/notifications"
              className={`${linkClasses} ${getLinkClass("/settings")} relative`}
              onClick={() => setIsNewActitivy(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={getLinkStroke("/notifications")}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                />
              </svg>
              <div
                className={`h-[8px] w-[8px] bg-red rounded-[50%] absolute top-0 right-0 ${displayNotificationAlert}`}
              ></div>
            </Link>
          </div>

          <div className="mt-auto pb-4">
            <Image
              src={userPhoto as string}
              alt="logged in user email"
              width={30}
              height={30}
              className="rounded-[50%] mb-2"
            />

            {currentUser && <LogoutUser />}
          </div>
        </div>
      </div>

      {/* <!-- Main Content --> */}
      <div className="w-full bg-backgroundMain h-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
