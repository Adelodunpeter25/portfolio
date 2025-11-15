import { useIntersectionObserver } from './useIntersectionObserver';

export function useScrollAnimation() {
  return useIntersectionObserver(0.1);
}
