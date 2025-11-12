import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register plugin only once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

let isListenerAdded = false;

export const useSmoothScroll = () => {
  const hasAddedListener = useRef(false);

  useEffect(() => {
    // Only add listener once globally
    if (isListenerAdded || hasAddedListener.current) return;
    
    isListenerAdded = true;
    hasAddedListener.current = true;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (!anchor) return;
      
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: 100, // Offset pro navbar a padding
          },
          ease: "power2.inOut",
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    
    return () => {
      isListenerAdded = false;
      hasAddedListener.current = false;
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
};

