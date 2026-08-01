'use client';

import { useEffect, useState } from 'react';

/**
 * Local time in an office's timezone.
 *
 * Rendered empty on the server and filled in after mount: the server has no
 * idea what time it is for the reader, and rendering a server-side clock would
 * either mismatch on hydration or show a stale value.
 *
 * Updates on the minute rather than every second — a seconds display on a
 * corporate footer is motion nobody asked for, and it wakes the main thread
 * sixty times more often than it needs to.
 */
export function OfficeClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () => {
      try {
        setTime(
          new Intl.DateTimeFormat('en-CA', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone,
          }).format(new Date())
        );
      } catch {
        // An unknown IANA zone should cost a line of text, not a render.
        setTime(null);
      }
    };

    format();

    // Align the first tick to the top of the next minute, then run hourly-
    // accurate every 60s.
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      format();
      interval = setInterval(format, 60_000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [timeZone]);

  if (!time) {
    // Reserve the space so filling it in does not shift the layout.
    return <span aria-hidden="true" className="font-mono tnum text-2xs opacity-0" >00:00</span>;
  }

  return (
    <span className="font-mono tnum text-2xs tracking-[0.14em] text-navy-muted">
      <span className="sr-only">Local time: </span>
      {time}
    </span>
  );
}
