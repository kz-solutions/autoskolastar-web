"use client";

import { useLayoutEffect, useState } from "react";
import debounce from "lodash/debounce";

const useIsDesktop = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", debounce(updateSize, 250));
    updateSize();
    return (): void => window.removeEventListener("resize", updateSize);
  }, []);

  return isMobile;
};

export default useIsDesktop;
