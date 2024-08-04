import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useClickOutside } from "./uitls";

export default function Sidebar({
  isOpen,
  setIsSidebarOpen,
}: {
  isOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const ref = useRef(null);
  useClickOutside(ref, () => {
    setIsSidebarOpen(false);
  });
  const router = useRouter();

  return (
    <div ref={ref}>
      <button
        className="md:hidden p-2 fixed top-0 left-0 z-50 bg-white rounded-md shadow-md"
        onClick={() => setIsSidebarOpen((prevVal) => !prevVal)}
        style={{ display: isOpen ? "none" : "" }}
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div
        className={`flex flex-col h-full bg-gradient-to-b from-green-100 to-white p-5 shadow-lg transform md:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative w-64 z-40`}
      >
        <div className="text-2xl font-bold text-black mb-10">alma</div>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin" passHref legacyBehavior>
            <a
              className={`text-lg py-2 px-4 rounded ${
                router.pathname === "/admin"
                  ? "bg-white font-semibold text-black"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              Leads
            </a>
          </Link>
          <Link href="/settings" passHref legacyBehavior>
            <a
              className={`text-lg py-2 px-4 rounded ${
                router.pathname === "/settings"
                  ? "bg-white font-semibold text-black"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
            >
              Settings
            </a>
          </Link>
        </nav>
        <div className="mt-auto flex items-center space-x-3 p-4 bg-white rounded-lg shadow-md">
          <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-700">A</span>
          </div>
          <span className="text-lg text-gray-700">Admin</span>
        </div>
      </div>
    </div>
  );
}
