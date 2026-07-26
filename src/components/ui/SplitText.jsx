import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Splits text into words and reveals them with a staggered
 * blur-to-focus rise. Pass `as` to control the wrapping element
 * (defaults to a <span>, use "h1" etc. for real headings).
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.06,
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                ease: EASE.premium,
                delay: delay + i * stagger,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
