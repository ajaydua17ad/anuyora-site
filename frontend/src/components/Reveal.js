import { motion, useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function FadeUp({ children, delay = 0, y = 28, className = "" }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MaskLines({ lines, className = "", lineClassName = "", baseDelay = 0, step = 0.13 }) {
  const reduce = useReducedMotion();
  return (
    <span className={`block ${className}`}>
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const em = typeof line === "object" && line.em;
        const inner = em ? <em className="italic">{text}</em> : text;
        if (reduce) {
          return (
            <span key={i} className={`block ${lineClassName}`}>
              {inner}
            </span>
          );
        }
        return (
          <span key={i} className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className={`block will-change-transform ${lineClassName}`}
              initial={{ y: "112%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.95, ease: EASE, delay: baseDelay + i * step }}
            >
              {inner}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
