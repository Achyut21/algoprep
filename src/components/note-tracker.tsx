"use client";

import { useEffect } from "react";

const FIRST_PING_MS = 5_000;
const PING_MS = 20_000;
const MAX_DELTA_SECONDS = 300;

/**
 * Invisible reading tracker for notes pages. Reports accumulated visible
 * time and deepest scroll to /api/note-view; the server ignores beacons
 * from readers who aren't logged in as a player.
 */
export function NoteTracker({ topic }: { topic: string }) {
  useEffect(() => {
    let maxPct = 0;
    let lastSent = Date.now();

    const measure = () => {
      const height = document.documentElement.scrollHeight;
      const pct = Math.min(
        100,
        Math.round(((window.scrollY + window.innerHeight) / height) * 100)
      );
      if (pct > maxPct) maxPct = pct;
    };

    const flush = () => {
      const secondsDelta = Math.min(
        MAX_DELTA_SECONDS,
        Math.round((Date.now() - lastSent) / 1000)
      );
      lastSent = Date.now();
      if (secondsDelta <= 0) return;
      navigator.sendBeacon(
        "/api/note-view",
        JSON.stringify({ topic, secondsDelta, maxScrollPct: maxPct })
      );
    };

    const tick = () => {
      // Interval fired while the tab is hidden: don't count that as reading.
      if (document.visibilityState === "hidden") return;
      flush();
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
      else lastSent = Date.now();
    };

    measure();
    const first = setTimeout(tick, FIRST_PING_MS);
    const interval = setInterval(tick, PING_MS);
    window.addEventListener("scroll", measure, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
      window.removeEventListener("scroll", measure);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [topic]);

  return null;
}
