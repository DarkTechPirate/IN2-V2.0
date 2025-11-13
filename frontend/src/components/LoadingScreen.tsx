// src/components/LoadingScreen.tsx
import { motion } from "motion/react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
  bg?: string;
  color?: string;
}

export default function LoadingScreen({
  onLoadingComplete,
  duration = 3000,
  bg = "#ffffff",
  color = "#050a30",
}: LoadingScreenProps) {
  const [isFading, setIsFading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // animation timings (ms)
  const slideDuration = 800;
  const delays = useMemo(() => ({ i: 120, n: 320, two: 520 }), []);
  const popDuration = 520;
  const fadeDuration = 360;

  // ensure loader is long enough to show everything
  const minVisible = delays.two + slideDuration + popDuration + 120;
  const finalDuration = Math.max(duration, minVisible);

  useEffect(() => {
    const fadeStart = finalDuration - fadeDuration;
    const fadeTimer = setTimeout(() => setIsFading(true), fadeStart);

    const finishTimer = setTimeout(() => {
      setIsDone(true);
      if (onLoadingComplete) onLoadingComplete();
    }, finalDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [finalDuration, fadeDuration, onLoadingComplete]);

  const { t } = useTranslation();

  if (isDone) return null;

  // when the assembled pop should start: when the last letter finished its slide
  const assembledStart = delays.two + slideDuration;

  // responsive font size: smaller on narrow screens
  const [fontSize, setFontSize] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth < 420 ? 52 : 72
  );

  useEffect(() => {
    function onResize() {
      setFontSize(window.innerWidth < 420 ? 48 : 72);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fixed spacing calculation - better gap between letters
  const letterSpacing = fontSize * 0.6; // Increased from 0.55 to 0.8 for better spacing
  const containerWidth = letterSpacing * 2.2; // Width to accommodate all three elements

  const finalPositions = {
    I: -letterSpacing, // I moves left
    N: 0, // N stays center
    TWO: fontSize / 1.4, // 2 moves right
  };

  // small helper: rgba from hex
  function hexToRgba(hex: string, alpha = 1) {
    const cleaned = hex.replace("#", "");
    const full =
      cleaned.length === 3
        ? cleaned
            .split("")
            .map((c) => c + c)
            .join("")
        : cleaned;
    const bigint = parseInt(full, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return (
    <motion.div
      aria-live="polite"
      aria-busy="true"
      role="status"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: fadeDuration / 1000, ease: "easeInOut" }}
      style={{ background: bg }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div className="flex items-center justify-center">
        {/* cluster wrapper with proper width */}
        <motion.div
          initial={{ scale: 1, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" }}
          animate={{
            scale: [1, 1.06, 1],
            filter: [
              "drop-shadow(0 0 0 rgba(0,0,0,0))",
              `drop-shadow(0 12px 30px ${hexToRgba(color, 0.12)})`,
              `drop-shadow(0 6px 18px ${hexToRgba(color, 0.06)})`,
            ],
          }}
          transition={{
            duration: popDuration / 1000,
            delay: assembledStart / 1000,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center"
          style={{
            width: containerWidth,
            height: fontSize * 1.8,
          }}
        >
          {/* I - slides in from left */}
          <motion.span
            aria-hidden
            className="pointer-events-none select-none absolute"
            style={{
              fontFamily:
                "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              fontWeight: 900,
              fontSize: `${fontSize}px`,
              lineHeight: 1,
              color,
            }}
            initial={{ x: -360, opacity: 0 }}
            animate={{ x: finalPositions.I, opacity: 1 }}
            transition={{
              duration: slideDuration / 1000,
              delay: delays.i / 1000,
              easing: "cubic-bezier(.2,.9,.2,1)",
            }}
          >
            I
          </motion.span>

          {/* N - slides in from right */}
          <motion.span
            aria-hidden
            className="pointer-events-none select-none absolute"
            style={{
              fontFamily:
                "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              fontWeight: 900,
              fontSize: `${fontSize}px`,
              lineHeight: 1,
              color,
            }}
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: finalPositions.N, opacity: 1 }}
            transition={{
              duration: slideDuration / 1000,
              delay: delays.n / 1000,
              easing: "cubic-bezier(.2,.9,.2,1)",
            }}
          >
            N
          </motion.span>

          {/* 2 - slides in from bottom */}
          <motion.span
            aria-hidden
            className="pointer-events-none select-none absolute text-primary_green"
            style={{
              fontFamily:
                "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              fontWeight: 900,
              fontSize: `${fontSize}px`,
              lineHeight: 1,
            }}
            initial={{ y: 420, x: 0, opacity: 0 }}
            animate={{ y: 0, x: finalPositions.TWO, opacity: 1 }}
            transition={{
              duration: slideDuration / 1000,
              delay: delays.two / 1000,
              easing: "cubic-bezier(.2,.9,.2,1)",
            }}
          >
            2
          </motion.span>
        </motion.div>
      </div>

      {/* small loading hint under the logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: (assembledStart + 160) / 1000,
        }}
        className="absolute bottom-20 text-sm text-primary_green font-medium"
        style={{}}
      >
        {t("loading.loading")}
      </motion.div>
    </motion.div>
  );
}
