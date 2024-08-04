import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | undefined>,
  callback: () => void,
  addEventListener = true
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callback();
    }
  };

  useEffect(() => {
    if (addEventListener) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

// Utility function to load leads data from localStorage
// Ideally this Should be an API call, Mocking it for now
export const loadLeadsData = () => {
  const data = localStorage.getItem("leadsData");
  return data ? JSON.parse(data) : [];
};

// Utility function to save leads data to localStorage
// Ideally this Should be an API call, Mocking it for now
export const saveLeadsData = (data: any) => {
  localStorage.setItem("leadsData", JSON.stringify(data));
};
