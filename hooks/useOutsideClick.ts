import React, { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideClick(ref: React.RefObject<HTMLSelectElement>, callback: Function = () => {}) {
     useEffect(() => {
          function handleClickOutside(event: MouseEvent) {
               if (ref.current && !ref.current.contains(event.target as Node)) {
                    callback(event.target);
               }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
               document.removeEventListener("mousedown", handleClickOutside);
          };
     }, [ref]);
}
