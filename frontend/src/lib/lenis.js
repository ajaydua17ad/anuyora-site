import Lenis from "lenis";

let lenis = null;

export function initLenis() {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const sync = () => {
    lenis?.destroy();
    lenis = media.matches ? null : new Lenis({
      autoRaf: true,
      duration: 0.85,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      prevent: () => document.body.hasAttribute("data-scroll-locked"),
    });
  };
  sync();
  media.addEventListener("change", sync);
  return () => {
    media.removeEventListener("change", sync);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, behavior: "instant" });
}