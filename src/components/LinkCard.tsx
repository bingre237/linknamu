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
      className="flex w-full items-center justify-center rounded-2xl border border-white/70 bg-white/70 px-6 py-4 text-[15px] font-semibold text-stone-800 shadow-[0_1px_2px_rgba(120,60,20,0.06),0_4px_16px_-8px_rgba(120,60,20,0.18)] backdrop-blur-sm transition duration-200 ease-out hover:bg-white hover:shadow-[0_1px_2px_rgba(120,60,20,0.06),0_10px_24px_-10px_rgba(120,60,20,0.28)] motion-safe:hover:-translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 dark:border-white/5 dark:bg-white/5 dark:text-stone-100 dark:shadow-none dark:hover:bg-white/10"
    >
      {link.emoji && (
        <span aria-hidden="true" className="mr-2.5 text-lg leading-none">
          {link.emoji}
        </span>
      )}
      {link.title}
    </a>
  );
}
