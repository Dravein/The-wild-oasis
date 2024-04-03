import { useEffect, useRef } from "react";

// listenCapturing melyik JS event Phase-ba akarjuk az eventet hallgatni (Bubbling vagy másik)
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  //Modal Window bezáródjon ha a modal window-on kívül kattintunk.
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("Click outside");
          handler();
        }
      }

      // true, azt jelzi a JavaScript Event kezelésbe a Capturing Phase-be következik be az elkapás (JS eventek működése)
      // Kell mert különben nem nyílik meg a Modal (Illetve megnyílik és rögtön be is zárul)
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
