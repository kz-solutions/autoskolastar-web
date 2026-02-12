"use client";

import { useLayoutEffect, useState } from "react";
import debounce from "lodash/debounce";

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const debouncedUpdate = debounce(updateSize, 250);

    window.addEventListener("resize", debouncedUpdate);
    updateSize();

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
