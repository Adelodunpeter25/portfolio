import { useEffect, useRef, useState } from 'react';

const observers = new Map<string, IntersectionObserver>();
const callbacks = new Map<Element, (isVisible: boolean) => void>();

export function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const key = `observer-${threshold}`;
    
    if (!observers.has(key)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = callbacks.get(entry.target);
            if (callback) {
              callback(entry.isIntersecting);
            }
          });
        },
        { threshold }
      );
      observers.set(key, observer);
    }

    const observer = observers.get(key)!;
    callbacks.set(element, setIsVisible);
    observer.observe(element);

    return () => {
      callbacks.delete(element);
      observer.unobserve(element);
    };
  }, [threshold]);

  return { ref, isVisible };
}
