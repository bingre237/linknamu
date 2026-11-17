"use client";

import type { LinkItem } from "@/data/profile";

export default function LinkCard({ link }: { link: LinkItem }) {
  const handleClick = () => {
    // 페이지를 떠나도 전송되도록 sendBeacon 사용 (실패해도 링크 이동은 그대로)
    const body = JSON.stringify({ linkId: link.id });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block w-full rounded-2xl border-2 border-zinc-800 bg-white px-5 py-4 text-center font-semibold transition hover:-translate-y-0.5 hover:bg-zinc-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-100 dark:hover:text-zinc-900"
    >
      {link.title}
    </a>
  );
}
