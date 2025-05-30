import { useEffect, useRef } from 'react';

export const useOutsideClick = (
  handler: () => void,
  listenCapturing = true
) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(
    function () {
      function handleClick(e: MouseEvent): void {
        if (
          ref.current &&
          e.target instanceof Node &&
          !ref.current.contains(e.target)
        ) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
};
